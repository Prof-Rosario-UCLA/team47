import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function userExists(email) {
    if (!email) throw new Error('Missing email');

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        return Boolean(user);

    } catch(e) {
        console.error(`An error occurred while checking for user existence:`, e);
        throw e;
    }
}

export async function createUser(name, email, passwordHash) {
    if (!name) throw new Error('Missing name');
    if (!email) throw new Error('Missing email');
    if (!passwordHash) throw new Error('Missing password hash');

    try {
        const user = await prisma.user.create({ data: { name, email, passwordHash } });
        return { uid: user.uid, name: user.name, email: user.email };

    } catch(e) {
        console.error('An error occurred while creating a user:', e);
        throw e;
    }
}

export async function getUser(email) {
    if (!email) throw new Error('Missing email');

    try {
        return prisma.user.findUnique({
            where: { email },
            select: { uid: true, name: true, email: true, passwordHash: true }
        });

    } catch(e) {
        console.error('An error occurred while fetching a user:', e);
        throw e;
    }
}

export async function getUserByUid(uid) {
    if (!uid) throw new Error('Missing uid');

    try {
        return prisma.user.findUnique({ where: { uid }, select: { uid: true, name: true, email: true } });
        
    } catch(e) {
        console.error('An error occurred while getting a user by uid:', e);
        throw e;
    }
}

export async function getEvents(day) {
    if (!day) throw new Error('Missing day');
    if (day.length !== 10) throw new Error('Invalid day');

    try {
        return prisma.event.findMany({ where: { day } });

    } catch(e) {
        console.error(`An error occurred while fetching events on ${date}:`, e);
        throw e;
    }
}

export async function createEvent(name, location, day, time, description, host, image_url) {
    if (!name || !location || !day || !time || !description || !host) throw new Error('Invalid parameters for event creation');
    if (day.length !== 10) throw new Error('Invalid day');
    if (time.length !== 5) throw new Error('Invalid time');

    try {
        const event = await prisma.event.create({ data: { name, location, day, time, description, host, image_url } });
        return event;

    } catch(e) {
        console.error(`An error occurred while creating an event:`, e);
        throw e;
    }
}


// CREATE TABLE events (
//     event_id INT PRIMARY KEY AUTO_INCREMENT,
//     name VARCHAR(40) NOT NULL,
//     day VARCHAR(10) NOT NULL,
//     time VARCHAR(5) NOT NULL,
//     description VARCHAR(500) NOT NULL,
//     host VARCHAR(50) NOT NULL,
//     location VARCHAR(50) NOT NULL,
//     image_url VARCHAR(500) NULL
// );


// CREATE TABLE users (
//     uid INT PRIMARY KEY AUTO_INCREMENT,
//     email VARCHAR(100) NOT NULL,
//     password_hash TEXT NOT NULL,
//     name VARCHAR(100) NOT NULL
// );

// INSERT INTO events (name, day, time, description, host, location) VALUES
//     ("Swim practice", "06-06-2025", "18:00", "Relays and sprints.", "UCLA Triathlon", "Student Acitvities Center"),
//     ("SQL Injection Workshop", "06-06-2025", "19:00", "Join for a workshop to learn about SQL injection and how it may affect YOUR website! Free pizza provided :)", "ACM Cyber", "Boelter Hall 5427"),
//     ("CS Townhall", "06-06-2025", "20:00", "Come to the Computer Science department's annual town hall to hear our fantastic professors answer your questions and talk about the future of the department.", "UCLA Computer Science", "Mong Learning Center"),
//     ("Bike Practice", "06-06-2025", "09:00", "We will be doing a long ride from UCLA all the way to Trancas and back (50 miles)", "UCLA Triathlon", "De Neve Plaza"),
//     ("Spring Sing", "06-06-2025", "19:00", "Join us for the 51st edition of Spring Sing! We have an incredible lineup of UCLA's most talented artists.", "UCLA Events", "LATC"),
//     ("Undie Run", "06-06-2025", "00:00", "The biggest undie run of the year! You won't want to miss out, come celebrate our graduating seniors and take a break from finals.", "Royce Quad", "UCLA"),
//     ("AI & Ethics Panel", "06-06-2025", "17:30", "Join faculty and industry experts for a discussion on the ethical implications of artificial intelligence.", "Data Science Society", "Boelter Hall 5400"),
//     ("UCLA Hackathon Kickoff", "06-06-2025", "09:00", "Opening ceremony and team formation for the 24-hour campus hackathon. Breakfast provided.", "UCLA CS Club", "Ackerman Union Ballroom"),

