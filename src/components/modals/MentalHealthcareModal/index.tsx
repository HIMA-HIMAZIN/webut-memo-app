"use client";

import React, { useEffect, useRef } from "react";
import { Xmark } from "iconoir-react";
import Image from 'next/image';

interface MentalHealthcareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MentalHealthcareModal({ isOpen, onClose }: MentalHealthcareModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <button
        ref={closeButtonRef}
        onClick={onClose}
        className="absolute top-7 right-7 text-white text-2xl font-bold z-50"
      >
        <Xmark height={40} width={40} strokeWidth={2} />
      </button>
      <div
        ref={modalRef}
        className="p-6 rounded-3xl shadow-2xl w-1/2 max-w-screen-md max-h-screen-md h-4/6 flex flex-col relative"
        style={{ backgroundColor: "#C0DDB6", border: "2px solid #5DB53E" }}
      >
        <div className="relative">
          <Image
            src="/icons/club-icon.svg"
            alt="Example Image"
            width={40}
            height={40}
            className="absolute top-4 left-4 md:block"
            style={{
              position: "absolute",
            }}
          />
          <div className="flex items-center justify-center m-2">
            <h2 className="text-base lg:text-xl font-bold" style={{ color: "#5F5F5F" }}>
              少し疲れているかもしれませんね
            </h2>
          </div>
          <div className="flex items-center justify-center m-2">
            <p className="text-lg lg:text-3xl font-bold" style={{ color: "#5F5F5F" }}>
              ひと休みしませんか？
            </p>
          </div>
        </div>
        <div className="relative w-full h-full">
          <div className="flex items-center justify-center m-5">
            <div className="transition-transform duration-300 transform hover:scale-110 focus:outline-none">
              <div className="text-base lg:text-xl" style={{color:"#F18E8D"}}>
                話を聞いて欲しい。
              </div>
              <Image
                src="/images/mental_health_icon/talk.svg"
                alt="Example Image"
                width={150}
                height={150}
              />
            </div>
          </div>
          <div className="flex items-center justify-around">
              <div className="transition-transform duration-300 transform hover:scale-110 focus:outline-none">
                <div className="text-base lg:text-xl" style={{color:"#AF9C75"}}>
                  一人にしてほしい。
                </div>
                <Image
                  src="/images/mental_health_icon/one.svg"
                  alt="Example Image"
                  width={150}
                  height={150}
                />
              </div>
              <div className="transition-transform duration-300 transform hover:scale-110 focus:outline-none">
                <div className="text-base lg:text-xl" style={{color:"#5DB53E"}}>
                  気分転換したい。
                </div>
                <Image
                  src="/images/mental_health_icon/flesh.svg"
                  alt="Example Image"
                  width={150}
                  height={150}
                />
              </div>
            </div>
        </div>
        <button
          onClick={onClose}
          className="absolute bottom-6 right-6 text-lg font-bold"
          style={{ color: "#898989" }}
        >
          後でにする
        </button>
      </div>
    </div>

  );
}
