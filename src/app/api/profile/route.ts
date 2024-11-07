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
         const memos = await prisma.memoLog.findMany();
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

 // メモ削除API
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DELETE = async (req: Request, res: NextResponse) => {
     try {
         const { id } = await req.json();
         await main();
         const deleteMemo = await prisma.memoLog.delete({
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
         const updatedMemo = await prisma.memoLog.update({
             where: {
                 id: Number(id),
             },
             data: {
                 content: content,
                 isPublic: isPublic,
                 updatedAt: new Date(),
             },
         });
         return NextResponse.json({ message: 'success', updatedMemo }, { status: 200 });
     } catch (e) {
         return NextResponse.json({ message: 'error', e }, { status: 500 });
     } finally {
         await prisma.$disconnect();
     }
 };