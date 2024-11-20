import { useEffect, useState } from "react";
import { getCurrentUser } from "@/utils/supabase/getCurrentUser";

export function useCurrentUser() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setUserId(user.id);
        } else {
          setError("ユーザーが取得できませんでした");
        }
      } catch (err) {
        setError("ユーザーの取得中にエラーが発生しました");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return { userId, loading, error };
}