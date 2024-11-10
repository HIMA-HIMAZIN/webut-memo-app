import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

//これはAccountテーブルのuser_nameを元にユーザー情報を取得するAPIです。

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    console.error(error);
  }
}

export const GET = async (req: Request) => {
  try {
    await main();

    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get('user_id');

    if (!user_id) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    const user = await prisma.account.findUnique({
      where: {
        user_name: user_id,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'success', user }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'error', error: "" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
