"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

interface ProceedButtonProps {
  title : string,
  path : string,
  icon: React.ElementType;
  disabled?: boolean;
  hideTextOnSmallScreen?: boolean;
}

export function ProceedButton({
    title,
    path , 
    icon: Icon,
    disabled = false,
    hideTextOnSmallScreen = false,
}: ProceedButtonProps) {
    const router = useRouter();
    const handleClick = () => {
        if (!disabled) {
            router.push(path);
        }
    };

  return (
    <button
      onClick={handleClick}
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
