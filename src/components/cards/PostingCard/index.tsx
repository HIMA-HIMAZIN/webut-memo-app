import React from 'react';

import {ProfileButton} from "@/components/buttons/ProfileButton";

interface PostCardProps {
  title: string;
  content: string;
  path : string;
}

export function PostCard({ title, content, path }: PostCardProps) {
  return (
    <div className="w-full bg-white p-4">
        <ProfileButton title={title} path={path} />
        <div className='ml-16'>
            <p className="text-gray-700">{content}</p>
        </div>
    </div>
  );
}
