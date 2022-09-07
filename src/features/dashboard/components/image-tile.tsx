import * as React from 'react';

interface ImageTileProps {
  image: string;
  style: React.CSSProperties;
}

export const ImageTile = ({ image, style }: ImageTileProps): JSX.Element => {
  return (
    <div key={image} style={style}>
      <div className="p-1 md:p-2">
        <img
          alt="gallery"
          className="block object-cover object-center w-[200px] h-[200px] rounded-lg"
          src={image}
        />
      </div>
    </div>
  );
};
