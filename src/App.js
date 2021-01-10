import './App.css';
import React, { Component } from 'react';
import CanvasJSReact from "./assets/canvasjs.react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      date: "Loading...",
    };
  }

  removeNull(array) {
    return array.filter(x => x !== null)
  };

  filterMonth(array) {
      array.forEach(function(value,index){
          Object.keys(array[index].timeline.cases).forEach(function (valueCases,indexCases){
              if(valueCases.split("/")[0] != (12-new Date().getMonth())){
                  delete array[index].timeline.cases[valueCases]
              }
          })
      });
      return array
  };

    addSymbols(e){
        var suffixes = ["", "K", "M", "B"];
        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if(order > suffixes.length - 1)
            order = suffixes.length - 1;
        var suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }

  async componentDidMount() {
    // fetch("https://disease.sh/v3/covid-19/historical/AF%2C%20AX%2C%2C%20ZW?lastdays=60")
    fetch("https://disease.sh/v3/covid-19/historical/AF%2C%20AX%2C%20AL%2C%20DZ%2C%20AS%2C%20AD%2C%20AO%2C%20AI%2C%20AQ%2C%20AG%2C%20AR%2C%20AM%2C%20AW%2C%20AU%2C%20AT%2C%20AZ%2C%20BH%2C%20BS%2C%20BD%2C%20BB%2C%20BY%2C%20BE%2C%20BZ%2C%20BJ%2C%20BM%2C%20BT%2C%20BO%2C%20BQ%2C%20BA%2C%20BW%2C%20BV%2C%20BR%2C%20IO%2C%20BN%2C%20BG%2C%20BF%2C%20BI%2C%20KH%2C%20CM%2C%20CA%2C%20CV%2C%20KY%2C%20CF%2C%20TD%2C%20CL%2C%20CN%2C%20CX%2C%20CC%2C%20CO%2C%20KM%2C%20CG%2C%20CD%2C%20CK%2C%20CR%2C%20CI%2C%20HR%2C%20CU%2C%20CW%2C%20CY%2C%20CZ%2C%20DK%2C%20DJ%2C%20DM%2C%20DO%2C%20EC%2C%20EG%2C%20SV%2C%20GQ%2C%20ER%2C%20EE%2C%20ET%2C%20FK%2C%20FO%2C%20FJ%2C%20FI%2C%20FR%2C%20GF%2C%20PF%2C%20TF%2C%20GA%2C%20GM%2C%20GE%2C%20DE%2C%20GH%2C%20GI%2C%20GR%2C%20GL%2C%20GD%2C%20GP%2C%20GU%2C%20GT%2C%20GG%2C%20GN%2C%20GW%2C%20GY%2C%20HT%2C%20HM%2C%20VA%2C%20HN%2C%20HK%2C%20HU%2C%20IS%2C%20IN%2C%20ID%2C%20IR%2C%20IQ%2C%20IE%2C%20IM%2C%20IL%2C%20IT%2C%20JM%2C%20JP%2C%20JE%2C%20JO%2C%20KZ%2C%20KE%2C%20KI%2C%20KP%2C%20KR%2C%20KW%2C%20KG%2C%20LA%2C%20LV%2C%20LB%2C%20LS%2C%20LR%2C%20LY%2C%20LI%2C%20LT%2C%20LU%2C%20MO%2C%20MK%2C%20MG%2C%20MW%2C%20MY%2C%20MV%2C%20ML%2C%20MT%2C%20MH%2C%20MQ%2C%20MR%2C%20MU%2C%20YT%2C%20MX%2C%20FM%2C%20MD%2C%20MC%2C%20MN%2C%20ME%2C%20MS%2C%20MA%2C%20MZ%2C%20MM%2C%20NA%2C%20NR%2C%20NP%2C%20NL%2C%20NC%2C%20NZ%2C%20NI%2C%20NE%2C%20NG%2C%20NU%2C%20NF%2C%20MP%2C%20NO%2C%20OM%2C%20PK%2C%20PW%2C%20PS%2C%20PA%2C%20PG%2C%20PY%2C%20PE%2C%20PH%2C%20PN%2C%20PL%2C%20PT%2C%20PR%2C%20QA%2C%20RE%2C%20RO%2C%20RU%2C%20RW%2C%20BL%2C%20SH%2C%20KN%2C%20LC%2C%20MF%2C%20PM%2C%20VC%2C%20WS%2C%20SM%2C%20ST%2C%20SA%2C%20SN%2C%20RS%2C%20SC%2C%20SL%2C%20SG%2C%20SX%2C%20SK%2C%20SI%2C%20SB%2C%20SO%2C%20ZA%2C%20GS%2C%20SS%2C%20ES%2C%20LK%2C%20SD%2C%20SR%2C%20SJ%2C%20SZ%2C%20SE%2C%20CH%2C%20SY%2C%20TW%2C%20TJ%2C%20TZ%2C%20TH%2C%20TL%2C%20TG%2C%20TK%2C%20TO%2C%20TT%2C%20TN%2C%20TR%2C%20TM%2C%20TC%2C%20TV%2C%20UG%2C%20UA%2C%20AE%2C%20GB%2C%20US%2C%20UM%2C%20UY%2C%20UZ%2C%20VU%2C%20VE%2C%20VN%2C%20VG%2C%20VI%2C%20WF%2C%20EH%2C%20YE%2C%20ZM%2C%20ZW?lastdays=60")
        .then(res => res.json())
        .then(
            (result) => {
              result = this.removeNull(result)
              result = this.filterMonth(result)
              this.setState({
                isLoaded: true,
                data: result
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
        )

      var i = 0
      var self = this

      setInterval(function (){
          if(self.state.isLoaded) {
              self.renderData(i)
              if(i==Object.keys(self.state.data[i].timeline.cases).length-1){
                  i=0
              } else {
                  i++
              }
          }
      }, 1000)
  }

  renderData(i){
      var formatData = []
      var date = Object.keys(this.state.data[0].timeline.cases)[i];
      this.state.data.forEach(element =>
          formatData.push({y:Object.values(element.timeline.cases)[i], label: element.country}),
      )

      date = new Date(date)

      this.setState({
          formatData: formatData,
          date: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
      })
  }

  render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
          return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
          return <div>Loading...</div>;
      } else {
          const options = {
              animationEnabled: true,
              theme: "light2",
              height: 10000,
              title: {
                  text: "Case Covid-19 on "+this.state.date,
                  labelFontSize: 40,
                  fontSize: 40,
                  indexLabelFontSize: 40,
                  titleFontSize: 40,
              },
              axisX: {
                  title: "Country",
                  reversed: true,
                  labelFontSize: 15,
                  fontSize: 15,
                  indexLabelFontSize: 15,
                  titleFontSize: 15,
              },
              axisY: {
                  title: "Case of the day",
                  labelFormatter: this.addSymbols,
                  labelFontSize: 15,
                  fontSize: 15,
                  indexLabelFontSize: 15,
                  titleFontSize: 15,
              },
              data: [{
                  type: "bar",
                  labelFontSize: 15,
                  fontSize: 15,
                  indexLabelFontSize: 15,
                  titleFontSize: 15,
                  dataPoints: this.state.formatData,
              }]
          }

          return (
              <div>
                  <CanvasJSChart options={options}/>
              </div>
          );
      }
  }
}

export default App;
