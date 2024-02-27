<script>
import { store } from '../store';
export default {
    name: 'Card',
    data() {
        return {
            isInfoVisible: false,
            store
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
        toggleInfo() {
            if (this.infoTimeout) {
                clearTimeout(this.infoTimeout); // Cancella il timeout se presente
            }
            this.isInfoVisible = !this.isInfoVisible;
        },

        // Aggiungi l'handler per resettare le informazioni quando il mouse esce dall'elemento card
        resetInfo() {
            this.isInfoVisible = false;
        },
    }



}

</script>
<template>
    <div class="col-3">
        <div class="card" @mouseover="toggleInfo" @mouseleave="resetInfo">
            <img :src="film.poster_path ? getImageUrl(film.poster_path) : store.imgNotFound" alt="">
            <ul class="info" v-show="isInfoVisible">
                <li>
                    <div>Titolo: {{ film.title !== undefined && film.title !== '' ? film.title : film.name }}</div>
                </li>
                <li>
                    <div>Titolo originale:{{ film.original_name !== undefined && film.original_name !== '' ?
                        film.original_name
                        :
                        film.original_title }}</div>
                </li>
                <li>Lingua originale:{{ film.original_language }} <img class="flag"
                        :src="creatFlags(film.original_language)" alt="">
                </li>
                <li style="display: flex; gap: 0.25rem;">
                    Voto:
                    <p v-for="star in getStarsFromFirstDigit(film.vote_count)" :key="star">
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                    </p>
                </li>
                <li>Overview:{{ getShortenedOverview(film.overview) }}</li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
.card {
    color: var(--boolflix-light);
    position: relative;




    .flag {
        width: 12px;
    }

    .info {
        position: absolute;
        background-color: var(--boolflix-dark);
        padding: 1rem;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 1px solid var(--boolflix-light);


    }


}
</style>