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
      className={`flex justify-start items-center p-2 my-5 font-medium rounded-full w-9/12 transition-colors ${
        disabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
      }`}
      style={{
        backgroundColor: disabled ? "#BDBDBD" : "#5DB53E",
        color: "#FFFFFF",
      }}
      onMouseOver={(e) => {
        if (!disabled) e.currentTarget.style.backgroundColor = "#4a9e33";
      }}
      onMouseOut={(e) => {
        if (!disabled) e.currentTarget.style.backgroundColor = "#5DB53E";
      }}
    >
      <Icon color="#FFFFFF" height={30} width={30} className="mx-2" />
      <div className="ml-4 text-2xl">{title}</div>
    </button>
  );
}
