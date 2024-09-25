'use client'
import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, isValid } from 'date-fns';
import { useDatePickerContext } from '../../contexts/DatePickerContext';

const Preview: React.FC = () => {
  const { startDate, getNextOccurrences } = useDatePickerContext();
  const nextOccurrences = getNextOccurrences(10);

  const [previewMonth, setPreviewMonth] = React.useState(startDate);
  const monthStart = startOfMonth(previewMonth);
  const monthEnd = endOfMonth(monthStart);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const goToPreviousMonth = () => setPreviewMonth(addMonths(previewMonth, -1));
  const goToNextMonth = () => setPreviewMonth(addMonths(previewMonth, 1));

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-semibold mb-4 text-gray-100">Preview</h3>
      <div className="flex justify-between items-center mb-4">
        <button onClick={goToPreviousMonth} className="text-indigo-400 hover:text-indigo-300 transition-colors">
          &lt;
        </button>
        <span className="text-lg font-medium text-gray-300">{format(previewMonth, 'MMMM yyyy')}</span>
        <button onClick={goToNextMonth} className="text-indigo-400 hover:text-indigo-300 transition-colors">
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-medium text-gray-400 text-sm">
            {day}
          </div>
        ))}
        {monthDays.map((day) => {
          const isOccurrence = nextOccurrences.some((occurrence) => isValid(occurrence) && isSameDay(occurrence, day));
          return (
            <div
              key={day.toString()}
              className={`p-2 text-center text-sm rounded-full ${
                !isSameMonth(day, previewMonth)
                  ? 'text-gray-600'
                  : isOccurrence
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300'
              }`}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-2 text-gray-100">Next Occurrences</h4>
        <ul className="space-y-1">
          {nextOccurrences.slice(0, 5).map((date, index) => (
            <li key={index} className="text-sm text-gray-400">
              {isValid(date) ? format(date, 'MMMM d, yyyy') : 'Invalid date'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Preview;