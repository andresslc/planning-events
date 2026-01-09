import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Event } from '@/database';

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Await params to get the slug (Next.js 15+ requirement)
    const { slug } = await params;

    // Validate slug parameter
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { error: 'Invalid slug parameter' },
        { status: 400 }
      );
    }

    // Validate slug format (URL-friendly characters only)
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        { error: 'Slug must contain only lowercase letters, numbers, and hyphens' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Find event by slug
    const event = await Event.findOne({ slug }).lean();

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found', slug },
        { status: 404 }
      );
    }

    // Return event data
    return NextResponse.json(
      {
        success: true,
        data: event,
      },
      { status: 200 }
    );

  } catch (error) {
    // Log error for debugging (in production, use proper logging service)
    console.error('Error fetching event by slug:', error);

    // Handle specific error types
    if (error instanceof Error) {
      // Database connection errors
      if (error.message.includes('connect') || error.message.includes('ECONNREFUSED')) {
        return NextResponse.json(
          { error: 'Database connection failed' },
          { status: 503 }
        );
      }

      // Mongoose validation errors
      if (error.name === 'ValidationError') {
        return NextResponse.json(
          { error: 'Invalid data format', details: error.message },
          { status: 400 }
        );
      }
    }

    // Generic server error
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

