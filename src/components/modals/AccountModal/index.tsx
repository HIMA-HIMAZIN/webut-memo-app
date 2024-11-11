"use client";

import React, { useState ,useRef, useEffect, useCallback } from "react";
import { useRouter } from 'next/navigation';
import { Xmark } from 'iconoir-react';
import Script from 'next/script';
import supabase from "@/utils/supabase/Client";

const clientId = process.env.NEXT_PUBLIC_Google_Client_ID!;

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

interface GoogleSignInResponse {
  credential: string;
}

interface Google {
  accounts: {
    id: {
      initialize: (options: { client_id: string; callback: (response: GoogleSignInResponse) => void }) => void;
      renderButton: (parent: HTMLElement, options: object) => void;
    };
  };
}

declare global {
  interface Window {
    google?: Google;
    handleSignInWithGoogle?: (response: GoogleSignInResponse) => void;
  }
}

export function AccountModal({ isOpen, onClose, onLogin }: AccountModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false); // クライアントサイド確認用
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // クライアントサイドにセット
  }, []);

  const handleSignInWithGoogle = useCallback(
    async (response: GoogleSignInResponse) => {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
      });

      if (error) {
        console.error('Google Sign-In error:', error.message);
        return;
      }

      if (data && data.user) {
        const user = data.user;

        // 現在の時刻を取得して、新規ユーザーかを判定
        const userCreatedTime = new Date(user.created_at).getTime();
        const now = Date.now();
        const timeDifference = now - userCreatedTime;
        
        // もしユーザーが1分以内に作成された場合、新規ユーザーとみなす
        const isNewUser = timeDifference < 60000;

        if (isNewUser) {
          router.push('/signup/user-name'); // ユーザー名作成ページにリダイレクト
        } else {
          // 既存ユーザーの場合、通常のログイン処理
          onLogin();
          onClose(); 
        }
      }
    },
    [onLogin, onClose, router]
  );

  useEffect(() => {
    if (isOpen && isClient) { // クライアントサイドでのみスクリプトをロード
      window.handleSignInWithGoogle = handleSignInWithGoogle;

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google) {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: window.handleSignInWithGoogle!,
          });
          window.google.accounts.id.renderButton(
            document.getElementById('signInButton')!,
            { theme: 'outline', size: 'large', shape: 'pill' }
          );
        }
      };
      document.head.appendChild(script);

      const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          onClose();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
        if (script) {
          script.remove();
        }
        delete window.handleSignInWithGoogle;
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, handleSignInWithGoogle, onClose, isClient]);

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Script src="https://accounts.google.com/gsi/client" async defer></Script>
      <button
        onClick={onClose}
        className="absolute top-7 right-7 text-white text-2xl font-bold z-50"
      >
        <Xmark height={40} width={40} strokeWidth={2} />
      </button>

      <div
        ref={modalRef}
        className="bg-white p-8 rounded-3xl shadow-lg w-4/5 max-w-md h-auto flex flex-col items-center"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">はじめる</h2>
          <p className="text-gray-600 mt-4">
            あなたの独り言
          </p>
        </div>

        <div className="scale-150 mb-4">
          <div
            id="g_id_onload"
            data-client_id={clientId}
            data-context="signin"
            data-ux_mode="popup"
            data-callback="handleSignInWithGoogle"
            data-auto_prompt="false"
          ></div>
          <div
            id="signInButton"
            className="g_id_signin"
            data-type="standard"
            data-shape="pill"
            data-theme="outline"
            data-text="signin_with"
            data-size="large"
            data-logo_alignment="left"
          ></div>
        </div>
      </div>
    </div>
  );
}