"use client";

import React from 'react';
import { ReloadWindow } from 'iconoir-react';

type ReloadButtonProps = {
  onReload: () => void; // Callback to trigger data reload
};

const ReloadButton: React.FC<ReloadButtonProps> = ({ onReload }) => {
  return (
    <button
      onClick={onReload}
      className="bg-contentbg hover:bg-zinc-200 w-full py-2 flex items-center pt-5 pb-5 justify-center"
    >
      <ReloadWindow
        className="text-action"
        height={18}
        width={18}
        strokeWidth={2}
      />
      <div className="text-base font-normal text-action">メモを更新</div>
    </button>
  );
};

export default ReloadButton;
