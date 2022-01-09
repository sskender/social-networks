<template>
    <div v-if="vLogged == true" class="profileContainer">
            <div class="header">
                <h1>All Favorite artists</h1>
            </div>
            <div v-if="favorites.length">
                <div class="genres">
                    <div v-for="favorite in favorites" :key="favorite.idArtist">
                        <router-link :to="{name: 'ArtistDetails', params: { id: favorite.idArtist }}">
                            <p>{{ favorite.strArtist }}</p>
                        </router-link>
                    </div>
                </div>
            </div>
            <div v-else class="if2"> <h2>Start selecting your favorite artists!</h2></div>

            <div class="header">
                <h1>All Liked artists</h1>
            </div>
            <div v-if="liked.length">
                <div class="profileFavorites">
                    <div v-for="artist in liked" :key="artist.idArtist">
                        <router-link :to="{name: 'ArtistDetails', params: { id: artist.idArtist }}">
                            <p>{{ artist.strArtist }}</p>
                        </router-link>
                    </div>
                </div>
            </div>
            <div v-else class="if2"> <h2>Start liking your artists!</h2></div>
            

            <div class="header">
                <h1>All recommended artists</h1>
            </div>
            <div v-if="favorites.length">
                <div v-if="recommendsLocal.length">
                <div class="profileFavorites">
                    <div v-for="recommendList in recommendsLocal" :key="recommendList">
                        <div v-for="favorite in recommendList.similar" :key="favorite.idArtist">
                        <router-link :to="{name: 'ArtistDetails', params: { id: favorite.idArtist }}">
                            <p>{{ favorite.strArtist }}</p>
                        </router-link>
                    </div>
                    </div>
                    <div v-for="recommendList in recommendsExternal" :key="recommendList">
                        <div v-for="favorite in recommendList.similar" :key="favorite.idArtist">
                        <router-link :to="{name: 'ArtistDetails', params: { id: favorite.idArtist }}">
                            <p>{{ favorite.strArtist }}</p>
                        </router-link>
                    </div>
                    </div>
                </div>
            </div>
            <div v-else class="if2"> <h2>Loading..</h2></div>
            </div>
            <div v-else class="if2"> <h2>Start selecting your favorite artists!</h2></div>
            
    </div>
    <div v-else class="if">
        <h2>Please login first!</h2>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      favorites: [],
      liked: [],
      recommendsLocal: [],
      recommendsExternal: [],
      error: false,
      logged: 1,
      vLogged: false
    }
  },
  mounted() {
    axios.get(
        'http://localhost:3000/user/favorite',
        {
            withCredentials: true
        }
        ).then(response => this.favorites = response.data.data),
        axios.get(
        'http://localhost:3000/user/liked',
        {
            withCredentials: true
        }
        ).then(response => this.liked = response.data.data),
        axios.get(
        'http://localhost:3000/user/recommend/local',
        {
            withCredentials: true
        }
        ).then(response => this.recommendsLocal = response.data.data)
        axios.get(
        'http://localhost:3000/user/recommend/external',
        {
            withCredentials: true
        }
        ).then(response => this.recommendsExternal = response.data.data)
        setTimeout(() => {
      if(this.logged == 401) {
        this.vLogged = false 
      } else {
        this.vLogged = true
      }
      
      }, 100
      );
    },
    created() {
        axios.get('http://localhost:3000/profile', {withCredentials: true}).then(response => this.logged = response.data.status)
    }
}

</script>

<style>
    .profileFavorites {
        columns: 6;
        margin: 5vh;
        text-align: center;

    }

    .profileFavorites p {
        padding: 2vh;
    }
    .profileContainer {
        margin-top: 20vh;
    }
    .if2 {
        text-align: center;
        font-size: 1.3em;
        color: #1c744c;
        margin: 5vh auto;
    }
</style>