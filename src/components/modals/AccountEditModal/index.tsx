import React, { useEffect, useRef, useState } from 'react';
import { WarningTriangleSolid } from 'iconoir-react';
import Image from 'next/image';
import { Box, TextField } from '@mui/material';
import { getImageSrcById } from '@/utils/iconImage/getImageSrcById';
import supabase from '@/utils/supabase/client';
import {fetchUserName} from "@/utils/userData/api";
import {updateUser} from "@/utils/userData/api";

interface AccountEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountEditModal: React.FC<AccountEditModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // State 定義
  const [UserId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [selectedImageId, setSelectedImageId] = useState<number>(1);
  const [userNameError, setUserNameError] = useState('');
  const [displayNameError, setDisplayNameError] = useState('');

  // ログインしているユーザー情報を取得
  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error('ユーザーの取得に失敗しました:', error);
        return;
      }

      if (user) {
        const usersData = await fetchUserName(user.id);
        if (usersData) {
          setUserId(user.id); // ユーザーIDを設定
          setUserName(usersData.user_name); // ログイン名を設定
          setDisplayName(usersData.display_name || ''); // 表示名を設定
          setSelectedImageId(usersData.profile_picture || 1); // プロフィール画像を設定
          setBio(usersData.bio || ''); // バイオを設定
        }
      }
    };

    if (isOpen) {
      fetchUserData();
    }
  }, [isOpen]);

  // バリデーション
  const validateUserName = (value: string) => {
    if (value.length < 1 || value.length > 20) {
      setUserNameError('1〜20文字のローマ字と数字のみで入力してください。');
    } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
      setUserNameError('ローマ字と数字のみで入力してください。');
    } else {
      setUserNameError('');
    }
    setUserName(value);
  };

  const validateDisplayName = (value: string) => {
    if (value.length < 1 || value.length > 20) {
      setDisplayNameError('1〜20文字で入力してください。');
    } else {
      setDisplayNameError('');
    }
    setDisplayName(value);
  };

  const handleSubmit = () => {
    updateUser(UserId,userName, selectedImageId , displayName, bio);
    onClose();
    window.location.reload();
  };

  // モーダル外クリックとEscキーで閉じる処理
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="relative bg-white rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow-lg max-w-screen-xl mx-4 p-6"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="閉じる"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <p className="py-2 text-2xl font-semibold mt-4 mb-4">アカウント編集</p>

        {/* ユーザー名 */}
        <Box sx={{ mt: 4 }}>
          <TextField
            fullWidth
            label="ユーザー名"
            value={userName}
            onChange={(e) => validateUserName(e.target.value)}
            error={!!userNameError}
            helperText={userNameError || '1〜20文字のローマ字と数字のみで入力してください。'}
          />
        </Box>

        {/* 表示名 */}
        <Box sx={{ mt: 4 }}>
          <TextField
            fullWidth
            label="表示名"
            value={displayName}
            onChange={(e) => validateDisplayName(e.target.value)}
            error={!!displayNameError}
            helperText={displayNameError || '1〜20文字で入力してください。'}
          />
        </Box>

        {/* アイコン選択 */}
        <div className="mt-6">
          <p className="mb-2">イメージアイコン</p>
          <div className="flex space-x-4">
            {[1, 2, 3, 4, 5, 6].map((id) => {
              const src = getImageSrcById(id);
              return (
                <Image
                  key={id}
                  src={src}
                  alt={`Icon ${id}`}
                  width={60}
                  height={60}
                  className={`cursor-pointer rounded-full border-2 ${
                    selectedImageId === id ? 'border-[#5DB53E]' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImageId(id)}
                />
              );
            })}
          </div>
        </div>
        <Box sx={{ mt: 4 }}>
          <TextField
            fullWidth
            label="ひと言メッセージ"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Box>
        <hr className="mt-8 mb-8" />
        <div className="flex items-center space-x-4">
          <WarningTriangleSolid height={40} width={40} strokeWidth={2} />
          <p>変更を保存するには「保存」ボタンをクリックしてください。</p>
        </div>
        <div className="flex justify-center mt-8">
            <button className='text-xl font-bold text-[#5DB53E]'onClick={handleSubmit}>
                保存
            </button>
        </div>
      </div>
    </div>
  );
};

export default AccountEditModal;
