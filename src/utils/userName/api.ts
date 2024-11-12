import { AccountType } from '@/types';

//これはAccountテーブルのidを元にユーザー情報を取得するAPIです。

export async function fetchUserName(id: string): Promise<AccountType | null> {
  try {
    const response = await fetch(`http://localhost:3000/api/user-name?user_id=${id}`, {
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
