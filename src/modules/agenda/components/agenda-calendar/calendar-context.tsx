import type { ReactNode } from "react";

import { createContext, use, useCallback, useMemo, useState } from "react";

import { etiquettes } from "@/modules/agenda/components/big-agenda-calendar";

type CalendarContextType = {
  // Date management
  currentDate: Date;
  setCurrentDate: (date: Date) => void;

  // Etiquette visibility management
  visibleColors: string[];
  toggleColorVisibility: (color: string) => void;
  isColorVisible: (color: string | undefined) => boolean;
};

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined,
);

export function useCalendarContext() {
  const context = use(CalendarContext);
  if (context === undefined) {
    throw new Error(
      "useCalendarContext must be used within a CalendarProvider",
    );
  }
  return context;
}

type CalendarProviderProps = {
  children: ReactNode;
};

export function CalendarProvider({ children }: CalendarProviderProps) {
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());

  // Initialize visibleColors based on the isActive property in etiquettes
  const [visibleColors, setVisibleColors] = useState<string[]>(() => {
    // Filter etiquettes to get only those that are active
    return etiquettes
      .filter(etiquette => etiquette.isActive)
      .map(etiquette => etiquette.color);
  });

  // Toggle visibility of a color
  const toggleColorVisibility = (color: string) => {
    setVisibleColors((prev) => {
      if (prev.includes(color)) {
        return prev.filter(c => c !== color);
      }
      else {
        return [...prev, color];
      }
    });
  };

  // Check if a color is visible
  const isColorVisible = useCallback((color: string | undefined) => {
    if (!color)
      return true; // Events without a color are always visible
    return visibleColors.includes(color);
  }, [visibleColors]);

  const value = useMemo(() => ({
    currentDate,
    setCurrentDate,
    visibleColors,
    toggleColorVisibility,
    isColorVisible,
  }), [currentDate, isColorVisible, visibleColors]);

  return (
    <CalendarContext value={value}>
      {children}
    </CalendarContext>
  );
}
