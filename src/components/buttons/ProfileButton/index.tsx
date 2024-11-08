"use client";


import Link from "next/link";
import React from 'react';
import Image from 'next/image';

interface ProfileButtonProps {
  title: string;
  path: string;             
  hideTextOnSmallScreen?: boolean; 
}

export function ProfileButton({
  title,
  path,
  hideTextOnSmallScreen = false,
}: ProfileButtonProps) {
  const imageNumber = path.split('/').pop(); // pathの末尾の番号を取得
  const imageUrl = `/images/profile_icon/${imageNumber || 'panda'}.png`; // プレースホルダー画像も設定
  return (
    <Link href={`/${path}`}>
      <button
      className={`flex justify-start hover:bg-gray-100 items-center m-3 mb-1 text-black font-bold rounded-full w-fit`}
    >
      <Image className='rounded-full' src={imageUrl} alt="profile" height={40} width={40} />
      <div className={`ml-2 text-2xl ${hideTextOnSmallScreen ? 'hidden lg:block' : 'block'} whitespace-nowrap mx-2`}>
        {title}
      </div>
    </button>
  </Link>
  );
}
