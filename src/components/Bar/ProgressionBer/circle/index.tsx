"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const ProgressionCircle = () => {
  const pathname = usePathname();

  const [isTrueColor1, setIsTrueColor1] = useState(false);

  useEffect(() => {
    setIsTrueColor1(pathname === '/cl_username');
  }, [pathname]);

  const currentColor1 = isTrueColor1 ? '#5DB53E' : '#E7E7E7';
  const currentColor2 = '#E7E7E7';
  const currentColor3 = '#E7E7E7';

  return (
    <div className="flex flex-col items-center space-y-4 w-1/3">
      {/* ラベル（上部） */}
      <div className="flex items-center justify-between w-full max-w-md">
        <div className="flex flex-col items-center">
          <h3 className="text-center">ユーザー名の作成</h3>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-center">アイコンの作成</h3>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-center">名前の作成</h3>
        </div>
      </div>

      {/* 円と横棒（下部） */}
      <div className="flex items-center justify-between w-full max-w-md">
        {/* ユーザー名の作成（円） */}
        <div
          className="w-12 h-12 rounded-full transition-colors duration-500"
          style={{ backgroundColor: currentColor1 }}
        ></div>

        {/* 横棒 */}
        <div className="w-16 h-1 mx-2 rounded-full bg-[#9D9D9D]"></div>

        {/* アイコンの作成（円） */}
        <div
          className="w-12 h-12 rounded-full transition-colors duration-500"
          style={{ backgroundColor: currentColor2 }}
        ></div>

        {/* 横棒 */}
        <div className="w-16 h-1 mx-2 rounded-full bg-[#9D9D9D]"></div>

        {/* 名前の作成（円） */}
        <div
          className="w-12 h-12 rounded-full transition-colors duration-500"
          style={{ backgroundColor: currentColor3 }}
        ></div>
      </div>
    </div>
  );
};
