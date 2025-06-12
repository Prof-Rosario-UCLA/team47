## BruinEvents

Welcome to my final project for CS144, BruinEvents!


### Overview

BruinEvents is a website where UCLA students can find relevant events in a centralized manner. Forget scrolling through dozens of accounts on Instagram, digging through Discord servers and keeping track of the million emails in your inboxes - with BruinEvents, you can now see all the events coming up in one single place, sorted by date.

### The "Why"

As a student, I've found 2 problems on campus:

- Students love attending events, but have a hard finding the ones that are relevant to them
- Clubs suffer from a lack of attendance at their events, despite being high-quality.

This is what led me to building this website, which is intended to solve both problems.

### Features

- User authentication
- Event browsing
- AI-made summaries for each day
- Anyone can add their own event to promote their club or organization

### Running the project

#### Prerequisites

- Node.js (v16+)
- Rust + wasm-pack (for the fuzzy-search WASM module)
- MySQL (with a database URL you can connect to)
- Redis (running on REDIS_HOST:REDIS_PORT)

#### Clone & Install

```
git clone https://github.com/Prof-Rosario-UCLA/team47
git cs144-final-project
npm install
```

#### .env file

You will have to create a `.env` file at `server/.env`, containing:
- `DATABASE_URL`: Used by Prisma (ORM) to connect to MySQL. Find the specification for how to specify the correct URL [here](https://www.prisma.io/docs/orm/reference/connection-urls). You will also have to configure the DB schema, which Prisma can do. `cd` into `server` then run `npx prisma db push` (be aware that this will overwrite current data).
- `REDIS_HOST`: Redis host
- `REDIS_PORT`: Redis port (usually 6379)
- `JWT_SECRET`: A JWT secret to use for authentication (can be any string)
- `OPENAI_API_KEY`: An OpenAI API key to use

#### Build & Run

```
npm run build:wasm
npm run build
npm run dev
```



### How the Project Spec is satisfied

**NOTE:** For some reason, the manifest.json is treated as invalid in deployment, but works locally – which makes it impossible to install from production. I am attaching an image of having installed it on my machine using localhost.

<img width="1000" alt="Screenshot 2025-06-11 at 11 41 42 PM" src="https://github.com/user-attachments/assets/064956a4-1176-420d-a8a4-a522958bf03a" />

1) Semantic HTML5 tags are used wherever relevant. Some examples of semantic tags present in the project are **`<header>`**, **`<nav>`**, **`<aside>`, `<dialog>`** and **`<label>`**. The project also uses **Drag and Drop** for uploading an image when creating a new event.

https://github.com/user-attachments/assets/394e5f0a-34f0-4827-b701-9cc3a5a45553


2) The app is **fully responsive**, and scales without any problem down to 320px-wide screens. For comparison, here is a comparison of how the main screen looks on desktop vs mobile.

<img width="800" alt="Screenshot 2025-06-10 at 5 54 15 PM" src="https://github.com/user-attachments/assets/c8eccb69-f707-41d8-ba99-d914d68ca80a" />
<img width="300" alt="Screenshot 2025-06-10 at 5 54 30 PM" src="https://github.com/user-attachments/assets/2f3096fb-524e-4953-93b3-c88e271c7283" />


3) Every page that is dependent on an internet connection has an indicator informing the user that the web app is trying to fetch data.

4) The app does use **HTTPS**.

5) The app is a **single page** application: in no case does it load a new page. Instead, it displays different components on the same page. There is **no page scrolling**, the only scrolling used is in the events list which is a **component-wise scroll**.

6) The app is reasonably aesthetically pleasing.

7) Uses **Tailwind** for styling - no CSS written manually.

8) Users are authenticated using **cookies with JWT**. The first time the website is displayed, users will see a **banner at the bottom** informing them of the usage of cookies. Depicted below.
<img width="1300" alt="Screenshot 2025-06-10 at 5 56 26 PM" src="https://github.com/user-attachments/assets/e18a54aa-54e8-4c27-951d-33d07d0d4fba" />

9) Using **Parcel & App Engine**, the app is not vulnerable to basic security concerns.

10) The app uses a **MySQL database** with the **Prisma ORM**, and **Redis for server-side caching**.

11) The app uses **Node.js** and **Express**.

12) The app uses a Service Worker that is cache-first for static files, and network-first for API calls. Authentication can't be handled by the service worker, so it ignores auth-related requests completely. When data is unavailable, there is an indicator that the app is attempting to load, or that there was a network error.

13) The app uses a **Rust WASM** module to perform fuzzy search/sorting on events.

14) The app uses **OpenAI's API** to provide AI-generated daily summaries of events.

15) Uses **React**.

16) The app is fully usable with tab navigation, satisfies color contrast requirements, uses semantic HTML and uses all the appropriate ARIA attributes.

17) The app is deployed on **Google App Engine**, using a **Cloud Build Trigger**. Logs from a deployment below.

<img width="500" alt="Screenshot 2025-06-10 at 7 54 16 PM" src="https://github.com/user-attachments/assets/4e3f6de8-597f-4eee-9c9d-d8192c678ff8" />
<img width="500" alt="Screenshot 2025-06-10 at 7 54 08 PM" src="https://github.com/user-attachments/assets/e7294699-04d4-4aec-96cc-ca5588ea76df" />
<img width="500" alt="Screenshot 2025-06-10 at 7 54 02 PM" src="https://github.com/user-attachments/assets/1762cad6-7f2c-46e1-b8e4-5677a3681cfe" />
<img width="500" alt="Screenshot 2025-06-10 at 7 53 52 PM" src="https://github.com/user-attachments/assets/96e01596-019d-4cc8-abe9-3ed288dfab55" />
<img width="500" alt="Screenshot 2025-06-10 at 7 53 39 PM" src="https://github.com/user-attachments/assets/c726ad1f-fb6e-4fc2-99e5-944dd7dcaed9" />
