type Resolve = (
  value: string | ArrayBuffer | PromiseLike<string | ArrayBuffer | null> | null,
) => void;
type Reject = (reason?: Error) => void;

export const readImage = async (
  file: Blob | File | null,
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve: Resolve, reject: Reject): void => {
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
