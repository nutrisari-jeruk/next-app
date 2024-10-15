'use client';
import { TwInput } from '@/components';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { useState } from 'react';

export default function index() {
  dayjs.locale('id');
  const [transactionDate, setTransactionDate] = useState(
    dayjs().format('DD-MM-YYYY'),
  );

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value; // Format YYYY-MM-DD
    setTransactionDate(selectedDate);
  };

  return (
    <div>
      <form className="rounded-lg">
        <div className="mb-6 rounded-lg bg-white p-4 shadow">
          <TwInput
            name="transaction_date"
            label="Tanggal Transaksi"
            type="date"
            lang="id-ID"
            onChange={handleDateChange}
            defaultValue={dayjs().format('YYYY-MM-DD')}
          />
        </div>
      </form>
    </div>
  );
}
