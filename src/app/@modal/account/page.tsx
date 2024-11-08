// app/(modals)/account/page.tsx

"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { AccountModal } from '@/components/modals/AccountModal';

export default function AccountModalPage() {
  const router = useRouter();

  const closeModal = () => {
    router.back(); // モーダルを閉じたら前のページに戻る
  };

  return (
    <AccountModal
      isOpen={true}
      onClose={closeModal}
    />
  );
}