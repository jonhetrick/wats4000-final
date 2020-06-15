<template>
  <div>
    <!-- <HelloWorld msg="Welcome to Astro Tracker!" /> -->
    <h1 class="title">Astro Tracker</h1>
    <div class="search-box">
      <input
        type="text"
        v-model="query"
        class="search-bar"
        placeholder="Search for a City..."
        @keypress="getWeather"
      />
      <h2 v-if="weatherData" class="results">Results:</h2>
      <ul class="matches" v-if="weatherData && weatherData.list.length > 0">
        <li
          class="gps"
          v-for="(cityMatch, index) in weatherData.list"
          :key="index"
        >
          <h2>{{ cityMatch.name }}, {{ cityMatch.sys.country }}</h2>
          <!-- <p>Latitude & Longitude:</p>
          <b>{{ cityMatch.coord.lat }}, {{ cityMatch.coord.lon }}</b> -->
          <p>
            <router-link
              class="nav"
              v-bind:to="{
                name: 'CurrentWeather',
                params: {
                  cityId: cityMatch.id,
                  lat: cityMatch.coord.lat,
                  lng: cityMatch.coord.lon
                }
              }"
              >View Details</router-link
            >
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { API } from "@/common/api";

export default {
  name: "Home",
  data() {
    return {
      weatherData: null,
      query: ""
    };
  },
  components: {},
  methods: {
    getWeather: function(e) {
      this.weatherData = null;

      if (e.key === "Enter") {
        API.get("find", {
          params: {
            q: this.query
          }
        })
          .then(response => {
            this.weatherData = response.data;
          })
          .catch(error => {
            console.log(error);
            this.errors = error;
          });
      }
    }
  }
};
</script>

<style scoped>
.title {
  padding-top: 110px;
}

.results {
  padding-top: 100px;
}

.nav {
  font-weight: bold;
  color: whitesmoke;
}

h1,
h2,
h3,
h4,
h5 {
  color: whitesmoke;
}
.search-box {
  width: 100%;
  margin-bottom: 30px;
}

.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;

  color: #313131;
  font-size: 20px;

  appearance: none;
  border: none;
  outline: none;
  background: none;

  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}

.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
}

.matches .gps {
  display: inline-block;
  padding: 10px 25px;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 40px;
  margin: 30px 0px;
  box-shadow: 2px 6px rgba(0, 0, 0, 0.25);
}
</style>
