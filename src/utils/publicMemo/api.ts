import { MemoLogType } from '@/types';

// メモを取得するAPI
export async function fetchMemos(): Promise<MemoLogType[]> {
  try {
    const response = await fetch('/api/public-memo', {
      cache: 'no-store',
    });
    const data = await response.json();
    return data.memos;
  } catch (error) {
    console.error(error);
    return [];
  }
}
