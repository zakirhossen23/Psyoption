import React, { ChangeEvent } from 'react';
import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import NoSsr from '@material-ui/core/NoSsr';
import { BN } from '@project-serum/anchor';

type Option = {
  value: BN | string | number;
  text: string;
};

const Sel: React.FC<{
  disabled?: boolean;
  label: string;
  value: BN | string | number;
  onChange: (
    event: ChangeEvent<{ name?: string; value: Option['value'] }>,
  ) => void;
  options: Option[];
  formControlOptions?: FormControlProps;
}> = ({ disabled, label, value, onChange, options, formControlOptions }) => {
  return (
    <FormControl disabled={disabled} {...formControlOptions}>
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-label`}
        id={`${label}-select`}
        value={value}
        onChange={onChange}
      >
        {options
          ? options.map((option) => (
              <MenuItem key={option.text} value={option.value as any}>
                <NoSsr>{option.text}</NoSsr>
              </MenuItem>
            ))
          : null}
      </Select>
      {/* <FormHelperText>TODO: Error Message</FormHelperText> */}
    </FormControl>
  );
};

export default Sel;

export const SelectBN: React.VFC<{
  disabled?: boolean;
  formControlOptions?: FormControlProps;
  label: string;
  onChange: (e: React.ChangeEvent<{ name: undefined; value: string }>) => void;
  options: BN[];
  formatOption?: (val: BN) => string;
  renderValue: (val: BN) => React.ReactNode;
  value: BN;
}> = ({
  disabled,
  formControlOptions,
  formatOption,
  label,
  onChange,
  options,
  renderValue,
  value,
}) => {
  return (
    <FormControl disabled={disabled} {...formControlOptions}>
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
        id={`${label}-id`}
        labelId={`${label}-label`}
        onChange={onChange}
        renderValue={renderValue}
        value={value}
      >
        {options.map((option) => (
          <MenuItem key={option.toString()} value={option.toString()}>
            <NoSsr>
              {formatOption ? formatOption(option) : option.toString()}
            </NoSsr>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
