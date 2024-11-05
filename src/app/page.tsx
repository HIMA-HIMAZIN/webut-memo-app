import React from 'react';
import { LeftSideBar } from '../components/sidebars/LeftSideBar';
import ReloadButton from '../components/buttons/ReloadButton';

export default function Home() {
  return (
    <div className="flex justify-center min-h-screen bg-contentbg">
      <div className="flex w-full max-w-7xl">
        
        <div className="hidden md:block w-1/4 bg-contentbg p-4">
          <LeftSideBar />
        </div>
        <div className="w-full md:w-1/2  bg-white">
          <ReloadButton />
        </div>
        <div className="hidden md:block w-1/4 bg-contentbg p-4">
          右サイド
        </div>
      </div>
    </div>
  );
}
