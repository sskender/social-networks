<template>
<div class="container">
    <div class="header">
        <h1>All Genres</h1>
    </div>
    <div class="genres">
        <p v-for="(genre, index) in genres" :key="index">
            {{ genre }}
        </p>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            genres: ["Accapella","Acid Jazz","Acoustic","Alternative Hip-Hop","Alternative Metal","Alternative Rock","Ambient","Asian","Big Band","BlueGrass","Blues","Classic Rock","Classical","Composer","Country","Country Pop","Country Rap","Country Rock","Dance","Dancehall","Death Metal","Deep House","Disco","Drum & Bass","Dubstep","Electro House","Electronic","Experimental","Folk","Funk","Fusion","Glam Metal","Gospel","Goth","Grime","Grunge","Guitarist","Hard Rock","Hardcore Punk","Heavy Metal","Hip-Hop","House","Indie","Indie Pop","Indie Rock","Industrial Metal","Jazz","K-Pop","Latin","Metal","Musical","New Age","New Wave","Nu Metal","OST","Orchestral","Pop","Pop-Punk","Pop-Rock","Post-Hardcore","Post-Punk","Power Metal","Pre-60s","Progressive Metal","Progressive Rock","Protopunk","Psychedelic Rock","Punk Rock","R&B","R&b","Rap","Rap Metal","Reggae","Reggae fusion","Rock","Rock & Roll","Rockabilly","Singer Songwriter","Ska Punk","Sludge Metal","Soft Rock","Soul","Speed Metal","Swing","Synthpop","Techno","Thrash Metal","Trance","Trap","Trip Hop","UK Garage"]
        }
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
        column-count: 6;
        margin: 5vh;
    }
    .genres p {
        padding: 10px;
         font-family: 'Quicksand', sans-serif;
         font-weight: 800;
    }
</style>