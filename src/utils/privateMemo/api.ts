import { MemoLogType } from '@/types';
// メモを取得するAPI
export async function fetchPrivateMemos(user_id: string): Promise<MemoLogType[] | null> {
    try {
      const response = await fetch(`/api/private-memo?user_id=${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
      const data = await response.json();
      return data.memos;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  