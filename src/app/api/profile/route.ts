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
      // Extract user_id from the query parameters
      const url = new URL(req.url);
      const user_id = url.searchParams.get('user_id');
      
      if (!user_id) {
        return NextResponse.json({ message: 'user_id is required' }, { status: 400 });
      }
  
      await main();
  
      // Fetch memos from the database
      const memos = await prisma.memolog.findMany({
        where: {
          user_id: user_id,
        },
      });
  
      return NextResponse.json({ message: 'success', memos }, { status: 200 });
    } catch (e) {
      return NextResponse.json({ message: 'error', error: e }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  };
  
 
// メモ投稿API
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const POST= async (req: Request, res: NextResponse) => {
    try{
         const {content,is_public} = await req.json();//ここではコンテンツと公開設定のみを受け取ります。必要ならば他の情報も受け取ることができます。
         await main();
         const post = await prisma.memolog.create({data:{content,is_public}});
         return NextResponse.json({ message: 'success', post }, { status: 201 });
    }catch(e){
         return NextResponse.json({ message: 'error', e }, { status: 500 });
    }finally{
         await prisma.$disconnect();
    }
 };

 // メモ削除API
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DELETE = async (req: Request, res: NextResponse) => {
     try {
         const { id } = await req.json();
         await main();
         const deleteMemo = await prisma.memolog.delete({
             where: {
                 id: Number(id), 
             },
         });
         return NextResponse.json({ message: 'success', deleteMemo }, { status: 200 });
     } catch (e) {
         return NextResponse.json({ message: 'error', e }, { status: 500 });
     } finally {
         await prisma.$disconnect();
     }
 };
 
// メモ更新API
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PUT = async (req: Request, res: NextResponse) => {
     try {
         const { id, content, isPublic } = await req.json();
         await main();
         const updatedMemo = await prisma.memolog.update({
             where: {
                 id: Number(id),
             },
             data: {
                 content: content,
                 is_public: isPublic,
                 updated_at: new Date(),
             },
         });
         return NextResponse.json({ message: 'success', updatedMemo }, { status: 200 });
     } catch (e) {
         return NextResponse.json({ message: 'error', e }, { status: 500 });
     } finally {
         await prisma.$disconnect();
     }
 };