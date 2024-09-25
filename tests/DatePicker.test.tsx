import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DatePicker from '../src/components/DatePicker';
import { DatePickerProvider } from '../src/contexts/DatePickerContext';

describe('DatePicker', () => {
  const renderWithContext = (component: React.ReactNode) => {
    return render(
      <DatePickerProvider>
        {component}
      </DatePickerProvider>
    );
  };

  it('renders without crashing', () => {
    renderWithContext(<DatePicker />);
    expect(screen.getByText('Date Picker')).toBeInTheDocument();
  });

  it('displays recurrence options', () => {
    renderWithContext(<DatePicker />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Daily' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Weekly' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Monthly' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Yearly' })).toBeInTheDocument();
  });

  it('displays end date input', () => {
    renderWithContext(<DatePicker />);
    expect(screen.getByLabelText(/End Date/i)).toBeInTheDocument();
  });
});