"use client";

import React, { useState, useEffect } from 'react';
import { MemoLogType } from '@/types';
import { LeftSideBar } from '../components/sidebars/LeftSideBar';
import { PostCard } from '@/components/cards/PostingCard';
import ReloadButton from '../components/buttons/ReloadButton';
import { MemoModal } from '@/components/modals/MemoModal';
import { formatDistanceToNow } from 'date-fns';
import { fetchMemos } from '@/utils/api';

export default function Home() {
  const [memos, setMemos] = useState<MemoLogType[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const getMemos = async () => {
      const memosData = await fetchMemos();
      const sortedMemos = memosData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setMemos(sortedMemos);
    };
    getMemos();
  }, []);

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

      {/* モーダルをルート直下に配置し、常に表示できるようにする */}
      <MemoModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
