import { load } from '@tensorflow-models/mobilenet';

import { ImagePredictor, Prediction } from '../image-predictor';

jest.mock('@tensorflow/tfjs', () => ({
  ready: jest.fn().mockResolvedValue({}),
}));
jest.mock('@tensorflow-models/mobilenet', () => ({
  load: jest.fn(),
}));

describe('image predictor', () => {
  it('should initialize model', async () => {
    expect.assertions(1);
    const imagePredictor = new ImagePredictor();
    await imagePredictor.initializeModel();
    expect(imagePredictor.model).not.toBeNull();
  });

  it('should get predictions', async () => {
    expect.assertions(1);
    const mockPredictions: Prediction[] = [
      {
        className: 'hound',
        probability: 0.98,
      },
    ];

    (load as jest.Mock).mockImplementation(() => ({
      classify: jest.fn().mockResolvedValue(mockPredictions),
    }));
    const imagePredictor = new ImagePredictor();
    await imagePredictor.initializeModel();

    const predictions = await imagePredictor.getPredictions(
      document.createElement('img'),
    );
    expect(predictions).toStrictEqual(mockPredictions);
  });
});
