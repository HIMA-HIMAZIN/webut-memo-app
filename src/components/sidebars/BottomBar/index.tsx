"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Planet, Edit, LogIn, Settings } from 'iconoir-react';

type BottomBarProps = {
  isLogin: boolean;
  onPlanetClick: () => void;
  onProfileClick: () => void;
  onSettingsClick: () => void;
  onMemoOrLoginClick: () => void;
};

export function BottomBar({
  isLogin,
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
        }}
      >
        <BottomNavigationAction label="みんな" icon={<Planet />} />
        <BottomNavigationAction label={isLogin ? "メモする" : "ログイン"} icon={isLogin ? <Edit /> : <LogIn />} />
        {isLogin && (
          <BottomNavigationAction label="設定" icon={<Settings />} onClick={onSettingsClick} />
        )}
      </BottomNavigation>
    </Box>
  );
}
