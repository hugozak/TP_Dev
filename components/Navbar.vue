<template>
    <div>
        <ul class="navbar">
            <li><nuxt-link to="/" class="navbar--brand">Accueil</nuxt-link></li>
            <li><nuxt-link to="/quiz" class="navbar--brand">Quiz</nuxt-link></li>
            <li><nuxt-link to="/notifications" class="navbar--brand">Notifications</nuxt-link></li>
            <li><nuxt-link to="/geolocation" class="navbar--brand">Geolocalisation</nuxt-link></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style scoped>
.navbar {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.navbar li {
    display: inline;
    float: left;
}

.navbar--brand {
    display: block;
    padding: 8px;
    color: black;
    text-decoration: none;
}
</style>