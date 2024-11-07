"use client";

import React, { useEffect, useRef } from "react";
import { Xmark } from 'iconoir-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onButtonClick: () => void;
}

export function AccountModal ({ isOpen, onClose, onButtonClick }: AccountModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

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

  if (!isOpen) return null;

  return (
    <div>
      <script src="https://accounts.google.com/gsi/client" async></script>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <button
          onClick={onClose}
          className="absolute top-7 right-7 text-white text-2xl font-bold z-50"
        >
          <Xmark height={40} width={40} strokeWidth={2} />
        </button>
        <div
          ref={modalRef}
          className="bg-white p-6 rounded-3xl shadow-lg w-4/5 max-w-md h-1/3 flex flex-col items-center justify-center"
        >
          <h2 className="text-xl font-bold mb-4">Confirmation</h2>
        </div>
      </div>
    </div>
  );
}