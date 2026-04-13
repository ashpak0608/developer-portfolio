// src/app/api/projects/route.ts
// This file handles GET (fetch) and POST (create) requests for projects

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/projects - Fetch all projects
export async function GET() {
  try {
    // Fetch all projects from database, newest first
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc'  // Newest projects appear first
      }
    })

    // Return projects as JSON response
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create a new project
export async function POST(request: Request) {
  try {
    // Get the data from the request body
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.description || !body.github) {
      return NextResponse.json(
        { error: 'Missing required fields: name, description, github' },
        { status: 400 }
      )
    }
    
    // Create new project in database
    const project = await prisma.project.create({
      data: {
        name: body.name,
        description: body.description,
        technologies: body.technologies || [], // Use empty array if not provided
        github: body.github,
        live: body.live || null, // Use null if not provided
      }
    })
    
    // Return the created project
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}