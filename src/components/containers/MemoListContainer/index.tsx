"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { MemoLogType } from '@/types';
import ReloadButton from '@/components/buttons/ReloadButton';
import { PostCard } from '@/components/cards/PostingCard';
import { formatDistanceToNow } from 'date-fns';
import { fetchMemos } from '@/utils/publicMemo/api';
import { ja } from 'date-fns/locale';

export const MemoListContainer = () => {
  const [memos, setMemos] = useState<MemoLogType[]>([]);

  const getMemos = useCallback(async () => {
    const memosData = await fetchMemos();
    const sortedMemos = memosData.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    setMemos(sortedMemos);
  }, []);

  useEffect(() => {
    getMemos();
  }, [getMemos]);

  return (
    <div className="w-full md:w-1/2 md:min-w-[640px] bg-white">
      <ReloadButton onReload={getMemos} />
      <div className="overflow-y-auto max-h-[90vh]">
        {memos.map((memo: MemoLogType) => (
          <PostCard
            key={memo.id}
            title={memo.account.display_name || "No Name"}
            content={memo.content}
            path={memo.account.user_name}
            icon_number={memo.account.profile_picture}
            timeAgo={formatDistanceToNow(new Date(memo.created_at), {
              addSuffix: true,
              locale: ja,
            })}
          />
        ))}
      </div>
    </div>
  );
};
