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

// ユーザーアイコン更新API
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