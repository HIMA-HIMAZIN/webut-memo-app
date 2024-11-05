"use client";

import { useRouter, usePathname } from 'next/navigation';
import React from 'react';

interface ActionButtonProps {
  title: string;
  path: string;              
  icon: React.ElementType;
  className?: string;
}

export function ActionButton({
  title,
  path,
  icon: Icon,
}: ActionButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === path;

  const handleClick = () => {
    router.push(path);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex justify-start items-center p-2 my-5 hover:bg-gray-100 font-medium rounded-full w-9/12 ${
        isActive ? "text-primary" : "text-black"
      } transition-colors`}
    >
      <Icon color={isActive ? "#5DB53E" : "#8C8C8C"} height={32} width={32}  className = "mx-2"/>
      <div className="ml-4 text-2xl">{title}</div>
    </button>
  );
}
