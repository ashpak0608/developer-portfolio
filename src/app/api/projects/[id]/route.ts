import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET - Fetch single project
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await Promise.resolve(params);

    const project = await prisma.project.findUnique({
      where: { id: id }
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('GET project error:', error);
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

// PUT - Update project
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await Promise.resolve(params);
    const body = await request.json();

    const project = await prisma.project.update({
      where: { id: id },
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

    return NextResponse.json(project);
  } catch (error) {
    console.error('PUT project error:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

// ✅ FIXED: DELETE - Delete project
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await Promise.resolve(params);

    console.log('Attempting to delete project with ID:', id);

    // First check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id: id }
    });

    if (!existingProject) {
      console.log('Project not found:', id);
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Delete the project
    await prisma.project.delete({
      where: { id: id }
    });

    console.log('Project deleted successfully:', id);

    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('DELETE project error:', error);
    return NextResponse.json({
      error: 'Failed to delete project',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}