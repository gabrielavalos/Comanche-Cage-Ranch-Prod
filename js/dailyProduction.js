d3.json("./static/production.json").then((data) => 
{console.log(data[0])});

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