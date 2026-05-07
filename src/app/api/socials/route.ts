import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET - Fetch all social links
export async function GET() {
    try {
        const socials = await prisma.socialLink.findMany({
            orderBy: { order: 'asc' }
        });
        return NextResponse.json(socials || []);
    } catch (error) {
        console.error('GET socials error:', error);
        return NextResponse.json([]);
    }
}

// POST - Create social link
export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.platform || !body.url) {
            return NextResponse.json(
                { error: 'Platform and URL are required' },
                { status: 400 }
            );
        }

        const social = await prisma.socialLink.create({
            data: {
                platform: body.platform,
                url: body.url,
                icon: body.icon || body.platform,
                isActive: body.isActive ?? true,
                order: body.order || 0,
            }
        });

        return NextResponse.json(social, { status: 201 });
    } catch (error: any) {
        console.error('POST social error:', error);

        if (error.code === 'P2002') {
            return NextResponse.json(
                { error: 'Platform already exists' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to create social link' },
            { status: 500 }
        );
    }
}