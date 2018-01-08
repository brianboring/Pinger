// This file contains all of the logic and the engine for the app.

// These class variables contain the CSS classes that are tied to the visual status.
var startButton = document.getElementById('ip-ping-start'),
    ipResultsList = document.getElementById('ip-results-list'),
    ipUpClass = 'ip-up', // Add to IP element for a green dot
    ipDownClass = 'ip-down', // Add to IP element for a red dot
    ipUncheckedClass = 'ip-unchecked' // Add to IP element for a yellow dot

/**
  * Helper function that shows an error.
  * This was abstracted out to it's own function in case we want to show errors some other way besides simple alert boxes
  *
  * @param {string} Error message
  * @return {}
  */
var showError = function(message) {
  alert(message)
}

/**
  * Removes all of the IP list elements from the HTML view
  *
  * @return {}
  */
var clearIpResultsList = function() {
  ipResultsList.innerHTML = ''
}

/**
  * Basic validation for a given IP
  * Checks that:
  * IP has 4 octets, each octet is an integer and are in 0-255 range
  *
  * @param {string} IP address
  * @return {bool}
  */
var validateIp = function(ipAddress) {
  var octets,
      thisOct,
      i

  if (ipAddress != '') {
    octets = ipAddress.split('.')
  } else {
    return false
  }

  // If any octed is not a number or outside of the range, return false
  for (i = 0; i < octets.length; i++) {
    // Attempt to convert this octet to an integer
    thisOct = parseInt(octets[i])

    if (thisOct == NaN || thisOct > 255 || thisOct < 0) {
      return false
    }
  }

  // Last octet can't be zero
  if (ipAddress[3] == 0) {
    return false
  }

  // Make sure we have 4 octets in the address
  if (octets.length !== 4) {
    return false
  }

  // Nothing tripped false, so we'll return true
  return true
}

/**
  * Validates the range of IPs
  * Starting IP should be lower in value than the ending.
  * The network identifier octets should match
  * This function assumes that the IP addresses provided have been validated
  *
  * @return {bool}
  */
var validateIpRange = function(ipRangeStart, ipRangeEnd) {
  var rangeStartOctets = ipRangeStart.split('.'),
      rangeEndOctets = ipRangeEnd.split('.'),
      i

  // Convert all of the octets to integers
  rangeStartOctets = rangeStartOctets.map(function(val, _) {
    return parseInt(val)
  })

  rangeEndOctets = rangeEndOctets.map(function(val, _) {
    return parseInt(val)
  })

  // Check that the first 3 octets match
  for (i = 0; i < 3; i++) {
    if (rangeStartOctets[i] !== rangeEndOctets[i]) {
      return false
    }
  }

  // Check that the range beginning is lower than the range end
  if (rangeStartOctets[3] >= rangeEndOctets[3]) {
    return false
  }

  return true
}

/**
  * Gets the range of IPs and completes the address list.
  * We execute our IP validation here before creating that list.
  *
  * @return {array}
  */
var getAllIpsInRange = function() {
  var rangeStart = document.getElementById('ip-range-start').value,
      rangeEnd = document.getElementById('ip-range-end').value,
      firstThreeOctets,
      thisIp,
      allIps = []

  // Check if addresses are valid
  if (!validateIp(rangeStart) || !validateIp(rangeEnd)) {
    showError('Please enter valid start and end IP addresses')
    return false
  }

  // Check that the IP addresses provide a usable range
  if (!validateIpRange(rangeStart, rangeEnd)) {
    showError('No range exists between the two addresses entered.\nPlease re-enter the IP addresses.')
    return false
  }

  // String of the first three for creating full IPs in the loop
  firstThreeOctets = rangeStart.split('.').slice(0,3).join('.')
  // These are converted to integers for the loop count
  startClientOctet = parseInt(rangeStart.split('.')[3])
  endClientOctet = parseInt(rangeEnd.split('.')[3])

  for (i = startClientOctet; i <= endClientOctet; i++) {
    allIps.push(firstThreeOctets + '.' + i)
  }

  return allIps
}

/**
  * Gets the range of IPs and completes the address list.
  * We execute our IP validation here before creating that list.
  * @param {array} All IPs to be output to the view
  * @return {}
  */
var populateIpResultsList = function(ipList) {
  var newEl,
      newElText,
      i

  // We'll clear the IP list in the HTML view in case there are any existing elements.
  clearIpResultsList()

  // Creates a new HTML <li> element for this IP address
  // Element initially has a status of 'unchecked'
  for (i = 0; i < ipList.length; i++) {
    newEl = document.createElement('li')
    newEl.setAttribute('class', ipUncheckedClass)
    newElText = document.createTextNode(ipList[i])

    newEl.appendChild(newElText)

    ipResultsList.appendChild(newEl)
  }
}

// This should be the wrapper that executes all of the individual functions of your app.
var startPingApp = function() {
  // This creates an array of all IPs to be checked including starting IP, ending IP, and all interstitial addresses
  var allIps = getAllIpsInRange()

  // Adds the IP elements to the HTML page.
  populateIpResultsList(allIps)

  // TODO:
  // Run through list of ips in array
  // Check the IP for up or down status
  // Set initial status on first check (Remove untested class, add status)
  // Repeat at a set interval
  // Update status in HTML if necessary (add/remove HTML classes for CSS styling)
  //
  // Luxury features:
  // Counter with number of times a round of pings has been successfully executed
  // Error message if all IPs are failing (network error?)
  // Individual counters for number of successfull pings and failed pings
  //
}

// Start the business.
// This binds the click actio to the button and starts the script.
startButton.addEventListener('click', function(e) {
  var allIps = []
  e.preventDefault() // Makes the button do only what we want
  startPingApp()
})
