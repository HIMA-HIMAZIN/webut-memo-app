"use client";

import React, { useRef, useEffect } from "react";
import { Xmark } from 'iconoir-react';
import Script from 'next/script'
import { createClient } from '@supabase/supabase-js';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GoogleSignInResponse {
  credential: string;
}

const clientId = process.env.NEXT_PUBLIC_Google_Client_ID
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);


declare global {
  interface Window {
    handleSignInWithGoogle: (response: GoogleSignInResponse) => void;
  }
}

export function AccountModal ({ isOpen, onClose }: AccountModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  async function handleSignInWithGoogle(response: GoogleSignInResponse) {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: response.credential,
    });

    if (error) {
      console.error('Google Sign-In error:', error.message);
    } else {
      console.log('User signed in:', data);
      onClose(); // サインイン後にモーダルを閉じる
    }
  }

  useEffect(() => {
    if (isOpen) {
      window.handleSignInWithGoogle = handleSignInWithGoogle;
    }

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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Script src="https://accounts.google.com/gsi/client" />
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
        <h2 className="text-xl font-bold mb-4">ログイン</h2>

        <div id="g_id_onload"
            data-client_id={clientId}
            data-context="signin"
            data-ux_mode="popup"
            data-callback="handleSignInWithGoogle"
            data-auto_prompt="false">
        </div>

        <div className="g_id_signin"
            data-type="standard"
            data-shape="pill"
            data-theme="outline"
            data-text="signin_with"
            data-size="x-large"
            data-logo_alignment="left">
        </div>
      </div>
    </div>
  );
}