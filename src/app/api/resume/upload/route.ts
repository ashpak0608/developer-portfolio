import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory parser (no file system writes)
async function parseResumeFromBuffer(buffer: Buffer, fileName: string) {
  // For now, return sample data
  // In production, you would call Gemini API here with the buffer
  return {
    personalDetails: {
      name: "Ashpak Shaikh",
      email: "shaikhashpak0608@gmail.com",
      socialMedia: [
        "https://github.com/ashpak0608",
        "https://linkedin.com/in/ashpak-shaikh"
      ]
    },
    skills: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS"],
    projects: [
      {
        title: "Amazon Clone",
        description: "Full e-commerce platform",
        technologies: ["React", "Node.js", "MySQL"],
        githubLink: "https://github.com/ashpak0608/amazon"
      },
      {
        title: "Jarvis AI",
        description: "AI voice assistant",
        technologies: ["Python", "OpenAI"],
        githubLink: "https://github.com/ashpak0608/jarvis-ai"
      }
    ],
    experience: [
      {
        jobTitle: "Backend Developer",
        company: "Vkart InfoSolutions",
        duration: "3 years",
        description: "Building scalable backend systems"
      }
    ]
  };
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('resume') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Convert file to buffer (in memory - no disk write!)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Parse the resume from buffer (in memory)
    const parsedData = await parseResumeFromBuffer(buffer, file.name);

    return NextResponse.json({
      success: true,
      data: parsedData,
      message: 'Resume parsed successfully!'
    });

  } catch (error: any) {
    console.error('Resume upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process resume' },
      { status: 500 }
    );
  }
}