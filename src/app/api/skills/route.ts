import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET - Fetch all visible skills for frontend
export async function GET() {
    try {
        const skills = await prisma.skill.findMany({
            orderBy: [
                { order: 'asc' },
                { name: 'asc' }
            ],
            where: { isVisible: true }
        });

        return NextResponse.json(skills || []);
    } catch (error) {
        console.error('GET /api/skills error:', error);
        return NextResponse.json([]);
    }
}

// POST - Create new skill (admin only)
export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.name || body.name.trim() === '') {
            return NextResponse.json(
                { error: 'Skill name is required' },
                { status: 400 }
            );
        }

        const level = Number(body.level);
        if (isNaN(level)) {
            return NextResponse.json(
                { error: 'Level must be a valid number' },
                { status: 400 }
            );
        }

        const skill = await prisma.skill.create({
            data: {
                name: body.name.trim(),
                level: Math.min(100, Math.max(0, level)),
                category: body.category || 'technical',
                order: Number(body.order) || 0,
                isVisible: body.isVisible === true || body.isVisible === 'true',
            }
        });

        return NextResponse.json(skill, { status: 201 });
    } catch (error: any) {
        console.error('POST /api/skills error:', error);

        if (error.code === 'P2002') {
            return NextResponse.json(
                { error: 'A skill with this name already exists' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: error.message || 'Failed to create skill' },
            { status: 500 }
        );
    }
}