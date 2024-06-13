<template>
    <div class="app">
      <Navbar class="navbar" />
      <div class="container">
        <div class="score">
            Score : {{ score }}
        </div>
        <transition name="swipe" mode="out-in" @after-leave="afterLeave">
          <div v-if="flagUrl" :key="flagUrl" class="question-container">
            <div class="flag">
                <img v-if="flagUrl" :src="flagUrl" class="flag-image"/>
            </div>
            <div class="buttons" v-if="countries.length">
              <el-button 
                v-for="(country, index) in countries" 
                :key="index" 
                :type="country.status ? country.status : 'primary'"
                @click="checkAnswer(country)"
                :disabled="resultMessage !== ''"
                size="large"
              >
                {{ country.name }}
              </el-button>
            </div>
          </div>
        </transition>
        <div v-if="resultMessage" key="result" class="result-container">
          <div class="result-message">
            {{ resultMessage }}
          </div>
          <el-button type="primary" @click="replay">Rejouer</el-button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        flagUrl: '',
        countryName: '',
        countries: [],
        resultMessage: '',
        transitioning: false,
        score: 0
      };
    },
    async created() {
      this.loadScore();
      await this.getCountries();
    },
    methods: {
      async getCountries() {
        try {
          const response = await fetch('https://flagcdn.com/fr/codes.json');
          const tags = await response.json();
  
          const keys = Object.keys(tags);
          let selectedCountries = [];
  
          // Choisir quatre pays sans tirets
          while (selectedCountries.length < 4) {
            const randomIndex = Math.floor(Math.random() * keys.length);
            const randomKey = keys[randomIndex];
            const randomCountry = tags[randomKey];
            if (!randomKey.includes('-') && !selectedCountries.some(c => c.key === randomKey)) {
              selectedCountries.push({ key: randomKey, name: randomCountry, status: '' });
            }
          }
  
          this.countries = selectedCountries;
  
          // Sélectionner un pays au hasard parmi les quatre pour afficher son drapeau
          const randomCountry = selectedCountries[Math.floor(Math.random() * selectedCountries.length)];
          this.flagUrl = `https://flagcdn.com/w320/${randomCountry.key}.png`;
          this.countryName = randomCountry.name;
        } catch (error) {
          console.error('Fetch error:', error);
        }
      },
      checkAnswer(selectedCountry) {
        this.countries = this.countries.map(country => {
          if (country.name === this.countryName) {
            country.status = 'success';
          } else {
            country.status = 'danger';
          }
          return country;
        });
  
        if (selectedCountry.name === this.countryName) {
          this.resultMessage = 'Gagné !';
          this.incrementScore();
        } else {
          this.resultMessage = 'Perdu !';
        }
      },
      async replay() {
        this.transitioning = true;
        this.flagUrl = '';
        this.countryName = '';
        this.countries = [];
        this.resultMessage = '';
      },
      async afterLeave() {
        if (this.transitioning) {
          await this.getCountries();
          this.transitioning = false;
        }
      },
      incrementScore() {
        if (typeof localStorage !== 'undefined') {
          this.score++;
          localStorage.setItem('userScore', this.score.toString());
        } else {
          console.error('localStorage is not available.');
        }
      },
      loadScore() {
        if (typeof localStorage !== 'undefined') {
          const storedScore = localStorage.getItem('userScore');
          if (storedScore !== null) {
            this.score = parseInt(storedScore, 10);
          }
        } else {
          console.error('localStorage is not available.');
        }
      }
    }
  };
  </script>
  
  
  <style>
  .app {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  .container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
    overflow: hidden;
  }
  
  .buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
  }
  
  .result-message {
    margin-top: 1em;
    font-size: 1.5em;
    font-weight: bold;
  }
  
  /* Transition styles */
  .swipe-enter-active, .swipe-leave-active {
    transition: transform 0.5s ease;
  }
  
  .swipe-enter, .swipe-leave-to {
    transform: translateX(100%);
  }
  
  .swipe-leave-active {
    transform: translateX(-100%);
  }
  
  .swipe-enter-active, .swipe-enter {
    transform: translateX(0);
  }
  
  .flag-image {
    width: 100%; /* Adjust as needed */
    max-width: 320px;
    margin-bottom: 20px;
  }

  .flag {
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
  }

  .score {
    margin-bottom: 10px;
  }
  </style>
  