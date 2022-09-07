import * as React from 'react';

import { Prediction } from '../hooks/use-image-information-extractor';
import useSearchByBreed from '../hooks/use-search-by-breed';

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
      return <div>Error in fetching the breed. Please adjust your search!</div>;
    }

    if (data === undefined || data === null || data.message.length === 0) {
      return (
        <div className="flex flex-wrap -m-1 md:-m-2">
          <p className="md:text-xl">Nothing to display</p>
        </div>
      );
    }

    return (
      <>
        <h3 className="m-5 md:text-3xl">Matching results</h3>
        <div className="flex flex-wrap -m-1 md:-m-2">
          {data.message.map((image: string) => (
            <div key={image} className="flex flex-wrap w-full md:w-1/3">
              <div className="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block object-cover object-center w-full h-full rounded-lg"
                  src={image}
                />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <section className="flex flex-col items-center justify-center flex-1 overflow-hidden text-gray-700 ">
      <div className="container text-center px-5 py-2 mx-auto lg:pt-12 lg:px-32">
        {renderSection()}
      </div>
    </section>
  );
};
