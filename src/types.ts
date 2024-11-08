//表示するデータの型を定義するファイルです。

// メモの型
export type MemoLogType = {
    id: number;
    content: string;
    is_public: boolean;
    created_at: string;
    updated_at: string;
    user_id: string;
};