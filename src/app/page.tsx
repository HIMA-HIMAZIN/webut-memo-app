"use client";

import React, { useState, useEffect } from 'react';
import { MemoLogType } from '@/types';
import { LeftSideBar } from '../components/sidebars/LeftSideBar';
import { PostCard } from '@/components/cards/PostingCard';
import ReloadButton from '../components/buttons/ReloadButton';
import { MemoModal } from '@/components/modals/MemoModal';
import { AccountModal } from '@/components/modals/AccountModal';
import { formatDistanceToNow } from 'date-fns';
import { fetchMemos } from '@/utils/whole/api';
import { ja } from 'date-fns/locale';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [memos, setMemos] = useState<MemoLogType[]>([]);
  const [isMemoModalOpen, setMemoModalOpen] = useState(false);
  const [isAccountModalOpen, setAccountModalOpen] = useState(false);

  const [isLogin, setIsLogin] = useState(false);

  
  useEffect(() => {
    const getMemos = async () => {
      const memosData = await fetchMemos();
      const sortedMemos = memosData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setMemos(sortedMemos);
    };
    getMemos();

    // セッションをチェックしてログイン状態を設定
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Failed to get session:', error.message);
      } else if (session) {
        setIsLogin(true);
      }
    };
    checkSession();

    // 認証状態の変化を監視
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === 'SIGNED_IN') {
          setIsLogin(true);
        } else if (event === 'SIGNED_OUT') {
          setIsLogin(false);
        }
      }
    );

    // クリーンアップ関数
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // 各モーダルの開閉関数
  const openMemoModal = () => setMemoModalOpen(true);
  const closeMemoModal = () => setMemoModalOpen(false);

  const openAccountModal = () => setAccountModalOpen(true);
  const closeAccountModal = () => setAccountModalOpen(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
    } else {
      setIsLogin(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-contentbg">
      <div className="flex w-full max-w-7xl">
        
        <div className="hidden md:block w-1/4 bg-contentbg p-4">
          <LeftSideBar onOpenModal={openAccountModal} onMemoModal={openMemoModal}  isLogin={isLogin} />
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
        
        <div className="hidden md:block flex-grow bg-contentbg p-4">
          右サイド
        </div>
      </div>

      {/* 各モーダルを個別に表示 */}
      <MemoModal isOpen={isMemoModalOpen} onClose={closeMemoModal} />
      <AccountModal 
        isOpen={isAccountModalOpen} 
        onClose={closeAccountModal}
        onLogin={() => setIsLogin(true)} 
      />
    </div>
  );
}