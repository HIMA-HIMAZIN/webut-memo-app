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
        <ReloadWindow color="blue" height={18} width={18}/>
        <div className="text-base text-blue-600">リロード</div>
    </button>
  );
};

export default ReloadButton;
