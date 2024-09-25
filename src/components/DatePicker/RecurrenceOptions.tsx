import React from 'react';
import { useDatePickerContext } from '../../contexts/DatePickerContext';

const RecurrenceOptions: React.FC = () => {
  const {
    recurrenceType,
    setRecurrenceType,
    frequency,
    setFrequency,
    selectedDays,
    setSelectedDays,
    nthDay,
    setNthDay,
  } = useDatePickerContext();

  const handleRecurrenceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRecurrenceType(e.target.value as 'daily' | 'weekly' | 'monthly' | 'yearly');
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFrequency(parseInt(e.target.value));
  };

  const handleDaySelection = (day: number) => {
    if (recurrenceType === 'weekly') {
      if (selectedDays.includes(day)) {
        setSelectedDays(selectedDays.filter((d) => d !== day));
      } else {
        setSelectedDays([...selectedDays, day]);
      }
    }
  };

  const handleNthDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNthDay(parseInt(e.target.value));
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
      <h3 className="text-2xl font-semibold text-gray-100 mb-4">Recurrence Options</h3>
      <div>
        <label htmlFor="recurrenceType" className="block text-sm font-medium text-gray-300 mb-1">
          Recurrence
        </label>
        <select
          id="recurrenceType"
          value={recurrenceType}
          onChange={handleRecurrenceTypeChange}
          className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div>
        <label htmlFor="frequency" className="block text-sm font-medium text-gray-300 mb-1">
          Every
        </label>
        <input
          type="number"
          id="frequency"
          value={frequency}
          onChange={handleFrequencyChange}
          min={1}
          className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
        />
      </div>

      {recurrenceType === 'weekly' && (
        <div>
          <span className="block text-sm font-medium text-gray-300 mb-2">Select days</span>
          <div className="flex flex-wrap gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <button
                key={day}
                onClick={() => handleDaySelection(index)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedDays.includes(index)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}

      {recurrenceType === 'monthly' && (
        <div>
          <label htmlFor="nthDay" className="block text-sm font-medium text-gray-300 mb-1">
            On the
          </label>
          <select
            id="nthDay"
            value={nthDay || ''}
            onChange={handleNthDayChange}
            className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
          >
            <option value="">Select...</option>
            {[1, 2, 3, 4, -1].map((n) => (
              <option key={n} value={n}>
                {n === -1 ? 'Last' : n + (n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th')}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default RecurrenceOptions;