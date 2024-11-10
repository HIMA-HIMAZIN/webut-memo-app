"use client";


import Link from "next/link";
import React from 'react';
import Image from 'next/image';
import {getImageSrcById} from '@/utils/iconImage/getImageSrcById';

interface ProfileButtonProps {
  title: string;
  path: string;             
  hideTextOnSmallScreen?: boolean; 
  icon_number: number;
}

export function ProfileButton({
  title,
  path,
  hideTextOnSmallScreen = false,
  icon_number
}: ProfileButtonProps) {
  const icon_url = getImageSrcById(icon_number);
  return (
    <Link href={`/${path}`}>
      <button
      className={`flex justify-start hover:bg-gray-100 items-center m-3 mb-1 text-black font-bold rounded-full w-fit`}
    >
      <Image className='rounded-full' src={icon_url} alt="profile" height={40} width={40} />
      <div className={`ml-2 text-2xl ${hideTextOnSmallScreen ? 'hidden lg:block' : 'block'} whitespace-nowrap mx-2`}>
        {title}
      </div>
    </button>
  </Link>
  );
}
