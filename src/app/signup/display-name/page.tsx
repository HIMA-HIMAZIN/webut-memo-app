"use client";

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { ArrowRightCircle } from 'iconoir-react';

// コンポーネント
import { ProgressionCircle } from '@/components/bar/ProgressionBar';
import { GuideTitle } from '@/components/headers/GuideTitle';
import { ProceedButton } from '@/components/buttons/ProceedButton';

// API
import { updateUserHandle } from '@/utils/signup/api';
import supabase from '@/utils/supabase/client';

// MUI
import { Box, TextField } from '@mui/material';

const CreateUserName = () => {
  const activeStep = 3;
  const [display_name, setUsername] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [helperText, setHelperText] = useState('ハンドルネームは3〜10文字で入力してください');
  const [isError, setIsError] = useState(false);

  // ログインしているユーザーIDを取得
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("ユーザーの取得に失敗しました:", error);
      } else if (user) {
        setUserId(user.id);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (display_name.length === 0) {
      setHelperText('ハンドルネームは1〜10文字で入力してください');
      setIsError(false);
      setIsButtonDisabled(true);
    } else if (display_name.length >= 1 && display_name.length <= 10) {
      setHelperText(''); // 条件を満たしたときは案内やエラーメッセージを消す
      setIsError(false);
      setIsButtonDisabled(false);
    } else {
      setIsError(true);
      setIsButtonDisabled(true);
      if (display_name.length < 1) {
        setHelperText('ハンドルネームは1文字以上である必要があります');
      } else if (display_name.length > 10) {
        setHelperText('ハンドルネームは10文字以下である必要があります');
      }
    }
  }, [display_name]);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleProceedClick = async () => {
    if (!userId) {
      console.error("ユーザーIDが存在しません");
      return;
    }
    const result = await updateUserHandle(userId, display_name);
    if (result) {
      console.log("ハンドルネームが更新されました");
    } else {
      console.error("ハンドルネームの更新に失敗しました");
    }
  };

  return (
    <div className="pl-8 pt-8 mb-5 h-full">
      <Image
        src="/icons/club-icon.svg"
        alt="Example Image"
        width={30}
        height={30}
      />
      <div className="flex flex-col items-center m-12 space-y-10 md:space-y-10 lg:space-y-20">
        {/* ProgressionCircleの表示 */}
        <ProgressionCircle activeStep={activeStep} />
        {/* GuideTitleの表示 */}
        <GuideTitle text="最後にハンドルネームを教えてね！" />
        {/* テキストボックスの表示 */}
        <Box sx={{ width: '40%', mt: 20 }}>
          <TextField
            fullWidth
            label="ハンドルネーム"
            id="fullWidth"
            value={display_name}
            onChange={handleUsernameChange}
            error={isError}
            helperText={helperText}
            slotProps={
              {formHelperText() {
                return {style: {color: isError ? 'red' : 'black'
              },}
            }}}
          />
        </Box>
        <ProceedButton
          title="登録する"
          icon={ArrowRightCircle}
          navigateTo="/"
          disabled={isButtonDisabled}
          onClick={handleProceedClick}
        />
      </div>
    </div>
  );
};

export default CreateUserName;
