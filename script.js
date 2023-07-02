const batteryLevel = document.querySelector(".batteryLevel");
const batteryCharging = document.querySelector(".batteryCharging");
const batteryChargingTime = document.querySelector(".batteryChargingTime");
const batteryDisChargingTime = document.querySelector(
  ".batteryDisChargingTime"
);

const battery = () => {
  if ('getBattery' in navigator){
    navigator.getBattery().then(battery => {

      function updateAllBatteryDetails(){
        updateChargingInfo();
        updateLevelChange();
        updateChargingTimeInfo();
        updateDischargingTimeInfo();
      }

      updateAllBatteryDetails();
      
      battery.addEventListener("chargingchange", () => {
        updateChargingInfo();
      });

      function updateChargingInfo(){
        const isCharging = battery.charging ? "Yes" : "No";
        batteryCharging.innerHTML = isCharging;
      }

      battery.addEventListener("chargingtimechange", () => {
        updateChargingTimeInfo();
      });

      function updateChargingTimeInfo(){
        batteryChargingTime.innerHTML = battery.chargingTime + " seconds";
      }

      battery.addEventListener("dischargingtimechange", () => {
        updateDischargingTimeInfo();
      });

      function updateDischargingTimeInfo(){
        batteryDisChargingTime.innerHTML = battery.dischargingTime + " seconds";
      }


      battery.addEventListener("levelchange", () => {
        updateLevelChange();
      });

      function updateLevelChange(){        
        const level = battery.level * 100;
        if (level < 20) batteryLevel.style.color = "red";
        if (level > 90) batteryLevel.style.color = "blue";
        batteryLevel.innerHTML = level + "%";
      }

    });
  }
};

battery();