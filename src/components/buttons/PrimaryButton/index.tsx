"use client";

import React from 'react';

interface PrimaryButtonProps {
  title: string;
  icon: React.ElementType;
  onClick: () => void;
  disabled?: boolean;
}

export function PrimaryButton({
  title,
  icon: Icon,
  onClick,
  disabled = false,
}: PrimaryButtonProps) {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`flex justify-start items-center p-4 my-5 font-medium rounded-full lg:w-9/12 transition-colors ${
        disabled
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-primary hover:bg-primary-hover"
      } text-white`}
      >
      <Icon color="#FFFFFF" height={30} width={30} className="lg:mx-2" />
      <div className="ml-4 text-2xl hidden lg:block">{title}</div>
    </button>
  );
}
