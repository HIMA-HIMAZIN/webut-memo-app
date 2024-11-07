"use client"

import React, { useState } from 'react';
import Image from 'next/image';
{/*components*/}
import { GuideTitle } from '@/components/headers/GuideTitle';
import { ImageList } from '@/components/image/image_list';
import { ProgressionCircle } from '@/components/Bar/ProgressionBer/circle';

const CreateIcon = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageSelect = (imageSrc: string) => {
        setSelectedImage(imageSrc);
    };
    const activeStep = 2;

    return (
        <div className="pl-8 pt-8 mb-5">
            <Image
              src="/icons/club-icon.svg"
              alt="Example Image"
              width={30}
              height={30}
            />
            <div className=" m-12 ">
                <div className='flex flex-col items-center space-y-10 md:space-y-16 lg:space-y-24'>
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
                    <>
                    <div className="w-52 h-52 bg-gray-300 rounded-full flex items-center justify-center"></div>
                    
                    </>
                )}
                <p className="text-black ">画像を選択してください</p>
                </div>
                <div className='flex justify-center items-center mt-8'>
                {/* 画像選択用のコンポーネント */}
                <ImageList onSelect={handleImageSelect} />
                </div>
            </div>
        </div>
    );
};

export default CreateIcon;
