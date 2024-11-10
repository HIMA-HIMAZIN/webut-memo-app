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
// 全メモログ取得API
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (req: Request, res: NextResponse) => {
     try {
          await main();
          const memos = await prisma.memolog.findMany({
              where: {
                  is_public: true,
              },
              include: {
                account: { 
                  select: {
                    user_name: true,
                    profile_picture: true,
                    bio: true,
                    display_name: true,
                  },
                },
              },
          });
          return NextResponse.json({ message: 'success', memos }, { status: 200 });
     } catch (e) {
          return NextResponse.json({ message: 'error', e }, { status: 500 });
     } finally {
          await prisma.$disconnect();
     }
  };
  
    
