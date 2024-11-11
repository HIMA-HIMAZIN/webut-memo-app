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

// ユーザーネーム更新API
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PUT = async (req: Request, res: NextResponse) => {
    try {
        const { id, userId } = await req.json();
        await main();
        const updatedMemo = await prisma.account.update({
            where: {
                id: id,
            },
            data: {
                user_name : userId,
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