//表示するデータの型を定義するファイルです。

// メモの型
export type MemoLogType = {
    id: number;
    user_id: string;
    content: string;
    is_public: boolean;
    like_count: number;
    created_at: string;
    updated_at: string;
};