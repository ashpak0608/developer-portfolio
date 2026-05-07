import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        let hero = await prisma.heroSetting.findFirst();

        if (!hero) {
            return NextResponse.json({
                greeting: "Hi, I'm",
                name: "Ashpak Shaikh",
                titleLines: ["Full Stack Developer", "Next.js Developer", "Node.js Backend Engineer"],
                description: "I build scalable, performant applications using modern technologies that solve real-world problems and help businesses grow.",
                primaryBtnText: "View My Work",
                secondaryBtnText: "Contact Me"
            });
        }

        return NextResponse.json(hero);
    } catch (error) {
        console.error('GET hero error:', error);
        return NextResponse.json({
            greeting: "Hi, I'm",
            name: "Ashpak Shaikh",
            titleLines: ["Full Stack Developer", "Next.js Developer"],
            description: "I build scalable applications using modern technologies.",
            primaryBtnText: "View My Work",
            secondaryBtnText: "Contact Me"
        });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();

        let hero = await prisma.heroSetting.findFirst();

        if (hero) {
            hero = await prisma.heroSetting.update({
                where: { id: hero.id },
                data: {
                    greeting: body.greeting,
                    name: body.name,
                    titleLines: body.titleLines,
                    description: body.description,
                    primaryBtnText: body.primaryBtnText,
                    secondaryBtnText: body.secondaryBtnText,
                }
            });
        } else {
            hero = await prisma.heroSetting.create({
                data: {
                    greeting: body.greeting,
                    name: body.name,
                    titleLines: body.titleLines,
                    description: body.description,
                    primaryBtnText: body.primaryBtnText,
                    secondaryBtnText: body.secondaryBtnText,
                }
            });
        }

        return NextResponse.json(hero);
    } catch (error) {
        console.error('PUT hero error:', error);
        return NextResponse.json({ error: 'Failed to update hero settings' }, { status: 500 });
    }
}