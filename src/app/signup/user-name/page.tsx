"use client";
import React, { useState } from 'react';
import Image from 'next/image';

// コンポーネント
import { ProgressionCircle } from '@/components/bar/ProgressionBar';
import { GuideTitle } from '@/components/headers/GuideTitle';
import { ProceedButton } from '@/components/buttons/ProceedButton';

// ライブラリ
import { ArrowRightCircle } from 'iconoir-react';

// API
import { updateUserId } from '@/utils/signup/api';

// MUI
import { Box, TextField } from '@mui/material';

const CreateUserName = () => {
  const [activeStep] = useState(1);
  const [user_name, setUserName] = useState("");
  const [error, setError] = useState("");
  const isButtonDisabled = error !== "" || user_name === "";

  // ユーザーネームのバリデーション
  const validateUserName = (value: string) => {
    if (value.length === 0) {
      setError("");
    } else if (value.length > 20) {
      setError("20文字以下で入力してください。");
    } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
      setError("ローマ字と数字のみで入力してください。");
    } else {
      setError("");
    }
    setUserName(value);
  };

  const handleProceedClick = async () => {
    const userId = "YOUR_USER_ID"; // ここに実際のユーザーIDを設定
    const result = await updateUserId(userId, user_name);
    if (result) {
      console.log("ユーザー名が更新されました");
      // ここでページ遷移または次の処理を実行
    } else {
      console.error("ユーザー名の更新に失敗しました");
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
      <div className="flex flex-col items-center m-12 space-y-10 md:space-y-16 lg:space-y-20">
        {/* ProgressionCircleの表示 */}
        <ProgressionCircle activeStep={activeStep} />

        <GuideTitle text="世界に一つだけの名前をつけよう" />

        <Box sx={{ width: '40%', mt: 20 }}>
          <TextField
            fullWidth
            label="ユーザー名"
            id="fullWidth"
            value={user_name}
            onChange={(e) => validateUserName(e.target.value)}
            error={!!error}
            helperText={error || "20文字以下のローマ字と数字のみで入力してください。"}
            slotProps={
              {formHelperText(ownerState) {
                return {style: {color: error ? 'red' : 'black'
              },}
            }}}
          />
        </Box>
        {/* ProceedButtonの表示 */}
        <ProceedButton
          title="登録する"
          icon={ArrowRightCircle}
          navigateTo="/signup/select-icon"
          disabled={isButtonDisabled}
        />
      </div>
    </div>
  );
};

export default CreateUserName;
