import CryptoJS from 'crypto-js';

const secretKey = process.env.REACT_APP_SECRET_KEY;

export function encryptNakedToSystem(text: string): string {
  const encryptedData = CryptoJS.AES.encrypt(text, secretKey);
  return encryptedData.toString();
}

export function decryptNakedToSystem(text: string): string {
  const bytes = CryptoJS.AES.decrypt(text, secretKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
}
