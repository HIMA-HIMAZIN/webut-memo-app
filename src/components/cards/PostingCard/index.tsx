import React from 'react';

import {ProfileButton} from "@/components/buttons/ProfileButton";

interface PostCardProps {
  title: string;
  content: string;
  path : string;
  timeAgo: string;
}

export function PostCard({ title, content, path, timeAgo }: PostCardProps) {
  return (
    <div className="w-full bg-white pb-4 border-b border-gray-200">
      <div className="flex justify-between  items-center">
        <ProfileButton title={title} path={path} />
        <span className="text-base p-3 pr-5 text-gray-500">{timeAgo}</span>
        </div>
        <div className='ml-16'>
            <p className="text-gray-700">{content}</p>
        </div>
    </div>
  );
}
