import { useRouter } from 'next/router';
import Image from 'next/image';
import React from 'react';

interface ActionButtonProps {
  title: string;
  iconPath: string;         // SVGのパス
  path: string;              // 遷移先のパス
  className?: string;        // スタイルを追加するためのクラス
  backgroundColor?: string;  // ボタン背景色
  activeColor?: string;      // アクティブ時の背景色
}

export function ActionButton({
  title,
  iconPath,
  path,
  className = "",
  backgroundColor = "#ffffff",
  activeColor = "#f0f0f0",
}: ActionButtonProps) {
  const router = useRouter();
  const isActive = router.pathname === path;

  const handleClick = () => {
    router.push(path);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center p-3 border border-gray-300 rounded ${className}`}
      style={{
        backgroundColor: isActive ? activeColor : backgroundColor,
      }}
    >
      <Image src={iconPath} alt={`${title} icon`} width={24} height={24} />
      <span className="ml-2">{title}</span>
    </button>
  );
}
