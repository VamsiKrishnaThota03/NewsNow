# NewsNow

A React news reader that shows top headlines from India by category, using the NewsAPI.org API with infinite scrolling.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white)
![NewsAPI](https://img.shields.io/badge/data-NewsAPI.org-blue)

## Overview

NewsNow is a client-side React app built with class components. Each category is its own route. For the selected category, the app fetches the [NewsAPI.org](https://newsapi.org/) `top-headlines` endpoint (`country=in`) and renders the articles as Bootstrap cards.

## Features

- Category routes: General (`/`), Business, Entertainment, Health, Science, Sport and Technology.
- Infinite scrolling with `react-infinite-scroll-component`, loading 7 articles per page.
- A top loading bar (`react-top-loading-bar`) and a spinner while articles load.
- News cards with the image (or a placeholder), the title, the description, a source badge, the author and the publish date, plus a link to the full article.
- The browser tab title updates for each category, for example `Business - NewsNow`.

## Tech stack

- React 18 (class components), React Router 6
- Bootstrap 5 (via CDN in `public/index.html`)
- react-infinite-scroll-component, react-top-loading-bar
- NewsAPI.org REST API

## Project structure

```
NewsNow/
├── public/
└── src/
    ├── App.js              # routes, one per category
    └── components/
        ├── Navbar.js       # category links
        ├── News.js         # fetching, pagination, infinite scroll
        ├── NewsItem.js     # article card
        └── Spinner.js      # loading indicator
```

## Getting started

### Prerequisites

- Node.js 16 or later and npm
- A free API key from [newsapi.org](https://newsapi.org/register)

### Install and run

```bash
git clone https://github.com/VamsiKrishnaThota03/NewsNow.git
cd NewsNow
npm install
```

Create a `.env.local` file in the project root:

| Variable            | Description          | Example                 |
| ------------------- | -------------------- | ----------------------- |
| `REACT_APP_API_KEY` | Your NewsAPI.org key | `<your-newsapi-key>`    |

```bash
npm start        # dev server on http://localhost:3000
npm run build    # production build in build/
npm test         # CRA test runner
```

`npm run deploy` publishes `build/` with `gh-pages`. Install it first with `npm i -D gh-pages`.

> NewsAPI's free Developer plan only allows requests from `localhost`, so a static deployment needs a paid plan or a small proxy server.
