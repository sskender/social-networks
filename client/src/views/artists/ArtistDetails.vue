<template>
  <div v-if="artist">
    <div class="containerr">
    <div class="firstSection">
      <div class="insideFirstSection">
        <div class="detailsFavorite">
          <router-link :to="{name: 'SimilarArtists', params: { id: artist.idArtist }}" class="similarArtists2">
            Similar artists
          </router-link>
          <img style="height:4vh" :id="'myImg'+ index" v-if="favoriteArtists.some( item => item['idArtist'] === artist.idArtist)" @click="toggleLike(artist.idArtist, index)" :src="fill" alt="fill-heart">  
          <img style="height:4vh" :id="'myImg'+ index" v-else :src="stroke" @click="toggleLike(artist.idArtist, index)" alt="stroke-heart">
        </div>
        <h1>{{ artist.strArtist }}</h1>
        <div>
          <p v-if="artist.intFormedYear"><b>Active since: </b>  {{ artist.intFormedYear }}</p>
          <p v-if="artist.strStyle"><b>Style: </b> {{ artist.strStyle }}</p>
          <p v-if="artist.strGenre"><b>Genre: </b> {{ artist.strGenre }}</p>
          <p v-if="artist.Mood"><b>Mood: </b> {{ artist.strMood }}</p>
        </div>
      </div>
      <img v-if="artist.strArtistThumb" :src="artist.strArtistThumb" alt="artist-thumb">
    </div>
    <div class="secondSection">
      <h2>Biography</h2>
      <p v-if="artist.strBiographyEN">{{ artist.strBiographyEN }}</p>
    </div>
    <div class="thirdSection">
      <p v-if="artist.strCountry"><b>Country: </b>{{ artist.strCountry }}</p>
    </div>
  </div>
  <div class="fourthSection">
    <div v-if="artist.strFacebook.length>0 || artist.strTwitter.length>0 || artist.strWebsite.length>0">
        <a @click="gotoPage(artist.strFacebook)"> Facebook page </a> |
        <a @click="gotoPage(artist.strTwitter)"> Twitter page </a>  | 
        <a @click="gotoPage(artist.strWebsite)"> Website </a>
    </div>
    <div v-else>
        <p>There is no social media sites!</p>
    </div>
    </div>
  </div>
  <div v-else class="if">
    <h2>Loading..</h2>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['id'],
    data() {
    return {
      artist: null,
      favoriteArtists: [],
      fill: "https://i.ibb.co/WDTyxLR/Heart-Icon-Fill.png",
      stroke: "https://i.ibb.co/HGbwBMb/Heart-Icon-Stroke.png"
      }
  },
  mounted() {
    axios.get(
        'http://localhost:3000/artist/' + this.id,
        {
            withCredentials: true
        }
        ).then(response => this.artist = response.data.data)
        axios.get('http://localhost:3000/user/favorite', { withCredentials: true}).then(response => this.favoriteArtists = response.data.data)
  },
  methods: {
    gotoPage(link) {
      window.open("http://" + link);
    },
    toggleLike(artistId, index) {
        const data = {
            idArtist : artistId
        };
            console.log(document.getElementById("myImg" + index).src)
            if(document.getElementById("myImg" + index).src == "https://i.ibb.co/HGbwBMb/Heart-Icon-Stroke.png" || document.getElementById("myImg" + index).src == "https://i.ibb.co/HGbwBMb/Heart-Icon-Stroke.png") {
                document.getElementById("myImg" + index).src = this.fill
                axios.post(
            'http://localhost:3000/user/favorite',
            data, {withCredentials: true},
            ).then(response => console.log(response));
            } else if(document.getElementById("myImg" + index).src == "https://i.ibb.co/WDTyxLR/Heart-Icon-Fill.png" || document.getElementById("myImg" + index).src == "https://i.ibb.co/WDTyxLR/Heart-Icon-Fill.png") {
                document.getElementById("myImg" + index).src = this.stroke
                axios.delete('http://localhost:3000/user/favorite', { data: { idArtist: artistId }, withCredentials: true }).then(response => console.log(response));
            }
      },
  }
}
</script>

<style>
  .detailsFavorite {
    display: flex;
    gap: 3vh;
    align-items: center;
  }
  .containerr {
    width: 70%;
    margin: 15vh auto 0 auto;
  }

  .containerr p {
    font-family: 'Quicksand', sans-serif;
    font-weight: 800;
    padding: 0.5vh 0;
  }

  .containerr b {
    font-weight: bolder;
    font-size: 1.3em;
    color: #1c744c;
  }

  .firstSection {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .insideFirstSection {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 2.5vh;
    align-items: flex-start;
  }

  .similarArtists2 {
    padding: 15px 10px;
    background: #1c744c;
    color: white;
    font-family: 'Questrial', sans-serif;
    border-radius: 10px;
    transition: 0.5s;
    cursor: pointer;
  }

  .similarArtists2:hover {
    background: #39ac78;
    color: white;
    transition: 0.5s;
  }

  .firstSection h1, .secondSection h2 {
    color: #1c744c;
    font-family: 'Questrial', sans-serif;
    font-size: 3em;
  }

  .secondSection p {
    font-size: 1.1em;
  }


  .firstSection img {
    height: 40vh;
    border-radius: 10px;
  }

  .fourthSection {
    background: #1c744c;
    width: 100%;
    margin: 7vh auto 15vh auto;
    height: 10vh;
    color: white;
    line-height: 10vh;
    text-align: center;
    font-family: 'Quicksand', sans-serif;
    font-weight: 800;
    font-size: 1.3em;
  }

  .fourthSection a {
    color: white;
    transition: 0.5s;
    padding: 0 1vh;
  }
  
  .fourthSection a:hover {
    color: #333333
  }
</style>