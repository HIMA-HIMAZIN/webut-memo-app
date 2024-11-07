import React from 'react';
import { ProfileButton } from "@/components/buttons/ProfileButton";

interface PostCardProps {
  title: string;
  content: string;
  path: string;
  timeAgo: string;
}

const parseContentWithLinks = (text: string) => {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlPattern);
  
  return parts.map((part, index) => {
    if (urlPattern.test(part)) {
      return (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          {part.length > 20 ? `${part.slice(0, 17)}...` : part}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

export function PostCard({ title, content, path, timeAgo }: PostCardProps) {
  return (
    <div className="w-full bg-white pb-4 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <ProfileButton title={title} path={path} />
        <span className="text-base p-3 pr-5 text-gray-500">{timeAgo}</span>
      </div>
      <div className="ml-16">
        <p className="text-gray-700">{parseContentWithLinks(content)}</p>
      </div>
    </div>
  );
}
