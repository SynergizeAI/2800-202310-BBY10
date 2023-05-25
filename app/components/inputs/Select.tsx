"use client";

import ReactSelect, { InputActionMeta } from "react-select";
import { components } from "react-select";
import { UserAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SelectProps {
  label: string;
  value?: Record<string, any>;
  onInputChange?: (input: string, actionMeta: InputActionMeta) => void;
  onChange: (value: Record<string, any>) => void;
  options: OptionType[];
  disabled?: boolean;
}

interface OptionType {
  label: any;
  value: any;
  icon: any;
}

const CustomOption: React.FC<any> = (props) => (
  <components.Option {...props}>
    {/* You can render whatever you like here */}
    <div className='flex flex-row items-center gap-4'>
      <UserAvatar>
        <AvatarImage src={props.data.icon} />
        <AvatarFallback>
          {props.data.label.charAt(0).toUpperCase()}
        </AvatarFallback>
      </UserAvatar>
      <div>{props.data.label}</div>
    </div>
  </components.Option>
);

/**
 * Select component renders a dropdown select input.
 * @param {SelectProps} props - The props object containing label, value, onChange, options, and disabled.
 * @returns {JSX.Element} The Select component.
 */
const Select: React.FC<SelectProps> = ({
  label,
  value,
  onInputChange,
  onChange,
  options,
  disabled,
}) => {
  return (
    <div className='z-[10000]'>
      <label className='block text-sm'>{label}</label>
      <div className='mt-2'>
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onInputChange={onInputChange}
          onChange={onChange}
          isMulti
          options={options}
          // menuPortalTarget={document.body}
          components={{ Option: CustomOption }}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          classNamePrefix='react-select'
        />
      </div>
    </div>
  );
};

export default Select;
