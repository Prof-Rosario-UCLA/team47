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

Clone the repo then run: `npm install` followed by `npm run build` and finally `npm start`.

You must have the following installed on your machine:
- **Node.js**

You will have to create two `.env` files:
- `.env` (at the root of the project): should contain a value for `DATABASE_URL`. This is used by Prisma (ORM). Find the specification for how to specify the correct URL [here](https://www.prisma.io/docs/orm/reference/connection-urls). 
- `server/.env`: should contain 4 key/value pairs; `OPENAI_API_KEY`: an OpenAI API key to use | `REDIS_HOST`: the Redis host to use (if you are running Redis locally, you can use `localhost`) | `REDIS_PORT`: the port to be used for Redis (usually 6379) | `JWT_SECRET`: used for authentication, can be any string you like

### How the Project Spec is satisfied

1) Semantic HTML5 tags are used wherever relevant. Some examples of semantic tags present in the project are **`<header>`**, **`<nav>`**, **`<aside>`, `<dialog>`** and **`<label>`**. The project also uses **Drag and Drop** for uploading an image when creating a new event.

2) The app is **fully responsive**, and scales without any problem down to 320px-wide screens. For comparison, here is a comparison of how the main screen looks on desktop vs mobile.

3) Every page that is dependent on an internet connection has an indicator informing the user that the web app is trying to fetch data.

4) The app does use **HTTPS**.

5) The app is a **single page** application: in no case does it load a new page. Instead, it displays different components on the same page. There is **no page scrolling**, the only scrolling used is in the events list which is a **component-wise scroll**.

6) The app is reasonably aesthetically pleasing.

7) Uses **Tailwind** for styling - no CSS written manually.

8) Users are authenticated using **cookies with JWT**. The first time the website is displayed, users will see a **banner at the bottom** informing them of the usage of cookies. Depicted below.

9) Using **Parcel & App Engine**, the app is not vulnerable to basic security concerns.

10) The app uses a **MySQL database** with the **Prisma ORM**, and **Redis for server-side caching**.

11) The app uses **Node.js** and Express.

12) The app uses a Service Worker that is cache-first for static files, and network-first for API calls. Authentication can't be handled by the service worker, so it ignores auth-related requests completely. When data is unavailable, there is an indicator that the app is attempting to load, or that there was a network error.

13) The app uses a **Rust WASM** module to perform fuzzy search/sorting on events.

14) The app uses **OpenAI's API** to provide AI-generated daily summaries of events.

15) Uses **React**.

16) The app is fully usable with tab navigation, satisfies color contrast requirements, uses semantic HTML and uses all the appropriate ARIA attributes.

17) The app is deployed on **Google App Engine**, using a **Cloud Build Trigger**. Logs from a deployment below.