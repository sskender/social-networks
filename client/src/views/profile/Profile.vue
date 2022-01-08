<template>
    <div class="profileContainer">
        <div v-if="favorites.length">
            <div v-for="favorite in favorites" :key="favorite.idArtist" class="favorite">
                <h1>{{ favorite.strArtist }}</h1>
            </div>
        </div>
        <div v-else class="if">
            <h2>You don't have favorite artists!</h2>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      favorites: []
    }
  },
  mounted() {
    axios.get(
        'http://localhost:3000/user/favorite',
        {
            withCredentials: true
        }
        ).then(response => this.favorites = response.data.data)
    }
}
</script>

<style>
    .profileContainer {
        margin-top: 20vh;
    }
</style>