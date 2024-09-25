import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DatePicker from '../src/components/DatePicker';
import { DatePickerProvider } from '../src/contexts/DatePickerContext';

const renderWithContext = (component: React.ReactNode) => {
  return render(
    <DatePickerProvider>
      {component}
    </DatePickerProvider>
  );
};

describe('DatePicker Integration', () => {
  it('updates preview when changing recurrence settings', async () => {
    renderWithContext(<DatePicker />);

    const recurrenceSelect = screen.getByRole('combobox');
    fireEvent.change(recurrenceSelect, { target: { value: 'weekly' } });

    await waitFor(() => {
      const previewItems = screen.getAllByRole('listitem');
      expect(previewItems.length).toBeGreaterThan(0);
    });
  });
});