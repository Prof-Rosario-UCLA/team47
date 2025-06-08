## BruinEvents

Welcome to my final project for CS144, BruinEvents!


### Overview

BruinEvents is a website where UCLA students can find relevant events in a centralized manner. Forget scrolling through dozens of accounts on Instagram, digging through Discord servers and keeping track of the million emails in your inboxes - with BruinEvents, you can now see all the events coming up in one single place, sorted by date.

### The "Why"

As a student, I've found 2 problems on campus:

- Students love attending events, but have a hard finding the ones that are relevant to them
- Clubs suffer from a lack of attendance at their events, despite being high-quality.

This is what led me to building this website, which is intended to solve both.

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

1) Semantic HTML5 tags are used wherever relevant. Some examples of semantic tags present in the project are **`<header>`**, **`<nav>`**, **`<aside>`** and **`<label>`**. The project also uses **Drag and Drop** for uploading an image when creating a new event.

2) The app is **fully responsive**, and scales without any problem down to 320px-wide screens. For comparison, here is a comparison of how the main screen looks on desktop vs mobile.

3) Every page that is dependent on an internet connection has an indicator informing the user that the web app is trying to fetch data. Depicted below are 2 examples of such scenarios.

4) The app does use **HTTPS**.

5) The app is a **single page** application: in no case does it load a new page. Instead, it displays different components on the same page. There is **no page scrolling**, the only scrolling used is in the events list which is a **component-wise scroll**.

6) The app is reasonably aesthetically pleasing.

7) Uses **Tailwind** for styling - no CSS written manually.

8) Users are authenticated using **cookies with JWT**.

9) The first time the website is displayed, users will see a **banner at the bottom** informing them of the usage of cookies. Depicted below.

10)

11) 

Must be impervious to the most common web security vulnerabilities (e.g. SQL injection, CSRF, XSS). There are technologies that handle this for you.
Must use a caching layer and a database. The database does not necessarily have to be MongoDB or relational (e.g. MySQL, PostgreSQL) but must make sense for your project. The database work must use an ORM or ODM.
Should use Node.js and Express; however, if you wish to use something else, please include your plans in the spec.
The app must function as a PWA with a service worker. If data is unavailable offline, the app should still render its structure and display a message or progress indicator (e.g., "Attempting to fetch data..."). The app must be installable on desktop and mobile.
[Extra Credit] Must use a WebAssembly module 
Strong preference for AssemblyScript for Typescript but can use other languages supported by WebAssembly.
Must create/use an API to (pick one of these three):
Expose data to an end-user (e.g. providing cafe menus to outsiders)
Interact with AI services such as OpenAI, Hugging Face etc.
Use a real-time streaming framework, preferably WebTransport or Socket.io (WebSockets)
Must use a significant front-end framework such as React, Angular, Vue,js, Svelte, SolidJS, Quik etc.
Must comply with basic accessibility principles (e.g., color contrast, tab navigation, semantic HTML). ARIA attributes should be used where applicable.
These are sufficient for credit. If you want to swap out one of these for another, let us know in your write-up.
Depending on your app, these features may not necessarily be explicit. For example, in a video game, having the character speak something while displaying styled text on the screen suffices for alt text. For example, in League of Legends you may hear the announcer say "Double Kill! Triple Kill!" with the same words appearing on the screen. This is a form of accessibility.
Must be deployed onto Google Cloud: Google App Engine (single and pairs) or Google Kubernetes Engine (groups of 3 or 4) and use CI/CD principles via Github Actions.
We may allow other deployment strategies as long as they provide scalability and fault tolerance. You must describe it in your proposal.
The deployment must be triggered via CI/CD (not manual kubectl apply). You must include GitHub Actions logs showing build, test, and deploy stages.