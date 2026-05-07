import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

// Create a new Prisma client instance for this route
const prisma = new PrismaClient();

// GET - Fetch all skills
export async function GET() {
    try {
        const skills = await prisma.skill.findMany({
            orderBy: [
                { order: 'asc' },
                { name: 'asc' }
            ]
        });

        return NextResponse.json(skills || []);
    } catch (error) {
        console.error('GET /api/skills error:', error);
        return NextResponse.json([]);
    }
}

// POST - Create new skill
export async function POST(request: Request) {
    try {
        const body = await request.json();

        console.log('Received skill data:', body);

        // Validate required fields
        if (!body.name || body.name.trim() === '') {
            return NextResponse.json(
                { error: 'Skill name is required' },
                { status: 400 }
            );
        }

        // Create the skill
        const skill = await prisma.skill.create({
            data: {
                name: body.name.trim(),
                level: Number(body.level) || 80,
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