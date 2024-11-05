"use client";

import React, { useState } from "react";
import { Settings,Planet, Edit } from 'iconoir-react';
import Image from 'next/image';

// components
import {ActionButton}  from "@/components/buttons/ActionButton";
import {ProfileButton} from "@/components/buttons/ProfileButton";
import {PrimaryButton} from "@/components/buttons/PrimaryButton";
import { MemoModal } from "@/components/modals/MemoModal";

export function LeftSideBar() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="pl-8 pt-8">
      <div>
        <div className="mb-5">
          <Image
              src="/icons/club-icon.svg"
              alt="Example Image"
              width={30}
              height={30}
          />
        </div>
        {/* <ProfileButton title="くまさん" path="/" /> */}
        <ActionButton title="みんな"path="/" icon={Planet}/>
        {/* <ActionButton title="設定" path="/settings" icon={Settings}/> */}
        <PrimaryButton title="メモする" icon={Edit} onClick={handleButtonClick}/>
        <MemoModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </div>
  );
}