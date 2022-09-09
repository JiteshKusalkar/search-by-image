export const isImage = (file: File): boolean => {
  return file.type.includes('image');
};
