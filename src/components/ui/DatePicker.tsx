import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
  maxDate?: Date;
  minDate?: Date;
}

export function DatePicker({
  selectedDate,
  onChange,
  maxDate = new Date(),
  minDate = new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000), // 5 years ago
}: DatePickerProps) {
  return (
    <div className="relative">
      <ReactDatePicker
        selected={selectedDate}
        onChange={(date) => onChange(date || new Date())}
        maxDate={maxDate}
        minDate={minDate}
        dateFormat="MMMM d, yyyy"
        className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />
    </div>
  );
} 