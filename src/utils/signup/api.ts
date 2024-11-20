import { AccountType } from '@/types';

// メモを取得するAPI
export async function fetchUserId(user_id :string): Promise<AccountType | null> {
    try {
      const response = await fetch(`http://localhost:3000/api/user-name=${user_id}`, {
        cache: 'no-store',
      });
      if (!response.ok) {
        throw new Error("Failed to fetch memos");
      }
      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  
  

// ユーザー名を更新するAPI
export async function updateUserId(userId: string, user_name:string): Promise<AccountType | null> {
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


// アイコンの番号を更新するAPI
export async function updateUserIcon(userId: string, selectedImageId:number): Promise<AccountType | null> {
    try {
      const response = await fetch('http://localhost:3000/api/signup/user-icon', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id : userId, profile_picture: selectedImageId }),
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
  

// ハンドルネームを更新するAPI
export async function updateUserHandle(userId: string, display_name:string): Promise<AccountType | null> {
    try {
      const response = await fetch('http://localhost:3000/api/signup/handle-name', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id : userId, display_name: display_name }),
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




