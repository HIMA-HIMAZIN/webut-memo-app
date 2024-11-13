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

// ハンドルネーム更新API
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PUT = async (req: Request, res: NextResponse) => {
    try {
        const { id, display_name } = await req.json();
        await main();
        const updatedUserHandle = await prisma.account.update({
            where: {
                id: id,
            },
            data: {
                display_name: display_name,
                updated_at: new Date(),
            },
        });
        return NextResponse.json({ message: 'success', updatedUserHandle }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: 'error', e }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};