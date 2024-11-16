"use client";
import React from 'react';
import { useState } from "react";
import { ProfileButton } from "@/components/buttons/ProfileButton";
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {postLike , deleteLike} from "@/utils/likes/api";

interface PostCardProps {
  user_id? : string;
  monologue_id: number;
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


export function PostCard({user_id ,monologue_id, title, content, path, timeAgo, icon_number }: PostCardProps) {
  const [favo, setFavo] = useState(false);
  const handleClick = async () => {
    if (!user_id) {
      return;
    }
    if (favo === false) {
      setFavo(true);
      await postLike( user_id ,monologue_id);
    } else {
      setFavo(false);
      await deleteLike(user_id ,monologue_id);
    }
  };
  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="flex justify-between items-center">
        <div>
          <ProfileButton title={title} path={path} icon_number={icon_number} />
          <div className="ml-16 mr-24 pb-4">
            <p className="text-gray-700">{parseContentWithLinks(content)}</p>
          </div>
        </div>
        <div className="flex flex-col items-center m-5">
          <span className="text-base text-gray-500">{timeAgo}</span>
          {user_id  && (
            <IconButton onClick={handleClick}>
              {favo ? <FavoriteIcon style={{ color: '#F55757' ,fontSize: '2rem'}} /> : <FavoriteBorderIcon style={{ fontSize: '2rem' }}/>}
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
}
