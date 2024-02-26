<script>
export default {
    name: 'Card',
    data() {
        return {
        }
    },
    props: {
        film: Object,
    },
    methods: {
        getImageUrl(posterPath) {
            // Assicurati di avere la base URL corretta dell'API delle immagini.
            const baseUrl = 'https://image.tmdb.org/t/p/w500';
            return posterPath ? baseUrl + posterPath : ''; // Restituisce l'URL completo solo se il posterPath esiste.
        },
        creatFlags(nation) {
            return `../public/img/${nation}.png`;
        },
        getStarsFromFirstDigit(voteCount) {
            const firstDigit = parseInt(voteCount.toString()[0]);
            // Dividi per due, approssima per eccesso con un massimo di 5 stelle
            const stars = Math.min(Math.ceil(firstDigit / 2), 5);
            return new Array(stars).fill(0);
        },
        getShortenedOverview(overview) {
            // Verifica se la lunghezza dell'overview supera i 50 caratteri
            if (overview.length > 30) {
                // Se sì, restituisci i primi 50 caratteri con "..." alla fine
                return overview.slice(0, 50) + '...';
            }
            // Altrimenti, restituisci l'overview completo
            return overview;
        },

    }
}
</script>
<template>
    <div class="col-3 card">
        <img :src="film.poster_path ? getImageUrl(film.poster_path) : imgNotFound" alt="">
        <ul>
            <li>
                <div>Titolo: {{ film.title !== undefined && film.title !== '' ? film.title : film.name }}</div>
            </li>
            <li>
                <div>Titolo originale:{{ film.original_name !== undefined && film.original_name !== '' ? film.original_name
                    :
                    film.original_title }}</div>
            </li>
            <li>Lingua originale:{{ film.original_language }} <img :src="creatFlags(film.original_language)" alt=""></li>
            <li style="display: flex; gap: 0.25rem;">
                Voto:
                <p v-for="star in getStarsFromFirstDigit(film.vote_count)" :key="star">
                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                </p>
            </li>
            <li>Overview:{{ getShortenedOverview(film.overview) }}</li>
        </ul>
    </div>
</template>
<style scoped>
.card {
    color: var(--boolflix-light);
}
</style>