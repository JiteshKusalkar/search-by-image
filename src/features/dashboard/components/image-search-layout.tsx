import * as React from 'react';

import { FileUpload } from '../../../components/file-upload';
import {
  Prediction,
  useImageInformationExtractor,
} from '../hooks/use-image-information-extractor';
import { isImage } from '../utils/is-image';
import { readImage } from '../utils/read-image';
import { ImagePreview } from './image-preview';
import { SearchResults } from './search-results';

export const ImageSearchLayout = (): JSX.Element => {
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
      if (isImage(file)) {
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
      <div className="flex flex-col items-center justify-center flex-1 w-full mt-4 md:mt-9">
        {previewSrc !== null && previewSrc !== '' ? (
          <ImagePreview
            predictions={predictions ?? []}
            src={previewSrc}
            id="image-preview"
          />
        ) : null}
        <SearchResults predictions={predictions ?? []} />
      </div>
    </div>
  );
};
