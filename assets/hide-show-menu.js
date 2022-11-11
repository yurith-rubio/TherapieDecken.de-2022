// Show menu when scrolling up and Hide Menu when scrolling down
let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  if (currentScrollPos <= 65){
    document.querySelector("#header").style.top = "0px";
  } else if (prevScrollpos > currentScrollPos) {
    document.querySelector("#header").style.top = "-25px";
  } else if (currentScrollPos >= 170) {
    document.querySelector("#header").style.top = "-194px";
  }
  prevScrollpos = currentScrollPos;
}
const announcementBar = document.querySelector(".AnnouncementBar");
if (announcementBar){
  const announcentBarHeight = announcementBar.clientHeight;
  const headerAdj = document.querySelector(".HeaderAdjusted");
  headerAdj.style.paddingTop = `${announcentBarHeight + 87}px`;
}