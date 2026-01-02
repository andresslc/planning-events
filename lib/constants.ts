export interface Event {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    title: "React Summit 2026",
    image: "/images/event1.png",
    slug: "react-summit-2026",
    location: "Amsterdam, Netherlands",
    date: "June 14-18, 2026",
    time: "9:00 AM - 6:00 PM CET"
  },
  {
    title: "AI & Machine Learning Hackathon",
    image: "/images/event2.png",
    slug: "ai-ml-hackathon-2026",
    location: "San Francisco, CA",
    date: "March 22-24, 2026",
    time: "10:00 AM - 8:00 PM PST"
  },
  {
    title: "Web3 Developer Conference",
    image: "/images/event3.png",
    slug: "web3-dev-conference",
    location: "Austin, TX",
    date: "April 10-12, 2026",
    time: "9:30 AM - 7:00 PM CST"
  },
  {
    title: "Cloud Native DevOps Summit",
    image: "/images/event4.png",
    slug: "cloud-native-devops-summit",
    location: "Seattle, WA",
    date: "May 5-7, 2026",
    time: "8:00 AM - 5:00 PM PST"
  },
  {
    title: "Mobile Dev Meetup: Flutter & React Native",
    image: "/images/event5.png",
    slug: "mobile-dev-meetup-2026",
    location: "New York, NY",
    date: "February 28, 2026",
    time: "6:00 PM - 9:00 PM EST"
  },
  {
    title: "Cybersecurity & Ethical Hacking Workshop",
    image: "/images/event6.png",
    slug: "cybersecurity-workshop-2026",
    location: "London, UK",
    date: "July 15-17, 2026",
    time: "10:00 AM - 6:00 PM GMT"
  }
];

