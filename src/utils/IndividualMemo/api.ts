import { MemoLogType } from '@/types';

// メモを取得するAPI
export async function fetchMemos(user_id: string): Promise<MemoLogType[] | null> {
  try {
    const response = await fetch(`http://localhost:3000/api/individual-memo?user_id=${user_id}`, {
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

//　メモを投稿するAPI
export async function postMemo(memoContent: string, isPublic : boolean, userId: string): Promise<MemoLogType | null> {
  try {
    const response = await fetch('http://localhost:3000/api/individual-memo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: memoContent ,is_public:isPublic, user_id: userId}),
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// メモを削除するAPI
export async function deleteMemo(id: number): Promise<boolean> {
  try {
    const response = await fetch(`http://localhost:3000/api/individual-memo`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw new Error("Failed to delete memo");
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// メモを更新するAPI
export async function updateMemo(id: number, memoContent: string, isPublic: boolean): Promise<MemoLogType | null> {
  try {
    const response = await fetch('http://localhost:3000/api/individual-memo', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id:id, content: memoContent, isPublic:isPublic }),
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