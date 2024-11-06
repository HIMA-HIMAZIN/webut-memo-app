import React from 'react';

type IconTextProps = {
  text: string;
  icon: React.ElementType;
};

export function IconText({ text, icon: Icon }: IconTextProps) {
  return (
    <div className="flex items-center text-black">
      <Icon
        color={"#000000"}
        height={24}
        width={24}
        className="mr-2"
      />
      <span className="text-lg">
        {text}
      </span>
    </div>
  );
}

