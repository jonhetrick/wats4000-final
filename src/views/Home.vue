<template>
  <div>
    <!-- <HelloWorld msg="Welcome to Astro Tracker!" /> -->
    <h1>Astro Tracker</h1>
    <div class="search-box">
      <input
        type="text"
        v-model="query"
        class="search-bar"
        placeholder="Search for a City..."
        @keypress="getWeather"
      />
      <h2>Results:</h2>
      <ul class="matches" v-if="results && results.list.length > 0">
        <li class="gps" v-for="(cityMatch, index) in results.list" :key="index">
          <h2>{{ cityMatch.name }}, {{ cityMatch.sys.country }}</h2>
          <p>Latitude & Longitude:</p>
          <b>{{ cityMatch.coord.lat }}, {{ cityMatch.coord.lon }}</b>
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
      results: null,
      query: ""
    };
  },
  components: {},
  methods: {
    getWeather: function(e) {
      this.results = null;

      if (e.key === "Enter") {
        API.get("find", {
          params: {
            q: this.query
          }
        })
          .then(response => {
            this.results = response.data;
          })
          .catch(error => {
            this.errors = error;
          });
      }
    }
  }
};
</script>

<style scoped>
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
  font-weight: 500;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
</style>
