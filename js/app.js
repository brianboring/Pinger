// This file contains all of the logic and the engine for the app.

var addressList = [],
    startButton = document.getElementById('ip-ping-start'),
    ipUpClass = 'ip-up',
    ipDownClass = 'ip-down'

/**
* Basic validation for a given IP
* Checks that:
* IP has 4 octets and octets are in 0-255 range
*
* @param {string} IP address
* @return {bool}
*/
var validateIp = function(ipAddress) {
  var octets = ipAddres.split('.'),
      i

  // If any octed is outside of the range, return false
  for (i = 0; i < octets.length; i++) {
    if (octets[i] > 255 || octets[i] < 0) return false
  }

  if (octets.length == 4) {
    return false
  }

  // Nothing tripped false, so we'll return true
  return true
}

/**
* Gets the range of IPs and completes the address list.
*
* @param {string} IP address
* @return {bool}
*/
var getInterstitialIps = function() {
  var rangeStart = document.getElementById('ip-range-start'),
      rangeEnd = document.getElementById('ip-range-end')

  // Check if addresses are valid
  if (!validateIp(rangeStart) || !validateIp(rangeEnd)) {
    alert('Please enter valid start and end IP addresses')
    return false
  }
}



// Start the business.
// This should be the wrapper that executes all of the individual functions of your app.
startButton.addEventListener('click', (function(e) {
  e.preventDefault() // Makes the button do only what we want

  getInterstitialIps();
})