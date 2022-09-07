import * as React from 'react';

import { FileUpload } from '../../../components/file-upload';
import {
  Prediction,
  useImageInformationExtractor,
} from '../hooks/use-image-information-extractor';
import { readImage } from '../utils/read-image';

export type ImageInformation = Prediction[];

interface ImageSearchLayoutProps {
  children: (imageInformation: ImageInformation | null) => JSX.Element;
}

export const ImageSearchLayout = ({
  children,
}: ImageSearchLayoutProps): JSX.Element => {
  const [
    imageInformation,
    setImageInformation,
  ] = React.useState<ImageInformation | null>(null);
  const [fileError, setFileError] = React.useState<string | null>(null);
  const [previewSrc, setPreviewSrc] = React.useState<
    string | ArrayBuffer | null
  >(null);

  const { getPredictions } = useImageInformationExtractor();

  const fetchPredictions = async () => {
    const img: HTMLImageElement | null = document.querySelector(
      '.image-preview',
    );

    if (img !== null) {
      const information = await getPredictions(img);

      setImageInformation(information);
    }
  };

  const handleChange = async (
    event: React.SyntheticEvent<HTMLInputElement>,
  ) => {
    const file = event.currentTarget.files;

    if (file !== null) {
      if (file.item(0)?.type.includes('image') ?? false) {
        setFileError(null);
        const preview = await readImage(file.item(0));
        setPreviewSrc(preview);
      } else {
        setFileError('Please upload an image file: PNG, JPG, JPEG');
      }
    }
  };

  React.useEffect(() => {
    fetchPredictions().catch((error: Error): void => {
      throw error;
    });
  }, [previewSrc]);

  return (
    <div className="w-full md:max-w-5xl flex flex-col items-center">
      <FileUpload accept="image/*" onChange={handleChange} />
      {previewSrc === null ? null : (
        <img
          className="image-preview"
          src={previewSrc as string}
          alt="Dog image preview"
        />
      )}
      {fileError !== null && fileError !== '' ? (
        <span className="text-sm text-red-500">{fileError}</span>
      ) : null}
      {typeof children === 'function' ? children(imageInformation) : children}
    </div>
  );
};
