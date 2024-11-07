"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { MemoLogType } from '@/types';
import { Edit } from 'iconoir-react';
import { LeftSideBar } from '@/components/sidebars/LeftSideBar';
import { IndividualPostCard } from '@/components/cards/IndividualPostingCard';
import { ReturnButton } from '@/components/buttons/ReturnButton';
import { MemoModal } from '@/components/modals/MemoModal';
import { AccountModal } from '@/components/modals/AccountModal';
import ArrowBox from '@/components/boxes/ArrowBox';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { formatDistanceToNow } from 'date-fns';
import { fetchMemos } from '@/utils/profile/api';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Profile({}: { params: { id: string } }) {
  const { id } = useParams();
  const [memos, setMemos] = useState<MemoLogType[]>([]);
  const [isMemoModalOpen, setMemoModalOpen] = useState(false);
  const [isAccountModalOpen, setAccountModalOpen] = useState(false);
  const [countMemos, setCountMemos] = useState(0);
  const [value, setValue] = React.useState(0);
  const imageNumber = 'panda'; // パンダの画像を設定
  const imageUrl = `/images/profile_icon/${imageNumber || 'panda'}.png`; // プレースホルダー画像も設定
  const isLogin = true; 
  
  useEffect(() => {
    const getMemos = async () => {
      const memosData = await fetchMemos();
      setCountMemos(memosData.length);
      const sortedMemos = memosData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setMemos(sortedMemos);
    };
    getMemos();
  }, []);

  const openMemoModal = () => setMemoModalOpen(true);
  const closeMemoModal = () => setMemoModalOpen(false);

  const openAccountModal = () => setAccountModalOpen(true);
  const closeAccountModal = () => setAccountModalOpen(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="flex justify-center min-h-screen bg-contentbg">
      <div className="flex w-full max-w-7xl">
        
        <div className="hidden md:block w-1/4 bg-contentbg p-4">
          <LeftSideBar onOpenModal={openAccountModal} onMemoModal={openMemoModal}  isLogin={isLogin}/>
        </div>
        
        <div className="w-full md:w-1/2 bg-white">
          <div className='max-h-[40vh]'>
            <div className='flex items-center mt-10 mb-5'>
              <ReturnButton />
              <div className="text-xl font-bold">{id}</div>
            </div>
            <div className='mx-10 my-5'>
              <div className='flex items-center space-x-10'>
                <Image className='rounded-full' src={imageUrl} alt="profile" height={80} width={80}/>
                <div className='flex flex-col items-center '>
                  <Edit color="#5DB53E" height={30} width={30}/>
                  <div className='text-xl font-bold text-[#8C8C8C]'>{countMemos}</div>
                </div>
              </div>
              <ArrowBox>こんにちは！最近Webut始めました！</ArrowBox>
            </div>
            <div className='mx-10'>
              <Box>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="メニュー"
                  sx={{
                    '& .MuiTabs-indicator': {
                      backgroundColor: '#5DB53E',
                      height: '4px',
                      borderRadius: '2px',
                      width: '60%', // 線の長さを短く
                      margin: '0 auto', // 線を中央に配置
                    },
                    justifyContent: 'flex-start', // タブを左寄せ
                  }}
                  centered={false} // 左寄せを有効にするため
                >
                  <Tab
                    label="メモ"
                    {...a11yProps(0)}
                    disableRipple // リップル効果を無効化
                    sx={{
                      fontWeight: 'bold',
                      color: value === 0 ? '#404040' : '#8C8C8C',
                      '&.Mui-selected': { color: '#404040' },
                    }}
                  />
                  <Tab
                    label="ブック"
                    {...a11yProps(1)}
                    disableRipple // リップル効果を無効化
                    sx={{
                      fontWeight: 'bold',
                      color: value === 1 ? '#404040' : '#8C8C8C',
                      '&.Mui-selected': { color: '#404040' },
                    }}
                  />
                  <Tab
                    label="いいね"
                    {...a11yProps(2)}
                    disableRipple // リップル効果を無効化
                    sx={{
                      fontWeight: 'bold',
                      color: value === 2 ? '#404040' : '#8C8C8C',
                      '&.Mui-selected': { color: '#404040' },
                    }}
                  />
                </Tabs>
              </Box>
            </div>
          </div>
          <div className="overflow-y-auto max-h-[70vh]">
            <CustomTabPanel value={value} index={0}>
              {memos.map((memo: MemoLogType) => (
                  <IndividualPostCard
                    key={memo.id}
                    id={memo.id}
                    title="パンダ"
                    content={memo.content}
                    path={imageNumber}
                    timeAgo={formatDistanceToNow(new Date(memo.createdAt), { addSuffix: true })}
                  />
                ))}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              ブックをした投稿はありません。
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              いいねをした投稿はありません。
            </CustomTabPanel>
          </div>
        </div>
        <div className="hidden md:block w-1/4 bg-contentbg p-4">
          右サイド
        </div>
      </div>
      <MemoModal isOpen={isMemoModalOpen} onClose={closeMemoModal} />
      <AccountModal 
        isOpen={isAccountModalOpen} 
        onClose={closeAccountModal} 
      />
    </div>
  );
}
