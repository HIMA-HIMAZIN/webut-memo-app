"use client";

import React from 'react';
import { ReloadWindow } from 'iconoir-react';

const ReloadButton: React.FC = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <button
      onClick={handleReload}
      className="bg-zinc-100 hover:bg-zinc-200 text-white font-bold py-2 px-4 flex items-center justify-center gap-2"
    >
        <ReloadWindow className="text-action"height={18} width={18} strokeWidth={2}/>
        <div className="text-base text-action">リロード</div>
    </button>
  );
};

export default ReloadButton;
