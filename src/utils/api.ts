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

//　メモを投稿するAPI
export async function postMemo(memoContent: string, isPublic : boolean): Promise<MemoLogType | null> {
  try {
    const response = await fetch('http://localhost:3000/api/memo-log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: memoContent ,isPublic:isPublic}),
    });
    if (!response.ok) {
      throw new Error("Failed to post memo");
    }
    const data = await response.json();
    return data.memo;
  } catch (error) {
    console.error(error);
    return null;
  }
}
