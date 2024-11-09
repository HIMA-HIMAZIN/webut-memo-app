"use client";

import React, { useState } from "react";
import { Planet, Edit, LogIn, Settings } from 'iconoir-react';
import Image from 'next/image';

// components
import {ProfileButton} from '@/components/buttons/ProfileButton';
import { ActionButton } from "@/components/buttons/ActionButton";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";

import SettingsModal from "@/components/modals/SettingsModal"

interface LeftSideBarProps {
  isLogin: boolean; 
  onMemoModal: () => void;
  onOpenModal: () => void;
}

export function LeftSideBar({ isLogin, onMemoModal, onOpenModal }: LeftSideBarProps) {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const buttonTitle = isLogin ? "メモする" : "ログイン";
  const buttonIcon = isLogin ? Edit : LogIn;
  const buttonAction = isLogin ? onMemoModal : onOpenModal;

  const openSettingsModal = () => setIsSettingsModalOpen(true);
  const closeSettingsModal = () => setIsSettingsModalOpen(false);

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
        <ProfileButton title="HIMAZIN"  path = "kitune" hideTextOnSmallScreen={true}/>
        <ActionButton title="みんな" path="/" icon={Planet} />
        <ActionButton title="設定" path="/setting" icon={Settings} />
        <PrimaryButton title={buttonTitle} icon={buttonIcon} onClick={buttonAction} hideTextOnSmallScreen={true}/>
        <PrimaryButton title="設定" icon={Planet} onClick={openSettingsModal}/>
      </div>
      <SettingsModal isOpen={isSettingsModalOpen} onClose={closeSettingsModal} />
    </div>
    
  );
}