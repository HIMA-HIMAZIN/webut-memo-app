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
        const { searchParams } = new URL(req.url);
        const user_id = searchParams.get('user_id');
        if (!user_id) {
            return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }
        const memos = await prisma.memolog.findMany({
            where: {
                user_id: user_id,
            },
            include: {
                account: { 
                    select: {
                        user_name: true,
                        profile_picture: true,
                        display_name: true,
                        bio: true,
                    },
                },
            },
        });

        return NextResponse.json({ message: 'success', memos }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'error', e }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

// メモ投稿API
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const POST= async (req: Request, res: NextResponse) => {
    try{
         const {content,is_public,user_id} = await req.json();//ここではコンテンツと公開設定のみを受け取ります。必要ならば他の情報も受け取ることができます。
         await main();
         const post = await prisma.memolog.create({data:{content,is_public,user_id}});
         return NextResponse.json({ message: 'success', post }, { status: 201 });
    }catch(e){
         return NextResponse.json({ message: 'error', e }, { status: 500 });
    }finally{
         await prisma.$disconnect();
    }
 };

// メモ更新API
export const PUT = async (req: Request) => {
  try {
    const { id, content, isPublic } = await req.json();
    if (!id || content === undefined || isPublic === undefined) {
      return NextResponse.json({ message: 'ID, content, and isPublic are required' }, { status: 400 });
    }

    await prisma.$connect();
    const updatedMemo = await prisma.memolog.update({
      where: { id: id },
      data: {
        content: content,
        is_public: isPublic,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({ message: 'success', updatedMemo }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'error', error: (e as Error).message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};


// メモ削除API
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DELETE = async (req: Request, res: NextResponse) => {
    try {
      const { id } = await req.json();
      if (!id) {
        return NextResponse.json({ message: 'ID is required' }, { status: 400 });
      }
  
      await main();
      await prisma.memolog.delete({
        where: { id: Number(id) },
      });
  
      return NextResponse.json({ message: 'success' }, { status: 200 });
    } catch (e) {
      console.error(e);
      return NextResponse.json({ message: 'error', e }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  };
  