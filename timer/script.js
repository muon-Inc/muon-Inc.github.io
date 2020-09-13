// Full screen script
var elem = document.documentElement;

function openFullScreen() {
  var icon = document.getElementById("icon");
  document.getElementById("form-submit-btn").style.display = "none";
  document.getElementById(“form-edit-btn”).style.display = “none”;
  if (icon.classList.contains("fa-expand-alt")) {
    icon.classList.remove("fa-expand-alt");
    icon.classList.add("fa-compress-alt");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  } else if (icon.classList.contains("fa-compress-alt")) {
    icon.classList.remove("fa-compress-alt");
    icon.classList.add("fa-expand-alt");
    document.getElementById("form-submit-btn").style.display = "block";
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
  }

}
// 

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = '#dbe7ed';
  ctx.fill();
  grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, '#96cdeb');
  grad.addColorStop(1, '#96cdeb');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius * 0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (num = 1; num < 13; num++) {
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius) {
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  //hour
  hour = hour % 12;
  hour = (hour * Math.PI / 6) +
    (minute * Math.PI / (6 * 60)) +
    (second * Math.PI / (360 * 60));
  drawHand(ctx, hour, radius * 0.5, radius * 0.07);
  //minute
  minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
  drawHand(ctx, minute, radius * 0.8, radius * 0.07);
  // second
  second = (second * Math.PI / 30);
  drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}

// Get real time 
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

  // document.getElementById("currentTime").innerHTML = time;
  document.getElementById("currentDate").innerHTML = date;
}, 100);


// Form Disable
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


// 
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
