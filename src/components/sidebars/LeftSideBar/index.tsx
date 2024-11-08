"use client";

import React from "react";
import { Planet, Edit, LogIn } from 'iconoir-react';
import Image from 'next/image';

// components
import {ProfileButton} from '@/components/buttons/ProfileButton';
import { ActionButton } from "@/components/buttons/ActionButton";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";

interface LeftSideBarProps {
  isLogin: boolean; 
  onMemoModal: () => void;
  onOpenModal: () => void;
}

export function LeftSideBar({ isLogin, onMemoModal, onOpenModal }: LeftSideBarProps) {
  const buttonTitle = isLogin ? "メモする" : "ログイン";
  const buttonIcon = isLogin ? Edit : LogIn;
  const buttonAction = isLogin ? onMemoModal : onOpenModal;

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
        <PrimaryButton title={buttonTitle} icon={buttonIcon} onClick={buttonAction} hideTextOnSmallScreen={true}/>
      </div>
    </div>
    
  );
}