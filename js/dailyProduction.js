function createDropdownOptions() {
    var partnerSelector = d3.select("#siteSelection"); //SELECT <select> WHERE PARTNER NAMES WILL APPEAR
    d3.json("./static/production.json").then((allData) => { //READ IN JSON FILE COINTAING ALL PARTNER'S NAMES
      repeatedWells = [] //EMPTY ARRAY TO CONTAIN ALL PARTNER'S NAME (REPEATED)
      allData.forEach((row) => { //LOOP THROUGH NET_INTEREST FILE
      
      repeatedWells.push(row["WELL_NAME"]) //PUSH ALL PARTNER'S NAME TO LIST 
    });

    wells = [...new Set(repeatedWells)].sort()
    
    wells.forEach((well) => {
      partnerSelector
      .append('option')
      .text(well)
      .property('Value', well)
    });
  });
  };
  //CALL FUNCTION TO CREATE DROPDOWN MENU VALUES
  createDropdownOptions();

  function createCurves(){

    dropdownMenu = d3.select("#siteSelection").node();
    selectedOption = dropdownMenu.value;
    console.log(selectedOption);

    d3.json("./static/production.json").then((data) => {
      var dailyOil = [];
      var dailyGas = [];
      var date = [];
      var preassure = [];
      var remarks = [];
      var cumOil = [];
      var cumGas = [];
      data.forEach((well) =>{if(well["WELL_NAME"] === selectedOption){
        dailyOil.push(well["BOPD_bbls_Conden_sate"]);
        dailyGas.push(well["MCFPD"]);
        date.push(well["Date"]);
        preassure.push(well["Pressure"]);
        remarks.push(well["Remarks"]);
        cumOil.push(well["Cum bbls"]);
        cumGas.push(well["Cum mcf"])
      }})
      console.log(preassure);

      var dataOil = {
        x: date,
        y: dailyOil,
        text: preassure,
        name: "Oil",
        line:
        {color: "green"}
      };

      var dataGas = {
        x: date,
        y: dailyGas,
        type: "line",
        name: "Gas",
        line:
        {color: "red"}
      };

      var data = [dataOil, dataGas];
    
      var layoutOil = {
        title: "Oil (BOPD) vs Time",
        xaxis: {title: "Date"
        },
        yaxis: {
          title:"BOPD",
          type: "log",
          rangemode: 'tozero'
          // autorange: true
        },
        legend: {
          x: 1,
          xanchor: 'right',
          y: 1
        }
      };
    
      var config = {responsive: true}
      
      Plotly.newPlot("Curve1", data, layoutOil, config);


      var oilCumData =[ {
        x: cumOil,
        y: dailyOil,
        text: remarks,
        name: "Oil",
        line:
        {color: "green"}
      }];

      // var gasCumData = {
      //   x: cumGas,
      //   y: dailyGas,
      //   text: remarks,
      //   type: "line",
      //   name: "Gas",
      //   line:
      //   {color: "red"}
      // };
      
      // var dataCum = [oilCumData, gasCumData];


      var layoutCum = {
        title: "Oil (BOPD) vs Cum Oil (BBLS)",
        yaxis: {
          title: "BOPD",
          type: "linear",
          rangemode: 'tozero',
          
          // autorange: true
        },
        xaxis: {title: "CUM BBLS"
          
        },
        legend: {
          x: 1,
          xanchor: 'right',
          y: 1
        }
      };
    
      var config = {responsive: true}
      
      Plotly.newPlot("Curve2", oilCumData, layoutCum, config);


     

      var gasCumData = {
        x: cumGas,
        y: dailyGas,
        type: "line",
        name: "Gas",
        line:
        {color: "red"}
      };

      var layoutCum = {
        title: "Gas (MCFD) vs Cum Gas (MCF)",
        yaxis: {title: "MCFD",
          type: "linear",
          rangemode: 'tozero'
        },
        xaxis: {title: "CUM MCF"
          
        },
        legend: {
          x: 1,
          xanchor: 'right',
          y: 1
        }
      };
    
      var config = {responsive: true}
      
      Plotly.newPlot("Curve3", [gasCumData], layoutCum, config);
  
 


});


  }

  d3.json("./static/production.json").then((data) => {
    console.log(data[0])

    



});

d3.select("#siteSelection").on('change', createCurves);

