import { NextRequest, NextResponse } from 'next/server';
import Contact from '@/models/Contact';
import dbConnect from '@/lib/dbConnect';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
        }

        const contact = await Contact.create({ name, email, message });
        return NextResponse.json({ success: true, data: contact }, { status: 201 });
    } catch (error: any) {
        console.error('Contact form error:', error);
        return NextResponse.json({ error: error.message || 'Failed to submit' }, { status: 500 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        const contacts = await Contact.find().sort({ createdAt: -1 });
        return NextResponse.json(contacts);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