//     ("Study Abroad Info Session", "07-06-2025", "18:00", "Learn about summer and year-long programs in Europe, Asia, and Latin America.", "UCLA Global Programs", "Kerckhoff Hall 120"),
//     ("Summer Internship Fair", "07-06-2025", "13:00", "Meet recruiters from top tech and finance firms recruiting UCLA students.", "UCLA Career Center", "Young Research Library Front Lawn"),
//     ("UCLA Film Festival", "07-06-2025", "20:00", "Screenings of student-produced short films and awards ceremony under the stars.", "UCLA Film & Television Society", "Royce Hall Courtyard"),
//     ("Urban Gardening Workshop", "07-06-2025", "10:00", "Hands-on session building raised beds and learning sustainable gardening techniques.", "UCLA Sustainability Committee", "De Neve Garden Turf"),
//     ("Midnight Yoga", "07-06-2025", "00:00", "Unwind with a free midnight yoga class to de-stress during finals week prep.", "UCLA Recreation", "Intramural Field West"),
//     ("Career Networking Night", "07-06-2025", "18:30", "Connect one-on-one with alumni across engineering, business, and the arts.", "UCLA Alumni Association", "Munger Hall Lobby"),
//     ("Data Visualization Workshop", "07-06-2025", "14:00", "Interactive session on creating compelling data visualizations with D3.js.", "UCLA Data Lab", "Boelter Hall 5402"),
//     ("Career Panel: Tech Startups", "07-06-2025", "18:00", "Founders from top tech startups share their experiences and advice.", "Anderson School", "Anderson Hall 101"),

//     ("Campus Blood Drive", "08-06-2025", "10:00", "Donate blood and help save lives.", "UCLA Blood & Platelet Center", "Kerckhoff Hall 200"),
//     ("Machine Learning Study Group", "08-06-2025", "11:00", "Weekly meetup for ML enthusiasts to discuss papers and projects.", "UCLA AI Club", "Engineering VI 1013"),
//     ("Poetry Open Mic", "08-06-2025", "19:00", "Share your original poems or enjoy readings from local artists.", "UCLA Creative Writing", "Ackerman Courtyard"),
//     ("Robotics Demo Day", "08-06-2025", "15:00", "Witness the latest robots built by students.", "UCLA Robotics Club", "Engineering V 1123"),
//     ("Study Break Bingo", "08-06-2025", "16:00", "Take a break from studying and win prizes playing bingo.", "UCLA Student Wellness", "Powell Library"),
//     ("UCLA Acoustic Night", "08-06-2025", "20:00", "Local student musicians perform acoustic sets.", "UCLA Music Department", "Royce Hall Stage"),
//     ("Environmental Film Screening", "08-06-2025", "18:30", "Watch documentary films on environmental change.", "UCLA Earth Club", "Mechanics/Dynamics Auditorium"),
//     ("Reactive Programming with RxJS", "08-06-2025", "14:00", "Learn reactive programming concepts in JS with RxJS.", "UCLA JS Society", "Boelter Hall 5320"),

//     ("Hack for Health", "09-06-2025", "09:00", "24-hour hackathon focusing on health tech solutions.", "UCLA Hackathon Org", "Ackerman Union Ballroom"),
//     ("Latin Dance Workshop", "09-06-2025", "17:00", "Beginner-friendly salsa and bachata lessons.", "UCLA Dance Team", "Carnesale Commons"),
//     ("Yoga in the Park", "09-06-2025", "08:00", "Morning yoga session at Sunset Canyon Tennis Courts.", "UCLA Recreation", "Sunset Canyon Courts"),
//     ("Startup Pitch Night", "09-06-2025", "19:00", "Students pitch their startup ideas to investors.", "Bruin Entrepreneurs", "Anderson School Lobby"),
//     ("Digital Photography Basics", "09-06-2025", "10:00", "Learn DSLR camera fundamentals and composition.", "UCLA Photography Club", "Boelter Hall 5241"),
//     ("Nutrition & Meal Prep", "09-06-2025", "12:00", "Workshop on healthy meal planning for busy students.", "UCLA Health", "Covel Commons"),
//     ("Chess Tournament", "09-06-2025", "13:00", "Single-elimination chess tournament open to all skill levels.", "UCLA Chess Club", "Student Activities Center"),
//     ("Mindfulness Meditation", "09-06-2025", "17:30", "Guided mindfulness session to reduce stress.", "UCLA Mindful", "Powell Library Rooftop"),

