import { RcFile } from 'antd/es/upload';
import lodash from 'lodash';

export const getOptionFromObj = (obj) => {
  return lodash.map(obj, (val: string, key: string) => ({
    label: val,
    value: key,
  }));
};

function getOptionLabel(item: any, labelKey: string | string[], separator = '-') {
  const label = Array.isArray(labelKey)
    ? labelKey.reduce((label, key) => (label ? `${label}${separator}` : label) + (item?.[key] ?? ''), '')
    : item?.[labelKey];

  return label;
}

export function convertToOptions(
  collection: any[],
  valueKey: string,
  labelKey: string | string[],
  separator?: string
) {
  if (!Array.isArray(collection)) return [];

  return lodash.map(collection, (item) => {
    const label = getOptionLabel(item, labelKey, separator);

    return {
      value: item?.[valueKey],
      label: label,
    };
  });
}

export function searchValueOptions(input: any, option: any) {
  return option?.label?.toString()?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const uid = (len = 10) => {
  const buf = [],
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    charlen = chars.length;
  for (let i = 0; i < len; ++i) buf.push(chars[getRandomInt(0, charlen - 1)]);
  return buf.join('');
};

export const toVND = (val: number) => {
  return val ? val.toLocaleString() : '';
};

export const getBase64 = (file: RcFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const roundNumberTo = (number, digit) => {
  return +(Math.round(number * 100) / 100).toFixed(digit);
};

export const filterInvalidField = (params): any => {
  return Object.keys(params).reduce(function (previous, key) {
    if (
      (Array.isArray(params[key]) && !params[key].length) ||
      params[key] === null ||
      params[key] === undefined ||
      params[key] === '' ||
      Number.isNaN(params[key])
    )
      return previous;
    return { [key]: params[key], ...previous };
  }, {});
};

export function normalizeText(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}
