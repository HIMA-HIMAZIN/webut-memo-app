"use client";
import React, { useState } from 'react';
{/*components*/}
import { ProgressionCircle } from '@/components/Bar/ProgressionBer/circle';
import { GuideTitle } from '@/components/headers/GuideTitle';
import { Box, TextField } from '@mui/material';

const CreateUserName = () => {

  const [activeStep] = useState(1);
  return (
    <div className="flex flex-col items-center m-12 space-y-10 md:space-y-16 lg:space-y-40">
      {/* ProgressionCircleの表示 */}
      <ProgressionCircle activeStep={activeStep} />

      {/* GuideTitleの表示 */}
      <GuideTitle text="世界に一つだけの名前をつけて！！" />

      {/* テキストボックスの表示 */}
      
      <Box sx={{ width: '40%', mt: 20 }}>
        <TextField fullWidth label="username" id="fullWidth" />
      </Box>
    </div>
  );
};

export default CreateUserName;



