<template>
  <div>
    <div class="home">
      <h1>Welcome to DrumCloud!</h1>
      <h3>The best music and artists at one place..</h3>
      <div></div>
      <img src="../assets/home.png" alt="home">
  </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    
  },
  data() {
    return {

    }
  },
  mounted() {
    //fetch('http://localhost:3000/artist')
    //  .then(res => res.json())
    //  .then(data => this.artists = data)
     // .catch(err => console.log(err.message))
     console.log(this.logged)
  }
}
</script>

<style>
  .home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 15vh 0;
    gap: 5vh;
    font-size: 2em;
    font-family: 'Quicksand', sans-serif;
    color: #42b983;
  }

  .home img {
    height: 30vh;
    width: 100%;
    filter: blur(5px);
  }

  .home h3 {
    color: #1c744c;
  }
</style>
