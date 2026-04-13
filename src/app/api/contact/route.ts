// src/app/api/contact/route.ts
// This file handles contact form submissions

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// POST /api/contact - Save a contact message
export async function POST(request: Request) {
  try {
    // Get the form data from request
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, message' },
        { status: 400 }
      )
    }
    
    // Save message to database
    const message = await prisma.message.create({
      data: {
        name: body.name,
        email: body.email,
        message: body.message,
        isRead: false, // Mark as unread by default
      }
    })
    
    // Return success response
    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error saving message:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

// GET /api/contact - Fetch all messages (for admin use)
export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: {
        sentAt: 'desc'  // Newest messages first
      }
    })
    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}