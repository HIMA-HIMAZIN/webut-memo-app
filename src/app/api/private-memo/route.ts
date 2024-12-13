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
                is_public:true
            },
            include: {
                account: { 
                    select: {
                        user_name: true,
                        profile_picture: true,
                        display_name: true,
                        bio: true,
                        post_count: true,
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