setInterval(function () {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  var date = dd + "-" + mm + "-" + yyyy;

  var hh = today.getHours();
  var min = today.getMinutes();
  var sec = today.getSeconds();
  var ampm = hh >= 12 ? "PM" : "AM";

  hh = hh % 12;
  hh = hh ? hh : 12;

  if (hh < 10) {
    hh = "0" + hh;
  }

  if (min < 10) {
    min = "0" + min;
  }

  if (sec < 10) {
    sec = "0" + sec;
  }

  var time = hh + ":" + min + ":" + sec + " " + ampm;

  document.getElementById("currentTime").innerHTML = time;
  document.getElementById("currentDate").innerHTML = date;
}, 100);

$(document).ready(function () {
  $("#form-submit-btn").click(function (e) {
    e.preventDefault();
    if ($("#form-edit-btn").css("display") === "none") {
      $("#form-edit-btn").show();
    }
    $(".inputfield").attr("disabled", true);
  });

  $("#form-edit-btn").click(function (e) {
    e.preventDefault();
    $(".inputfield").attr("disabled", false);
  });
});

// holds time values
let seconds = 0;
let minutes = 0;
let hours = 0;

// hold display values
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

let interval = null;

let status = "stopped";

// Stopwatch function
function stopWatch() {
  seconds++;
  if (seconds / 60 === 1) {
    seconds = 0;
    minutes++;

    if (minutes / 60 === 1) {
      minutes = 0;
      hours++;
    }
  }

  if (seconds < 10) {
    displaySeconds = "0" + seconds.toString();
  } else {
    displaySeconds = seconds;
  }

  if (minutes < 10) {
    displayMinutes = "0" + minutes.toString();
  } else {
    displayMinutes = minutes;
  }

  if (hours < 10) {
    displayHours = "0" + hours.toString();
  } else {
    displayHours = hours;
  }

  // Display updated time values to user
  document.getElementById("display").innerHTML =
    displayHours + ":" + displayMinutes + ":" + displaySeconds;
}

function startStop() {
  if (status === "stopped") {
    // Starts the stopwatch by calling the setInterval
    interval = window.setInterval(stopWatch, 1000);
    document.getElementById("startStop").innerHTML = "Stop";
    status = "started";
  } else {
    window.clearInterval(interval);
    document.getElementById("startStop").innerHTML = "Start";
    status = "stopped";
  }
}

class Stopwatch {
  constructor(display, results) {
    this.running = false;
    this.display = display;
    this.results = results;
    this.laps = [];
    this.reset();
    this.print(this.times);
  }

  reset() {
    this.times = [0, 0, 0];
  }

  start() {
    if (!this.time) this.time = performance.now();
    if (!this.running) {
      this.running = true;
      requestAnimationFrame(this.step.bind(this));
    }
  }

  lap() {
    let times = this.times;
    let li = document.createElement("li");
    li.innerText = this.format(times);
    this.results.appendChild(li);
  }

  stop() {
    this.running = false;
    this.time = null;
  }

  restart() {
    if (!this.time) this.time = performance.now();
    if (!this.running) {
      this.running = true;
      requestAnimationFrame(this.step.bind(this));
    }
    this.reset();
  }

  clear() {
    clearChildren(this.results);
  }

  step(timestamp) {
    if (!this.running) return;
    this.calculate(timestamp);
    this.time = timestamp;
    this.print();
    requestAnimationFrame(this.step.bind(this));
  }

  calculate(timestamp) {
    var diff = timestamp - this.time;
    // Hundredths of a second are 100 ms
    this.times[2] += diff / 1000;
    // Seconds are 100 hundredths of a second
    if (this.times[2] >= 60) {
      this.times[1] += 1;
      this.times[2] -= 60;
    }
    // Minutes are 60 seconds
    if (this.times[1] >= 60) {
      this.times[0] += 1;
      this.times[1] -= 60;
    }
  }

  print() {
    this.display.innerText = this.format(this.times);
  }

  format(times) {
    return `\
${pad0(times[0], 2)}:\
${pad0(times[1], 2)}:\
${pad0(Math.floor(times[2]), 2)}`;
  }
}

function pad0(value, count) {
  var result = value.toString();
  for (; result.length < count; --count) result = "0" + result;
  return result;
}

function clearChildren(node) {
  while (node.lastChild) node.removeChild(node.lastChild);
}

let stopwatch = new Stopwatch(
  document.querySelector(".stopwatch"),
  document.querySelector(".results")
);

/*

window.getTimeRemaining = function (endtime) {
    // var t = Date.parse(endtime) - (new Date()).getTime();
    var t = endtime - (new Date()).getTime()
    // console.log(t);
    // console.log((new Date()).getTime())
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    return {
        'total': t,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

window.initializeClock = function (clockId, hour, min, sec, dateID) {
    var clock = document.getElementById(clockId);
    var timerHour = document.getElementById(hour).value
    var timerMin = document.getElementById(min).value
    var timerSec = document.getElementById(sec).value
    var deadline = (new Date()).getTime() + (timerHour * 60 * 60 * 1000 + timerMin * 60 * 1000 + timerSec * 1000)
    // console.log(deadline)
    // var deadline = document.getElementById(dateID).value;
    // console.log(deadline)
    var timeinterval = setInterval(function () {
        var t = getTimeRemaining(deadline);

        if (document.getElementById("hour").value >= 10) {
            document.getElementById("hour").value = t.hours;
        } else {
            document.getElementById("hour").value = '0' + t.hours;
        }
        if (document.getElementById("min").value >= 10) {
            document.getElementById("min").value = t.minutes;
        } else {
            document.getElementById("min").value = '0' + t.minutes;

        }
        if (document.getElementById("sec").value >= 10) {
            document.getElementById("sec").value = t.seconds;
        } else {
            document.getElementById("sec").value = '0' + t.seconds;

        }
        // clock.innerHTML = 'hours: ' + t.hours + '<br>' + 'minutes: ' + t.minutes + '<br>' + 'seconds: ' + t.seconds;
        if (t.total <= 0) {
            clearInterval(timeinterval);
            document.getElementById("hour").value = "00";
            document.getElementById("min").value = "00";
            document.getElementById("sec").value = "00"
        }

        document.getElementById('pause').onclick = function () {
            clearInterval(timeinterval);
        }

        document.getElementById('reset').onclick = function () {
            clearInterval(timeinterval);
            document.getElementById("hour").value = "00";
            document.getElementById("min").value = "00";
            document.getElementById("sec").value = "00";
        }
    }, 100);
}

*/
