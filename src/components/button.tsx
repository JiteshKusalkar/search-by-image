import * as React from 'react';

export const Button = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
): JSX.Element => {
  return (
    <button
      type="button"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
      {...props}
    />
  );
};
