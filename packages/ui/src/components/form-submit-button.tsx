import type { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { Button } from "#components/ui/button";

type ButtonProps = React.ComponentProps<typeof Button>;

interface FormSubmitButtonProps<T extends FieldValues>
  extends Omit<ButtonProps, "onClick" | "type" | "form" | "onSubmit"> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
}

function FormSubmitButton<T extends FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: Readonly<FormSubmitButtonProps<T>>) {
  return (
    <Button
      type="button"
      disabled={form.formState.isSubmitting || props.disabled}
      onClick={() => form.handleSubmit(onSubmit)()}
      {...props}
    >
      {children}
    </Button>
  );
}

export { FormSubmitButton, type FormSubmitButtonProps };
