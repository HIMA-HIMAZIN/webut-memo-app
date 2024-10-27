"use client";  // クライアントコンポーネントとしてマーク

import { useRouter, usePathname } from 'next/navigation';  // 'next/router' を 'next/navigation' に変更
import React from 'react';

interface ActionButtonProps {
  title: string;
  path: string;              // 遷移先のパス
  className?: string;        // スタイルを追加するためのクラス
}

export function ActionButton({
  title,
  path,
  className = "",
}: ActionButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === path;  // 現在のパスをチェック

  const handleClick = () => {
    router.push(path);  // 遷移先に移動
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center p-3 m-10 text-black rounded-full  ${className}`}
      style={{
        backgroundColor: isActive ? "#f0f0f0" : "#FAFAFA",
        color: isActive ? "#5DB53E" : "#8C8C8C"
      }}
    >
      <div className="ml-2">{title}</div>
    </button>
  );
}
