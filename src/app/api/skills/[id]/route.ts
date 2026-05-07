import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Helper to get ID
async function getId(context: any): Promise<string> {
    const params = await context.params;
    return params.id;
}

// GET - Get single skill
export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const id = await getId(context);

        const skill = await prisma.skill.findUnique({
            where: { id: id }
        });

        if (!skill) {
            return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
        }

        return NextResponse.json(skill);
    } catch (error) {
        console.error('GET /api/skills/[id] error:', error);
        return NextResponse.json({ error: 'Failed to fetch skill' }, { status: 500 });
    }
}

// PUT - Update skill
export async function PUT(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const id = await getId(context);
        const body = await request.json();

        console.log('Updating skill:', id, body);

        if (!body.name || body.name.trim() === '') {
            return NextResponse.json(
                { error: 'Skill name is required' },
                { status: 400 }
            );
        }

        const skill = await prisma.skill.update({
            where: { id: id },
            data: {
                name: body.name.trim(),
                level: Number(body.level),
                category: body.category,
                order: Number(body.order),
                isVisible: body.isVisible === true || body.isVisible === 'true',
            }
        });

        return NextResponse.json(skill);
    } catch (error: any) {
        console.error('PUT /api/skills/[id] error:', error);

        if (error.code === 'P2025') {
            return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
        }
        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'A skill with this name already exists' }, { status: 409 });
        }

        return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 });
    }
}

// DELETE - Delete skill
export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const id = await getId(context);

        await prisma.skill.delete({
            where: { id: id }
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('DELETE /api/skills/[id] error:', error);

        if (error.code === 'P2025') {
            return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
        }

        return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 });
    }
}