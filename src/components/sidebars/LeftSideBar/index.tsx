"use client";

import ClubIcon from "@icons/club.svg";
import ActionButton  from "@/components/buttons/ActionButton";

export function LeftSideBar() {
  return (
    <div className="bg-zinc-100 h-screen w-1/6">
      <div className="flex items-start justify-center h-16 border-b border-gray-300">
        <ClubIcon />
      </div>
      <div>
        <ActionButton title="ホーム" iconPath="/icons/home.svg" path="/" />
        <ActionButton title="マイページ" iconPath="/icons/user.svg" path="/mypage" />
        <ActionButton title="設定" iconPath="/icons/settings.svg" path="/settings" />
        
      </div>
    </div>
  );
}