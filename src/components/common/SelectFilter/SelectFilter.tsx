import React from 'react';
import styles from './SelectFilter.module.css';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectFilterProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  defaultOptionLabel: string; // e.g., "All Categories"
}

export const SelectFilter: React.FC<SelectFilterProps> = ({
  label,
  value,
  onChange,
  options,
  defaultOptionLabel,
}) => {
  return (
    <div className={styles.filterWrapper}>
      <label htmlFor={label} className={styles.label}>
        {label}
      </label>
      <select
        id={label}
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{defaultOptionLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};