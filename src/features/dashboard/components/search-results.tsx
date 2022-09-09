import * as React from 'react';
import { ListChildComponentProps } from 'react-window';

import { LazyLoader } from '../../../components/lazy-loader';
import useSearchByBreed from '../hooks/use-search-by-breed';
import { Prediction } from '../utils/image-predictor';
import { ImageTile } from './image-tile';

export interface SearchResultsProps {
  predictions: Array<Prediction | undefined>;
}

export const SearchResults = ({
  predictions,
}: SearchResultsProps): JSX.Element => {
  const { data, isFetching, isError } = useSearchByBreed(
    predictions[0]?.className,
  );

  const renderSection = (): JSX.Element => {
    if (isFetching) {
      return <div>Fetching...</div>;
    }

    if (isError) {
      return (
        <div className="text-red-500">
          Error in fetching the breed. Please adjust your search!
        </div>
      );
    }

    if (data === undefined || data === null || data.message.length === 0) {
      return (
        <div className="flex flex-wrap">
          <p className="md:text-xl">Nothing to display</p>
        </div>
      );
    }

    return (
      <>
        <h3 className="m-5 md:text-3xl">Matching results</h3>
        <div className="h-screen">
          <LazyLoader
            listWrapperProps={{
              itemCount: data.message.length,
              itemSize: 200,
              width: window.innerWidth,
            }}
          >
            {({ index, style }: ListChildComponentProps) => {
              const image = data.message[index];

              return <ImageTile image={image} style={style} />;
            }}
          </LazyLoader>
        </div>
      </>
    );
  };

  return (
    <section className="flex flex-col items-center justify-center flex-1 overflow-hidden text-gray-700 ">
      <div className="container text-center mx-auto">{renderSection()}</div>
    </section>
  );
};
