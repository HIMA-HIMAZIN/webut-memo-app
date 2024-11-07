"use client";
import { CheckCircleSolid } from 'iconoir-react';

type ProgressionCircleProps = {
  activeStep: number;
};

export const ProgressionCircle = ({ activeStep }: ProgressionCircleProps) => {
  return (
    <ol className="flex items-center w-2/3 max-w-screen-md text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
      {/* ステップ1: ユーザー名の作成 */}
      <li
        className={`flex md:w-full items-center whitespace-nowrap sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700 ${
          activeStep >= 1 ? 'text-primary' : 'text-gray-500'
        }`}
      >
        <span className="flex items-center whitespace-nowrap after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
          <CheckCircleSolid
            height={20}
            width={20}
            strokeWidth={2}
            className={`mr-2 ${activeStep >= 1 ? 'text-green-500' : 'text-gray-400'}`}
          />
          <span className="me-2">1</span>
          ユーザー名の作成
        </span>
      </li>

      {/* ステップ2: アイコンの作成 */}
      <li
        className={`flex md:w-full items-center whitespace-nowrap sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700 ${
          activeStep >= 2 ? 'text-primary' : 'text-gray-500'
        }`}
      >
        <span className="flex items-center whitespace-nowrap after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
          <CheckCircleSolid
            height={20}
            width={20}
            strokeWidth={2}
            className={`mr-2 ${activeStep >= 2 ? 'text-green-500' : 'text-gray-400'}`}
          />
          <span className="me-2">2</span>
          アイコンの作成
        </span>
      </li>

      {/* ステップ3: 名前の作成 */}
      <li
        className={`flex items-center whitespace-nowrap ${
          activeStep === 3 ? 'text-primary' : 'text-gray-500'
        }`}
      >
        <CheckCircleSolid
          height={20}
          width={20}
          strokeWidth={2}
          className={`mr-2 ${activeStep === 3 ? 'text-green-500' : 'text-gray-400'}`}
        />
        <span className="me-2">3</span>
        名前の作成
      </li>
    </ol>
  );
};

