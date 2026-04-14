import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET - Fetch all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('GET projects error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST - Create new project
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const project = await prisma.project.create({
      data: {
        name: body.name,
        description: body.description,
        technologies: body.technologies,
        github: body.github,
        live: body.live,
        imageUrl: body.imageUrl,
        imagePublicId: body.imagePublicId,
      }
    });
    
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('POST project error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}