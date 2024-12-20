import { AccountType } from '@/types';

//これはAccountテーブルのuser_nameを元にユーザー情報を取得するAPIです。

export async function fetchUser(id: string): Promise<AccountType | null> {
  try {
    const response = await fetch(`/api/profile?user_id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error(error);
    return null;
  }
}
