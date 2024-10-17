'use client';
import { useState } from 'react';

export default function UseFormatCurrency(amount: string) {
  const [value, setValue] = useState(amount);

  const formatCurrency = (value: string) => {
    const initialValue = value || '0';
    const number = initialValue.split(',')[0];
    let decimal = initialValue.split(',')[1];

    if (!decimal) {
      decimal = '00';
    }

    if (decimal.length < 2) {
      decimal += '0';
    }

    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    })
      .format(Number(number))
      .replace('IDR', 'Rp')
      .trim();
  };

  const handleValueChange = (rawValue: string) => {
    const numericValue = rawValue.replace(/[^0-9,]/g, '');
    setValue(numericValue);
  };

  return {
    formattedValue: formatCurrency(value),
    numericValue: parseFloat(value) || 0,
    setValue: handleValueChange,
  };
}
