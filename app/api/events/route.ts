import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

export async function POST(request: Request) {
    try {
        await connectDB();

        const formData = await request.formData();

        let event;

        try {
            event = Object.fromEntries(formData.entries());
        } catch (e) {
            return NextResponse.json({ message: 'Invalid form data' }, { status: 400 });
        }

        let tags = JSON.parse(formData.get('tags') as string);
        let agenda = JSON.parse(formData.get('agenda') as string);

        const createdEvent = await Event.create({ ...event, tags: tags, agenda: agenda });

        return NextResponse.json({ message: 'Event created successfully', event: createdEvent }, { status: 201 });
 } catch (e) {
    return NextResponse.json({ message: 'Event creation failed', error: e instanceof Error ? e.message : 'Unknown error' }, { status: 500 });
 }
}

export async function GET() {
    try {
        await connectDB();

        const events = await Event.find().sort({ createdAt: -1 });

        return NextResponse.json({ message: 'Events fetched successfully', events }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: 'Events fetching failed', error: e instanceof Error ? e.message : 'Unknown error' }, { status: 500 });
    }
}