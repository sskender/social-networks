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

- GET artist details by id:
`http://localhost:3000/api/v1/artist/150642`

- GET similar artists details:
`http://localhost:3000/api/v1/artist/111239/similar`

- GET globally recommended artists (geo):
`http://localhost:3000/api/v1/artist/top`