# Node.js backend

### Run

```bash
npm start
```

### Run development

```bash
npm run dev
```

### Linter

```bash
npm run lint
```

```bash
npm run lint:fix
```

## API

- GET artists:
`http://localhost:3000/artist`

- GET artist details by idArtist:
`http://localhost:3000/artist/150642`

- GET similar artists:
`http://localhost:3000/artist/111239/similar`

- GET genres:
`http://localhost:3000/artist/genre`

- GET artists with strGenre:
`http://localhost:3000/artist/genre/rock`

- GET top artists (geo):
`http://localhost:3000/artist/top`

- GET user's favorite artists
`http://localhost:3000/user/favorite`

- POST / DELETE user's favorite artist
`http://localhost:3000/user/favorite`
BODY: `{ "idArtist" : "150642" }`

- GET liked artists from facebook
`http://localhost:3000/user/liked`

- GET recommended artists from favorites
`http://localhost:3000/user/recommend/local`

- GET recommended artists from facebook
`http://localhost:3000/user/recommend/external`

- FACEBOOK LOGIN REDIRECT:
`http://localhost:3000/auth/facebook`

- LOGOUT REDIRECT:
`http://localhost:3000/auth/logout`
