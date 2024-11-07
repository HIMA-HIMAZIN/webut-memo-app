import React from 'react';

type GuideTitleProps = {
  text: string;
};

export function GuideTitle({ text }: GuideTitleProps) {
  return (
    <h1 className="text-5xl font-extrabold">
      {text}
    </h1>
  );
}
