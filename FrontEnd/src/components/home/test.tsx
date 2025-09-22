import { Button } from "@/components/ui/button";
import { useRouter } from "@tanstack/react-router"
export default function TestMainHome() {
  const router = useRouter();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Home Page</h1>
      <Button className="mt-4" onClick={() => router.navigate({ to: "/auth/login" })}>Click Me</Button>
    </div>
  );
}
