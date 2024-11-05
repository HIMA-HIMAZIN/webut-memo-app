import React, { useEffect, useRef, useState } from "react";
import * as z from "zod";
import { Xmark } from 'iconoir-react';
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Edit } from 'iconoir-react';

const MAX_CHAR_LIMIT = 150;
const URL_CHAR_LIMIT = 80;

const memoSchema = z.string().max(MAX_CHAR_LIMIT, "文字数が150文字を超えています。");
const urlSchema = z.string().url().max(URL_CHAR_LIMIT, "URLは80文字以下にしてください");

interface MemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MemoModal({ isOpen, onClose }: MemoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [memo, setMemo] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setMemo(input);

    // 入力全体の文字数をバリデーション
    const memoResult = memoSchema.safeParse(input);
    if (!memoResult.success) {
      setError(memoResult.error.errors[0].message);
      return;
    }

    // URLの検出と50文字以下のバリデーション
    const urlPattern = /https?:\/\/[^\s]+/g;
    const foundUrls = input.match(urlPattern);
    if (foundUrls) {
      for (const url of foundUrls) {
        const urlResult = urlSchema.safeParse(url);
        if (!urlResult.success) {
          setError(urlResult.error.errors[0].message);
          return;
        }
      }
    }

    // すべてのバリデーションが成功したらエラーをクリア
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <button
        onClick={onClose}
        className="absolute top-7 right-7 text-white text-2xl font-bold z-50"
      >
        <Xmark height={40} width={40} strokeWidth={2} />
      </button>
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-3xl shadow-lg w-full sm:w-5/6 md:max-w-md lg:max-w-lg h-3/5 flex flex-col"
      >
        <h2 className="text-xl font-bold mb-4">Memo</h2>
        <textarea
          className="w-full h-full p-2 resize-none overflow-y-auto text-2xl border-none outline-none"
          placeholder="メモを入力..."
          value={memo}
          onChange={handleChange}
          style={{ fontSize: "24px" }}
        ></textarea>
        <div className="flex justify-end items-center mt-2">
          {error && <p className="text-red-500">{error}</p>}
          <span className={`text-sm pl-5 ${memo.length > MAX_CHAR_LIMIT ? "text-red-500" : "text-gray-600"}`}>
            {memo.length} / {MAX_CHAR_LIMIT}
          </span>
        </div>
      </div>
      <div className="fixed bottom-10 w-2/12 flex justify-center items-center xl:w-3/12">
        <PrimaryButton 
          title="メモする" 
          icon={Edit} 
          onClick={() => {}} 
          disabled={error !== null || memo.length === 0} 
        />
      </div>
    </div>
  );
}