//     ("Film Discussion: Inception", "10-06-2025", "20:00", "Group discussion on Christopher Nolan’s Inception.", "UCLA Film Club", "Kerckhoff Hall 128"),
//     ("Community Volunteer Fair", "10-06-2025", "11:00", "Meet local nonprofits and learn about volunteer opportunities.", "UCLA Volunteer Center", "Bruin Plaza"),
//     ("Summer Coding Bootcamp", "10-06-2025", "09:00", "Intensive full-day workshop on web development fundamentals.", "UCLA CS Club", "Boelter Hall 5405"),
//     ("Yoga Sunset Series", "10-06-2025", "19:30", "Weekly sunset yoga session to unwind after a long day.", "UCLA Recreation", "Sunset Canyon Clubhouse"),
//     ("Data Science Speaker Series", "10-06-2025", "17:00", "Talk by leading data scientists on industry trends and career paths.", "Data Science Society", "Engineering VI 1013"),
//     ("Meditation Walk", "10-06-2025", "08:00", "Guided silent walk through Royce Quad for mindfulness and relaxation.", "UCLA Mindful", "Royce Quad"),
//     ("Hacknight", "10-06-2025", "20:00", "Late-night coding jam—bring your laptop and ideas!", "UCLA Hackers", "Ackerman Union Ballroom"),
//     ("Open Air Concert", "10-06-2025", "18:00", "Live performances by student bands under the stars.", "UCLA Music Department", "Covel Commons"),

//     ("Book Club Meetup", "11-06-2025", "16:00", "Discuss June’s selection: a modern classic novel.", "UCLA Literary Society", "Powell Library Meeting Room"),
//     ("Board Game Night", "11-06-2025", "19:00", "Bring your favorite board games or try ours!", "Bruin Boardgame Club", "Game Lab 202"),
//     ("Astronomy Stargazing", "11-06-2025", "21:00", "Telescopes set up for viewing Jupiter and Saturn.", "UCLA Astronomy Club", "North Campus Plains"),
//     ("Language Exchange", "11-06-2025", "12:00", "Practice foreign languages with native speakers.", "World Languages Dept.", "Kerckhoff Hall Patio"),
//     ("Art Exhibition Opening", "11-06-2025", "17:00", "Opening reception for student art showcase.", "UCLA Arts Council", "Hammer Museum"),
//     ("Career Workshop: Networking", "11-06-2025", "14:00", "Learn effective networking strategies and elevator pitches.", "UCLA Career Center", "Bruin Plaza"),
//     ("Sustainability Panel", "11-06-2025", "16:30", "Discussion on green campus initiatives and student projects.", "UCLA Sustainability Committee", "Carnesale Commons"),

//     ("Outdoor Movie: The Matrix", "12-06-2025", "20:30", "Free screening of a sci-fi classic—popcorn provided.", "UCLA Film Society", "De Neve Field"),
//     ("Crossfit Demo", "12-06-2025", "10:00", "Intro to Crossfit techniques and free trial class.", "UCLA Recreation", "Intramural Field East"),
//     ("UCLA Dance Showcase", "12-06-2025", "19:00", "Performances by UCLA’s top dance teams.", "UCLA Dance Team", "Royce Hall Stage"),
//     ("Comedy Open Mic", "12-06-2025", "20:00", "Try your stand-up routine or enjoy others’ sets.", "Bruin Humor Society", "Ackerman Courtyard"),
//     ("Garden Tour", "12-06-2025", "11:00", "Guided tour of the botanical garden’s summer blooms.", "UCLA Hort Club", "Mildred E. Mathias Botanical Garden"),
//     ("Parent & Family Day", "12-06-2025", "09:00", "Campus tour and activities for families of incoming students.", "UCLA Admissions", "Campus West Gate"),
//     ("International Food Festival", "12-06-2025", "12:00", "Taste dishes from around the world prepared by student groups.", "UCLA Global Programs", "Ackerman Union Lawn")
// ;