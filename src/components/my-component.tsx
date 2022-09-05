import * as React from 'react';

interface SayHelloProps {
  name: string;
}

export const SayHello: React.FC<SayHelloProps> = ({ name }: SayHelloProps) => {
  return <div>{`Hello there, ${name}!`}</div>;
};
