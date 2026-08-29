import {
  dateToPlainDate,
  plainDateToDate,
} from "@repo/shared/utilities/temporal";
import { CalendarIcon } from "lucide-react";
import type { Temporal } from "temporal-polyfill";
import { Button } from "#components/ui/button";
import { Calendar } from "#components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "#components/ui/popover";
import { cn } from "#libraries/utils";

interface DatePickerProps {
  value?: Temporal.PlainDate;
  onChange?: (date: Temporal.PlainDate | undefined) => void;
  className?: string;
  placeholder?: string;
  disabled?: { before: Temporal.PlainDate };
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function DatePicker({
  value,
  onChange,
  className,
  placeholder = "Selecionar data",
  disabled,
  open,
  onOpenChange,
}: Readonly<DatePickerProps>) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {value ? value.toLocaleString("pt-BR") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={value ? plainDateToDate(value) : undefined}
          onSelect={(date) =>
            onChange?.(date ? dateToPlainDate(date) : undefined)
          }
          buttonVariant="ghost"
          disabled={
            disabled ? { before: plainDateToDate(disabled.before) } : undefined
          }
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };
