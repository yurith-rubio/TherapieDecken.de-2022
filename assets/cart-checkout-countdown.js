/* cart-checkout-countdown.js.liquid */

function createCookie(a, b, c) {
  if (c) {
    var d = new Date;
    d.setTime(d.getTime() + c * 60 * 1e3);
    var e = "; expires=" + d.toUTCString()
  } else var e = "";
  document.cookie = a + "=" + b + e + "; path=/"
}

function readCookie(a) {
  for (var b = a + "=", c = document.cookie.split(";"), d = 0; d < c.length; d++) {
    for (var e = c[d];
      " " == e.charAt(0);) e = e.substring(1, e.length);
    if (0 == e.indexOf(b)) return e.substring(b.length, e.length)
  }
  return null
}

function eraseCookie(a) {
  createCookie(a, "", -1)
}

function crtmedir(a) {
  var b = document.createDocumentFragment(),
    c = document.createElement("div");
  for (c.innerHTML = a; c.firstChild;) b.appendChild(c.firstChild);
  return b
}

function startTimer(start, duration, display) {
  var diff, minutes, seconds;

  function timer() {
    diff = duration - (((Date.now() - start) / 1000) | 0);
    minutes = (diff / 60) | 0;
    seconds = (diff % 60) | 0;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = minutes + ":" + seconds;
    if (diff <= 0) {
      clearInterval(inti);
      document.getElementById("countdown-main").innerHTML = "⚠️ Ihr Warenkorb Reservierung ist abgelaufen.";
      start = Date.now() + 1000;
    }
  };
  timer();
  var inti = setInterval(timer, 1000);
}
var pdm = crtmedir(`
	<div class="countdown-holder">
		<div id="countdown-main" class="countdown-main">
			 ⚠️ Auf Grund unserer Pre Black Friday Angebote ist Ihr Warenkorb für nur  <span id="time"></span>  Minuten reserviert! 
		</div>
	</div>
`);

if (
  (window.location.href.indexOf('checkout') > -1
    && document.location.href.indexOf('thank_you') === -1
    && document.location.href.indexOf('orders') === -1)
  ||
  window.location.href.indexOf('cart') > -1
) {
  window.onload = function () {
    document.getElementsByClassName('countdown-placeholder')[0].appendChild(pdm);
    var minutes = 20;
    var ten = 60 * minutes;
    var starttime = Date.now();
    var xcnt = readCookie('prtcntdwn');
    if (xcnt) {
      if (starttime < xcnt) {
        ten = (xcnt - starttime) / 1000;
      } else {
        eraseCookie('ptcntdwn');
        createCookie('prtcntdwn', Date.now() + (ten * 1000), ten + 1);
      }
    } else {
      createCookie('prtcntdwn', Date.now() + (ten * 1000), ten + 1);
    }
    display = document.querySelector('#time');
    startTimer(starttime, ten, display);
  };
}