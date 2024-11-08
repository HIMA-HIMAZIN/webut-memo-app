import React from 'react';
import { ProfileButton } from "@/components/buttons/ProfileButton";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { TrashSolid } from 'iconoir-react';
import { deleteMemo } from '@/utils/profile/api';

interface IndividualPostCardProps {
  id : number;
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

export function IndividualPostCard({ id,title, content, path, timeAgo }: IndividualPostCardProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
    if (event) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setAnchorEl(null);
    deleteMemo(id)
    window.location.reload();
  };
  return (
    <div className="w-full bg-white pb-4 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <ProfileButton title={title} path={path} />
        <div className='flex items-center justify-center pr-5'>
            <span className="text-base p-3 pr-5 text-gray-500">{timeAgo}</span>
            <React.Fragment>
                <Breadcrumbs aria-label="breadcrumbs">
                    <IconButton size="small" onClick={handleClick} style={{ color: 'gray' }}>
                    <MoreHorizIcon />
                    </IconButton>
                </Breadcrumbs>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="with-menu-demo-breadcrumbs"
                    sx={{
                      '& .MuiPaper-root': {
                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px', // 影を薄く設定
                      },
                    }}
                >
                    <MenuItem onClick={handleDelete} style={{ color: 'red', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <TrashSolid height={18} width={18} strokeWidth={2} />削除する
                    </MenuItem>
                </Menu>
            </React.Fragment>
        </div>
      </div>
      <div className="ml-16 mr-5">
        <p className="text-gray-700">{parseContentWithLinks(content)}</p>
      </div>
    </div>
  );
}
