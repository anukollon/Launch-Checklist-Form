window.addEventListener("load", function() {
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      let pilotNameInput = document.querySelector("input[name=pilotName]").value;
      let copilotNameInput = document.querySelector("input[name=copilotName]").value;
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]").value;
      let cargoMassInput = document.querySelector("input[name=cargoMass]").value;

      if (pilotNameInput === "" || copilotNameInput === "" || fuelLevelInput === "" || cargoMassInput === "") {
         document.getElementById("faultyItems").style.visibility = "hidden";
         document.getElementById("launchStatus").innerHTML = "Awaiting Information Before Launch";
         document.getElementById("launchStatus").style.color = "black";
         alert("All fields are required!");
         event.preventDefault(); 
         return;
      }
      else if(!isNaN(pilotNameInput) || !isNaN(copilotNameInput) || isNaN(fuelLevelInput) || isNaN(cargoMassInput)){
         document.getElementById("faultyItems").style.visibility = "hidden";
         document.getElementById("launchStatus").innerHTML = "Awaiting Information Before Launch";
         document.getElementById("launchStatus").style.color = "black";
         alert("Make sure to enter valid information for each field!")
         event.preventDefault();
         return;
      }
      
      document.getElementById("faultyItems").style.visibility = "visible";
      document.getElementById("pilotStatus").innerHTML = `${pilotNameInput} is ready for launch`;
      document.getElementById("copilotStatus").innerHTML = `${copilotNameInput} is ready for launch`;
      
      if(fuelLevelInput < 10000){
         document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
         document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
         document.getElementById("launchStatus").style.color = "red";
      }
      if(cargoMassInput > 10000){
         document.getElementById("cargoStatus").innerHTML = "Cargo Mass too high for launch";
         document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
         document.getElementById("launchStatus").style.color = "red";
      }

      if(fuelLevelInput>=10000 && cargoMassInput <= 10000){
         document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
         document.getElementById("cargoStatus").innerHTML = "Cargo Mass low enough for launch";
         document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch";
         document.getElementById("launchStatus").style.color = "green";
      }
      
      let json = [];
      fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
         response.json().then(function (json) {
            let index = Math.floor(Math.random()*json.length) + 1;
            const containerDiv = document.getElementById("missionTarget");
            containerDiv.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[index].name}</li>
               <li>Diameter: ${json[index].diameter}</li>
               <li>Star: ${json[index].star}</li>
               <li>Distance from Earth: ${json[index].distance}</li>
               <li>Number of Moons: ${json[index].moons}</li>
            </ol>
            <img src="${json[index].image}">
            `
         })
      });

     
   });
});


