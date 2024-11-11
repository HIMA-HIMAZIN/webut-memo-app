"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';

//packages
import { Edit } from 'iconoir-react';
import { Tabs, Tab, Box } from '@mui/material';

//components
import { LeftSideBar } from '@/components/sidebars/LeftSideBar';
import { RightSideBar } from '@/components/sidebars/RightSideBar';
import { PostCard } from '@/components/cards/PostingCard';
import { IndividualPostCard } from '@/components/cards/IndividualPostingCard';
import { ReturnButton } from '@/components/buttons/ReturnButton';
import ArrowBox from '@/components/boxes/ArrowBox';
import LoadingScreen from '@/components/LoadingScreen';

//utils
import { fetchMemos } from '@/utils/IndividualMemo/api';
import { fetchUser } from '@/utils/profile/api';
import { getImageSrcById } from '@/utils/iconImage/getImageSrcById';
import supabase from "@/utils/supabase/Client";

//types
import { MemoLogType, AccountType } from '@/types';


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
  const { id } = useParams<{ id: string }>();
  const [userId, setUserId] = useState<string | null>(null);
  const [memos, setMemos] = useState<MemoLogType[]>([]);
  const [user, setUser] = useState<AccountType | null>(null);
  const [image, setImage] = useState<string>("/images/profile_icon/panda.png");
  const [countMemos, setCountMemos] = useState(0);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    getUser();
    const getMemos = async () => {
      try {
        const userData = await fetchUser(id);
        if (!userData) throw new Error("User data not found");
        setUser(userData);
        const memosData = await fetchMemos(userData.id);
        setImage(getImageSrcById(userData.profile_picture));
        setCountMemos(memosData?.length ?? 0);

        if (memosData) {
          const sortedMemos = memosData.sort((a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setMemos(sortedMemos);
        }
      } catch (error) {
        console.error("Failed to fetch memos or user data:", error);
      }finally {
        setLoading(false);
      }
    };

    getMemos();
  }, [id]);

  
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex justify-center min-h-screen bg-contentbg">
      <div className="flex w-full max-w-7xl">
        
        <div className="hidden md:block w-1/4 bg-contentbg p-4">
          <LeftSideBar/>
        </div>
        <div className="md:w-1/2 bg-white md:min-w-[640px]">
          <div className='max-h-[40vh]'>
            <div className='flex items-center mt-10 mb-5'>
              <ReturnButton />
              <div className="text-xl font-bold">{user?.display_name ?? "存在するアカウントが見つかりません。"}</div>
            </div>
            <div className='mx-10 my-5'>
              <div className='flex items-center space-x-10'>
                <Image className='rounded-full' src={image} alt="profile" height={80} width={80}/>
                <div className='flex flex-col items-center '>
                  <Edit color="#5DB53E" height={30} width={30}/>
                  <div className='text-xl font-bold text-[#8C8C8C]'>{countMemos}</div>
                </div>
              </div>
              <ArrowBox>{user?.bio || "一言メッセージはありません。"}</ArrowBox>
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
                userId === user?.id ? (
                  <IndividualPostCard
                    key={memo.id}
                    id={memo.id}
                    title={user?.display_name || "No Name"}
                    content={memo.content}
                    isPublic = {memo.is_public}
                    icon_nuber={user?.profile_picture || 1}
                    path={user?.user_name || "Nobody"}
                    timeAgo={formatDistanceToNow(new Date(memo.created_at), { addSuffix: true, locale: ja })}
                  />
                ) : (
                  <PostCard
                    key={memo.id}
                    title={user?.display_name || "No Name"}
                    content={memo.content}
                    icon_number={user?.profile_picture || 1}
                    path={user?.user_name || "Nobody"}
                    timeAgo={formatDistanceToNow(new Date(memo.created_at), { addSuffix: true, locale: ja })}
                  />
                )
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
        <RightSideBar/>
      </div>
    </div>
  );
}
