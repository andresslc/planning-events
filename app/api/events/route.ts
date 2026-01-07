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

        const createdEvent = await Event.create(event);

        return NextResponse.json({ message: 'Event created successfully', event: createdEvent }, { status: 201 });
 } catch (e) {
    return NextResponse.json({ message: 'Event creation failed', error: e instanceof Error ? e.message : 'Unknown error' }, { status: 500 });
 }
}