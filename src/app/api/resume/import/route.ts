import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET handler - for testing
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Resume import API is working. Use POST to import data.',
  });
}

// POST handler - import resume data
export async function POST(request: Request) {
  try {
    const resumeData = await request.json();
    console.log('Received resume data:', resumeData);

    const results = {
      skills: 0,
      projects: 0,
      about: false,
      socials: 0,
      errors: [] as string[]
    };

    // 1. Import Skills
    if (resumeData.skills && resumeData.skills.length > 0) {
      for (const skillName of resumeData.skills) {
        try {
          // Check if skill already exists
          const existing = await prisma.skill.findUnique({
            where: { name: skillName }
          });
          
          if (!existing) {
            await prisma.skill.create({
              data: {
                name: skillName,
                level: 80,
                category: 'technical',
                isVisible: true,
              }
            });
            results.skills++;
          }
        } catch (error) {
          console.error(`Failed to import skill: ${skillName}`, error);
          results.errors.push(`Skill: ${skillName}`);
        }
      }
    }

    // 2. Import Projects
    if (resumeData.projects && resumeData.projects.length > 0) {
      for (const project of resumeData.projects) {
        try {
          if (project.title) {
            const existing = await prisma.project.findFirst({
              where: { name: project.title }
            });
            
            if (!existing) {
              await prisma.project.create({
                data: {
                  name: project.title,
                  description: project.description || '',
                  technologies: project.technologies || [],
                  github: project.githubLink || '',
                  live: project.liveLink || null,
                }
              });
              results.projects++;
            }
          }
        } catch (error) {
          console.error(`Failed to import project: ${project.title}`, error);
          results.errors.push(`Project: ${project.title}`);
        }
      }
    }

    // 3. Update About Section
    if (resumeData.personalDetails) {
      try {
        const about = await prisma.aboutSetting.findFirst();
        
        const experienceYears = resumeData.experience?.length || 0;
        const projectCount = resumeData.projects?.length || 0;
        
        const newStats = [
          { value: `${projectCount}+`, label: 'Projects Completed', icon: 'Code2' },
          { value: `${experienceYears}+`, label: 'Years Experience', icon: 'Rocket' },
          { value: '15+', label: 'Happy Clients', icon: 'Users' },
          { value: '500+', label: 'Coffees', icon: 'Coffee' }
        ];

        const bio = `I'm ${resumeData.personalDetails.name || 'a developer'} with expertise in ${(resumeData.skills || []).slice(0, 5).join(', ')}.`;

        if (about) {
          await prisma.aboutSetting.update({
            where: { id: about.id },
            data: {
              bio: bio,
              stats: JSON.stringify(newStats)
            }
          });
        } else {
          await prisma.aboutSetting.create({
            data: {
              bio: bio,
              stats: JSON.stringify(newStats)
            }
          });
        }
        results.about = true;
      } catch (error) {
        console.error('Failed to update about section:', error);
        results.errors.push('About section update failed');
      }
    }

    // 4. Import Social Links
    if (resumeData.personalDetails?.socialMedia) {
      const socialMap: Record<string, string> = {
        'github': 'Github',
        'linkedin': 'Linkedin',
        'twitter': 'Twitter',
        'instagram': 'Instagram',
      };

      for (const socialUrl of resumeData.personalDetails.socialMedia) {
        try {
          const platform = Object.keys(socialMap).find(key => 
            socialUrl.toLowerCase().includes(key)
          );
          
          if (platform) {
            const existing = await prisma.socialLink.findFirst({
              where: { url: socialUrl }
            });
            
            if (!existing) {
              await prisma.socialLink.create({
                data: {
                  platform: socialMap[platform],
                  url: socialUrl,
                  icon: socialMap[platform],
                  isActive: true,
                }
              });
              results.socials++;
            }
          }
        } catch (error) {
          console.error(`Failed to import social link: ${socialUrl}`, error);
          results.errors.push(`Social: ${socialUrl}`);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Data imported successfully',
      results
    });

  } catch (error: any) {
    console.error('Import failed:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to import data' },
      { status: 500 }
    );
  }
}