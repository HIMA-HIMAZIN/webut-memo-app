import { AccountType } from '@/types';

//これはAccountテーブルのuser_nameを元にユーザー情報を取得するAPIです。

export async function fetchUser(id: string): Promise<AccountType | null> {
  try {
    const response = await fetch(`http://localhost:3000/api/profile?user_id=${id}`, {
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
