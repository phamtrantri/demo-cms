import moment from 'moment';

import { DEV } from '../constants';

export const formatTime = (date: string = ''): string => {
  try {
    if (!date) return '';
    return moment(date).format('HH:mm');
  } catch (error) {
    if (DEV) {
      console.warn('Format Time error: ', error.message);
    }
    return '';
  }
};

export const formatDate = (date: string = ''): string => {
  try {
    if (!date) return '';
    return moment(date).format('DD-MM-YYYY');
  } catch (error) {
    if (DEV) {
      console.warn('Format Date error: ', error.message);
    }
    return '';
  }
};

export const formatDateTime = (date: string = ''): string => {
  try {
    if (!date) return '';
    return moment(date).format('DD-MM-YYYY HH:mm');
  } catch (error) {
    if (DEV) {
      console.warn('Format Datetime error: ', error.message);
    }
    return '';
  }
};

export const formatStr = (str: string = '', number = 50): string => {
  try {
    let result = str;
    if (str.length > number) {
      result = str.slice(0, number) + '...';
    }
    return result;
  } catch (error) {
    if (DEV) {
      console.warn('Format String error: ', error.message);
    }
    return str;
  }
};

export const formatHour = (num: number): string => {
  try {
    const h = parseInt(num);
    const mFloat = num - h;
    let m = 0;
    if (mFloat > 0) {
      m = 60 * mFloat;
    }

    const hStr = h < 10 ? '0' + h : h;
    const mStr = m < 10 ? '0' + m : m;
    return hStr + ':' + mStr;
  } catch (error) {
    if (DEV) {
      console.warn('Format Hour error: ', error.message);
    }
    return num;
  }
};

export const formatCurrency = (
  num,
  currency = 'VND',
  default_value = '',
  lang = 'vi'
) => {
  try {
    let type = lang === 'vi' ? '$1,' : '$1.';
    if (!num) return default_value;
    return (
      num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, type) + ' ' + currency
    );
  } catch (error) {
    if (DEV) {
      console.warn('Format Currency error: ', error.message);
    }
    return num;
  }
};

export const formaNumber = (num, default_value = '', lang = 'vi') => {
  try {
    let type = lang === 'vi' ? '$1,' : '$1.';
    if (!num) return default_value;
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, type);
  } catch (error) {
    if (DEV) {
      console.warn('Format Number error: ', error.message);
    }
    return num;
  }
};

export const formatDateView = strDate => {
  try {
    let dateF = strDate.slice(6, 8) + '/' + strDate.slice(4, 6);
    return dateF;
  } catch (error) {
    if (DEV) {
      console.warn('Format Date View error: ', error.message);
    }
    return strDate;
  }
};
