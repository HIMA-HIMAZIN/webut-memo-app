import React from 'react';
import { LeftSideBar } from '../components/sidebars/LeftSideBar';
import { RightSideBar } from '../components/sidebars/RightSideBar';


export default function Home() {
  return (
    <div className="flex items-center justify-between h-screen">
      <LeftSideBar />
      <RightSideBar />
    </div>
  );
}
