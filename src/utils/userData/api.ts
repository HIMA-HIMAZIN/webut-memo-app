import { AccountType } from '@/types';

//これはAccountテーブルのidを元にユーザー情報を取得するAPIです。

export async function fetchUserName(id: string): Promise<AccountType | null> {
  try {
    const response = await fetch(`http://localhost:3000/api/user?user_id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error(error);
    return null;
  }
}


// ユーザー情報を更新するAPI
export async function updateUser(userId:string,user_name:string,profile_picture:number, display_name:string,bio:string): Promise<AccountType | null> {
  try {
    const response = await fetch('http://localhost:3000/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id : userId, user_name: user_name, profile_picture: profile_picture, display_name: display_name, bio: bio }),
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


  