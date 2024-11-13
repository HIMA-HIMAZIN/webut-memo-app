"use client";

import React, { useState, useEffect } from 'react';
import { MemoLogType } from '@/types';
import { LeftSideBar } from '../components/sidebars/LeftSideBar';
import { RightSideBar } from '../components/sidebars/RightSideBar';
import { PostCard } from '@/components/cards/PostingCard';
import ReloadButton from '../components/buttons/ReloadButton';
import { formatDistanceToNow } from 'date-fns';
import { fetchMemos } from '@/utils/whole/api';
import { ja } from 'date-fns/locale';
import { BottomBar } from '@/components/sidebars/BottomBar';
import SettingsModal from "@/components/modals/SettingsModal";
import { MemoModal } from "@/components/modals/MemoModal";
import { AccountModal } from "@/components/modals/AccountModal";

export default function Home() {
  const [memos, setMemos] = useState<MemoLogType[]>([]);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const getMemos = async () => {
      const memosData = await fetchMemos();
      const sortedMemos = memosData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setMemos(sortedMemos);
    };
    getMemos();
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

        {/* Main content area */}
        <div className="w-full md:w-1/2 md:min-w-[640px] bg-white">
          <ReloadButton />
          <div className="overflow-y-auto max-h-[90vh]">
            {memos.map((memo: MemoLogType) => (
              <PostCard
                key={memo.id}
                title={memo.account.display_name || "No Name"}
                content={memo.content}
                path={memo.account.user_name}
                icon_number={memo.account.profile_picture}
                timeAgo={formatDistanceToNow(new Date(memo.created_at), { addSuffix: true, locale: ja })}
              />
            ))}
          </div>
        </div>

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
      <MemoModal isOpen={isMemoModalOpen} onClose={closeMemoModal} />
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={closeAccountModal}
        onLogin={() => setIsLogin(true)}
      />
    </div>
  );
}
