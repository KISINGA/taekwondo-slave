var wifi = require("Wifi");
var WIFI_SSID = "kisinga";
var WIFI_OPTIONS = {
  password : "myhardpassword"
};

wifi.stopAP(); // disable Wi-Fi AP

function getPage() {
  require("http").get("10.42.0.1:3000", function(res) {
    console.log("Response: ",res);
    res.on('data', function(d) {
      console.log("--->"+d);
    });
  });
}

wifi.connect(WIFI_SSID, WIFI_OPTIONS, function(err) {
  if (err) {
    console.log("ERROR: Connection failed, error: " + err);
  } else {
    console.log("INFO: Successfully connected");
    console.log(wifi.getStatus());
    console.log(wifi.getIP());

    // set hostname and make the NodeMCU available
    // through espruino.lfiocal (ping or for using the
    // Espruino IDE over Wi-Fi
    wifi.setHostname("");

    // save the Wi-Fi settings and they'll be used
    // automatically at power-up.
    wifi.save();
    getPage();
   
    
  }
});
