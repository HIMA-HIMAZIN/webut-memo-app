import React, { useEffect, useRef, useState } from "react";
import * as z from "zod";

const MAX_CHAR_LIMIT = 30;
const memoSchema = z.string().max(MAX_CHAR_LIMIT, "文字数が300文字を超えています。");

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

    // Validate the input length with Zod
    const result = memoSchema.safeParse(input);
    if (!result.success) {
      setError(result.error.errors[0].message);
    } else {
      setError(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-3xl shadow-lg max-w-screen-md sm:w-2/3 h-3/5 flex flex-col"
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
    </div>
  );
}
