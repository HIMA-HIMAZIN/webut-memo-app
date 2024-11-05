"use client";

import React, { useState } from 'react';
import { LeftSideBar } from '../components/sidebars/LeftSideBar';
import ReloadButton from '../components/buttons/ReloadButton';
import { MemoModal } from '@/components/modals/MemoModal';

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex justify-center min-h-screen bg-contentbg">
      <div className="flex w-full max-w-7xl">
        
        <div className="hidden md:block w-1/4 bg-contentbg p-4">
          <LeftSideBar onOpenModal={handleOpenModal} />
        </div>
        
        <div className="w-full md:w-1/2 bg-white">
          <ReloadButton />
        </div>
        
        <div className="hidden md:block w-1/4 bg-contentbg p-4">
          右サイド
        </div>
      </div>

      {/* モーダルをルート直下に配置し、常に表示できるようにする */}
      <MemoModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}