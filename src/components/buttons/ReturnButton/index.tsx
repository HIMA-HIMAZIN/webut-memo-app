"use client";

import { useRouter } from 'next/navigation';
import{ useEffect,useState } from 'react';
import { NavArrowLeft } from 'iconoir-react';

export function ReturnButton() {
    const router = useRouter();
    const [canGoBack, setCanGoBack] = useState(false);


    useEffect(() => {
        setCanGoBack(window.history.length > 1);
    },[]);

    const handleClick = () => {
        if (canGoBack) {
          router.back(); 
        } else {
          router.push('/home'); // 戻るページがなければ `/home` に遷移
        }
      };
    
      return (
        <button onClick={handleClick} className="flex items-start space-x-2 btn">
          <NavArrowLeft width={40} height={40} /> 
        </button>
      );
    }
