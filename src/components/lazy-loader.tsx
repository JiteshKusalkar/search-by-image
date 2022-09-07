import * as React from 'react';
import AutoSizer, { AutoSizerProps, Size } from 'react-virtualized-auto-sizer';
import {
  FixedSizeList,
  FixedSizeListProps,
  ListChildComponentProps,
} from 'react-window';

interface LazyLoaderProps {
  autoSizerProps?: Omit<AutoSizerProps, 'children'>;
  listWrapperProps: Omit<FixedSizeListProps, 'children' | 'height'>;
  children: (props: ListChildComponentProps) => JSX.Element;
}

export const LazyLoader = ({
  children,
  autoSizerProps = {},
  listWrapperProps,
}: LazyLoaderProps): JSX.Element => {
  return (
    <AutoSizer {...autoSizerProps}>
      {({ height }: Size): JSX.Element => (
        <FixedSizeList
          {...listWrapperProps}
          height={height}
          width={window.innerWidth}
        >
          {children}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};
