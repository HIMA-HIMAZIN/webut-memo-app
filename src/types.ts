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
    account: AccountType; // 関連するユーザー情報を含むフィールド
};

export type AccountType = {
    id: string;
    display_name: string;
    profile_picture: number;
    bio?: string;
    created_at: string;
    updated_at: string;
    user_name: string;
};

export type LikeType = {
    id: string;
    user_id: string;
    memo_id: number;
    created_at: string;
    updated_at: string;
}
