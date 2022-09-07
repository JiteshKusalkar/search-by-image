import * as React from 'react';

import { Prediction } from '../hooks/use-image-information-extractor';

interface ImagePreviewProps {
  id: string;
  src: string;
  predictions: Array<Prediction | undefined>;
}

export const ImagePreview = ({
  id,
  src,
  predictions,
}: ImagePreviewProps): JSX.Element => {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md">
      <img id={id} className="rounded-t-lg" src={src} alt="Dog preview" />
      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 uppercase mt-5">
          {predictions[0]?.className}
        </h5>
      </div>
    </div>
  );
};
