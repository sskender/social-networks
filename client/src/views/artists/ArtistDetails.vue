<template>
  <div class="container">
      <h1>{{ artist.strArtist }}</h1>
  </div>
</template>

<script>
export default {
    //props: ['id'],
    data() {
    return {
      //artist: null
      artist: {"_id":"61cb0dfb5e9aec0934842fc6","idArtist":112509,"strArtist":"3 Doors Down","idLabel":47129,"intFormedYear":1996,"intBornYear":null,"strStyle":"Rock/Pop","strGenre":"Alternative Rock","strMood":"Sentimental","strWebsite":"www.3doorsdown.com","strFacebook":"www.facebook.com/3DoorsDown","strTwitter":"twitter.com/3doorsdown","strBiographyEN":"3 Doors Down is an American rock band from Escatawpa, Mississippi formed in 1996. Since 1998 the band consists of lead vocalist Brad Arnold, lead guitarist Chet Roberts, bass guitarist Todd Harrell and rhythm guitarist Chris Henderson. Their current drummer and percussionist is Greg Upchurch who has been with the band since 2005.\n\nThe band rose to international fame with their first single, \"Kryptonite\", which charted in the top three on the Billboard Hot 100 chart. The band then signed onto Republic Records and released their debut album, The Better Life, in 2000. The album was the 11th-best-selling album of the year and was certified 6x platinum in the United States. Their second album, Away from the Sun, (2002) continued the band's success; it debuted at #8 on the Billboard 200 chart and went multi-platinum in the United States like its predecessor. The band followed it up by extensive touring for two years before releasing their third album, Seventeen Days, in 2005. The album debuted at #1 on the Billboard 200 chart and was certified platinum within its first month of release. Their fourth, self-titled album, 3 Doors Down, also debuted at #1 on the Billboard 200 chart. The band's fifth studio album, Time of My Life, was released on July 19, 2011.\n\nThe band often performs more than 300 concerts a year and has shared the stage with artists such as Lynyrd Skynyrd, Megadeth, Staind, Nickelback, Alter Bridge, Breaking Benjamin, Seether, Shinedown, Hinder, Mentors, ZZ Top, and Daughtry. Since the start of their career, 3 Doors Down have sold over 20 million albums worldwide.","strCountry":"Escatawpa, Mississippi, USA","strArtistThumb":"https://www.theaudiodb.com/images/media/artist/thumb/qtuqrv1361747906.jpg","intListeners":2709577,"intPlaycount":63081766,"__v":0}
    }
  },
  /*mounted() {
    fetch('http://localhost:3000/artist/' + this.id)
      .then(res => res.json())
      .then(data => this.artist = data)
      .catch(err => console.log(err.message))
  }*/
}
</script>

<style>
  .container {
    margin: 15vh 7vh;
  }
</style>