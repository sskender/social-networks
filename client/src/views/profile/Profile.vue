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
export default {
  data() {
    return {
      favorites: []
    }
  },
  mounted() {
    fetch('http://localhost:3000/user/favorite')
      .then(res => res.json())
      .then(data => this.favorites = data).then(console.log(this.favorites))
      .catch(err => console.log(err.message))
  }
}
</script>

<style>
    .profileContainer {
        margin-top: 20vh;
    }
</style>