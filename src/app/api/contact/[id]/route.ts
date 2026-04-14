import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// DELETE - Delete a message
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    await prisma.message.delete({
      where: { id: id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE message error:', error);
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}

// PUT - Mark message as read/unread
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { isRead } = await request.json();
    
    const message = await prisma.message.update({
      where: { id: id },
      data: { isRead }
    });
    
    return NextResponse.json(message);
  } catch (error) {
    console.error('PUT message error:', error);
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}