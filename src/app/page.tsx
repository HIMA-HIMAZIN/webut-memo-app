"use client";

import React, { useState, useEffect } from 'react';
import supabase from "@/utils/supabase/client"; // Supabase クライアントのインポート
import { LeftSideBar } from '../components/sidebars/LeftSideBar';
import { RightSideBar } from '../components/sidebars/RightSideBar';
import { BottomBar } from '@/components/bar/BottomBar';
import SettingsModal from "@/components/modals/SettingsModal";
import { MemoModal } from "@/components/modals/MemoModal";
import { AccountModal } from "@/components/modals/AccountModal";
import { MemoListContainer } from "@/components/containers/MemoListContainer";

export default function Home() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Failed to get session:', error.message);
      } else if (session) {
        setIsLogin(true);
      }

      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event) => {
          if (event === 'SIGNED_IN') {
            setIsLogin(true);
          } else if (event === 'SIGNED_OUT') {
            setIsLogin(false);
          }
        }
      );

      return () => authListener.subscription.unsubscribe();
    };

    checkSession();
  }, []);

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
        />
      </div>

      {/* モーダルコンポーネントの配置 */}
      <SettingsModal isOpen={isSettingsModalOpen} onClose={closeSettingsModal} />
      <MemoModal isOpen={isMemoModalOpen} onClose={closeMemoModal} />
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={closeAccountModal}
        onLogin={() => setIsLogin(true)}
      />
    </div>
  );
}
