import store from 'store';
import { resource } from 'reducers';
import { compressImage } from 'utils/image';

// const UPLOAD_SIZE_LIMIT: number = 3 * 1024 * 1024;
// const UPLOAD_SIZE_LIMIT: number = 500;

export const useImage = (
  setFieldValue,
  name,
  setFieldError,
  setImage,
  type,
  callback
) => {
  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles[0]) {
      setFieldError(name, 'File không đúng định dạng ảnh');
    } else {
      // const file: File = acceptedFiles[0];

      const onSuccess: Function = link => {
        setImage(link);
        setFieldValue(name, link);
        if (callback && typeof callback === 'function') {
          callback();
        }
      };

      compressImage(acceptedFiles, file => {
        store.dispatch(
          resource.actions.uploadResourceAjax({ type, file, onSuccess })
        );
      });
    }
  };

  return [onDrop];
};
