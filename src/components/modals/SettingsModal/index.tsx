import React, { useEffect, useRef, useContext } from 'react';
import { WarningTriangleSolid } from 'iconoir-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
        {/* 閉じるボタン */}
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
        {/* コンテンツ */}
        <div className="pt-4">
          <h1 className="py-2 text-2xl font-semibold">アカウント</h1>
        </div>
        <hr className="mt-4 mb-8" />
        <p className="py-2 text-xl font-semibold">Email Address</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="text-gray-600">
            Your email address is 
          </p>
        </div>
        <hr className="mt-4 mb-8" />
        <div className="mb-10">
          <p className="py-2 text-xl font-semibold">ログアウト</p>
          <p className="mt-2">
            サービスからログアウトします。再度ログインするには、ログイン画面に戻る必要があります。
          </p>
          <button
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            ログアウト
          </button>
        </div>
        <hr className="mt-4 mb-8" />
        <div
          id="alert-additional-content-2"
          className="p-4 mb-8 text-red-800 border border-red-300 rounded-lg bg-red-50"
          role="alert"
        >
          <div className="flex items-center">
            <WarningTriangleSolid width={25} height={25} strokeWidth={1} />
            <h3 className="text-lg font-medium ml-2">アカウントを削除する</h3>
          </div>
          <div className="mt-2 mb-4 text-sm">
            サービスからアカウントを削除します。この操作は取り消すことができません。
          </div>
          <div className="flex">
            <button
              type="button"
              className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center"
            >
              アカウントを削除する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;