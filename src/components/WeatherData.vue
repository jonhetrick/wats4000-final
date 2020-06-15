<template>
  <dl>
    <dt v-if="weatherData.main.temp != weatherData.main.temp_min">
      Temp
    </dt>
    <dd v-if="weatherData.main.temp != weatherData.main.temp_min">
      {{ weatherData.main.temp }}&deg;F
    </dd>
    <dt>Visibility</dt>
    <dd>{{ weatherData.visibility }} Meters</dd>
    <dt>Sunrise</dt>
    <dd>{{ weatherData.sys.sunrise | convertEpoc }}</dd>
    <dt>Sunset</dt>
    <dd>{{ weatherData.sys.sunset | convertEpoc }}</dd>
  </dl>
</template>

<script>
export default {
  name: "WeatherData",
  data() {
    return {};
  },
  props: {
    weatherData: Object
  },
  filters: {
    convertEpoc: function(time) {
      let d = new Date(time * 1000);
      return d.toLocaleTimeString("en-US");
    }
  }
};
</script>

<style scoped>
dl {
  padding: 5px;
}
dt {
  float: left;
  /* clear: left; */
  width: 120px;
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
