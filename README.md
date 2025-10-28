# Movie Search & Favorites

A small React (Vite) app to search movies via the OMDb API, view details, and save favorites.

Features:
- Search movies by title (OMDb API)
- Responsive grid of movie cards showing poster, title, year, genre
- Add/remove favorites; favorites shown in a separate section
- Modal with detailed movie info
- Loading spinner while fetching
- Uses React functional components and hooks (useState, useEffect)

Setup (Windows PowerShell):

1. Copy the example env and set your OMDb API key:

```powershell
cp .env.example .env
# then open .env and replace VITE_OMDB_KEY value with your key
```

2. Install dependencies and run:

```powershell
npm install
npm run dev
```

Open the URL shown by Vite (usually http://localhost:5173).

Notes:
- Get an OMDb API key at http://www.omdbapi.com/apikey.aspx.
- The app stores favorites in localStorage.

Next steps / improvements:
- Add unit tests
- Use image placeholder asset for missing posters
- Improve accessibility and keyboard interactions
