import React, { useState } from 'react';
import { ProfileButton } from "@/components/buttons/ProfileButton";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { TrashSolid, EditPencil} from 'iconoir-react';
import { deleteMemo } from '@/utils/IndividualMemo/api';
import WarningModal from '@/components/modals/WarningModal';
import {EditModal} from "@/components/modals/EditModal"

interface IndividualPostCardProps {
  id: number;
  title: string;
  content: string;
  path: string;
  timeAgo: string;
  icon_nuber: number;
  isPublic: boolean;
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

export function IndividualPostCard({ id, title, content, path, timeAgo, icon_nuber,isPublic}: IndividualPostCardProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    deleteMemo(id);
    setIsModalOpen(false);
    window.location.reload();
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    setAnchorEl(null);
    setIsEditModalOpen(true);
  };

  return (
    <div className="w-full bg-white pb-4 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <ProfileButton title={title} path={path} icon_number={icon_nuber} />
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
                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                      },
                    }}
                >   
                    <MenuItem onClick={handleEdit} style={{ color: 'black', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <EditPencil height={18} width={18} strokeWidth={2} />
                        編集する
                    </MenuItem>
                    <MenuItem onClick={handleDelete} style={{ color: 'red', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <TrashSolid height={18} width={18} strokeWidth={2} />
                        削除する
                    </MenuItem>
                </Menu>
            </React.Fragment>
        </div>
      </div>
      <div className="ml-16 mr-5">
        <p className="text-gray-700">{parseContentWithLinks(content)}</p>
      </div>
      <WarningModal
        isOpen={isModalOpen}
        onClose={cancelDelete}
        onDelete={confirmDelete}
      />
      <EditModal
        id = {id}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialMemo={content}
        initialIsPublic={isPublic}
      />
    </div>
  );
}
