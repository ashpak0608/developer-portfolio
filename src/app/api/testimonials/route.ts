import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            orderBy: { order: 'asc' },
            where: { isVisible: true }
        });
        return NextResponse.json(testimonials);
    } catch (error) {
        return NextResponse.json([]);
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const testimonial = await prisma.testimonial.create({
            data: {
                name: body.name,
                company: body.company,
                position: body.position,
                content: body.content,
                rating: body.rating || 5,
                imageUrl: body.imageUrl,
                imagePublicId: body.imagePublicId,
                isVisible: body.isVisible ?? true,
                order: body.order || 0,
            }
        });

        return NextResponse.json(testimonial, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
    }
}