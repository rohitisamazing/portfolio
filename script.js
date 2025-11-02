gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform
    ? "transform"
    : "fixed",
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

//scrolling effect for about us

document.querySelector(".about-link").addEventListener("click", function (e) {
  e.preventDefault();
  var aboutSection = document.querySelector("#about");
  locoScroll.scrollTo(aboutSection);
});

// Code to get time using javascript

function updateTime() {
  var d = new Date();
  var hours = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
  var minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  var seconds = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
  var am_pm = d.getHours() >= 12 ? "PM" : "AM";

  hours = hours < 10 ? "0" + hours : hours;

  document.getElementById("time").innerHTML =
    hours + ":" + minutes + ":" + seconds + " " + am_pm;
}

setInterval(updateTime, 1000); // Update time every 1000 ms or 1 second

// Code mouse follower using javascript

function circleMouseFollower() {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
  });
}

circleMouseFollower();

// photo animaitons

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      display: "none",
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top - 150;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    var xdiff = dets.clientX - elem.getBoundingClientRect().left - 190;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      display: "block",
      ease: Power3,
      top: diff,
      left: xdiff,
      rotate: gsap.utils.clamp(-20, 20, diffrot),
    });
  });
});

// gsap animations

var tl = gsap.timeline();

// loader logic

function time() {
  var a = 0;
  setInterval(function () {
    a = a + Math.floor(Math.random() * 15);
    if (a < 100) {
      document.querySelector("#loader h1").innerHTML = a + "%";
    } else {
      a = 100;
      document.querySelector("#loader h1").innerHTML = a + "%";
    }
  }, 150);
}

// loader animation

tl.to("#loader h1", {
  scale: 1.5,
  delay: 0.5,
  duration: 1,
  onStart: time(),
});

tl.to("#loader", {
  top: "-100vh",
  delay: 0.3,
  duration: 1,
});

// website animation

tl.from("nav a", {
  y: 20,
  duration: 1,
  opacity: 0,
});

tl.from(".header h1", {
  y: 100,
  duration: 1,
  opacity: 0,
  stagger: 0.2,
});

tl.from(".header h5, .lasttext p", {
  y: -20,
  duration: 0.5,
  opacity: 0,
  stagger: 0.3,
});

tl.from(".herofooter", {
  y: 20,
  duration: 1,
  opacity: 0,
  yoyo: true,
  repeat: -1,
});

gsap.to("#secondHero h1", {
  fontWeight: 900,
  transform: "translateX(-50%)",
  duration: 2,
  scrollTrigger: {
    trigger: "#secondHero",
    scroller: "#main",
    // markers: true,
    start: "top 500vh",
    end: "bottom 0",
    scrub: 2,
    scrub: true,
  },
});

gsap.from("#second", {
  y: 100,
  duration: 1,
  opacity: 0,
  scrollTrigger: {
    trigger: "#second",
    scroller: "#main",
    // markers: true,
    start: "top 500vh",
    scrub: 1,
    end: "top 400",
  },
});

gsap.from("#about", {
  y: 100,
  opacity: 0,
  scrollTrigger: {
    trigger: "#about",
    scroller: "#main",
    // markers: "true",
    start: "top 600vh",
  },
});

gsap.from("#subscribe", {
  y: 100,
  opacity: 0,
  scrollTrigger: {
    trigger: "#subscribe",
    scroller: "#main",
    // markers: "true",
    start: "top 600vh",
  },
});
