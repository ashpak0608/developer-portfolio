import { prisma } from '@/lib/prisma';
import { sendContactNotification } from '@/lib/email';
import { NextResponse } from 'next/server';

// GET - Fetch all messages (for admin)
export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { sentAt: 'desc' }
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error('GET messages error:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

// POST - Save new message
export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    
    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Save to database
    const newMessage = await prisma.message.create({
      data: { name, email, message }
    });
    
    // Send email notifications (don't await - let it run in background)
    sendContactNotification(name, email, message).catch(console.error);
    
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error('POST message error:', error);
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}