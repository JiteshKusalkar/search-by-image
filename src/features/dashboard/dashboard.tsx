import * as React from 'react';

import { ImagePreview } from './components/image-preview';
import { ImageSearchLayout } from './components/image-search-layout';
import { SearchResults } from './components/search-results';
import { Prediction } from './hooks/use-image-information-extractor';

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <h1 className="text-lg md:text-3xl lg:text-5xl my-4">
        Welcome to the image search
      </h1>
      <h2 className="text-base md:text-xl lg:text-3xl mb-4">
        Search a dog breed by uploading an image
      </h2>
      <ImageSearchLayout>
        {(
          predictions: Prediction[] | null,
          previewSrc: string | null,
        ): JSX.Element | null => (
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
        )}
      </ImageSearchLayout>
    </div>
  );
};
