"use client";

import {ActionButton}  from "@/components/buttons/ActionButton";

export function LeftSideBar() {
  return (
    <div className="bg-zinc-100 h-screen w-1/6"
    style={{
      backgroundColor:"#FAFAFA",
      }}>
      
      <div>
        <ActionButton title="マイページ"path="/" />
        <ActionButton title="設定" path="/settings" />
      </div>
    </div>
  );
}