import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useId } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { dateHelper } from "@/lib/date-helper";
import { cn } from "@/lib/utils";

import { FieldWrapper } from "./field-wrapper";

type Props = {
  dateViewStyle?: "dd-MM-yyyy" | "PPP";
  onValueChange: (date: Date) => void;
  showControls?: boolean;
  value: Date | undefined;
  label?: string;
  classNames?: Partial<{
    root: string;
    label: string;
    trigger: string;
  }>;
};

function DatePicker({ value, label, classNames, dateViewStyle = "PPP", showControls = false, onValueChange }: Props) {
  const id = useId();

  const handlePrevChange = () => {
    onValueChange(dateHelper.subDays(value ?? dateHelper.createDate(), 1));
  };

  const handleNextChange = () => {
    onValueChange(dateHelper.addDays(value ?? dateHelper.createDate(), 1));
  };

  return (
    <div className="flex items-end gap-x-1">
      {showControls && (
        <Button variant="outline" size="icon" onClick={handlePrevChange}>
          <ChevronLeftIcon />
        </Button>
      )}
      <FieldWrapper classNames={classNames} label={label} labelId={id}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id={id}
              variant="outline"
              className={cn("group bg-background hover:bg-background border-input w-52 justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]", classNames?.trigger)}
            >
              <span
                className={cn("truncate", !value && "text-muted-foreground")}
              >
                {value
                  ? dateHelper.format(value, dateViewStyle)
                  : dateViewStyle === "dd-MM-yyyy" ? "dd-mm-aaaa" : "Sin selección..."}
              </span>
              <CalendarIcon
                size={16}
                className="text-muted-foreground/80 group-hover:text-foreground shrink-0 transition-colors"
                aria-hidden="true"
              />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-2" align="start">
            <Calendar required mode="single" selected={value} onSelect={onValueChange} />
          </PopoverContent>
        </Popover>
      </FieldWrapper>
      {showControls && (
        <Button variant="outline" size="icon" onClick={handleNextChange}>
          <ChevronRightIcon />
        </Button>
      )}
    </div>
  );
}

export { DatePicker };
