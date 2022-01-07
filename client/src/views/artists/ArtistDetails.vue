<template>
  <div v-if="artist">
    <div class="containerr">
    <div class="firstSection">
      <div>
        <h1>{{ artist.strArtist }}</h1>
        <p v-if="artist.intFormedYear"><b>Formed: </b>  {{ artist.intFormedYear }}</p>
        <p v-if="artist.strStyle"><b>Style: </b> {{ artist.strStyle }}</p>
        <p v-if="artist.strGenre"><b>Genre: </b> {{ artist.strGenre }}</p>
        <p v-if="artist.Mood"><b>Mood: </b> {{ artist.strMood }}</p>
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
    <div v-if="artist.strFacebook | artist.strTwitter | artist.strWebsite">
        <a href=""> Facebook page </a> |
        <a href=""> Twitter page </a>  | 
        <a href=""> Website </a>
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
      artist: null
      }
  },
  mounted() {
    axios.get(
        'http://localhost:3000/artist/' + this.id,
        {
            withCredentials: true
        }
        ).then(response => this.artist = response.data.data)
  }
}
</script>

<style>
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
    margin-bottom: 5vh;
  }

  .firstSection h1, .secondSection h2 {
    color: #1c744c;
    font-family: 'Questrial', sans-serif;
    font-size: 3em;
    margin-bottom: 7vh;
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