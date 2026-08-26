import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';

// GET - Check if the route is working
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Resume upload API is working. Use POST to upload a file.',
    method: 'POST',
    endpoint: '/api/resume/upload',
    acceptedFormat: 'multipart/form-data with field "resume"'
  });
}

// POST - Handle file upload
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

    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const uploadDir = join(process.cwd(), 'uploads');
    const filePath = join(uploadDir, `${Date.now()}-${file.name}`);
    
    await writeFile(filePath, buffer);

    // Sample response data
    const sampleData = {
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

    // Clean up the uploaded file
    await unlink(filePath);

    return NextResponse.json({
      success: true,
      data: sampleData,
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