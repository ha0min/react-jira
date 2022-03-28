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

/**
 * 实现 value 可以传入多种类型的值
 * onChange 回调 number｜undefined 类型
 * isNaN(Number(value)) 为 true 时，选择默认类型
 * 选择默认类型，onChange 回调 undefined
 * @param props: "onChange" | "value" | "defaultOptionName" | "options"
 * @constructor
 */
export const IdSelector = (props: IdSelectorProps) => {
  const { value, onChange, defaultOptionName, options, ...otherProps } = props;
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...otherProps}
    >
      // 默认选项名字
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      // 设置选项
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
