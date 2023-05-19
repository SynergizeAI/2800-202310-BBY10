'use client';

import ReactSelect from 'react-select'

interface SelectProps {
  label: string;
  value?: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options: Record<string, any>[];
  disabled?: boolean;
}

/**
 * Select component renders a dropdown select input.
 * @param {SelectProps} props - The props object containing label, value, onChange, options, and disabled.
 * @returns {JSX.Element} The Select component.
 */
const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  disabled,
}) => {
  return ( 
    <div className="z-[100]">
      <label
        className="
          block 
          text-sm
        "
      >
        {label}
      </label>
      <div className="mt-2">
      <ReactSelect
        isDisabled={disabled}
        value={value}
        onChange={onChange}
        isMulti
        options={options}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 })
        }}
        classNames={{
          control: () => 'text-sm',
        }}
      />
      </div>
    </div>
   );
}
 
export default Select;