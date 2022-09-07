export const readImage = async (
  file: Blob | File | null,
): Promise<string | ArrayBuffer | null> => {
  // eslint-disable-next-line @typescript-eslint/typedef
  return new Promise((resolve, reject): void => {
    if (file === null) {
      reject(new Error('no file'));
    } else {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = (): void => {
        resolve(reader.result);
      };
    }
  });
};
