"use client";

import {ActionButton}  from "@/components/buttons/ActionButton";
import {ProfileButton} from "@/components/buttons/ProfileButton";
import { Settings,Planet } from 'iconoir-react';
import Image from 'next/image';

export function LeftSideBar() {
  return (
    <div className="bg-zinc-100 h-screen w-1/5 pl-5 pt-5"
    style={{
      backgroundColor:"#FAFAFA",
    }}>
      <div>
        <div className="m-2">
          <Image
              src="/icons/club-icon.svg"
              alt="Example Image"
              width={30}
              height={30}
          />
        </div>
        <ProfileButton title="くまさん" path="/" />
        <ActionButton title="みんな"path="/" icon={Planet}/>
        <ActionButton title="設定" path="/settings" icon={Settings}/>
      </div>
    </div>
  );
}