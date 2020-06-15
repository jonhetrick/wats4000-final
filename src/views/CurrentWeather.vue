<template>
  <div class="weather">
    <h2 class="title">
      Current Weather
      <span v-if="weatherData">
        for {{ weatherData.name }}, {{ weatherData.sys.country }}</span
      >
    </h2>
    <div v-if="weatherData">
      <weather-summary
        v-bind:weatherData="weatherData.weather"
      ></weather-summary>

      <weather-data v-bind:weatherData="weatherData"></weather-data>
    </div>
    <div>
      <dl>
        <dt>Astro Twilight Begins</dt>
        <dd>{{ utcTimeBegin | convert }}</dd>
        <dt>Astro Twilight Ends</dt>
        <dd>{{ utcTimeEnd | convert }}</dd>
      </dl>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API } from "@/common/api";
import WeatherSummary from "@/components/WeatherSummary";
import WeatherData from "@/components/WeatherData";

export default {
  name: "CurrentWeather",
  components: {
    "weather-summary": WeatherSummary,
    "weather-data": WeatherData
  },
  data() {
    return {
      weatherData: null,
      astroData: null,
      utcTimeBegin: "",
      utcTimeEnd: "",
      query: "",
      ssBaseURL: "https://api.sunrise-sunset.org/json?"
    };
  },
  created() {
    let one = {
      params: {
        id: this.$route.params.cityId
      }
    };

    const requestOne = API.get("weather", one);
    const requestTwo = axios.get(
      this.ssBaseURL +
        "lat=" +
        this.$route.params.lat +
        "&" +
        "lng=" +
        this.$route.params.lng +
        "&formatted=0"
    );

    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          this.weatherData = responses[0].data;
          this.astroData = responses[1];
          (this.utcTimeBegin =
            responses[1].data.results.astronomical_twilight_begin),
            (this.utcTimeEnd =
              responses[1].data.results.astronomical_twilight_end);
        })
      )
      .catch(errors => {
        console.error(errors);
      });
  },
  filters: {
    convert: function(utcTime) {
      let localTime = new Date(utcTime);
      return localTime.toLocaleString();
    }
  }
};
</script>

<style scoped>
.title {
  padding-top: 110px;
}

h1,
h2,
h3,
h4,
h5 {
  color: whitesmoke;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  width: 300px;
  min-height: 300px;
  border: solid 1px #e8e8e8;
  padding: 10px;
}
a {
  color: #42b983;
}

.astro-data {
  color: whitesmoke;
}

.weather {
  display: inline-block;
  padding: 10px 25px;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 40px;
  margin: 0px 0px;
  box-shadow: 2px 6px rgba(0, 0, 0, 0.25);
}

dl {
  padding: 5px;
}
dt {
  float: left;
  clear: left;
  text-align: right;
  font-weight: bold;
  color: #42b983;
}
dd {
  margin: 0 0 0 130px;
  padding: 0 0 0.5em 0;
  color: whitesmoke;
}
dt::after {
  content: ":";
}
</style>
