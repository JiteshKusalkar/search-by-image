import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';

export interface Prediction {
  className: string;
  probability: number;
}

export class ImagePredictor {
  public model: mobilenet.MobileNet | null = null;

  public constructor() {
    this.initializeModel().catch((error: Error): void => {
      throw error;
    });
  }

  public async initializeModel(): Promise<void> {
    await tf.ready().catch((error: Error): void => {
      throw error;
    });
    this.model = await mobilenet.load();
  }

  public async getPredictions(
    img: ImageData | HTMLImageElement,
  ): Promise<Prediction[] | null> {
    if (this.model !== null) {
      const predictions = await this.model.classify(img);

      return predictions;
    }

    return null;
  }
}
