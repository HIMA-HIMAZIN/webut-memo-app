"use client";

import React, { useState } from 'react';
import { LeftSideBar } from '../components/sidebars/LeftSideBar';
import { RightSideBar } from '../components/sidebars/RightSideBar';
import { BottomBar } from '@/components/sidebars/BottomBar';
import SettingsModal from "@/components/modals/SettingsModal";
import { MentalHealthcareModal } from "@/components/modals/MentalHealthcareModal";
import { AccountModal } from "@/components/modals/AccountModal";
import { MemoListContainer } from "@/components/containers/MemoListContainer";

export default function Home() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  // ボタンのアクション関数
  const openSettingsModal = () => setIsSettingsModalOpen(true);
  const closeSettingsModal = () => setIsSettingsModalOpen(false);
  const closeMemoModal = () => setIsMemoModalOpen(false);
  const closeAccountModal = () => setIsAccountModalOpen(false);

  // ボタンのアクション定義
  const onPlanetClick = () => { /* "みんな" ボタンのアクション */ };
  const buttonAction = isLogin ? () => setIsMemoModalOpen(true) : () => setIsAccountModalOpen(true);

  return (
    <div className="flex justify-center min-h-screen bg-contentbg">
      <div className="flex w-full max-w-7xl">
        
        {/* Left Sidebar for desktop */}
        <div className="hidden md:block w-1/4 bg-contentbg p-4">
          <LeftSideBar />
        </div>
        <MemoListContainer/>
        {/* Right Sidebar for desktop */}
        <div className="hidden md:block w-1/4 bg-contentbg p-4">
          <RightSideBar />
        </div>

      </div>

      {/* Bottom Navigation for mobile */}
      <div className="md:hidden fixed bottom-0 w-full">
        <BottomBar
          isLogin={isLogin}                // isLogin の状態
          onPlanetClick={onPlanetClick}     // みんなボタンのアクション
          onProfileClick={buttonAction}     // プロフィール（メモ/ログイン）ボタンのアクション
          onSettingsClick={openSettingsModal} // 設定ボタンのアクション
          onMemoOrLoginClick={buttonAction}
        />
      </div>

      {/* モーダルコンポーネントの配置 */}
      <SettingsModal isOpen={isSettingsModalOpen} onClose={closeSettingsModal} />
      <MentalHealthcareModal isOpen={isMemoModalOpen} onClose={closeMemoModal} />
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={closeAccountModal}
        onLogin={() => setIsLogin(true)}
      />
    </div>
  );
}
