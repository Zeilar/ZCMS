*This project is still a work in progress, and changes should therefor be expected. Although as I write this, it is near completion!*

# TPH

## Frontend
The frontend is written with React, and this is where most of my own written code takes hold. I chose to make the forum an SPA (single page application), because why not. Main features and functionality of the frontend include CRUD abilities of **threads**, **posts** and to some extent **users**, along with the expected features of a forum, albeit a small forum.

There is also an admin dashboard, which only the admin and superadmin users may use. It includes CRUD handling of users and categories in the database. Specific other features may be included.

I chose to use React JSS mostly for styling to get some isolated CSS in every comoponent, but I did write some general CSS using SASS. I realized a while later that I should've used the **styled-components** to replace most of this CSS, but that'll have to wait for a refactor in the future.

### Packages/libraries
- React JS
- MDI
- Classnames
- Webpack (Laravel Mix)
- Pusher
- Echo (Laravel)
- DayJS
- Tagify
- MarkdownIt
- Material UI
- Material Table
- Styled Components

## Backend
The backend is written with Laravel. I used the backend only as a REST API rather than an MVC which Laravel usually is used with. It does also serve the purpose of serving the React app, on every route. After that, the React Router handles things.

I utilized a lot of Laravel features, including; middleware, Algolia, broadcasting & events, policies, pivot tables, and the standard things like controllers, models, relationships etc. The things you'd expect a Laravel developer to use.

The backend communicates some events to the frontend via Pusher, like when you are using the chat or admin dashboard.

## Workflow
Laravel Mix is an extension of Webpack, and Laravel comes with some neat scripts and fixes out of the box. I created tasks in the Laravel Mix file, which copies selected files/folders into a /dist folder, with the public_html contents and the backend contents in separate folders. This is of course because the backend files should be outside webroot, and not available to users. So I run **npm run production**, which does the production compiling (minifying and whatnot). When it's done, I merge with the production branch, and the next step begins.

I use cPanel's continuous integration flow. You set up a local Git repository on cPanel, add a Git remote from your (in this case *this*) repository, so your changes are being pushed onto cPanel's filesystem. Including a **yml** config file. The config file contains tasks that it will fire off of a Git hook, which happens when you push to the remote. The config contains only one task, which is to run two Bash scripts.

With these two flows set up, let's wire it up. Once I have set up the production branch, I push to the cPanel remote, and the changes are live!

It may sound complicated judging by the amount of text, but it's actually quite simple once you get into it.


And that is about it for this project, thank you for reading! You have my contact information on this profile. The code is licensed under MIT, you are free to use it however you'd like, as long as you contribute me reasonably as the author. Enjoy!
