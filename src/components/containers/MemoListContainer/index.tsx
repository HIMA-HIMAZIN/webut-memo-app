"use client";
import React, { useState, useEffect } from "react";
import { MemoLogType } from "@/types";
import ReloadButton from "@/components/buttons/ReloadButton";
import { PostCard } from "@/components/cards/PostingCard";
import { formatDistanceToNow } from "date-fns";
import { fetchMemos } from "@/utils/publicMemo/api";
import { ja } from "date-fns/locale";
import { supabase } from "@/utils/supabaseClient";

export const MemoListContainer = () => {
  const [memos, setMemos] = useState<MemoLogType[]>([]);

  // メモを取得してソート
  const getMemos = async () => {
    const memosData = await fetchMemos();
    const sortedMemos = memosData.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    setMemos(sortedMemos);
  };

  // リアルタイム通知をリッスン
  useEffect(() => {
    const channel = supabase
      .channel("realtime:memos")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "memos" },
        (payload) => {
          console.log("DB変更通知:", payload);
          getMemos(); // データを再取得してリストを更新
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel); // クリーンアップ時にチャンネルを解除
    };
  }, []); // 依存配列を空に設定

  // 初回データ取得
  useEffect(() => {
    getMemos(); // 初回にデータを取得
  }, []); // 依存配列を空に設定

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
