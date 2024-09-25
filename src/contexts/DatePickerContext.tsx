'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { addDays, addWeeks, addMonths, addYears, setDate, getDay } from 'date-fns';

type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface DatePickerContextType {
  startDate: Date;
  endDate: Date | null;
  recurrenceType: RecurrenceType;
  frequency: number;
  selectedDays: number[];
  nthDay: number | null;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date | null) => void;
  setRecurrenceType: (type: RecurrenceType) => void;
  setFrequency: (freq: number) => void;
  setSelectedDays: (days: number[]) => void;
  setNthDay: (day: number | null) => void;
  getNextOccurrences: (count: number) => Date[];
}

const DatePickerContext = createContext<DatePickerContextType | undefined>(undefined);

export const DatePickerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [recurrenceType, setRecurrenceType] = useState<RecurrenceType>('daily');
  const [frequency, setFrequency] = useState(1);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [nthDay, setNthDay] = useState<number | null>(null);

  const getNextOccurrences = (count: number): Date[] => {
    const occurrences = [];
    let currentDate = startDate;

    for (let i = 0; i < count; i++) {
      if (recurrenceType === 'weekly' && selectedDays.length > 0) {
        while (!selectedDays.includes(getDay(currentDate))) {
          currentDate = addDays(currentDate, 1);
        }
      } else if (recurrenceType === 'monthly' && nthDay !== null) {
        const targetDate = setDate(currentDate, nthDay < 0 ? -1 : nthDay);
        currentDate = nthDay < 0 ? addMonths(targetDate, 1) : targetDate;
      }

      occurrences.push(currentDate);

      switch (recurrenceType) {
        case 'daily':
          currentDate = addDays(currentDate, frequency);
          break;
        case 'weekly':
          currentDate = addWeeks(currentDate, frequency);
          break;
        case 'monthly':
          currentDate = addMonths(currentDate, frequency);
          break;
        case 'yearly':
          currentDate = addYears(currentDate, frequency);
          break;
      }

      if (endDate && currentDate > endDate) break;
    }

    return occurrences;
  };

  const value = {
    startDate,
    endDate,
    recurrenceType,
    frequency,
    selectedDays,
    nthDay,
    setStartDate,
    setEndDate,
    setRecurrenceType,
    setFrequency,
    setSelectedDays,
    setNthDay,
    getNextOccurrences,
  };

  return <DatePickerContext.Provider value={value}>{children}</DatePickerContext.Provider>;
};

export const useDatePickerContext = () => {
  const context = useContext(DatePickerContext);
  if (context === undefined) {
    throw new Error('useDatePickerContext must be used within a DatePickerProvider');
  }
  return context;
};