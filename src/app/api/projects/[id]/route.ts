import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET - Fetch single project
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
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
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
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

// DELETE - Delete project
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    const project = await prisma.project.findUnique({
      where: { id: id }
    });
    
    if (project?.imagePublicId) {
      const { deleteImage } = await import('@/lib/cloudinary');
      await deleteImage(project.imagePublicId);
    }
    
    await prisma.project.delete({
      where: { id: id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE project error:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}