<template>
<div v-if="vLogged == true" class="container">
    <div class="header">
        <h1>All Genres</h1>
    </div>
    <div class="genres">
        <div v-for="genre in genres" :key="genre">
            <router-link :to="{name: 'Genre', params: { strGenre: genre }}">
                <p>{{ genre }}</p>
            </router-link>
        </div>
    </div>
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
            genres: [],
            logged: 1,
            vLogged: false
        }
    },
    mounted() {
        axios.get(
        'http://localhost:3000/artist/genre',
        {
            withCredentials: true
        }
        ).then(response => this.genres = response.data.data),
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
    .header {
        background: #1c744cee;
        height: 10vh;
        justify-content: center;
        padding: 0 5vh;
    }
    .header h1 {
        color: white;
        line-height: 10vh;
    }
    .container {
        margin: 12vh 0;
    }
    .container h1 {
         font-family: 'Questrial', sans-serif;
    }
    .genres {
        text-align: center;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        margin: 5vh;
    }
    .genres p {
        padding: 10px;
         font-family: 'Quicksand', sans-serif;
         font-weight: 800;
    }
</style>