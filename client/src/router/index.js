import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Artists from '../views/artists/Artists.vue'
import Profile from '../views/profile/Profile.vue'
import ArtistDetails from '../views/artists/ArtistDetails.vue'
import TopArtists from '../views/artists/TopArtists.vue'
import AllGenres from '../views/artists/AllGenres.vue'
import GenreDetails from '../views/artists/GenreDetails.vue'
import Liked from '../views/profile/Liked.vue'
import UserFavorite from '../views/profile/UserFavorite.vue'
import SimilarArtists from '../views/artists/SimilarArtists.vue'

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
    path: '/artist/genre/:id',
    name: 'GenreDetails',
    component: GenreDetails
  },
  {
    path: '/user/favorite',
    name: 'UserFavorite',
    component: UserFavorite
  },
  {
    path: '/user/liked',
    name: 'Liked',
    component: Liked
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router