import Compress from 'compress.js';
import { api } from 'services';

const UPLOAD_SIZE_LIMIT: number = 3 * 1024 * 1024;

const compress = new Compress();

export const uploadImage = async file => {
  const res = await api.uploadImage(file);
  return res.data;
};

export const compressImage = (files: File[], onSuccess: Function): File => {
  if (files[0].size <= UPLOAD_SIZE_LIMIT) {
    onSuccess(files[0]);
  } else {
    compress
      .compress(files, {
        size: 3, // the max size in MB, defaults to 2MB
        quality: 1 // the quality of the image, max is 1,
        // maxWidth: 1440, // the max width of the output image, defaults to 1920px
        // maxHeight: 500, // the max height of the output image, defaults to 1920px
        // resize: true // defaults to true, set false if you do not want to resize the image width and height
      })
      .then(data => {
        // returns an array of compressed images
        const img1 = data[0];
        const base64str = img1.data;
        const imgExt = img1.ext;
        const file = Compress.convertBase64ToFile(base64str, imgExt);

        onSuccess(file);
      });
  }
};
