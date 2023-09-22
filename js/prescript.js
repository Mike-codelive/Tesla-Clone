document.addEventListener("DOMContentLoaded", function() {

    const body = document.getElementById('body-animation')
  
    body.style.cssText = "opacity: 0;";
    window.onload = function() {
      body.style.cssText = "opacity: 1; transition: opacity .7s ease-in-out;"
    };
  });