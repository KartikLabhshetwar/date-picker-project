'use client'
import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { useDatePickerContext } from '../../contexts/DatePickerContext';

const Calendar: React.FC = () => {
  const { startDate, setStartDate } = useDatePickerContext();
  const monthStart = startOfMonth(startDate);
  const monthEnd = endOfMonth(monthStart);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const goToPreviousMonth = () => setStartDate(subMonths(startDate, 1));
  const goToNextMonth = () => setStartDate(addMonths(startDate, 1));

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4 bg-gray-800">
        <button onClick={goToPreviousMonth} className="text-indigo-400 hover:text-indigo-300 transition-colors">
          &lt;
        </button>
        <span className="text-lg font-medium text-gray-100">{format(startDate, 'MMMM yyyy')}</span>
        <button onClick={goToNextMonth} className="text-indigo-400 hover:text-indigo-300 transition-colors">
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-medium text-gray-400 text-sm">
            {day}
          </div>
        ))}
        {monthDays.map((day) => (
          <button
            key={day.toString()}
            onClick={() => setStartDate(day)}
            className={`p-2 text-center text-sm rounded-full transition-colors ${
              !isSameMonth(day, startDate)
                ? 'text-gray-600 cursor-not-allowed'
                : isSameDay(day, startDate)
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'hover:bg-gray-700 text-gray-300'
            }`}
          >
            {format(day, 'd')}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calendar;