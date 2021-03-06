import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Artists from '../views/artists/Artists.vue'
import Profile from '../views/profile/Profile.vue'
import ArtistDetails from '../views/artists/ArtistDetails.vue'
import TopArtists from '../views/artists/TopArtists.vue'
import AllGenres from '../views/artists/AllGenres.vue'
import SimilarArtists from '../views/artists/SimilarArtists.vue'
import Genre from '../views/artists/Genre.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/artist',
    name: 'Artists',
    component: Artists
  },
  {
    path: '/artist/:id',
    name: 'ArtistDetails',
    component: ArtistDetails,
    props: true
  },
  {
    path: '/artist/:id/similar',
    name: 'SimilarArtists',
    component: SimilarArtists,
    props: true
  },
  {
    path: '/artist/top',
    name: 'TopArtists',
    component: TopArtists
  },
  {
    path: '/artist/genre',
    name: 'AllGenres',
    component: AllGenres
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/artist/genre/:strGenre',
    name: 'Genre',
    component: Genre,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
