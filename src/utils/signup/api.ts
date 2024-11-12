import { MemoLogType } from '@/types';

// メモを取得するAPI
export async function fetchUserId(): Promise<MemoLogType[]> {
    try {
      const response = await fetch('http://localhost:3000/api/signup/user-name', {
        cache: 'no-store',
      });
      if (!response.ok) {
        throw new Error("Failed to fetch memos");
      }
      const data = await response.json();
      return data.memos;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
  

// メモを更新するAPI
export async function updateUserId(userId: string, user_name:string): Promise<MemoLogType | null> {
  try {
    const response = await fetch('http://localhost:3000/api/signup/user-name', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id : userId, user_name : user_name, }),
    });
    if (!response.ok) {
      throw new Error("Failed to update memo");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}


// メモを更新するAPI
export async function updateUserIcon(id: string, iconId:number): Promise<MemoLogType | null> {
    try {
      const response = await fetch('http://localhost:3000/api/signup/user-icon', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id : id,profile_picture: iconId }),
      });
      if (!response.ok) {
        throw new Error("Failed to update memo");
      }
      return response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  

// メモを更新するAPI
export async function updateUserHandle(id: string, handle:string): Promise<MemoLogType | null> {
    try {
      const response = await fetch('http://localhost:3000/api/signup/handle-name', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id : id, display_name: handle }),
      });
      if (!response.ok) {
        throw new Error("Failed to update memo");
      }
      return response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  


