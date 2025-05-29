# Setup Steps

- cd into the base project
- Install packages with `npm i`
- To start the dev server run `npm run dev`
- To create an optimised prod build run `npm run build`
- To lint the project run `npm run lint`

## Link to Vercel Deployment

https://office-utility-manager.vercel.app/

## Framework & Rendering

- **Next.js** (SSR, file based routing, App router)
- **Turbopack**: <br>New next feature to rival Vites SWC. However, doesn't work correctly with component libraries due to lack of support for hydration issues

## Language & Tooling

- **TypeScript** (strict types for API mocks, components, hooks)
- **ESLint** (clean up unused vars, enforce code style)

## State Management

- **Context API**: <br> lightweight, built in; ideal for a 3-4 hour test. I separated the context to avoid triggering unecessary re-renders. And used lightweight custom hooks to interact with context to make it more reusable and extendable
- **Redux Toolkit** <br>I initially wanted to incorporate redux toolkit but for time constraints and simplicity I decided to go for context. In a real life scenario where projects need to be scalable a redux based solution is a better option

## UI Library

- **Mantine** (accessible primitives, built in ARIA and semantics)
- **Chakra UI** I initially went for Chakra UI but it seemed to cause hydration issues whereby the server and client renders where out of sync.

## Testing

- **React Testing Library + Jest**: This was the plan to include testing but had to leave due to time constraints
-

## Routing & Multi Page

- File based routes: `/`, `/meeting-room-bookings`.
- Shared layout (`app/layout.tsx`) for nav, context providers, global styles

## Backend Mock & Data

- **Mock API** under `pages/api/*` (login, buildings, rooms, meetings, issues…)
- **Dynamic file routing**: I used Next's dynamic file system routing to make it easier to make reqeusts from the Frontend
- Clear JSON with TypeScript interfaces

## Fetching

- **Tanstack/react-query**: Simplifies data fetching, caching, and synchronization in React apps. It keeps data fresh, reduces unnecessary network requests

## What I could have done with more time

- Implemented UI component testing for each of the components used
- Used a redux based pattern such as redux toolkit to make the app more scalable
- Included the notifications tab on the right navbar
- Better error handling using react suspense and error boundaries
- Lazy loading for components that werent required on initial load

## Future Improvements

- Modal for QR code per meeting room
- Ability to book meetings through the app
