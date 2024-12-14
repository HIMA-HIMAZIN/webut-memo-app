"use client";

import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Planet, LogIn, Settings } from 'iconoir-react';
import Image from 'next/image';

type BottomBarProps = {
  isLogin: boolean;
  displayName?: string; // ログイン中のユーザー名
  profilePicture?: string; // プロフィール画像URL
  onPlanetClick: () => void;
  onProfileClick: () => void;
  onSettingsClick: () => void;
};

export function BottomBar({
  isLogin,
  displayName,
  profilePicture,
  onPlanetClick,
  onProfileClick,
  onSettingsClick,
}: BottomBarProps) {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          // newValue に応じて各ボタンのクリックイベントを発火
          if (newValue === 0) onPlanetClick();
          else if (newValue === 1) onProfileClick();
          else if (newValue === 2) onSettingsClick();
        }}
      >
        <BottomNavigationAction label="みんな" icon={<Planet />} />
        {isLogin && displayName && profilePicture ? (
          <BottomNavigationAction
            label={displayName}
            icon={
              <Image
                src={profilePicture}
                alt="プロフィール画像"
                width={24}
                height={24}
                className="rounded-full"
              />
            }
            onClick={onProfileClick}
          />
        ) : (
          <BottomNavigationAction label="ログイン" icon={<LogIn />} onClick={onProfileClick} />
        )}
        {isLogin && (
          <BottomNavigationAction label="設定" icon={<Settings />} onClick={onSettingsClick} />
        )}
      </BottomNavigation>
    </Box>
  );
}
