"use client";

import React, { useState, useEffect } from 'react';
import { MemoLogType } from '@/types';
import { LeftSideBar } from '../components/sidebars/LeftSideBar';
import { PostCard } from '@/components/cards/PostingCard';
import ReloadButton from '../components/buttons/ReloadButton';
import { MemoModal } from '@/components/modals/MemoModal';
import { AccountModal } from '@/components/modals/AccountModal';
import { formatDistanceToNow } from 'date-fns';
import { fetchMemos } from '@/utils/public-all/api';

export default function Home() {
  const [memos, setMemos] = useState<MemoLogType[]>([]);
  const [isMemoModalOpen, setMemoModalOpen] = useState(false);
  const [isAccountModalOpen, setAccountModalOpen] = useState(false);

  const isLogin = true; 
  
  useEffect(() => {
    const getMemos = async () => {
      const memosData = await fetchMemos();
      const sortedMemos = memosData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setMemos(sortedMemos);
    };
    getMemos();
  }, []);

  // 各モーダルの開閉関数
  const openMemoModal = () => setMemoModalOpen(true);
  const closeMemoModal = () => setMemoModalOpen(false);

  const openAccountModal = () => setAccountModalOpen(true);
  const closeAccountModal = () => setAccountModalOpen(false);

  const handleAccountModalButtonClick = () => {
    console.log("Account Modal Button clicked!");
    closeAccountModal(); // 必要に応じてモーダルを閉じる
  };

  return (
    
    <div className="flex justify-center min-h-screen bg-contentbg">
      <div className="flex w-full max-w-7xl">
        
        <div className="hidden md:block w-1/4 bg-contentbg p-4">
          {/* 各モーダルの開く関数をそれぞれ渡す */}
          <LeftSideBar onOpenModal={openAccountModal} onMemoModal={openMemoModal}  isLogin={isLogin}  />
        </div>
        
        <div className="w-full md:w-1/2 bg-white">
          <ReloadButton />
          <div className="overflow-y-auto max-h-[90vh]">
            {memos.map((memo: MemoLogType) => (
              <PostCard
                key={memo.id}
                title="パンダ"
                content={memo.content}
                path="panda"
                timeAgo={formatDistanceToNow(new Date(memo.createdAt), { addSuffix: true })}
              />
            ))}
          </div>
        </div>
        
        <div className="hidden md:block w-1/4 bg-contentbg p-4">
          右サイド
        </div>
      </div>

      {/* 各モーダルを個別に表示 */}
      <MemoModal isOpen={isMemoModalOpen} onClose={closeMemoModal} />
      <AccountModal 
        isOpen={isAccountModalOpen} 
        onClose={closeAccountModal} 
      />
    </div>
  );
}