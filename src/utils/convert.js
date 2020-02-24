export const convertHourToNumber = hour => {
  let result = 0;
};

export const convertStrParams = params => {
  let str = '';

  for (let key in params) {
    if (params[key] !== '' && params[key] != '-1') {
      str += `${key}=${params[key]}&`;
    }
  }

  str = str.slice(0, str.length - 1);
  return str;
};
