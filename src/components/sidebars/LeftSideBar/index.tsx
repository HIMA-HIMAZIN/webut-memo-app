"use client";

import React, { useState, useEffect } from "react";
import { Planet, Edit, LogIn, Settings } from 'iconoir-react';
import Image from 'next/image';

// components
import {ProfileButton} from '@/components/buttons/ProfileButton';
import { ActionButton } from "@/components/buttons/ActionButton";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";

// modals
import { MemoModal } from '@/components/modals/MemoModal';
import { AccountModal } from '@/components/modals/AccountModal';
import SettingsModal from "@/components/modals/SettingsModal";

// utils
import supabase from "@/utils/supabase/Client";

export function LeftSideBar() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
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


  const buttonTitle = isLogin ? "メモする" : "ログイン";
  const buttonIcon = isLogin ? Edit : LogIn;
  const buttonAction = isLogin ? () => setIsMemoModalOpen(true) : () => setIsAccountModalOpen(true);

  const openSettingsModal = () => setIsSettingsModalOpen(true);
  
  const closeSettingsModal = () => setIsSettingsModalOpen(false);
  const closeMemoModal = () => setIsMemoModalOpen(false);
  const closeAccountModal = () => setIsAccountModalOpen(false);

  return (
    <div className="pt-8">
      <div>
        <div className="mb-5 ml-4">
          <Image
              src="/icons/club-icon.svg"
              alt="Example Image"
              width={30}
              height={30}
          />
        </div>
        {isLogin && (
          <ProfileButton title="HIMAZIN"  path = "kitune" hideTextOnSmallScreen={true}/>
        )}
        <ActionButton title="みんな" path="/" icon={Planet} />
        <PrimaryButton title={buttonTitle} icon={buttonIcon} onClick={buttonAction} hideTextOnSmallScreen={true}/>
        {isLogin && (
          <PrimaryButton title="設定" icon={Settings} onClick={openSettingsModal} hideTextOnSmallScreen={true}/>
        )}
      </div>
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