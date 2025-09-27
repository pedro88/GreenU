# Green.U

## Vision

Green.U is a social media made for gardeners.
The main goal is to keep a trace of what you did in your garden during the last seasons. With this trace you'll be able to improve your practice but also to share with other gardeners whose share the same reality as you, like climate, practice, etc...

## TechStack

Green.U is developed with typescript for the backend and frontend.

### Frontend

The front end is built with [react](https://fr.react.dev/) and the UI library [ShadCN](https://ui.shadcn.com/).  
We also use [redux](https://redux.js.org/) to maintain the global state of the app.

### Backend

The backend is built with [Express](https://expressjs.com/), we also use [TypeORM](https://typeorm.io/) as query builder and a [MariaDB](https://mariadb.org/) database.  
To validate our data we use [zod](https://zod.dev/).

## RoadMap

#### MVP – Virtual Garden

- Authentication (create an account, log in)
- Create your virtual garden with a defined area
- Add growing beds
- Add crop rows and assign plants (carrots, tomatoes, etc.)
- Record actions (sowing, watering, harvesting) with date
- View the history of actions in your garden

Goal: allow each user to model and track their own garden.

#### V1 – Collaboration

- Invite other users to join your garden
- Collaborator roles (add actions, view, edit)
- Task board for garden activities (weeding, harvesting, etc.)

Goal: make the garden collaborative and shared between neighbors/friends.

#### V2 – Discovery & Inspiration

- Explore nearby gardens (basic geolocation)
- View actions shared by other gardeners
- Compare your crops with others (yield, calendar, methods)

Goal: create a local social network around gardening.

#### V3 – Knowledge Sharing

- Write and publish articles or practical guides
- Add images, tags, and categories (e.g., "carrots", "permaculture")
- Comment on, like, and share articles
- Search articles by crop, season, or method

Goal: transform Green.U into a living knowledge-sharing community.
