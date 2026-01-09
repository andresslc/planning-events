import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database/event.model";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import { notFound } from "next/navigation";

const EventDetailItem = ({ icon, alt, label }: { icon: string, alt: string, label: string }) => {
    return (
        <div className="flex flex-row gap-2">
            <img src={icon} alt={alt} width={17} height={17} />
            <p>{label}</p>
        </div>
    )
}

const EventAgenda = ({ agenda }: { agenda: string[] }) => {
    return (
        <div className="agenda">
            <h2>Agenda</h2>
            <ul>
                {agenda.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

const EventTags = ({ tags }: { tags: string[] }) => {
    return (
        <div className="flex flex-row gap-1.5 flex-wrap">
            {tags.map((tag) => (
                <div key={tag} className="pill">{tag}</div>
            ))}
        </div>
    )
}

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const request = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${slug}`);
    const { data: { description, image, overview, title, venue, location, date, time, mode, audience, agenda, organizer, tags } } = await request.json();
    
    if (!description || !image || !overview || !title || !venue || !location || !date || !time || !mode || !audience || !agenda || !organizer || !tags) return notFound();

    const bookings = 10;

    const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

    return (
        <section id="event">
            <h1>Event Details: <br /> {title}</h1>

            <div className="header">
                <h1>Event Description</h1>
                <div className="mt-2">
                    <p>{description}</p>
                </div>
            </div>

            <div className="details">
                {/* Left Side - Event Content */}
                <div className="content">
                    <img src={image} alt='Event Banner' width={800} height={800} className="banner" />

                    <section className="flex-col-gap-2">
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>
                    <section className="flex-col-gap-2">
                        <h2>Event Details</h2>
                        <EventDetailItem icon="/icons/calendar.svg" alt="Date" label={date} />
                        <EventDetailItem icon="/icons/clock.svg" alt="Time" label={time} />
                        <EventDetailItem icon="/icons/pin.svg" alt="Location" label={location} />
                        <EventDetailItem icon="/icons/mode.svg" alt="Mode" label={mode} />
                        <EventDetailItem icon="/icons/audience.svg" alt="Audience" label={audience} />
                    </section>

                    <EventAgenda agenda={agenda} />

                    <section className="flex-col-gap-2">
                        <h2>Organizer</h2>
                        <p>{organizer}</p>
                    </section>

                    <EventTags tags={tags} />

                </div>
                {/* Right Side - Booking form */}
                <aside className="booking">
                    <div className="signup-card">
                        <h2>Book Your Spot</h2>
                        {bookings > 0 ? (
                            <p className="text-sm">Join {bookings} others in attending this event</p>
                        ) : (
                            <p className="text-sm">No bookings available</p>
                        )}

                        <BookEvent />
                    </div>
                </aside>
            </div>

            <div className="flex w-full flex-col gap-4 pt-20">
                <h2>Similar Events</h2>
                <div className="events">
                    { similarEvents && similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent) => (
                        <EventCard key={similarEvent.title} {...similarEvent} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default EventDetailsPage