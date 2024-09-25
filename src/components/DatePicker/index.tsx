'use client'
import React from 'react';
import RecurrenceOptions from './RecurrenceOptions';
import Calendar from './Calender';
import Preview from './Preview';
import { useDatePickerContext } from '../../contexts/DatePickerContext';

const DatePicker: React.FC = () => {
  const { startDate, setStartDate, endDate, setEndDate } = useDatePickerContext();

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-100">Date Picker</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6 bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex flex-col space-y-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
              <input
                type="date"
                id="startDate"
                value={startDate.toISOString().split('T')[0]}
                onChange={(e) => setStartDate(new Date(e.target.value))}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out text-gray-100 [color-scheme:dark]"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-300 mb-1">End Date (Optional)</label>
              <input
                type="date"
                id="endDate"
                value={endDate ? endDate.toISOString().split('T')[0] : ''}
                onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out text-gray-100 [color-scheme:dark]"
              />
            </div>
          </div>
          <Calendar />
        </div>
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <RecurrenceOptions />
        </div>
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <Preview />
        </div>
      </div>
    </div>
  );
};

export default DatePicker;