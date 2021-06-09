// 清空请求的空参数
export const cleanObject = (object: any) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

// 判断是否为假
export const isFalsy = (value: any) => {
  return value === 0 ? false : !value;
};
