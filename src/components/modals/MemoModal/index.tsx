"use client";

import React, { useEffect, useRef, useState } from "react";
import { Xmark } from 'iconoir-react';
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Planet, Edit } from 'iconoir-react';
import { postMemo } from '@/utils/api';
import { IconText } from '@/components/headers/IconText';
import  IosSwitcheButton  from '@/components/buttons/IosSwitchButton';

const MAX_CHAR_LIMIT = 150;

interface MemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MemoModal({ isOpen, onClose }: MemoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [memo, setMemo] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [displayLength, setDisplayLength] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
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

  const calculateDisplayLength = (text: string) => {
    const urlPattern = /https?:\/\/[^\s]+/g;
    let totalLength = 0;

    const parts = text.split(urlPattern);
    const urls = text.match(urlPattern) || [];

    totalLength += parts.reduce((sum, part) => sum + part.length, 0);
    totalLength += urls.reduce((sum, url) => sum + (url.length > 20 ? 20 : url.length), 0);

    return totalLength;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setMemo(input);

    const displayLen = calculateDisplayLength(input);
    setDisplayLength(displayLen);
    setError(displayLen > MAX_CHAR_LIMIT ? "文字数が150文字を超えています。" : null);
  };

  const handleSwitchChange = () => {
    setIsPublic((prev) => !prev); // スイッチの切り替えでisPublicを反転
  };

  const handleSubmit = async () => {
    try {
      const result = await postMemo(memo, isPublic);
      if (result) {
        window.location.reload();
        setMemo("");
        onClose();
      } else {
        setError("メモの送信に失敗しました。");
      }
    } catch (error) {
      console.error(error);
      setError("メモの送信中にエラーが発生しました。");
    }
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
        className="bg-white p-6 rounded-3xl shadow-lg w-4/5 max-w-screen-md max-h-screen-md  h-3/5 flex flex-col"
      >
        <div className="flex items-center justify-around m-2">
          <h2 className="text-xl font-bold">Memo</h2>
          <div className="flex items-center justify-center">
            <IconText text="公開する" icon={Planet} />
            <IosSwitcheButton checked={isPublic} onChange={handleSwitchChange} />
          </div>
        </div>
        <textarea
          className="w-full h-full p-2 resize-none overflow-y-auto text-2xl border-none outline-none"
          placeholder="メモを入力..."
          value={memo}
          onChange={handleChange}
          style={{ fontSize: "24px" }}
        ></textarea>
        <div className="flex justify-end items-center mt-2">
          {error && <p className="text-red-500">{error}</p>}
          <span className={`text-sm pl-5 ${displayLength > MAX_CHAR_LIMIT ? "text-red-500" : "text-gray-600"}`}>
            {displayLength} / {MAX_CHAR_LIMIT}
          </span>
        </div>
      </div>
      <div className="fixed bottom-10 w-2/12 flex justify-center items-center z-50 xl:w-3/12">
        <PrimaryButton 
          title="メモする" 
          icon={Edit} 
          onClick={handleSubmit} 
          disabled={error !== null || memo.length === 0} 
        />
      </div>
    </div>
  );
}
