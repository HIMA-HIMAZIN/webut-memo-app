//　いいねするAPI
export async function postLike(user_id : string, monologue_id:number): Promise<boolean> {
    try {
      const response = await fetch('http://localhost:3000/api/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id : user_id , monologue_id : monologue_id}),
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
  
  // いいねを削除するAPI
  export async function deleteLike(user_id : string, monologue_id:number): Promise<boolean> {
    try {
      const response = await fetch(`http://localhost:3000/api/likes`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id : user_id , monologue_id : monologue_id}),
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