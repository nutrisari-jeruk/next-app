'use client';

import type { Option } from '@/types/option';
import { Field, Label, Radio, RadioGroup } from '@headlessui/react';
import { useState } from 'react';

const plans = [
  { label: 'Debit', value: false },
  { label: 'Credit', value: true },
];

interface Props {
  options: Option[];
  value: string | number | boolean;
  onChange?: (value: boolean) => void;
}

export default function TwRadio({ options, value }: Props) {
  const defaultValue = value || plans[0].value;
  const [selected, setSelected] = useState(defaultValue);

  return (
    <RadioGroup value={selected} onChange={setSelected} aria-label="Radio Box">
      {!!options &&
        options.map((plan, index) => (
          <Field key={index} className="flex items-center gap-2">
            <Radio
              value={plan.value}
              className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-indigo-500"
            >
              <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
            </Radio>
            <Label className="data-[disabled]:opacity-50">{plan.label}</Label>
          </Field>
        ))}
    </RadioGroup>
  );
}
