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

  const imageNumber = path.split('/').pop(); // pathの末尾の番号を取得
  const imageUrl = `/images/profile_icon/${imageNumber || 'panda'}.png`; // プレースホルダー画像も設定
  return (
    <button
    onClick={handleClick}
    className={`flex justify-start items-center m-3 mb-1 text-black font-bold rounded-full w-fit`}
  >
    <Image className='rounded-full' src={imageUrl} alt="profile" height={40} width={40} />
    <div className="ml-3 text-xl">{title}</div>
  </button>
  );
}
