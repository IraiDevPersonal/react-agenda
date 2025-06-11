import { CalendarIcon } from "lucide-react";
import { useId } from "react";

import type { DateWeekRange } from "@/types/global.type";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { dateFormat, dateHelper } from "@/lib/date-helper";
import { cn } from "@/lib/utils";

import { FieldWrapper } from "./field-wrapper";
import { Label } from "./label";

type Props = {
  onValueChange?: (value: Props["value"]) => void;
  value: DateWeekRange | undefined;
  label?: string;
  classNames?: Partial<{
    root: string;
    label: string;
  }>;
};

function DateWeekSelector({ label, value, classNames, onValueChange }: Props) {
  const id = useId();

  const handleSelect = (value: Date | undefined) => {
    if (value) {
      const week = dateHelper.getWeekRange(value);
      onValueChange?.({
        from: new Date(week.from),
        to: new Date(week.to),
      });
    }
  };

  return (
    <FieldWrapper className={classNames?.root}>
      {label && <Label htmlFor={id} className={cn(classNames?.label)}>{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className="group bg-background hover:bg-background border-input w-52 justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
          >
            <span
              className={cn("truncate", !value && "text-muted-foreground")}
            >
              {
                (value?.from && value.to)
                  ? (
                      <>
                        {dateHelper.format(value.from, dateFormat["dd LLL y"])}
                        {" "}
                        -
                        {" "}
                        {dateHelper.format(value.to, dateFormat["dd LLL y"])}
                      </>
                    )
                  : ("Seleccione Fecha...")
              }
            </span>
            <CalendarIcon
              size={16}
              className="text-muted-foreground/80 group-hover:text-foreground shrink-0 transition-colors"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2" align="start">
          <Calendar
            mode="single"
            selected={value?.from}
            onSelect={handleSelect}
            defaultMonth={value?.from ?? new Date()}
            numberOfMonths={1}
            modifiers={{
              selected: value ? [value.from!, value.to!] : undefined,
              selectedRange: value?.from && value?.to
                ? { from: value.from, to: value.to }
                : undefined,
            }}
            modifiersClassNames={{
              selected: "bg-primary text-primary-foreground first:rounded-s-md last:rounded-e-md",
              selectedRange: "bg-muted",
            }}
          />
        </PopoverContent>
      </Popover>
    </FieldWrapper>
  );
}

export { DateWeekSelector };
