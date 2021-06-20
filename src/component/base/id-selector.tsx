import { Select } from "antd";
import React from "react";

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectorProps
  extends Omit<
    SelectProps,
    "onChange" | "value" | "defaultOptionName" | "options"
  > {
  value: String | number | null | undefined;
  onChange: (p: number | undefined) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

export const IdSelector = (props: IdSelectorProps) => {
  const { value, onChange, defaultOptionName, options, ...otherProps } = props;
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...otherProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => {
  const tmpValue = Number(value);
  return isNaN(tmpValue) ? 0 : tmpValue;
};