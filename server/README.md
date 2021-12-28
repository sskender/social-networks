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
`http://localhost:3000/api/v1/artist`

- GET artist details by idArtist:
`http://localhost:3000/api/v1/artist/150642`

- GET similar artists:
`http://localhost:3000/api/v1/artist/111239/similar`

- GET genres:
`http://localhost:3000/api/v1/artist/genre`

- GET artists with strGenre:
`http://localhost:3000/api/v1/artist/genre/rock`

- GET top artists (geo):
`http://localhost:3000/api/v1/artist/top`

- GET user's favorite artists
`http://localhost:3000/api/v1/user/favorite`

- POST / DELETE user's favorite artist
`http://localhost:3000/api/v1/user/favorite`
BODY: `{ "idArtist" : "150642" }`
