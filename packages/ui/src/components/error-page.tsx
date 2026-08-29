import { Link } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";

import { Button } from "#components/ui/button";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export function ErrorPage({ error, reset }: Readonly<ErrorPageProps>) {
  const isNetworkError =
    error instanceof TypeError || error.message.includes("fetch") || !navigator.onLine;

  const title = isNetworkError ? "Falha na conexão" : "Algo deu errado";

  const description = isNetworkError
    ? "Não foi possível conectar ao servidor. Verifique sua conexão de internet e tente novamente."
    : "Ocorreu um erro inesperado. Tente novamente mais tarde.";

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6">
      <AlertTriangle className="size-16 text-destructive" />
      <h1 className="font-semibold text-2xl">{title}</h1>
      <p className="max-w-md text-center text-muted-foreground">{description}</p>
      <div className="flex gap-3">
        <Button onClick={reset}>Tentar novamente</Button>
        <Button variant="outline" asChild>
          <Link to="/">Voltar ao início</Link>
        </Button>
      </div>
    </div>
  );
}
