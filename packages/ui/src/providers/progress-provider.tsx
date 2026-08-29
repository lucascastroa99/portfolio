import { ProgressProvider as BProgressProvider } from "@bprogress/react";

interface ProgressProviderProps {
  children: React.ReactNode;
  height?: string;
  color?: string;
  options?: { showSpinner?: boolean };
}

export function ProgressProvider({
  children,
  height = "4px",
  color = "var(--primary)",
  options = { showSpinner: false },
}: Readonly<ProgressProviderProps>) {
  return (
    <BProgressProvider height={height} color={color} options={options}>
      {children}
    </BProgressProvider>
  );
}

export { useProgress } from "@bprogress/react";
