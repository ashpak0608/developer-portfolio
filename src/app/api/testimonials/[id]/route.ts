import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

async function getId(context: any): Promise<string> {
    const params = await context.params;
    return params.id;
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const id = await getId(context);
        const body = await request.json();

        const testimonial = await prisma.testimonial.update({
            where: { id },
            data: body
        });

        return NextResponse.json(testimonial);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const id = await getId(context);
        await prisma.testimonial.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}