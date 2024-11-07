"use client";

import React, { useState } from 'react';
import { AccountModal } from '@/components/modals/AccountModal';

const ExamplePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true); // モーダルを初期表示

  const closeModal = () => setIsModalOpen(false);

  const handleButtonClick = () => {
    console.log("Button clicked!");
    closeModal();
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* 背景コンテンツ */}
      <h1 className="text-3xl font-bold">Example Page Content</h1>
      <p className="text-lg mt-4">This is the main content of the page.</p>
      
      {/* モーダル */}
      {isModalOpen && (
        <AccountModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default ExamplePage;