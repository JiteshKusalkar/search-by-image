import * as React from 'react';

import { FileUpload } from '../../../components/file-upload';

type ImageInformation = Record<string, string>;

interface ImageSearchLayoutProps {
  children: (imageInformation: ImageInformation | null) => JSX.Element;
}

export const ImageSearchLayout = ({
  children,
}: ImageSearchLayoutProps): JSX.Element => {
  const [imageInformation] = React.useState<ImageInformation | null>(null);

  return (
    <div className="w-full md:max-w-5xl flex flex-col items-center">
      <FileUpload accept="image/*" />
      {typeof children === 'function' ? children(imageInformation) : children}
    </div>
  );
};
