"use client";

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRightCircle } from 'iconoir-react';
import { ProgressionCircle } from '@/components/bar/ProgressionBar';
import { GuideTitle } from '@/components/headers/GuideTitle';
import { Box, TextField } from '@mui/material';
import { PrimaryButton } from '@/components/buttons/PrimaryButton';

const CreateUserName = () => {
  const activeStep = 3;
  const [username, setUsername] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [helperText, setHelperText] = useState('ハンドルネームは3〜10文字で入力してください');
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (username.length === 0) {
      setHelperText('ハンドルネームは3〜10文字で入力してください');
      setIsError(false);
      setIsButtonDisabled(true);
    } else if (username.length >= 3 && username.length <= 10) {
      setHelperText(''); // 条件を満たしたときは案内やエラーメッセージを消す
      setIsError(false);
      setIsButtonDisabled(false);
    } else {
      setIsError(true);
      setIsButtonDisabled(true);
      if (username.length < 3) {
        setHelperText('ハンドルネームは3文字以上である必要があります');
      } else if (username.length > 10) {
        setHelperText('ハンドルネームは10文字以下である必要があります');
      }
    }
  }, [username]);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const buttonAction = () => {
    router.push('/');
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
            value={username}
            onChange={handleUsernameChange}
            error={isError}
            helperText={helperText}
            FormHelperTextProps={{
              style: { color: isError ? 'red' : 'black' }, // エラー時は赤、案内時は黒
            }}
          />
        </Box>
        <PrimaryButton
          title="登録する"
          icon={ArrowRightCircle}
          onClick={buttonAction}
          disabled={isButtonDisabled}
        />
      </div>
    </div>
  );
};

export default CreateUserName;
