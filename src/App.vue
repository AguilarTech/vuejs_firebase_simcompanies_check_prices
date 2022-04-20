<template>
  <h1> SimCompanies Price Chart</h1>
  <DataChart chartName="Reinforced Concrete Price" imageURL="https://d1fxy698ilbz6u.cloudfront.net/static/images/resources/reinforced-concrete.png"/>
  <!-- <DataChart chartName="Cement Price"/> -->
</template>

<script>
import DataChart from './components/DataChart.vue'


export default {
  name: 'App',
  components: {
    DataChart
  },

  data() {
			return {
			};
		},
    
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #041629;
 margin: 35px auto;
  padding-top: 20px;
  padding-left: 10px;
  background: #fff;
  border: 1px solid #ddd;

  box-shadow: 0 22px 35px -16px rgba(0, 0, 0, 0.692);


}

</style>
