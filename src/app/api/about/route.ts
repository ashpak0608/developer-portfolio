import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        let about = await prisma.aboutSetting.findFirst();

        if (!about) {
            return NextResponse.json({
                bio: "I'm a Full Stack Developer from Mira Road, India with a passion for building modern web applications that make a difference. With 3+ years of experience, I specialize in creating scalable backend systems and dynamic frontend interfaces.",
                stats: JSON.stringify([
                    { value: "20+", label: "Projects Completed", icon: "Code2" },
                    { value: "15+", label: "Happy Clients", icon: "Users" },
                    { value: "3+", label: "Years Experience", icon: "Rocket" },
                    { value: "500+", label: "Coffee Consumed", icon: "Coffee" }
                ])
            });
        }

        return NextResponse.json(about);
    } catch (error) {
        console.error('GET about error:', error);
        return NextResponse.json({
            bio: "Full Stack Developer with 3+ years of experience.",
            stats: JSON.stringify([])
        });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();

        let about = await prisma.aboutSetting.findFirst();

        if (about) {
            about = await prisma.aboutSetting.update({
                where: { id: about.id },
                data: {
                    bio: body.bio,
                    stats: JSON.stringify(body.stats),
                }
            });
        } else {
            about = await prisma.aboutSetting.create({
                data: {
                    bio: body.bio,
                    stats: JSON.stringify(body.stats),
                }
            });
        }

        return NextResponse.json(about);
    } catch (error) {
        console.error('PUT about error:', error);
        return NextResponse.json({ error: 'Failed to update about settings' }, { status: 500 });
    }
}