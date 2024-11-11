"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRightCircle } from 'iconoir-react';
import { ProgressionCircle } from '@/components/bar/ProgressionBar';
import { GuideTitle } from '@/components/headers/GuideTitle';
import { Box, TextField } from '@mui/material';
import { ProceedButton } from '@/components/buttons/ProceedButton';

const CreateUserName = () => {
  const [activeStep] = useState(1);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const isButtonDisabled = error !== "" || userName === "";

  // ユーザーネームのバリデーション
  const validateUserName = (value: string) => {
    if (value.length === 0) {
      setError("");
    } else if (value.length < 5) {
      setError("5文字以上で入力してください。");
    } else if (value.length > 20) {
      setError("20文字以下で入力してください。");
    } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
      setError("ローマ字と数字のみで入力してください。");
    } else {
      setError("");
    }
    setUserName(value);
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

        {/* GuideTitleの表示 */}
        <GuideTitle text="世界に一つだけの名前をつけよう" />

        {/* テキストボックスの表示 */}
        <Box sx={{ width: '40%', mt: 20 }}>
          <TextField
            fullWidth
            label="ユーザーネーム"
            id="fullWidth"
            value={userName}
            onChange={(e) => validateUserName(e.target.value)}
            error={!!error}
            helperText={error || "5文字以上20文字以下のローマ字と数字のみで入力してください。"}
            FormHelperTextProps={{
              style: { color: error ? 'red' : 'black' }, // エラーメッセージは赤、案内は黒
            }}
          />
        </Box>
        {/* ProceedButtonの表示 */}
        <ProceedButton
          title="登録する"
          icon={ArrowRightCircle}
          path="/signup/select-icon"
          disabled={isButtonDisabled}
        />
      </div>
    </div>
  );
};

export default CreateUserName;
