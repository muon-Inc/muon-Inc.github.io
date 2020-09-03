setInterval(function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    var date = dd + '-' + mm + '-' + yyyy;

    var hh = today.getHours()
    var min = today.getMinutes()
    var sec = today.getSeconds()
    var ampm = hh >= 12 ? 'PM' : 'AM';
            
    hh = hh % 12;
    hh = hh ? hh : 12;
            
    if (hh < 10) {
        hh = '0' + hh;
    }

    if (min < 10) {
        min = '0' + min;
    }

    if (sec < 10) {
        sec = '0' + sec;
    }

    var time = hh + ":" + min + ":" + sec + ' '+ ampm ;

    document.getElementById("currentTime").innerHTML = time;
    document.getElementById("currentDate").innerHTML = date;
}, 100);


$(document).ready(function () {

    $("#form-submit-btn").click(function (e) {
        e.preventDefault();
        if ($("#form-edit-btn").css('display') === 'none') {
            $("#form-edit-btn").show()
        }
        $("form input").attr("disabled", true);
    });

    $("#form-edit-btn").click(function (e) {
        e.preventDefault();
        $("form input").attr("disabled", false);
    });
});

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



// function resetTimer() {

//     document.getElementById("hour").value = "00";
//     document.getElementById("min").value = "00";
//     document.getElementById("sec").value = "00";
// }
