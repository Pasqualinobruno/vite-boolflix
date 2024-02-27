import { reactive } from "vue";
export const store = reactive({
    baseApiFilm: 'https://api.themoviedb.org/3/search/movie?api_key=ead511db72c2f9cfe0774bbca2c0a6f0',
    baseApiSeriesTv: 'https://api.themoviedb.org/3/search/tv?api_key=ead511db72c2f9cfe0774bbca2c0a6f0',
    showNoResultsMessage: false,
})