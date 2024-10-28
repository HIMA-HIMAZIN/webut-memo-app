"use client";

import { useRouter } from 'next/navigation';
import React from 'react';
import Image from 'next/image';

interface ProfileButtonProps {
  title: string;
  path: string;              
}

export function ProfileButton({
  title,
  path,
}: ProfileButtonProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(path);
  };

  return (
    <button
    onClick={handleClick}
    className={`flex justify-start items-center p-2 my-5 text-black font-bold rounded-full w-11/12`}
  >
    <Image src="/icons/bear.svg" alt="profile" height={42} width={42} />
    <div className="ml-3 text-2xl">{title}</div>
  </button>
  );
}
