export const isImage = (file: FileList): boolean => {
  return file.item(0)?.type.includes('image') ?? false;
};
