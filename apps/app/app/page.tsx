"use client"

// Next.js Hooks
import { useRouter } from "next/navigation";

// Custom Hooks
import { useSession } from "@/lib/hooks/useSession";

// `AuthGuard` Component
import { AuthGuard } from "./(auth)/AuthGuard";

// UI Components
import { Button } from "@/components/ui/button";

// Lucide Icons
import { LoaderCircle } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  const { user, loading, signOut } = useSession();

  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  }

  if (!user || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderCircle className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <AuthGuard authRequired redirectTo="/sign-in">
      <div className="p-4">
        {user && (
          <Button onClick={handleSignOut}>
            Sign Out
          </Button>
        )}
      </div>
    </AuthGuard>
  );
}
