import * as React from 'react';

import { ImageSearchLayout } from './components/image-search-layout';

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <h1 className="text-lg md:text-3xl lg:text-5xl my-4">
        Welcome to the image search
      </h1>
      <h2 className="text-base md:text-xl lg:text-3xl mb-4">
        Search a dog breed by uploading an image
      </h2>
      <ImageSearchLayout />
    </div>
  );
};
