<template>
    <div v-if="error == false" class="profileContainer">
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
            <div v-else class="if2"> <h2>You don't have favorite artists!</h2></div>

            <div class="header">
                <h1>All Liked artists</h1>
            </div>
            <div v-if="liked.length">
                <div class="genres">
                    <div v-for="artist in liked" :key="artist.idArtist">
                        <router-link :to="{name: 'ArtistDetails', params: { id: artist.idArtist }}">
                            <p>{{ artist.strArtist }}</p>
                        </router-link>
                    </div>
                </div>
            </div>
            <div v-else class="if2"> <h2>You don't have liked artists!</h2></div>
            

            <div class="header">
                <h1>All recommended artists</h1>
            </div>
            <div v-if="recommendsLocal.length">
                <div class="genres">
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
            <div v-else class="if2"> <h2>You don't have local recommended artists!</h2></div>
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
      error: false
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
    },
}

</script>

<style>
    .genres {
        text-align: center;
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