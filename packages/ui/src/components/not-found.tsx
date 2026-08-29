import { Link } from "@tanstack/react-router";

import { Button } from "#components/ui/button";

export function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6">
      <p className="font-bold text-7xl text-muted-foreground/50">404</p>
      <h1 className="font-semibold text-2xl">Not Found</h1>
      <p className="max-w-md text-center text-muted-foreground">
        The resource you are looking for does not exist or has been moved.
      </p>
      <Button asChild>
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  );
}
