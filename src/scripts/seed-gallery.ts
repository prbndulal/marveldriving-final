import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const images = [
    { url: "/slider-1.jpg", alt: "Professional driving lesson in progress", category: "lessons", order: 1 },
    { url: "/slider-2.jpg", alt: "NDIS transport service in action", category: "ndis", order: 2 },
    { url: "/slider-3.jpg", alt: "Student learning automatic driving", category: "lessons", order: 3 },
    { url: "/hero-dashboard.jpg", alt: "Marvel Driving overview", category: "general", order: 4 },
    { url: "/instructor.jpg", alt: "Our professional instructor", category: "team", order: 5 },
    { url: "/study.jpg", alt: "Driver Knowledge Test preparation", category: "lessons", order: 6 },
    { url: "/media__1771035511992.png", alt: "Marvel Driving service", category: "general", order: 7 },
    { url: "/media__1771036906137.png", alt: "NDIS support activity", category: "ndis", order: 8 },
    { url: "/media__1771036906157.png", alt: "Community participation support", category: "ndis", order: 9 },
    { url: "/media__1771036906181.png", alt: "Driving lesson activity", category: "lessons", order: 10 },
    { url: "/media__1771036906190.png", alt: "Transport service", category: "vehicles", order: 11 },
    { url: "/media__1771036906208.png", alt: "Marvel Driving team", category: "team", order: 12 },
    { url: "/media__1771038782842.png", alt: "NDIS participant support", category: "ndis", order: 13 },
    { url: "/media__1771038782854.png", alt: "Driving instruction session", category: "lessons", order: 14 },
    { url: "/media__1771038782871.png", alt: "Marvel vehicle fleet", category: "vehicles", order: 15 },
    { url: "/media__1771038782882.png", alt: "Community activity", category: "ndis", order: 16 },
    { url: "/media__1771038782892.png", alt: "Support service", category: "general", order: 17 },
    { url: "/media__1771039621445.png", alt: "Driving lesson", category: "lessons", order: 18 },
    { url: "/media__1771039649907.png", alt: "NDIS transport", category: "ndis", order: 19 },
    { url: "/media__1771040412440.png", alt: "Marvel Driving activity", category: "general", order: 20 },
    { url: "/media__1771040540895.png", alt: "Team at work", category: "team", order: 21 },
    { url: "/media__1771040905480.png", alt: "Vehicle and transport", category: "vehicles", order: 22 },
    { url: "/media__1771040953131.png", alt: "Participant support", category: "ndis", order: 23 },
    { url: "/media__1771041221557.png", alt: "Driving practice", category: "lessons", order: 24 },
    { url: "/media__1771041726873.png", alt: "Marvel Driving service", category: "general", order: 25 },
    { url: "/media__1771041771691.png", alt: "Community support", category: "ndis", order: 26 },
];

async function main() {
    // Clear existing gallery images first
    await prisma.galleryImage.deleteMany();

    const created = await prisma.galleryImage.createMany({ data: images });
    console.log(`✅ Seeded ${created.count} gallery images.`);
}

main()
    .catch(e => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
