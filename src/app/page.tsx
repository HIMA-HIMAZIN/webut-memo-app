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

export default function Home() {
  const [memos, setMemos] = useState<MemoLogType[]>([]);

  
  useEffect(() => {
    const getMemos = async () => {
      const memosData = await fetchMemos();
      const sortedMemos = memosData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setMemos(sortedMemos);
    };
    getMemos();
  }, []);

  return (
    <div className="flex justify-center min-h-screen bg-contentbg">
      <div className="flex w-full max-w-7xl">
        
        <div className="hidden md:block w-1/4 bg-contentbg p-4">
          <LeftSideBar/>
        </div>
        <div className="md:w-1/2 bg-white md:min-w-[640px]">
          <ReloadButton />
          <div className="overflow-y-auto max-h-[90vh]">
            {memos.map((memo: MemoLogType) => (
              <PostCard
                key={memo.id}
                title="パンダ"
                content={memo.content}
                path="panda"
                timeAgo={formatDistanceToNow(new Date(memo.created_at), { addSuffix: true, locale: ja })}
              />
            ))}
          </div>
        </div>
        <div className="hidden md:block w-1/4 bg-contentbg p-4">
          <RightSideBar/>
        </div>
      </div>
    </div>
  );
}