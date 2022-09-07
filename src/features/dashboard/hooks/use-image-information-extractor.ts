import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import * as React from 'react';

export interface Prediction {
  className: string;
  probability: number;
}

interface UseImageInformationExtractorReturnType {
  getPredictions: (
    img: ImageData | HTMLImageElement,
  ) => Promise<Prediction[] | null>;
}

export const useImageInformationExtractor = (): UseImageInformationExtractorReturnType => {
  const modelRef = React.useRef<mobilenet.MobileNet | null>(null);

  const initModel = async (): Promise<void> => {
    await tf.ready().catch((error: Error): void => {
      throw error;
    });
    modelRef.current = await mobilenet.load();
  };

  const getPredictions = async (
    img: ImageData | HTMLImageElement,
  ): Promise<Prediction[] | null> => {
    const predictions = await modelRef.current?.classify(img);

    return predictions ?? null;
  };

  React.useEffect((): void => {
    initModel().catch((error: Error): void => {
      throw error;
    });
  }, []);

  return { getPredictions };
};
