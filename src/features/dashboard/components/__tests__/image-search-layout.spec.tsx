import { waitFor } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import { QueryCache } from 'react-query';

import { AppProviders } from '../../../../components/app-providers';
import { ImagePredictor, Prediction } from '../../utils/image-predictor';
import { readImage } from '../../utils/read-image';
import { ImageSearchLayout } from '../image-search-layout';

jest.mock('../../utils/read-image');
jest.mock('../../utils/image-predictor');

const queryCache = new QueryCache();
afterEach(() => {
  queryCache.clear();
});

describe('image search layout', () => {
  const predictions: Prediction[] = [
    {
      className: 'hound',
      probability: 0.98,
    },
  ];
  const mockGetPredictions = jest.fn().mockResolvedValue(predictions);
  beforeEach(() => {
    (ImagePredictor as jest.Mock).mockImplementation(() => ({
      getPredictions: mockGetPredictions,
    }));
    (readImage as jest.Mock).mockResolvedValue('preview_string');
  });

  const renderComponent = () =>
    render(
      <AppProviders>
        <ImageSearchLayout />
      </AppProviders>,
    );

  it('should allow image upload', async () => {
    expect.hasAssertions();
    const file = { type: 'image/png' };
    const { getByTestId, queryByTestId } = renderComponent();

    expect(queryByTestId('image-preview')).toBeNull();
    const fileInput = getByTestId('file-upload');

    fireEvent.change(fileInput, {
      target: { files: [file] },
    });

    await waitFor(() => expect(queryByTestId('image-preview')).not.toBeNull(), {
      mutationObserverOptions: { childList: true },
    });
  });
});
