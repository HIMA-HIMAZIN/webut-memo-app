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
          const memos = await prisma.memoLog.findMany({
              where: {
                  isPublic: true,
              },
          });
          return NextResponse.json({ message: 'success', memos }, { status: 200 });
     } catch (e) {
          return NextResponse.json({ message: 'error', e }, { status: 500 });
     } finally {
          await prisma.$disconnect();
     }
  };
  
    
// メモ投稿API
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const POST= async (req: Request, res: NextResponse) => {
    try{
         const {content,isPublic} = await req.json();//ここではコンテンツと公開設定のみを受け取ります。必要ならば他の情報も受け取ることができます。
         await main();
         const post = await prisma.memoLog.create({data:{content,isPublic}});
         return NextResponse.json({ message: 'success', post }, { status: 201 });
    }catch(e){
         return NextResponse.json({ message: 'error', e }, { status: 500 });
    }finally{
         await prisma.$disconnect();
    }
 };
     