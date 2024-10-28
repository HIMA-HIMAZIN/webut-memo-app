import React from 'react';

type GuideTitleProps = {
  text: string;
};

export function GuideTitle({ text }: GuideTitleProps) {
  return (
    <h1 className="text-2xl font-bold">
      {text}
    </h1>
  );
}
