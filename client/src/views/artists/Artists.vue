<template>
  <div class="content">
      <!--<div v-if="artists.length">-->
    
    <div v-for="artist in artists" :key="artist.idArtist" class="artists">
        
            <ul>
                <img src="../../assets/ehearth.png" alt="empty-hearth">  
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
  <!--</div>
  <div v-else>
    <p>Loading artists...</p>
  </div>-->
  <div class="floating">
      <router-link :to="{name: 'AllGenres'}">All genres</router-link> | 
      <router-link :to="{name: 'TopArtists'}">Top artists</router-link>
      </div>
  </div>
</template>

<script>
const axios = require('axios');
export default {
    data() {
        return {
            artists: [
                {"_id":"61cb0dfb5e9aec0934842fc6","idArtist":112509,"strArtist":"3 Doors Down","idLabel":47129,"intFormedYear":1996,"intBornYear":null,"strStyle":"Rock/Pop","strGenre":"Alternative Rock","strMood":"Sentimental","strWebsite":"www.3doorsdown.com","strFacebook":"www.facebook.com/3DoorsDown","strTwitter":"twitter.com/3doorsdown","strBiographyEN":"3 Doors Down is an American rock band from Escatawpa, Mississippi formed in 1996. Since 1998 the band consists of lead vocalist Brad Arnold, lead guitarist Chet Roberts, bass guitarist Todd Harrell and rhythm guitarist Chris Henderson. Their current drummer and percussionist is Greg Upchurch who has been with the band since 2005.\n\nThe band rose to international fame with their first single, \"Kryptonite\", which charted in the top three on the Billboard Hot 100 chart. The band then signed onto Republic Records and released their debut album, The Better Life, in 2000. The album was the 11th-best-selling album of the year and was certified 6x platinum in the United States. Their second album, Away from the Sun, (2002) continued the band's success; it debuted at #8 on the Billboard 200 chart and went multi-platinum in the United States like its predecessor. The band followed it up by extensive touring for two years before releasing their third album, Seventeen Days, in 2005. The album debuted at #1 on the Billboard 200 chart and was certified platinum within its first month of release. Their fourth, self-titled album, 3 Doors Down, also debuted at #1 on the Billboard 200 chart. The band's fifth studio album, Time of My Life, was released on July 19, 2011.\n\nThe band often performs more than 300 concerts a year and has shared the stage with artists such as Lynyrd Skynyrd, Megadeth, Staind, Nickelback, Alter Bridge, Breaking Benjamin, Seether, Shinedown, Hinder, Mentors, ZZ Top, and Daughtry. Since the start of their career, 3 Doors Down have sold over 20 million albums worldwide.","strCountry":"Escatawpa, Mississippi, USA","strArtistThumb":"https://www.theaudiodb.com/images/media/artist/thumb/qtuqrv1361747906.jpg","intListeners":2709577,"intPlaycount":63081766,"__v":0},
                {"_id":"61cb0dfd5e9aec0934842fc8","idArtist":112055,"strArtist":"30 Seconds to Mars","idLabel":null,"intFormedYear":1998,"intBornYear":null,"strStyle":"Rock/Pop","strGenre":"Alternative Rock","strMood":"Epic","strWebsite":"thirtysecondstomars.thisisthehive.net","strFacebook":"www.facebook.com/thirtysecondstomars","strTwitter":"twitter.com/#!/30Secondstomars","strBiographyEN":"30 Seconds to Mars is an American rock band from Los Angeles, formed in 1998. Since 2007, the band has consisted of actor Jared Leto (lead vocals, rhythm guitar, songwriter), Shannon Leto (drums, percussion) and Tomo Tomo Miličević (lead guitar, keyboards). Following the departure of Matt Wachter (now of Angels & Airwaves) in 2007, Tim Kelleher became the bassist for the group, performing live only with both Jared and Tomo Miličević recording bass for studio recordings, while Braxton Olita (keyboards) was added to the touring lineup in 2009. Previously, the group also featured guitarists Solon Bixler (now of Great Northern) and Kevin Drake.\n\nTo date, 30 Seconds to Mars have released three studio albums - 30 Seconds to Mars (2002), A Beautiful Lie (2005), This Is War (2009) and three extended plays - AOL Sessions Undercover (2007), To the Edge of the Earth (2008), and MTV Unplugged: 30 Seconds to Mars (2011).\n\n30 Seconds to Mars' music has been associated mostly with progressive rock, progressive metal and post-grunge, but they have also included screamo, emo, space rock, synth rock and post-hardcore into their music. They have been compared to Pink Floyd (who were an influence on their work) and Tool because of their use of philosophical and spiritual lyrics, concept albums and their use of experimental music.","strCountry":"Los Angeles, CA","strArtistThumb":"https://www.theaudiodb.com/images/media/artist/thumb/30-seconds-to-mars-4fb1681b602b8.jpg","intListeners":2427465,"intPlaycount":118342981,"__v":0},
                {"_id":"61cb0dff5e9aec0934842fca","idArtist":111985,"strArtist":"50 Cent","idLabel":44378,"intFormedYear":1996,"intBornYear":1975,"strStyle":"Urban/R&B","strGenre":"Hip-Hop","strMood":"Angry","strWebsite":"50cent.com","strFacebook":"www.facebook.com/50cent","strTwitter":"twitter.com/50cent","strBiographyEN":"Curtis James Jackson III (born July 6, 1975), better known by his stage name 50 Cent, is an American rapper, actor, entrepreneur, investor, record, film, and television producer. Born in the South Jamaica neighborhood of the borough of Queens, Jackson began selling drugs at age twelve during the 1980s crack epidemic. Although he left drug-dealing to pursue a musical career, he was struck by nine bullets in a 2000 shooting. After Jackson released the compilation album Guess Who's Back? in 2002, he was discovered by Eminem and signed by Shady Records, Aftermath Entertainment and Interscope Records.\nWith the aid of Eminem and Dr. Dre (who produced his first major-label album, Get Rich or Die Tryin'), Jackson became one of the world's best selling rappers and rose to prominence with East Coast hip hop group G-Unit (which he leads de facto). In 2003 he founded G-Unit Records, signing his G-Unit associates Young Buck, Lloyd Banks and Tony Yayo. Jackson had similar commercial and critical success with his second album, The Massacre, which was released in 2005. He released his fifth studio album, Animal Ambition, in 2014 and is working on his sixth studio album: Street King Immortal, scheduled for release in 2016.\nDuring his career Jackson has sold over 30 million albums worldwide and won several awards, including a Grammy Award, thirteen Billboard Music Awards, six World Music Awards, three American Music Awards and four BET Awards. He has pursued an acting career, appearing in the semi-autobiographical film Get Rich or Die Tryin' (2005), the Iraq War film Home of the Brave (2006) and Righteous Kill (2008). 50 Cent was ranked the sixth-best artist of the 2000s, the third-best rapper (behind Eminem and Nelly), and Get Rich or Die Tryin' and The Massacre were ranked the 12th and 37th best albums of the decade by Billboard.","strCountry":"New York, USA","strArtistThumb":"https://www.theaudiodb.com/images/media/artist/thumb/ya6y871615076491.jpg","intListeners":3033749,"intPlaycount":48992348,"__v":0}
            ],
        }
    },
    headers: {'Access-Control-Allow-Credentials':true },
    mounted() {
        axios.get('http://localhost:3000/artist').then(response => console.log(response.data));
    },
    

}
</script>

<style>
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
        height: 50px;
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