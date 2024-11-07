"use client";

import React from "react";
import { Planet, Edit } from 'iconoir-react';
import Image from 'next/image';

// components
import {ProfileButton} from '@/components/buttons/ProfileButton';
import { ActionButton } from "@/components/buttons/ActionButton";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";

export function LeftSideBar({ onOpenModal }: { onOpenModal: () => void }) {
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
        <ProfileButton title="HIMAZIN"  path = "kitune"/>
        <ActionButton title="みんな" path="/" icon={Planet} />
        <PrimaryButton title="メモする" icon={Edit} onClick={onOpenModal} />
      </div>
    </div>
  );
}