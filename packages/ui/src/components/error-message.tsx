import { Alert, AlertDescription } from "#components/ui/alert";

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: Readonly<ErrorMessageProps>) {
  return (
    <Alert variant="destructive" role="alert">
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
