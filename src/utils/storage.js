import { DEV } from '../constants';

const setItem = (key: string, value: any) => {
  try {
    if (key) {
      return localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    if (DEV) {
      console.warn('LocalStorage setItem error: ', error.message);
    }
  }
};

const getItem = (key: string) => {
  try {
    let result;
    if (key) {
      result = localStorage.getItem(key);
    }
    result = result ? JSON.parse(result) : undefined;
    return result;
  } catch (error) {
    if (DEV) {
      console.warn('LocalStorage getItem error: ', error.message);
    }
  }
};

const removeItem = (key: string) => {
  try {
    if (key) {
      return localStorage.removeItem(key);
    }
  } catch (error) {
    if (DEV) {
      console.warn('LocalStorage removeItem error: ', error.message);
    }
  }
};

export { setItem, getItem, removeItem };
