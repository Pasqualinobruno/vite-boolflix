<script>
export default {
    name: 'AppHeader',
    data() {
        return {
            seracheText: '',
        }
    }
}
</script>
<template>
    <header>
        <div class="container">
            <nav class="navbar">
                <h1><strong>BoolFlix</strong></h1>
                <div>
                    <input type="text" placeholder="name film/ series tv" v-model="seracheText">
                    <button @click="$emit('filter', [this.seracheText])"><strong>Search</strong></button>
                </div>


            </nav>
        </div>
    </header>
</template>
<style scoped>
header {
    background-color: var(--boolflix-dark);
    padding: 1rem;

    h1 {
        color: var(--boolflix-danger);
        font-size: xx-large;
    }

    .navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    input {
        padding: 0.25rem;
        border-radius: 0.4rem;
        border: 2px solid var(--boolflix-danger);
        margin-right: 0.25rem;
    }

    button {
        padding: 0.3rem 0.2rem;
        border-radius: 0.4rem;
        border: 2px solid var(--boolflix-dark);
        color: var(--boolflix-danger);
        font-size: small;
    }

}
</style>