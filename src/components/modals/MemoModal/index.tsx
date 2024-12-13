"use client";

import React, { useEffect, useRef, useState } from "react";
import { Xmark } from "iconoir-react";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Planet, Edit } from "iconoir-react";
import { postMemo } from "@/utils/IndividualMemo/api";
import { IconText } from "@/components/headers/IconText";
import IosSwitcheButton from "@/components/buttons/IosSwitchButton";
//import { filterProfanity } from "@/filters/profanityFilter";
import supabase from "@/utils/supabase/client";

const MAX_CHAR_LIMIT = 150;
const URL_REGEX = /https?:\/\/[^\s]+/g;

interface MemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MemoModal({ isOpen, onClose }: MemoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const [memo, setMemo] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [displayLength, setDisplayLength] = useState(0);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        closeButtonRef.current &&
        !closeButtonRef.current.contains(event.target as Node) &&
        buttonWrapperRef.current &&
        !buttonWrapperRef.current.contains(event.target as Node)
      ) {
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

  const highlightUrls = (text: string) => {
    return text.replace(URL_REGEX, (url) => `<span style="color: blue;">${url}</span>`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    const lines = input.split("\n");
  
    if (lines.length > 10) {
      setError("メモは10行以内にしてください。");
      return;
    }
  
    setMemo(input);
    setError(null); // Clear error if line count is valid
  
    const displayLen = calculateDisplayLength(input);
    setDisplayLength(displayLen);
    if (displayLen > MAX_CHAR_LIMIT) {
      setError("文字数が150文字を超えています。");
    }
  };

  const handleSwitchChange = () => {
    setIsPublic((prev) => !prev);
  };

  const handleSubmit = async () => {
    // if (filterProfanity(memo)) {
    //   setError("禁止ワードが含まれています。");
    //   return;
    // }
    try {
      const result = await postMemo(memo, isPublic, userId!);
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
        ref={closeButtonRef}
        onClick={onClose}
        className="absolute top-7 right-7 text-white text-2xl font-bold z-50"
      >
        <Xmark height={40} width={40} strokeWidth={2} />
      </button>
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-3xl shadow-lg w-4/5 max-w-screen-md max-h-screen-md h-3/5 flex flex-col"
      >
        <div className="flex items-center justify-between m-2">
          <h2 className="text-xl font-bold">Memo</h2>
          <div className="flex items-center">
            <IconText text="公開する" icon={Planet} />
            <IosSwitcheButton checked={isPublic} onChange={handleSwitchChange} />
          </div>
        </div>
        
        <div className="relative w-full h-full">
          <div
            className="absolute inset-0 p-2 text-2xl whitespace-pre-wrap"
            style={{
              color: "black",
              zIndex: 1,
              fontSize: "24px",
              overflowY: "auto",
              pointerEvents: "none",
            }}
            dangerouslySetInnerHTML={{ __html: highlightUrls(memo) }}
          />
          <textarea
            className="absolute inset-0 w-full h-full p-2 text-2xl resize-none border-none outline-none"
            placeholder="メモを入力..."
            value={memo}
            onChange={handleChange}
            style={{ color: "black", background: "transparent", fontSize: "24px" }}
          ></textarea>
        </div>
        
        <div className="flex justify-end items-center mt-2">
          {error && <p className="text-red-500">{error}</p>}
          <span className={`text-sm pl-5 ${displayLength > MAX_CHAR_LIMIT ? "text-red-500" : "text-gray-600"}`}>
            {displayLength} / {MAX_CHAR_LIMIT}
          </span>
        </div>
      </div>
      <div ref={buttonWrapperRef} className="fixed bottom-20 w-2/12 flex justify-center items-center z-50 xl:w-3/12">
        <PrimaryButton 
          title="メモする" 
          icon={Edit} 
          onClick={handleSubmit} 
          disabled={error !== null || memo.length === 0}
          hideTextOnSmallScreen={false}
        />
      </div>
    </div>
  );
}
