import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

async function getId(context: any): Promise<string> {
    const params = await context.params;
    return params.id;
}

export async function PUT(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const id = await getId(context);
        const body = await request.json();

        const social = await prisma.socialLink.update({
            where: { id },
            data: {
                platform: body.platform,
                url: body.url,
                icon: body.icon,
                isActive: body.isActive,
                order: body.order,
            }
        });

        return NextResponse.json(social);
    } catch (error) {
        console.error('PUT social error:', error);
        return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const id = await getId(context);
        await prisma.socialLink.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('DELETE social error:', error);
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}