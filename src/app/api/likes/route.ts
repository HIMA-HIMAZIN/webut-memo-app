import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function main(){
    try{
        await prisma.$connect();
    }catch(error){
        console.error(error);
    }
}

// いいね投稿API
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const POST= async (req: Request, res: NextResponse) => {
    try{
         const {user_id, monologue_id} = await req.json();
         if (!user_id || !monologue_id) {
          return NextResponse.json({ message: 'user_id and monologue_id are required' }, { status: 400 });
        }
         await main();
         const post = await prisma.likes.create({data:{user_id, monologue_id}});
         return NextResponse.json({ likes: 'success', post }, { status: 201 });
    }catch(e){
         return NextResponse.json({ message: 'error', e }, { status: 500 });
    }finally{
         await prisma.$disconnect();
    }
 };

//　いいね削除API
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DELETE = async (req: Request) => {
    try {
      const { user_id, monologue_id } = await req.json();
      if (!user_id || !monologue_id) {
        return NextResponse.json({ message: 'user_id and monologue_id are required' }, { status: 400 });
      }
  
      await prisma.likes.deleteMany({
        where: {
          user_id: user_id,
          monologue_id: monologue_id,
        },
      });
  
      return NextResponse.json({ message: 'success' }, { status: 200 });
    } catch (e) {
      console.error('Delete operation failed:', e);
      const errorMessage = e instanceof Error ? e.message : String(e);
      return NextResponse.json({ message: 'error', error: errorMessage }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  };