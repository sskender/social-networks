<template>
  <div v-if="vLogged == true" class="content">
      <div class="searchHeader">
            <div class="search-wrapper">
                <label>Search title: </label>
                <input type="text" v-model="search" placeholder="Search title.."/>
            </div>
            <div>
                <!--<p @click="refreshApi">Refresh items</p>-->
            </div>
      </div>
    <div v-if="!(search != '' && !filteredList.length)">
        <div v-if="filteredList.length">
        <div v-for="(artist, index) in filteredList" :key="artist.idArtist" class="artists">
        
            <ul>
                <img :id="'myImg'+ index" v-if="favoriteArtists.some( item => item['idArtist'] === artist.idArtist)" @click="toggleLike(artist.idArtist, index)" :src="fill" alt="fill-heart">  
                <img :id="'myImg'+ index" v-else :src="stroke" @click="toggleLike(artist.idArtist, index)" alt="stroke-heart">
                        <router-link :to="{name: 'ArtistDetails', params: { id: artist.idArtist }}" class="nd">
                            <div>
                                <h2>{{ artist.strArtist }}</h2>
                                <div>
                                    <p>{{artist.intFormedYear}}</p>
                                    <p>{{artist.strGenre}}</p>
                                </div>
                            </div>
                        </router-link> 
                <div class="details">
                    <h3>More info</h3>
                    <br>
                    <p><b>Mood: </b> {{ artist.strMood }}</p>
                    <p><b>Country: </b> {{ artist.strCountry }}</p>
                    <p><b>Listeners: </b> {{ artist.intListeners }}</p><br>
                </div>
            </ul>
        
    </div>
    </div>
    <div v-else class="if">
        <h2>Loading..</h2>
    </div>
    </div>
    <div v-else class="if">
        <h2>No results</h2>
    </div>
    
  
  <div class="floating">
      <router-link :to="{name: 'AllGenres'}">All genres</router-link> | 
      <router-link :to="{name: 'TopArtists'}">Top artists</router-link>
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
            search: '',
            artists: [ ],
            favoriteArtists: [],
            error: false,
            fill: "Heart_Icon_Fill.svg",
            stroke: "Heart_Icon_Stroke.svg",
            logged: 1,
            vLogged: false
        }
    },
    mounted() {
        if(!this.artists.length) {
            axios.get(
        'http://localhost:3000/artist',
        {
            withCredentials: true
        }
        ).then(response => this.artists = response.data.data)
        }
        axios.get('http://localhost:3000/user/favorite', { withCredentials: true}).then(response => this.favoriteArtists = response.data.data)
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
        },
    computed: {
    filteredList() {
      return this.artists.filter(artist => {
        return artist.strArtist.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
      /*unlike(artistId, index) {
          axios.delete('http://localhost:3000/user/favorite', { data: { idArtist: artistId }, withCredentials: true }).then(response => console.log(response));
          document.getElementById("myImg" + index).src = this.stroke

      },*/
      toggleLike(artistId, index) {
        const data = {
            idArtist : artistId
        };
            console.log(document.getElementById("myImg" + index).src)
            if(document.getElementById("myImg" + index).src == "Heart_Icon_Stroke.svg" || document.getElementById("myImg" + index).src == "http://localhost:8080/Heart_Icon_Stroke.svg") {
                document.getElementById("myImg" + index).src = this.fill
                axios.post(
            'http://localhost:3000/user/favorite',
            data, {withCredentials: true},
            ).then(response => console.log(response));
            } else if(document.getElementById("myImg" + index).src == "Heart_Icon_Fill.svg" || document.getElementById("myImg" + index).src == "http://localhost:8080/Heart_Icon_Fill.svg") {
                document.getElementById("myImg" + index).src = this.stroke
                axios.delete('http://localhost:3000/user/favorite', { data: { idArtist: artistId }, withCredentials: true }).then(response => console.log(response));
            }
      },


      
      refreshApi() {
          axios.get(
        'http://localhost:3000/artist',
        {
            withCredentials: true
        }
        ).then(response => this.artists = response.data.data)
      },
  },
}
</script>

<style>
    .if h2 {
        margin-top: 20vh;
        font-family: 'Questrial', sans-serif;
        color: #1c744c;
        font-size: 2em;
    }

    .if {
        width: 100%;
        text-align: center;
    }
    input[type=text], select {
    padding: 12px 20px;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-left: 2vh;
    }
    .search-wrapper {
        margin-top: 13vh;
        font-family: 'Questrial', sans-serif;
        font-size: 1.2em;
        margin-left: 10vh;
    }

    input[type=text]:focus {
        outline: none;
        border: 1px solid #1c744c;
    }
    .details {
        width: 25%;
        line-height: 1.9vh;
        opacity: 0;
        transition: 0.5s;
        float: left;
    }

    .details h3, .details b {
        font-family: 'Questrial', sans-serif;
        font-size: 1.1em;
    }

    .details h3 {
        font-size: 1.3em
    }

    .details p, .details a {
        font-family: 'Quicksand', sans-serif;
        font-weight: 800;
    }
    ul {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    a {
        text-decoration: none;
        color: black;
    }
    .artists {
        width: 80%;
        margin: 10vh auto;
        margin-right: 0;
    }

    .artists .nd {
        display: flex;
        width: 40%;
        margin: 0 2vh;
        border: 1px solid #1c744c55;
        padding: 25px;
        border-radius: 10px;
        transition: .5s;
        color: #1c744c;
        font-family: 'Quicksand', sans-serif;
        font-weight: 800;
        font-size: 1.05em;;
        align-items: center;
        justify-content: space-between;
    }

    .artists .nd:hover {
        background: #1c744c;
        color: white;
    }

    .artists .nd:hover + .details {
        opacity: 1;
    }

    .artists img {
        height: 30px;
        cursor: pointer;
    }

    .artists .nd p {
        font-size: 0.95em;
    }

    .artists .nd div {
        align-self: flex-start;
        padding: 20px;
    }

    .floating {
        position: fixed;
        bottom: 50px;
        right: 50px;
        font-size: 1.2em;
        text-transform: uppercase;
        color: #1c744c;
    }

    .floating a {
        font-family: 'Quicksand', sans-serif;
        font-weight: 900;
        color: #1c744c;
        transition: .5s;
    }

    .floating a:hover {
        color: grey;
    }
</style>