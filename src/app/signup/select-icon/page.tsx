"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRightCircle } from 'iconoir-react';
import { GuideTitle } from '@/components/headers/GuideTitle';
import { ImageList } from '@/components/image/image_list';
import { ProgressionCircle } from '@/components/bar/ProgressionBar';
import { ProceedButton } from '@/components/buttons/ProceedButton';

const CreateIcon = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const activeStep = 2;

  const handleImageSelect = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  useEffect(() => {
    // 画像が選択されているかどうかでボタンの無効状態を更新
    setIsButtonDisabled(selectedImage === null);
  }, [selectedImage]);

  return (
    <div className="pl-8 pt-8 mb-5">
      <Image
        src="/icons/club-icon.svg"
        alt="Example Image"
        width={30}
        height={30}
      />
      <div className="m-5">
        <div className="flex flex-col items-center space-y-10 md:space-y-10 lg:space-y-15">
          {/* ProgressionCircleの表示 */}
          <ProgressionCircle activeStep={activeStep} />
          <GuideTitle text="好きな画像で自分を象徴して！" />

          {/* 選択した画像を表示するフィールド */}
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt="選択された画像"
              width={200}    // 幅と高さを指定します
              height={200}
              className="rounded-full"
            />
          ) : (
            <div className="w-52 h-52 bg-gray-300 rounded-full flex items-center justify-center"></div>
          )}
          <p className="text-black">画像を選択してください</p>
        </div>
        <div className="flex justify-center items-center mt-8">
          {/* 画像選択用のコンポーネント */}
          <ImageList onSelect={handleImageSelect} />
        </div>
        <div className="flex justify-center mt-8">
          <ProceedButton title="登録する" icon={ArrowRightCircle} path="/signup/handle" disabled={isButtonDisabled} />
        </div>
      </div>
    </div>
  );
};

export default CreateIcon;
