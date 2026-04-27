import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const posts = [
  {
    slug: "driving-test-routes-sydney",
    title: "Top 5 Driving Test Routes in Sydney's St George Area",
    excerpt: "Discover the most common driving test routes in Hurstville, Penshurst and surrounding suburbs. Learn what to expect and how to prepare for your NSW driving test in the St George area.",
    category: "Sydney Driving",
    author: "Marvel Driving",
    image: "/slider-1.jpg",
    readTime: "6 min read",
    featured: true,
    published: true,
    content: `<p class="lead">Preparing for your driving test in Sydney's St George area? Understanding the common test routes can give you a significant advantage. Our experienced instructors at Marvel Driving have guided hundreds of learners through these exact routes, and here's what you need to know.</p>

<h2>1. Hurstville to Penshurst Loop</h2>
<p>This popular route takes you through Forest Road, one of the busiest shopping strips in the St George area. Expect heavy traffic, pedestrian crossings, and tight parallel parking spots. The test often includes turning onto Queens Road and navigating back via Railway Parade.</p>
<div class="tip-box warning"><strong>⚠️ Watch out:</strong> School zones along Forest Road are active from 8:00–9:30 AM and 2:30–4:00 PM. Missing one can result in an automatic fail.</div>

<h2>2. Bexley Road Circuit</h2>
<p>Starting from the Hurstville Service Centre, this route heads down Bexley Road towards Rockdale. You'll encounter multi-lane roundabouts, bus zones, and several give-way intersections.</p>
<h3>Key skills tested:</h3>
<ul>
  <li>Multi-lane roundabout navigation</li>
  <li>Merging into traffic from side streets</li>
  <li>Speed management through residential zones</li>
  <li>Correct use of indicators at roundabouts</li>
</ul>

<h2>3. King Georges Road Route</h2>
<p>This is considered one of the more challenging routes due to the high volume of traffic on King Georges Road. You'll need to demonstrate confident merging, proper mirror checks, and the ability to handle traffic lights with turning arrows.</p>

<h2>4. Connells Point Residential Route</h2>
<p>A calmer route that winds through the residential streets of Connells Point and South Hurstville. Examiners use this route to test your ability to handle narrow roads, parked cars on both sides, and T-intersections with limited visibility.</p>
<h3>Preparation tips for this route:</h3>
<ol>
  <li>Practice your three-point turns in quiet cul-de-sacs</li>
  <li>Always check for driveways and pedestrians</li>
  <li>Maintain the 50 km/h residential speed limit consistently</li>
  <li>Use the kerb-side stop technique when asked to pull over</li>
</ol>

<h2>5. Sans Souci & Kogarah Bay Loop</h2>
<p>This scenic route takes you through Sans Souci towards Kogarah Bay. It includes a mix of 50 and 60 km/h zones, roundabouts of varying sizes, and the challenging Rocky Point Road intersection.</p>

<hr/>

<h2>General Test Preparation Tips</h2>
<div class="checklist">
  <div class="check-item"><strong>Book lessons at test time</strong> — Practice at the same time of day as your test to experience similar traffic conditions.</div>
  <div class="check-item"><strong>Master the pre-drive checks</strong> — Adjust mirrors, seat, and steering wheel before starting.</div>
  <div class="check-item"><strong>Practice commentary driving</strong> — Narrate what you see and plan to do.</div>
  <div class="check-item"><strong>Know the speed limits</strong> — 50 km/h residential, 60 km/h main roads unless signed otherwise.</div>
  <div class="check-item"><strong>Check blind spots consistently</strong> — Head checks before every lane change and merge.</div>
</div>

<h2>Common Mistakes That Fail Learners</h2>
<ul>
  <li><strong>Not checking mirrors often enough</strong> — Examiners expect regular mirror checks every 8–10 seconds</li>
  <li><strong>Rolling through stop signs</strong> — You must come to a complete stop</li>
  <li><strong>Incorrect roundabout signalling</strong> — Signal left when exiting, even if going straight</li>
  <li><strong>Driving too slowly</strong> — Under-speed driving is just as dangerous as speeding</li>
  <li><strong>Poor observation at intersections</strong> — Always look left-right-left before proceeding</li>
</ul>`,
  },
  {
    slug: "sydney-traffic-peak-hours",
    title: "Navigating Sydney Traffic: Best Times to Drive and Practice",
    excerpt: "Understanding Sydney's peak hours is crucial for new drivers. Learn the best times to practice driving in Hurstville, Bexley and Penshurst to build your confidence safely.",
    category: "Sydney Driving",
    author: "Marvel Driving",
    image: "/slider-2.jpg",
    readTime: "5 min read",
    featured: false,
    published: true,
    content: `<p class="lead">Sydney's traffic can be intimidating for new drivers. Understanding when the roads are busiest — and when they're quieter — helps you build confidence gradually and log your hours more effectively.</p>

<h2>Sydney's Peak Traffic Hours</h2>
<p>Morning peak runs from <strong>7:00 AM to 9:30 AM</strong>, and the evening peak from <strong>4:00 PM to 7:00 PM</strong>. In the St George area, key roads like King Georges Road, Forest Road, and the Princes Highway become heavily congested during these times.</p>

<h2>Best Times to Practice</h2>
<h3>For beginners:</h3>
<ul>
  <li><strong>Weekend mornings (7–9 AM)</strong> — Roads are quieter with less commercial traffic</li>
  <li><strong>Weekday mid-morning (10 AM–12 PM)</strong> — School drop-off traffic has cleared</li>
  <li><strong>Sunday afternoons</strong> — Ideal for highway practice on the M5</li>
</ul>

<h3>For intermediate learners:</h3>
<ul>
  <li><strong>Weekday early afternoons (1–3 PM)</strong> — Moderate traffic for building confidence</li>
  <li><strong>Saturday midday</strong> — Good mix of traffic types around shopping centres</li>
</ul>

<h3>For test preparation:</h3>
<p>Practice at the same time your test is booked. This ensures you're familiar with the exact traffic conditions you'll face.</p>

<h2>Areas to Avoid as a Beginner</h2>
<ul>
  <li>King Georges Road during peak hours</li>
  <li>Forest Road, Hurstville on Saturday mornings (market traffic)</li>
  <li>The M5 on-ramp at Bexley Road during evening peak</li>
</ul>`,
  },
  {
    slug: "ndis-transport-services-sydney",
    title: "NDIS Transport Services in Sydney: What You Need to Know",
    excerpt: "A comprehensive guide to accessing NDIS transport services in Sydney's St George region. Understand your funding, provider options and how Marvel can support your transport needs.",
    category: "NDIS Services",
    author: "Marvel Driving",
    image: "/slider-3.jpg",
    readTime: "7 min read",
    featured: false,
    published: true,
    content: `<p class="lead">Navigating NDIS transport funding can be confusing. This guide breaks down everything you need to know about accessing transport services through your NDIS plan in Sydney's St George area.</p>

<h2>What NDIS Transport Funding Covers</h2>
<p>NDIS transport funding helps participants get to and from activities that are directly related to their NDIS goals. This can include:</p>
<ul>
  <li>Travel to medical appointments and therapy sessions</li>
  <li>Transport to work, education, or training</li>
  <li>Getting to community and social activities</li>
  <li>Travel for daily living activities like shopping</li>
</ul>

<h2>How Transport Is Funded</h2>
<p>Transport can be funded under three categories in your NDIS plan:</p>
<ol>
  <li><strong>Core Supports — Transport</strong>: A specific budget line for transport costs</li>
  <li><strong>Capacity Building</strong>: Funding for learning to use public transport or drive independently</li>
  <li><strong>Core Supports — Assistance with Daily Life</strong>: When transport is part of a broader support service</li>
</ol>

<h2>Marvel Driving's NDIS Transport Services</h2>
<div class="checklist">
  <div class="check-item"><strong>Community Transport</strong> — Door-to-door transport for community activities, social events, and appointments across Sydney.</div>
  <div class="check-item"><strong>Driving Lessons</strong> — NDIS-funded driving lessons to help participants work towards independent travel and licencing.</div>
  <div class="check-item"><strong>Travel Training</strong> — Support and coaching to help participants learn to use public transport independently.</div>
</div>`,
  },
  {
    slug: "parallel-parking-hurstville",
    title: "Mastering Parallel Parking in Hurstville: A Local's Guide",
    excerpt: "Hurstville's busy shopping strips require confident parallel parking. Our local instructors share tips specific to Forest Road, Queens Road and surrounding areas.",
    category: "Driving Tips",
    author: "Marvel Driving",
    image: "/slider-1.jpg",
    readTime: "4 min read",
    featured: false,
    published: true,
    content: `<p class="lead">Parallel parking is one of the most feared manoeuvres for learner drivers, but with the right technique it becomes second nature. Here's our guide specific to Hurstville's streets.</p>

<h2>The Step-by-Step Method</h2>
<ol>
  <li>Signal left and pull up alongside the car in front of the gap</li>
  <li>Reverse slowly until your rear bumper aligns with the other car's rear bumper</li>
  <li>Turn steering wheel full lock to the left</li>
  <li>Continue reversing until the front of your car clears the car ahead</li>
  <li>Straighten the wheel and pull forward to centre in the space</li>
</ol>

<h2>Tips for Hurstville's Busy Streets</h2>
<ul>
  <li>On Forest Road, always check for cyclists in the door zone before opening</li>
  <li>Queens Road bays are slightly tighter — practice in quieter streets first</li>
  <li>Saturday morning shopping traffic means extra patience is needed</li>
  <li>Always check your mirrors every few seconds during the manoeuvre</li>
</ul>

<h2>Common Mistakes to Avoid</h2>
<ul>
  <li><strong>Rushing</strong> — Take your time, other drivers will wait</li>
  <li><strong>Not checking blind spots</strong> — Head check before starting the reverse</li>
  <li><strong>Parking too far from the kerb</strong> — Aim for 30cm or less</li>
</ul>`,
  },
  {
    slug: "roundabouts-sydney-guide",
    title: "Sydney Roundabouts: Rules and Common Mistakes to Avoid",
    excerpt: "From Hurstville's busy intersections to Bexley's multi-lane roundabouts, learn the NSW road rules and avoid the common mistakes that fail learner drivers.",
    category: "Road Safety",
    author: "Marvel Driving",
    image: "/slider-2.jpg",
    readTime: "5 min read",
    featured: false,
    published: true,
    content: `<p class="lead">Roundabouts are one of the most common points of failure in NSW driving tests. Here's what you need to know to navigate them confidently.</p>

<h2>The Basic Rule: Give Way to the Right</h2>
<p>In NSW, you must give way to all vehicles already in the roundabout, including those coming from the right. Do not enter until it's safe to do so.</p>

<h2>Signalling Rules</h2>
<ul>
  <li><strong>Turning left</strong>: Signal left on approach and throughout</li>
  <li><strong>Going straight</strong>: No signal on entry; signal left just before your exit</li>
  <li><strong>Turning right</strong>: Signal right on entry; signal left before your exit</li>
  <li><strong>U-turn</strong>: Signal right on entry; signal left before your exit</li>
</ul>

<h2>Multi-Lane Roundabouts</h2>
<p>At multi-lane roundabouts like those on Bexley Road:</p>
<ul>
  <li>Choose your lane before entering based on your exit</li>
  <li>Left lane for left or straight; right lane for right turns or U-turns</li>
  <li>Stay in your lane throughout — do not change lanes inside the roundabout</li>
</ul>

<h2>Most Common Mistakes</h2>
<ul>
  <li>Forgetting to signal left when exiting</li>
  <li>Entering without giving way to traffic already in the roundabout</li>
  <li>Changing lanes inside the roundabout</li>
  <li>Stopping unnecessarily when there's a safe gap</li>
</ul>`,
  },
  {
    slug: "school-zones-sydney-fines",
    title: "Sydney School Zone Rules: Times, Speeds and Penalties",
    excerpt: "Avoid costly fines by understanding Sydney's school zone rules. Learn the times, speed limits and penalties that apply to school zones in NSW.",
    category: "Road Safety",
    author: "Marvel Driving",
    image: "/slider-3.jpg",
    readTime: "4 min read",
    featured: false,
    published: true,
    content: `<p class="lead">School zones are strictly enforced in NSW and missing the reduced speed limit is one of the most common reasons learner drivers fail their tests. Here's what you must know.</p>

<h2>School Zone Hours</h2>
<p>School zones operate on <strong>school days only</strong>:</p>
<ul>
  <li><strong>Morning:</strong> 8:00 AM – 9:30 AM</li>
  <li><strong>Afternoon:</strong> 2:30 PM – 4:00 PM</li>
</ul>
<p>Outside these times, the normal speed limit applies.</p>

<h2>Speed Limits</h2>
<p>The speed limit in an active school zone is <strong>40 km/h</strong>. This applies even if no children are visible.</p>

<h2>Penalties in NSW</h2>
<ul>
  <li>Exceeding 40 km/h in a school zone: fine + demerit points</li>
  <li>Speed cameras operate 24/7 in many school zones</li>
  <li>Double demerit periods apply during school holidays for some offences</li>
</ul>

<h2>School Zones in Hurstville Area</h2>
<p>Be particularly aware of school zones on:</p>
<ul>
  <li>Forest Road (near Hurstville Public School)</li>
  <li>Stoney Creek Road, Beverly Hills</li>
  <li>King Georges Road (multiple school zones)</li>
  <li>Bexley Road near Bexley Public School</li>
</ul>`,
  },
  {
    slug: "rainy-driving-sydney",
    title: "Safe Driving in Sydney's Wet Weather: Essential Tips",
    excerpt: "Sydney's unpredictable rain can be challenging for new drivers. Learn how to handle wet roads, reduced visibility and hydroplaning in NSW conditions.",
    category: "Road Safety",
    author: "Marvel Driving",
    image: "/slider-1.jpg",
    readTime: "5 min read",
    featured: false,
    published: true,
    content: `<p class="lead">Sydney receives around 1,200mm of rain annually, and sudden downpours can catch new drivers off guard. Here's how to stay safe in wet conditions.</p>

<h2>Before You Drive</h2>
<ul>
  <li>Check your windscreen wipers — worn blades reduce visibility significantly</li>
  <li>Ensure your tyres have adequate tread depth (minimum 1.5mm in NSW)</li>
  <li>Turn on headlights even during daylight rain</li>
</ul>

<h2>On the Road</h2>
<ul>
  <li><strong>Reduce speed</strong> — In wet conditions, stopping distances double</li>
  <li><strong>Increase following distance</strong> — Use the 4-second rule instead of 2</li>
  <li><strong>Brake gently</strong> — Avoid sudden braking which can cause skidding</li>
  <li><strong>Avoid puddles where possible</strong> — Deep water can cause loss of control</li>
</ul>

<h2>Handling Hydroplaning</h2>
<p>Hydroplaning occurs when a layer of water prevents your tyres from making contact with the road. If it happens:</p>
<ol>
  <li>Do not brake suddenly</li>
  <li>Ease off the accelerator gently</li>
  <li>Hold the steering wheel firmly and straight</li>
  <li>Wait for the tyres to regain traction</li>
</ol>

<h2>Low Visibility Conditions</h2>
<ul>
  <li>Use low-beam headlights, not high beam (high beam reflects off rain)</li>
  <li>Use rear fog lights only in severe conditions</li>
  <li>If visibility drops to near zero, pull over safely and wait</li>
</ul>`,
  },
  {
    slug: "nsw-driving-test-changes-2026",
    title: "NSW Driving Test Changes in 2026: What Learners Need to Know",
    excerpt: "Stay updated on the latest changes to NSW driving tests in 2026. From new testing criteria to updated road rules, prepare for your test with the latest information.",
    category: "Test Preparation",
    author: "Marvel Driving",
    image: "/slider-2.jpg",
    readTime: "6 min read",
    featured: false,
    published: true,
    content: `<p class="lead">The NSW driving test has evolved over the years, and 2026 brings updates that every learner driver should know about before booking their test.</p>

<h2>What Remains the Same</h2>
<p>The fundamental structure of the NSW driving test remains:</p>
<ul>
  <li>25–30 minutes of on-road driving</li>
  <li>Assessment of observation, control, and road rules knowledge</li>
  <li>Immediate failure for serious errors (critical errors)</li>
  <li>A points-based system for minor errors</li>
</ul>

<h2>Updated Assessment Areas</h2>
<h3>Increased Focus On:</h3>
<ul>
  <li>Interaction with cyclists and pedestrians</li>
  <li>Mobile phone distraction awareness</li>
  <li>Speed management in variable speed zones</li>
  <li>Response to emergency vehicles</li>
</ul>

<h2>Preparing for Your 2026 Test</h2>
<div class="checklist">
  <div class="check-item"><strong>Log your 120 hours</strong> — Complete all required supervised driving hours including 20 night hours</div>
  <div class="check-item"><strong>Take a pre-test lesson</strong> — Book a lesson with Marvel Driving the day before your test</div>
  <div class="check-item"><strong>Know the road rules</strong> — Review the NSW Road Users' Handbook</div>
  <div class="check-item"><strong>Practice the manoeuvres</strong> — Three-point turn, parallel park, reverse park</div>
</div>

<h2>Booking Your Test</h2>
<p>Book your driving test online through Service NSW. Tests fill up quickly in the St George area — book at least 4–6 weeks in advance.</p>`,
  },
  {
    slug: "ndis-driving-lessons-independence",
    title: "How NDIS Driving Lessons Support Your Independence in Sydney",
    excerpt: "Learn how NDIS-funded driving lessons through Marvel Driving can help Sydney participants gain independence and achieve their mobility goals.",
    category: "NDIS Services",
    author: "Marvel Driving",
    image: "/slider-3.jpg",
    readTime: "5 min read",
    featured: false,
    published: true,
    content: `<p class="lead">For many NDIS participants, gaining a driver's licence represents far more than just passing a test — it's the key to independence, employment, and community participation.</p>

<h2>Who Can Access NDIS Driving Lessons?</h2>
<p>NDIS participants may be eligible for funded driving lessons if driving aligns with their NDIS goals, such as:</p>
<ul>
  <li>Increased independence and community participation</li>
  <li>Getting to work, education, or training independently</li>
  <li>Reducing reliance on support workers for transport</li>
</ul>

<h2>How Marvel Driving Supports NDIS Participants</h2>
<p>Our instructors are experienced working with participants with a range of disabilities including:</p>
<ul>
  <li>Physical disabilities — we use dual-control vehicles with hand controls if required</li>
  <li>Autism Spectrum Disorder (ASD)</li>
  <li>Acquired Brain Injury (ABI)</li>
  <li>Intellectual disabilities</li>
  <li>Anxiety and mental health conditions</li>
</ul>

<h2>Getting Started</h2>
<ol>
  <li>Check your NDIS plan for Capacity Building or Core Supports funding</li>
  <li>Contact your Support Coordinator to discuss driving lessons as a goal</li>
  <li>Get a referral or service agreement with Marvel Driving</li>
  <li>Book your first assessment lesson</li>
</ol>

<h2>What to Expect in Your First Lesson</h2>
<p>Your first lesson with Marvel Driving includes a thorough assessment of your current driving ability, any specific needs or adjustments required, and a personalised learning plan tailored to your goals and timeline.</p>`,
  },
  {
    slug: "m5-motorway-tips-learners",
    title: "First Time on the M5? A Learner's Guide to Sydney Motorways",
    excerpt: "Nervous about motorway driving? Our guide covers merging, lane changes and exits on the M5 and other Sydney motorways for learner drivers.",
    category: "Sydney Driving",
    author: "Marvel Driving",
    image: "/slider-1.jpg",
    readTime: "6 min read",
    featured: false,
    published: true,
    content: `<p class="lead">Motorway driving can feel overwhelming for learners, but with the right preparation, the M5 and other Sydney motorways become manageable — and even enjoyable.</p>

<h2>Before Entering the Motorway</h2>
<ul>
  <li>Check your mirrors and identify a safe gap in traffic</li>
  <li>Accelerate on the on-ramp to match motorway speed (100 km/h)</li>
  <li>Signal before merging — give yourself plenty of time</li>
  <li>Never stop on an on-ramp unless there's a traffic signal</li>
</ul>

<h2>Driving on the M5</h2>
<h3>Lane discipline:</h3>
<ul>
  <li>Keep left unless overtaking</li>
  <li>Never undertake (passing on the left)</li>
  <li>Maintain a safe following distance — at 100 km/h, use the 3-second rule</li>
</ul>

<h3>Speed management:</h3>
<ul>
  <li>The M5 speed limit is 100 km/h, or 110 km/h in some sections</li>
  <li>Variable speed limit signs may reduce the limit during incidents</li>
  <li>Always check your speedometer regularly</li>
</ul>

<h2>Exiting the Motorway</h2>
<ol>
  <li>Plan your exit in advance — check signs at least 1km ahead</li>
  <li>Move to the left lane early</li>
  <li>Signal when you reach the exit lane</li>
  <li>Begin decelerating on the off-ramp, not on the motorway</li>
</ol>

<h2>Common M5 Exits for St George Residents</h2>
<ul>
  <li><strong>King Georges Road</strong> — for Hurstville and Penshurst</li>
  <li><strong>Bexley Road</strong> — for Bexley and Rockdale</li>
  <li><strong>Forest Road</strong> — for Hurstville CBD</li>
</ul>`,
  },
];

async function main() {
    await prisma.blogPost.deleteMany();
    const result = await prisma.blogPost.createMany({ data: posts });
    console.log(`✅ Seeded ${result.count} blog posts.`);
}

main()
    .catch(e => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
