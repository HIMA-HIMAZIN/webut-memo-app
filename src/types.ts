//表示するデータの型を定義するファイルです。

// メモの型
export type MemoLogType = {
    id: number;
    content: string;
    isPublic: boolean;
    likeCount: number;
    createdAt: string;
    updatedAt: string;
};