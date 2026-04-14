import { prisma } from '@/lib/prisma';
import { deleteImage } from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

// GET - Fetch single project
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id }
    });
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

// PUT - Update project
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const project = await prisma.project.update({
      where: { id: params.id },
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
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

// DELETE - Delete project
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get project to delete image from Cloudinary
    const project = await prisma.project.findUnique({
      where: { id: params.id }
    });
    
    if (project?.imagePublicId) {
      await deleteImage(project.imagePublicId);
    }
    
    await prisma.project.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}