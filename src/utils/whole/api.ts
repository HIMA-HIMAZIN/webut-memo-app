import { MemoLogType } from '@/types';

// メモを取得するAPI
export async function fetchMemos(): Promise<MemoLogType[]> {
  try {
    const response = await fetch('http://localhost:3000/api/memo-log', {
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
