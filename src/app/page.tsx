import React from 'react';
import { LeftSideBar } from '../components/sidebars/LeftSideBar';
import { PostCard } from '@/components/cards/PostingCard';
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
          <PostCard title="パンダ" content="こんにちは" path="panda" timeAgo='15分前' />
          <PostCard title="ゴリラ" content="明日は暑いですねああああああ" path="gorira" timeAgo='15分前'/>
          <PostCard title="ぶた" content="腹へった" path="buta" timeAgo='15分前'/>
        </div>
        <div className="hidden md:block w-1/4 bg-contentbg p-4">
          右サイド
        </div>
      </div>
    </div>
  );
}
