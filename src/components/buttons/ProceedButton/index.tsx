"use client";

import React from 'react';

interface ProceedButtonProps {
  title : string,
  icon: React.ElementType;
  disabled?: boolean;
  hideTextOnSmallScreen?: boolean;
  onclick: () => void;
}

export function ProceedButton({
    title,
    icon: Icon,
    disabled = false,
    hideTextOnSmallScreen = false,
    onclick = () => {},
}: ProceedButtonProps) {

  return (
    <button
      onClick={onclick}
      disabled={disabled}
      className={`flex items-center p-4 my-5 font-medium  max-w-fit rounded-full lg:w-9/12 transition-colors ${
        disabled
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-primary hover:bg-primary-hover"
      } text-white`}
      >
      <Icon color="#FFFFFF" height={30} width={30} className="lg:mx-2" />
      <div className={`ml-2 text-2xl ${hideTextOnSmallScreen ? 'hidden lg:block' : 'block'}  whitespace-nowrap mx-2`}>
        {title}
      </div>
    </button>
  );
}
