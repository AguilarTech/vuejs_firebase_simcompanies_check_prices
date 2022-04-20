<template>
  <div class="Chart">   
    <div id="chart1">
      <!-- <h3>{{ chartName }} </h3> -->
      <img src="https://d1fxy698ilbz6u.cloudfront.net/static/images/resources/reinforced-concrete.png" width="50" height="50">
      
        <apexchart
          width="100%"
          height="400"
          type="line"
          :options="chartOptions"
          :series="series"
        ></apexchart>


    </div>

    <!-- <div id="chart2">
      <apexchart
        type="area"
        height="130"
        :options="chartOptionsBrush"
        :series="series"
      />
    </div> -->
    
  </div>
</template>

<script>
import { getPrices_firebase } from "../firebase";

export default {

  data: function() {
    return {
      chartOptions: {
        chart: {
          id: this.chartName,
          dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
          }
        },
        dataLabels: {
          enabled: true
        },
        stroke: {
              curve: 'smooth'
        },
        title: {
              text: this.chartName + ' (5 min)',
              align: 'left'
        },
        grid: {
              borderColor: '#e7e7e7',
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
        yaxis: {
              title: {
                text: '$'
              }
        },
        xaxis: {
          type: "datetime",
          labels: {
            datetimeUTC: false
          }

        },
        
      },

      chartOptionsBrush: {
        chart: {
          id: "chartBrush",
          brush: {
            target: "chartArea",
            enabled: true
          },
          selection: {
            enabled: true,
            xaxis: {
              min: 1649915012000,
              max: 1650433412000
            }
          }
        },
        colors: ["#008FFB"],
        fill: {
          gradient: {
            enabled: true,
            opacityFrom: 0.91,
            opacityTo: 0.1
          }
        },
        xaxis: {
          type: "datetime",
          tooltip: {
            enabled: false
          }
        },
        yaxis: {
          tickAmount: 2
        }
      },

      series: [
        {
          name: this.chartName,
          data: []
        },
      ],
    }
  },

  name: 'DataChart',
  props: {
    chartName: String,
    imageURL: String,
  },

  methods: {

      async fetchPrices() {

				const data = await getPrices_firebase();

				return data;
			}
    },

    async mounted() {

			const pricesObject = await this.fetchPrices();

      console.log(pricesObject);

       this.series[0].data =  pricesObject.map(( { Timestamp, Price} ) => [ Timestamp , Price ]).sort();

      console.log(this.series[0].data);
      console.log(this.series[0].name);
		}
}
</script>

<style scoped>

#chart1,
#chart2 {
  max-width: 1200px;
  margin: 35px auto;
}

#chart2 {
  position: relative;
  margin-top: -70px;
  margin-bottom: 0px;
}

h3 {
  margin: 40px 0 20px;
  text-align: center;

}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #4967ee;
}




</style>
