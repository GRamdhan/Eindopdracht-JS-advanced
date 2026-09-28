# 📅 Events App: React (Advanced JavaScript final assignment)

My final assignment for the **Advanced JavaScript / React** module of the Winc Academy front-end program. It's an events manager where you can view, search, filter and add events, backed by a REST API.

![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=black)
![Chakra UI](https://img.shields.io/badge/Chakra_UI-2-319795?logo=chakraui&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4-646CFF?logo=vite&logoColor=white)

## Features

- **Events overview** loaded from a REST API (JSON Server).
- **Search** events by title, description or category.
- **Filter** events by category.
- **Add an event** through a modal form with title, description, start and end time, and category. The event is saved with a `POST` request.
- **Event detail page** (`EventPage.jsx`) with:
  - **editing** in a modal, saved with a `PUT` request,
  - **deleting** after a confirmation dialog (`AlertDialog`), with a `DELETE` request,
  - **toast notifications** for success and error feedback.

## Tech stack

| Layer | Tools |
|---|---|
| UI | React 18, Chakra UI (with Emotion and Framer Motion) |
| Routing | React Router 6 |
| Build | Vite 4 |
| Backend (dev) | [JSON Server](https://github.com/typicode/json-server) serving `events.json` |
| Quality | ESLint (react plugin) |

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the mock REST API on http://localhost:3000
npx json-server --watch events.json --port 3000

# 3. In a second terminal, start the app
npm run dev
```

## Project structure

```
events.json            # Mock database: events, users, categories
src/
├── main.jsx           # App entry, ChakraProvider and router
├── pages/
│   ├── EventsPage.jsx # List, search, filter, add
│   └── EventPage.jsx  # Detail, edit, delete
└── components/        # Navigation, Root layout
```

## What I learned

- Working with a REST API from React: `fetch` with `GET`, `POST`, `PUT` and `DELETE`, plus error handling.
- Managing state with `useState` and `useEffect`, including derived state for search and filter results.
- Building accessible UI with Chakra UI components: modals, alert dialogs and toasts.
- Client-side routing with React Router.

## Possible improvements

- Add the detail page route (`/event/:eventId`) to the router, and replace `useHistory` with React Router 6's `useNavigate`.
- Show category names instead of IDs, and the creator's name and avatar, by joining `categories` and `users`.
- Make search and filter update live while typing and allow combining them.
