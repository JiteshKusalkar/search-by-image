import * as React from 'react';

export type FileUploadProps = React.InputHTMLAttributes<HTMLInputElement>;
type Ref = React.LegacyRef<HTMLInputElement>;

const FileUploadBase = (props?: FileUploadProps, ref?: Ref): JSX.Element => {
  return (
    <div className="flex w-full">
      <label
        htmlFor="file-upload"
        className="flex flex-col justify-center items-center w-full p-4 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer"
      >
        <div className="flex flex-col justify-center items-center">
          <svg
            aria-hidden="true"
            className="mb-3 w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span>
          </p>
        </div>
        <input
          id="file-upload"
          className="hidden"
          multiple={false}
          ref={ref}
          {...props}
          type="file"
        />
      </label>
    </div>
  );
};

export const FileUpload = React.forwardRef(FileUploadBase);
