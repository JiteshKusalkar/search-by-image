import * as React from 'react';

import { FileUpload } from '../../../components/file-upload';
import {
  Prediction,
  useImageInformationExtractor,
} from '../hooks/use-image-information-extractor';
import { readImage } from '../utils/read-image';

interface ImageSearchLayoutProps {
  children: (
    imageInformation: Prediction[] | null,
    previewSrc: string | null,
  ) => JSX.Element | null;
}

export const ImageSearchLayout = ({
  children,
}: ImageSearchLayoutProps): JSX.Element => {
  const [predictions, setPredictions] = React.useState<Prediction[] | null>(
    null,
  );
  const [fileError, setFileError] = React.useState<string | null>(null);
  const [previewSrc, setPreviewSrc] = React.useState<string | null>(null);

  const { getPredictions } = useImageInformationExtractor();

  const fetchPredictions = async () => {
    const img: HTMLImageElement | null = document.querySelector(
      '#image-preview',
    );

    if (img !== null) {
      const information = await getPredictions(img);

      setPredictions(information);
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
        setPreviewSrc(preview as string);
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
    <div className="w-full md:max-w-5xl flex flex-col items-center flex-1">
      <FileUpload accept="image/*" onChange={handleChange} />
      {fileError !== null && fileError !== '' ? (
        <span className="text-sm text-red-500">{fileError}</span>
      ) : null}
      {typeof children === 'function'
        ? children(predictions, previewSrc)
        : children}
    </div>
  );
};
