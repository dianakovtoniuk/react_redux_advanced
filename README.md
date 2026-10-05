# ReduxCart

ReduxCart is a small shopping cart app. You browse a list of products, add them to a cart, change quantities, and the cart is saved to and loaded from Firebase Realtime Database. The app shows a notification while the cart is syncing and tells you if something goes wrong. The whole state is managed with Redux Toolkit and typed with TypeScript.

## Highlights

- Product list with title, description and price
- Cart that you can open and close from the header button
- Add, increase and decrease item quantity; an item is removed when its quantity reaches zero
- Live item counter on the cart button
- Cart is saved to Firebase after every change and loaded again when the app starts
- Notification banner with `pending`, `success` and `error` states
- Typed store, hooks and thunks

## Built With

- React 18
- TypeScript
- Redux Toolkit and React Redux
- Firebase Realtime Database (REST API, no SDK)
- CSS Modules
- Create React App (`react-scripts`)
- Vercel for hosting

## How It Works

| Concept | Where | What it does |
|---|---|---|
| Slices | `cart-slice.ts`, `ui-slice.ts` | Hold the cart (items, total quantity, `changed` flag) and the UI state (cart visibility, notification) |
| Typed hooks | `hooks.ts` | `useAppDispatch` and `useAppSelector` with the store types applied |
| Thunks | `cart-actions.ts` | `fetchCartData` loads the cart on start, `sendCartData` saves it and dispatches notifications |
| `changed` flag | `cart-slice.ts` | Set only by add and remove actions, so the cart is not sent back to Firebase right after it was loaded |
| `useEffect` | `App.tsx` | Fetches the cart once on start and sends it whenever it changes |
| CSS Modules | `*.module.css` | Scoped styles for each component |

## Run Locally

You need Node.js 18 or newer and npm.

```
npm install
npm start
```

The app opens at http://localhost:3000.

## Firebase Setup

The cart is stored in your own Firebase Realtime Database.

1. Create a project in the [Firebase console](https://console.firebase.google.com).
2. Open **Realtime Database** and click **Create Database**. Start in test mode.
3. Copy the database URL. It looks like `https://your-project-default-rtdb.europe-west1.firebasedatabase.app/`.
4. Put the URL into `FIREBASE_URL` at the top of `src/store/cart-actions.ts`, with `cart.json` at the end:

```ts
const FIREBASE_URL =
  'https://your-project-default-rtdb.europe-west1.firebasedatabase.app/cart.json';
```

Test mode rules expire after 30 days. After that, update the rules in the **Rules** tab or the app will get permission errors.

## Deployment

1. Push the project to GitHub.
2. Import the repository in Vercel and use the Create React App preset: build command `npm run build`, output directory `build`.
3. Deploy. Every push to `main` redeploys the app.

No environment variables are needed, because the Firebase URL is set in the code.

## Project Layout

```
src/
  components/
    Cart/
      Cart.tsx               cart panel
      CartButton.tsx         header button with the item counter
      CartItem.tsx           one line in the cart
    Layout/
      Layout.tsx             page wrapper
      MainHeader.tsx         header with the cart button
    Shop/
      Products.tsx           list of products
      ProductItem.tsx        one product card
    UI/
      Card.tsx               card wrapper
      Notification.tsx       status banner
  store/
    index.ts                 store and shared types
    cart-slice.ts            cart state and reducers
    ui-slice.ts              UI state and reducers
    cart-actions.ts          fetch and send thunks
    hooks.ts                 typed Redux hooks
  App.tsx                    root component
  index.tsx                  entry point
  index.css                  global styles
public/
  index.html
```

## Limitations

- Products are hard-coded in `Products.tsx`; they are not loaded from a server.
- There is a single shared cart stored at `/cart.json`, with no accounts, so everyone who uses the same database sees the same cart.
- Firebase test mode rules are open to anyone and expire after 30 days. Use proper rules for anything beyond a learning project.
- There is no checkout or payment step.
