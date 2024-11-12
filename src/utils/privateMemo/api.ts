import { MemoLogType } from '@/types';
// メモを取得するAPI
export async function fetchPrivateMemos(user_id: string): Promise<MemoLogType[] | null> {
    try {
      const response = await fetch(`http://localhost:3000/api/private-memo?user_id=${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
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
  