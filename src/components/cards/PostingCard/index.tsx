import React from 'react';
import { ProfileButton } from "@/components/buttons/ProfileButton";

interface PostCardProps {
  title: string;
  content: string;
  path: string;
  timeAgo: string;
  icon_number: number;
}

const parseContentWithLinks = (text: string) => {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  
  return text.split('\n').map((line, lineIndex) => (
    <span key={lineIndex} style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
      {line.split(urlPattern).map((part, index) => {
        if (urlPattern.test(part)) {
          return (
            <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              {part.length > 20 ? `${part.slice(0, 17)}...` : part}
            </a>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  ));
};

export function PostCard({ title, content, path, timeAgo, icon_number }: PostCardProps) {
  return (
    <div className="w-full bg-white pb-4 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <ProfileButton title={title} path={path} icon_number={icon_number} />
        <span className="text-base p-3 pr-5 text-gray-500">{timeAgo}</span>
      </div>
      <div className="ml-16 mr-24">
        <p className="text-gray-700">{parseContentWithLinks(content)}</p>
      </div>
    </div>
  );
}
