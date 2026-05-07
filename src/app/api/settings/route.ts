import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const settings = await prisma.siteSetting.findMany();
        const settingsMap = settings.reduce((acc, setting) => {
            acc[setting.key] = setting.value;
            return acc;
        }, {} as Record<string, string>);

        return NextResponse.json({
            siteTitle: settingsMap.siteTitle || "Ashpak Shaikh - Developer Portfolio",
            siteDescription: settingsMap.siteDescription || "Full Stack Developer portfolio showcasing projects and skills",
            footerText: settingsMap.footerText || "© 2024 Ashpak Shaikh. All rights reserved.",
            contactEmail: settingsMap.contactEmail || "shaikhashpak0608@gmail.com",
            resumeUrl: settingsMap.resumeUrl || "",
        });
    } catch (error) {
        console.error('GET settings error:', error);
        return NextResponse.json({
            siteTitle: "Ashpak Shaikh - Developer Portfolio",
            siteDescription: "Full Stack Developer portfolio",
            footerText: "© 2024 Ashpak Shaikh. All rights reserved.",
            contactEmail: "shaikhashpak0608@gmail.com",
            resumeUrl: "",
        });
    }
}

export async function POST(request: Request) {
    try {
        const updates = await request.json();

        for (const [key, value] of Object.entries(updates)) {
            await prisma.siteSetting.upsert({
                where: { key },
                update: { value: String(value), type: 'text', category: 'general' },
                create: { key, value: String(value), type: 'text', category: 'general' }
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('POST settings error:', error);
        return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
    }
}