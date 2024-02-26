<script >
import axios from 'axios';
import AppHeader from './components/AppHeader.vue';
import Card from './components/Card.vue';

export default {
  name: 'App',
  data() {
    return {
      films: [],
      imgNotFound: 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg',
      baseApiFilm: 'https://api.themoviedb.org/3/search/movie?api_key=ead511db72c2f9cfe0774bbca2c0a6f0',
      baseApiSeriesTv: 'https://api.themoviedb.org/3/search/tv?api_key=ead511db72c2f9cfe0774bbca2c0a6f0',
      showNoResultsMessage: false,
    }

  },
  mounted() {
    this.getFilm(this.baseApiFilm),
      this.getSeriesTv(this.baseApiSeriesTv)
  },
  methods: {
    getFilm(url) {
      //'&query=ritorno+al+futuro&language=it-IT
      axios.get(url)
        .then(response => {
          //console.log(response);
          this.films = response.data.results;
        })
        .catch(error => {
          //console.error(error);
          this.showNoResultsMessage = true;
        })

    },
    getSeriesTv(url) {
      //'&query=scrubs&language=it-IT'
      axios.get(url)
        .then(response => {
          //console.log(response);
          this.films = this.films.concat(response.data.results);
          //console.log(response.data.results[0].name);
          //console.log(this.films);
        })
        .catch(error => {
          console.error(error);
          this.showNoResultsMessage = true;
        })

    },
    filterResult(data) {
      console.log('filter', data);
      const searchText = data.map(text => text.replace(/\s/g, '+')).join('+');
      const urlFilm = `${this.baseApiFilm}&query=${searchText}&language=it-IT`;
      const urlSeriesTv = `${this.baseApiSeriesTv}&query=${searchText}&language=it-IT`
      console.log(urlFilm);
      //console.log(urlSeriesTv);
      this.getFilm(urlFilm);
      this.getSeriesTv(urlSeriesTv);

      // Ritarda la verifica di showNoResultsMessage per dare il tempo alla UI di aggiornarsi
      setTimeout(() => {
        if (this.films.length === 0) {
          this.showNoResultsMessage = true;
        } else {
          this.showNoResultsMessage = false;
        }
      }, 100);



    }
  },
  components: {
    Card,
    AppHeader

  }
}
</script>

<template>
  <AppHeader @filter="filterResult"></AppHeader>
  <div class="container">
    <h3 v-if="showNoResultsMessage" style="color: rgb(255, 0, 0); margin-bottom: 1rem;">
      Non ci sono risultati.
    </h3>
  </div>

  <div class="container d-flex">
    <div class="row">
      <Card v-for="film in films" :key="film.id" :film="film"></Card>
    </div>
  </div>
</template>

<style scoped></style>
