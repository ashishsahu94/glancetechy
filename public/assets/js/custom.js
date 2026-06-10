
(function ($) {
  ("use strict");

  $(".sidebar-button").on("click", function () {
    $(this).toggleClass("active");
  });

  const sidebarButton = document.querySelector(".sidebar-button");

  if (sidebarButton) {
    sidebarButton.addEventListener("click", () => {
      document.querySelector(".main-menu").classList.toggle("show-menu");
    });
  }

  $(".menu-close-btn").on("click", function () {
    $(".main-menu").removeClass("show-menu");
  });

  // sidebar
  $(".right-sidebar-button").on("click", function () {
    $(".right-sidebar-menu").addClass("show-right-menu");
  });
  $(".right-sidebar-close-btn").on("click", function () {
    $(".right-sidebar-menu").removeClass("show-right-menu");
  });

  $(".menu-btn").on("click", function () {
    $(".sidebar-menu").addClass("active");
  });
  $(".sidebar-menu-close").on("click", function () {
    $(".sidebar-menu").removeClass("active");
  });

  jQuery(".dropdown-icon").on("click", function () {
    jQuery(this)
      .toggleClass("active")
      .next("ul, .mega-menu, .mega-menu2")
      .slideToggle();
    jQuery(this)
      .parent()
      .siblings()
      .children("ul, .mega-menu .mega-menu2")
      .slideUp();
    jQuery(this).parent().siblings().children(".active").removeClass("active");
  });
  jQuery(".dropdown-icon2").on("click", function () {
    jQuery(this).toggleClass("active").next(".submenu-list").slideToggle();
    jQuery(this).parent().siblings().children(".submenu-list").slideUp();
    jQuery(this).parent().siblings().children(".active").removeClass("active");
  });

  // sticky header
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header.header-area, .header-two");
    if (header) {
      header.classList.toggle("sticky", window.scrollY > 0);
    }
  });

  // FancyBox Js
  $('[data-fancybox="gallery-01"]').fancybox({
    buttons: ["close"],
    loop: false,
    protect: true,
  });
  $('[data-fancybox="video-player"]').fancybox({
    buttons: ["close"],
    loop: false,
    protect: true,
  });

 
  // Team Card Section Slider

  
  var swiper = new Swiper(".team-card-slider", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 40,
    autoplay: {
      delay: 2500, // Autoplay duration in milliseconds
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".team-slider-next",
      prevEl: ".team-slider-prev",
    },
    breakpoints: {
      280: {
        slidesPerView: 1,
      },
      386: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 18,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 18,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
      1400: {
        slidesPerView: 4,
      },
    },
  });

  

  // Blog Slider
  var swiper = new Swiper(".home3-blog-slider", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 25,
    // loop: true,
    effect: "fade", // Use the fade effect
    fadeEffect: {
      crossFade: true, // Enable cross-fade transition
    },
    autoplay: {
      delay: 2500, // Autoplay duration in milliseconds
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".blog-slider-next",
      prevEl: ".blog-slider-prev",
    },
  });


  // Case Study SLider
  var swiper = new Swiper(".case-study-slider", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 40,
    autoplay: {
      delay: 2500, // Autoplay duration in milliseconds
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination1",
      clickable: true,
    },
    breakpoints: {
      280: {
        slidesPerView: 1,
      },
      386: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      1200: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 3,
      },
      1600: {
        slidesPerView: 3,
      },
    },
  });
  // Home1 Banner Slider
  var swiper = new Swiper(".home1-banner-slider", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 24,
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      nextEl: ".banner-slider-next",
      prevEl: ".banner-slider-prev",
    },
    pagination: {
      el: ".banner-pagination",
      clickable: true,
    },
  });
  // Impact Slider
  var swiper = new Swiper(".industries-tab-slider", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 20,
    autoplay: {
      delay: 2500, // Autoplay duration in milliseconds
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".slider-next",
      prevEl: ".slider-prev",
    },
    breakpoints: {
      280: {
        slidesPerView: 1,
      },
      350: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1400: {
        slidesPerView: 4,
      },
    },
  });

  // Recent Product Slider
  var swiper = new Swiper(".related-product-slider", {
    speed: 1500,
    spaceBetween: 24,
    autoplay: {
      delay: 2000, // Autoplay duration in milliseconds
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".related-product-slider-next",
      prevEl: ".related-product-slider-prev",
    },

    breakpoints: {
      280: {
        slidesPerView: 1,
      },
      420: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      576: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 3,
      },
    },
  });
  //wow js
  jQuery(window).on("load", function () {
    new WOW().init();
    window.wow = new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: true,
      live: true,
      offset: 80,
    });
    window.wow.init();
  });

  // niceSelect
  if ($("select").length) {
    $("select").niceSelect();
  }

  // Language Btn
  $(".language-btn, .search-btn").on("click", function (e) {
    let parent = $(this).parent();
    parent.find(".language-list, .search-input").toggleClass("active");
    e.stopPropagation();
  });
  $(document).on("click", function (e) {
    if (
      !$(e.target).closest(".language-btn, .search-btn, .search-input").length
    ) {
      $(".language-list, .search-input").removeClass("active");
    }
  });
  $(".search-close").on("click", function (e) {
    $(".search-input").removeClass("active");
  });



  // Back To Top
  jQuery(function ($) {
    const el = document.getElementById("scroll-percentage");
    const valueEl = document.getElementById("scroll-percentage-value");
    if (!el || !valueEl) return;

    const offset = 50;

    function update() {
      const scrollTop = $(window).scrollTop();
      const docH = $(document).height() - $(window).height();

      const progress = docH > 0 ? Math.min(scrollTop / docH, 1) : 0;
      const pct = Math.round(progress * 100);

      // text
      valueEl.textContent = pct + "%";

      // conic gradient
      // IMPORTANT: conic-gradient needs "deg" or "%" stops
      el.style.background = `conic-gradient(var(--progress-fill) ${pct}%, var(--progress-bg) ${pct}%)`;

      // show/hide
      if (scrollTop > offset) el.classList.add("active");
      else el.classList.remove("active");

      // at 100% show arrow (hide percent)
      if (pct >= 100) el.classList.add("is-complete");
      else el.classList.remove("is-complete");
    }

    update();
    $(window).on("scroll resize", update);

    // click (arrow or anywhere inside)
    $("#scroll-percentage").on("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // Select all single-service items

  document.addEventListener("DOMContentLoaded", () => {
    const services = document.querySelectorAll(
      ".home2-service-slider .single-service",
    );
    const contents = document.querySelectorAll(".service-content");
    const images = document.querySelectorAll(".service-img-wrapper");

    services.forEach((service, index) => {
      service.addEventListener("click", () => {
        // Remove active class from all services
        services.forEach((s) => s.classList.remove("active"));
        service.classList.add("active");

        // Hide all content and image wrappers
        contents.forEach((c) => c.classList.remove("show"));
        images.forEach((img) => img.classList.remove("show"));

        // Show content and image wrapper corresponding to clicked service
        if (contents[index]) contents[index].classList.add("show");
        if (images[index]) images[index].classList.add("show");

        // Optional: slide to the clicked slide in Swiper
        if (typeof home2ServiceSwiper !== "undefined") {
          home2ServiceSwiper.slideTo(index);
        }
      });
    });
  });

function circularTextInit() {
  console.log("circularTextInit running");

  const text = document.querySelector(".circular-text2 .text");

  console.log("text element:", text);

  if (!text) {
    setTimeout(circularTextInit, 300);
    return;
  }

  if (text.dataset.done === "true") return;

  const content = text.innerText.trim();

  console.log("content:", content);

  text.innerHTML = content
    .split("")
    .map((char, i) => {
      return `<span style="transform: rotate(${i * 13}deg)">${char}</span>`;
    })
    .join("");

  text.dataset.done = "true";

  console.log("circular text applied");
}

circularTextInit();



  // webgl images hover animation
  // $(document).ready(function () {
  //   function initHoverEffect(container) {
  //     container.find(".shape-hover-img").each(function () {
  //       let $el = $(this);
  //       let $img = $el.find("img");

  //       function createEffect() {
  //         let effect = new hoverEffect({
  //           parent: $el.get(0),
  //           intensity: $el.data("intensity") || 0.6,
  //           speedIn: $el.data("speedin") || 1,
  //           speedOut: $el.data("speedout") || 1,
  //           displacementImage: $el.data("displacement"),
  //           image1: $img.attr("src"),
  //           image2: $img.attr("src"),
  //           imagesRatio: $img[0].height / $img[0].width,
  //           hover: false,
  //         });

  //         $el
  //           .closest(".shape-hover-item")
  //           .on("mouseenter", () => effect.next())
  //           .on("mouseleave", () => effect.previous());
  //       }

  //       if ($img[0].complete) {
  //         createEffect();
  //       } else {
  //         $img.on("load", createEffect);
  //       }
  //     });
  //   }

  //   // Initialize hoverEffect on pages without tabs
  //   if (
  //     $(".shape-hover-item").length &&
  //     $(".portfolio-tab-wrap").length === 0
  //   ) {
  //     initHoverEffect($(document));
  //   }
  // });

  // Normal sections
  document.querySelectorAll(".scroll-text-section").forEach((section) => {
    const groups = section.querySelectorAll(".scrolling-text .marquee__group");
    if (groups.length) {
      const tl = horizontalLoop(groups, {
        repeat: -1,
        paddingRight: 30,
      });
      timelinesNormal.push(tl);
    }
  });

  // Reverse sections
  document.querySelectorAll(".scroll-text-section2").forEach((section) => {
    const groups = section.querySelectorAll(".scrolling-text .marquee__group");
    if (groups.length) {
      const tl = horizontalLoop(groups, {
        repeat: -1,
        paddingRight: 30,
        reversed: true, // Start reversed
      });
      timelinesReverse.push(tl);
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth > 991) {
      const sidebar = document.querySelector(".home2-service-section .section-title-and-btn");
      const section = document.querySelector(".home2-service-section");

      if (sidebar && section) {
        ScrollTrigger.create({
          trigger: ".section-title-and-btn",
          start: "top 100px",
          end: () => section.offsetHeight - sidebar.offsetHeight + "px",
          pin: true,
          pinSpacing: true,
          markers: false,
        });
      }
    }
  });

  // fade Animation
  if ($(".fade_anim").length > 0) {
    gsap.utils.toArray(".fade_anim").forEach((item) => {
      let tp_fade_offset = item.getAttribute("data-fade-offset") || 40,
        tp_duration_value = item.getAttribute("data-duration") || 0.75,
        tp_fade_direction = item.getAttribute("data-fade-from") || "bottom",
        tp_onscroll_value = item.getAttribute("data-on-scroll") || 1,
        tp_delay_value = item.getAttribute("data-delay") || 0.15,
        tp_ease_value = item.getAttribute("data-ease") || "power2.out",
        tp_anim_setting = {
          opacity: 0,
          ease: tp_ease_value,
          duration: tp_duration_value,
          delay: tp_delay_value,
          x:
            tp_fade_direction == "left"
              ? -tp_fade_offset
              : tp_fade_direction == "right"
                ? tp_fade_offset
                : 0,
          y:
            tp_fade_direction == "top"
              ? -tp_fade_offset
              : tp_fade_direction == "bottom"
                ? tp_fade_offset
                : 0,
        };
      if (tp_onscroll_value == 1) {
        tp_anim_setting.scrollTrigger = {
          trigger: item,
          start: "top 85%",
        };
      }
      gsap.from(item, tp_anim_setting);
    });
  }

    // password-hide and show
  const togglePassword = document.querySelector('#togglePassword');
  const password = document.querySelector('#password');
  if(togglePassword){
  togglePassword.addEventListener('click', function (e) {
  // toggle the type attribute
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  // toggle the eye / eye slash icon
  this.classList.toggle('bi-eye');
  });
  }
  // confirm-password
  const togglePassword2= document.getElementById('togglePassword2');
  const password2 = document.querySelector('#password2');
  if (togglePassword2){
  togglePassword2.addEventListener('click', function (e) {
  // toggle the type attribute
  const type = password2.getAttribute('type') === 'password' ? 'text' : 'password';
  password2.setAttribute('type', type);
  // toggle the eye / eye slash icon
  this.classList.toggle('bi-eye');
  });
  }
  // confirm-password
  const togglePassword3= document.getElementById('togglePassword3');
  const password3 = document.querySelector('#password3');
  if (togglePassword3){
  togglePassword3.addEventListener('click', function (e) {
  // toggle the type attribute
  const type = password3.getAttribute('type') === 'password' ? 'text' : 'password';
  password3.setAttribute('type', type);
  // toggle the eye / eye slash icon
  this.classList.toggle('bi-eye');
  });
  }
  
  // Hover effect for service-list
  $(".service-list li").on("mouseenter", function () {
    var index = $(this).index();

    // Add active class to the corresponding image
    $(".service-card-wrap li").removeClass("show");
    $(".service-card-wrap li").eq(index).addClass("show");

    // Manage .prev class
    $(".service-list li").removeClass("prev");
    if (index > 0) {
      $(".service-list li")
        .eq(index - 1)
        .addClass("prev");
    }
  });


window.addEventListener("load", function () {

  console.log("WINDOW LOADED");

  const text = document.querySelector(".circular-text2 .text");

  console.log("Text Element:", text);

  if (text) {

    text.innerHTML = text.innerText
      .split("")
      .map(
        (char, i) =>
          `<span style="transform:rotate(${i * 13}deg)">${char}</span>`
      )
      .join("");

    console.log("Circular Text Applied");

  } else {

    console.log("Element NOT FOUND");

  }

});

  // Slick Slider
  $(".slider").slick({
    infinite: true,
    centerMode: false,
    arrows: false,
    dots: false,
    autoplay: false,
    speed: 800,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  $(document).ready(function () {
    var $slider = $(".single-item");

    // Stop script if slider not found (prevents other pages conflict)
    if (!$slider.length) return;

    var percentTime = 0;
    var tick;
    var time = 5; // Slide duration in seconds
    var progressBarIndex = 0;

    // Create progress bars dynamically
    $(".progressBarContainer .progressBar").each(function (index) {
      $(this).html("<div class='inProgress inProgress" + index + "'></div>");
    });

    function startProgressbar() {
      resetProgressbar();
      percentTime = 0;
      tick = setInterval(interval, 10);
    }

    function interval() {
      var $currentSlide = $slider.find(
        '.slick-track .slick-slide[data-slick-index="' +
          progressBarIndex +
          '"]',
      );

      if ($currentSlide.attr("aria-hidden") === "true") {
        progressBarIndex = $slider
          .find('.slick-track .slick-slide[aria-hidden="false"]')
          .data("slickIndex");

        startProgressbar();
      } else {
        percentTime += 100 / (time * 100);

        $(".inProgress" + progressBarIndex).css("width", percentTime + "%");

        if (percentTime >= 100) {
          $slider.slick("slickNext");

          progressBarIndex++;

          if (progressBarIndex >= $slider.find(".slick-slide").length) {
            progressBarIndex = 0;
          }

          startProgressbar();
        }
      }
    }

    function resetProgressbar() {
      $(".inProgress").css("width", "0%");
      clearInterval(tick);
    }

    // Start after slick initialization
    if ($slider.hasClass("slick-initialized")) {
      startProgressbar();
    } else {
      $slider.on("init", function () {
        startProgressbar();
      });
    }
  });

  // Price Change
  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("priceToggle");
    if (!toggle) return;

    const monthlyPrices = document.querySelectorAll(".price.monthly");
    const yearlyPrices = document.querySelectorAll(".price.yearly");

    // initial state (page load এ ঠিক রাখবে)
    const update = () => {
      if (toggle.checked) {
        monthlyPrices.forEach((p) => (p.style.display = "none"));
        yearlyPrices.forEach((p) => (p.style.display = "block"));
      } else {
        monthlyPrices.forEach((p) => (p.style.display = "block"));
        yearlyPrices.forEach((p) => (p.style.display = "none"));
      }
    };

    update();
    toggle.addEventListener("change", update);
  });

  // Text Effect Animation
  if ($(".text-anim").length) {
    let staggerAmount = 0.03,
      translateXValue = 20,
      defaultDelay = 0.25,
      easeType = "power2.out",
      animatedTextElements = document.querySelectorAll(".text-anim");

    animatedTextElements.forEach((element) => {
      // HTML to data-delay
      let delayValue = element.getAttribute("data-delay")
        ? parseFloat(element.getAttribute("data-delay"))
        : defaultDelay;

      let animationSplitText = new SplitText(element, { type: "chars, words" });
      gsap.from(animationSplitText.chars, {
        duration: 1,
        delay: delayValue,
        x: translateXValue,
        autoAlpha: 0,
        stagger: staggerAmount,
        ease: easeType,
        scrollTrigger: { trigger: element, start: "top 85%" },
      });
    });
  }

  // Home6 Faq Rotate
  const el = document.querySelector(
    ".home6-faq-section .section-title-and-btn",
  );

  if (el) {
    gsap.fromTo(
      el,
      { rotate: 0, transformOrigin: "left center" },
      {
        rotate: -14,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".home6-faq-section",
          start: "top 100px",
          end: "bottom bottom",
          scrub: 1.5,
          // scroller: smoothScroller, // smooth scroller থাকলে uncomment করে দিন
          // markers: true,
        },
      },
    );
  }

  // Home6 Service Hover
  $(".service-list ul li").on({
    mouseenter: function () {
      // Remove the 'active' class from all content list items
      $(".service-list ul li").removeClass("active");
      // Add the 'active' class to the hovered content list item
      $(this).addClass("active");

      // Get the index of the hovered content list item
      var index = $(this).index();

      // Remove the 'active' class from all image list items in both service-img containers
      $(".service-img ul li").removeClass("active");

      // Add the 'active' class to the corresponding image list items in both service-img containers
      $(".service-img").each(function () {
        $(this)
          .find("ul li:eq(" + index + ")")
          .addClass("active");
      });
    },
  });

  //Img Slice Effect
  const triggerSlices = document.querySelectorAll(".slice-img-triger");

  triggerSlices.forEach((section) => {
    const slices = section.querySelectorAll(".slice-wrap .slice-item");
    const founder = section.querySelector(".founder-wrapper");

    // slice setup
    slices.forEach((slice, i) => {
      gsap.set(slice, {
        transformOrigin: i % 2 === 0 ? "top center" : "bottom center",
        scaleY: 1,
      });
    });

    // founder initial hidden
    if (founder) {
      gsap.set(founder, {
        autoAlpha: 0,
        y: 28,
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "50% bottom",
        once: true,
      },
    });

    // 1️⃣ Slice animation
    tl.to(slices, {
      scaleY: 0,
      duration: 0.9,
      ease: "power4.inOut",
      stagger: 0.25,
    });

    // 2️⃣ Founder animation (AFTER slice fully done)
    if (founder) {
      tl.to(founder, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
      }); // ← no overlap, pure next step
    }
  });

  // Select all single-service items

  document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".home6-feature-section");
    if (!section) return;

    const tabs = section.querySelectorAll(".feature-nav-tabs .single-tab");
    const contents = section.querySelectorAll(
      ".feature-content-wrapper .single-feature-content",
    );
    const images = section.querySelectorAll(".feature-img-area .single-img");

    if (!tabs.length || !contents.length || !images.length) return;

    const activate = (index) => {
      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((c) => c.classList.remove("show"));
      images.forEach((i) => i.classList.remove("show"));

      tabs[index]?.classList.add("active");
      contents[index]?.classList.add("show");
      images[index]?.classList.add("show");

      // safe swiper call (no console error)
      if (
        window.home2ServiceSwiper &&
        typeof window.home2ServiceSwiper.slideTo === "function"
      ) {
        window.home2ServiceSwiper.slideTo(index);
      }
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();
        activate(index);
      });
    });

    // initial state (just in case)
    activate(0);
  });

  // Magneitc Wrap
  if ($("body").not(".is-mobile").hasClass("tt-magic-cursor")) {
    if ($(window).width() > 1024) {
      gsap.config({
        nullTargetWarn: false,
        trialWarn: false,
      });
      $(".magnetic-item").wrap('<div class="magnetic-wrap"></div>');

      if ($("a.magnetic-item").length) {
        $("a.magnetic-item").addClass("not-hide-cursor");
      }

      var $mouse = { x: 0, y: 0 }; // Cursor position
      var $pos = { x: 0, y: 0 }; // Cursor position
      var $ratio = 0.15; // delay follow cursor
      var $active = false;
      var $ball = $("#ball");

      var $ballWidth = 20; // Ball default width
      var $ballHeight = 20; // Ball default height
      var $ballOpacity = 0.5; // Ball default opacity
      var $ballBorderWidth = 2; // Ball default border width

      gsap.set($ball, {
        // scale from middle and style ball
        xPercent: -50,
        yPercent: -50,
        width: $ballWidth,
        height: $ballHeight,
        borderWidth: $ballBorderWidth,
        opacity: $ballOpacity,
      });

      document.addEventListener("mousemove", mouseMove);

      function mouseMove(e) {
        $mouse.x = e.clientX;
        $mouse.y = e.clientY;
      }

      gsap.ticker.add(updatePosition);

      function updatePosition() {
        if (!$active) {
          $pos.x += ($mouse.x - $pos.x) * $ratio;
          $pos.y += ($mouse.y - $pos.y) * $ratio;

          gsap.set($ball, { x: $pos.x, y: $pos.y });
        }
      }

      $(".magnetic-wrap").mousemove(function (e) {
        parallaxCursor(e, this, 2); // magnetic ball = low number is more attractive
        callParallax(e, this);
      });

      function callParallax(e, parent) {
        parallaxIt(e, parent, parent.querySelector(".magnetic-item"), 25); // magnetic area = higher number is more attractive
      }

      function parallaxIt(e, parent, target, movement) {
        var boundingRect = parent.getBoundingClientRect();
        var relX = e.clientX - boundingRect.left;
        var relY = e.clientY - boundingRect.top;

        gsap.to(target, {
          duration: 0.3,
          x: ((relX - boundingRect.width / 2) / boundingRect.width) * movement,
          y:
            ((relY - boundingRect.height / 2) / boundingRect.height) * movement,
          ease: Power2.easeOut,
        });
      }

      function parallaxCursor(e, parent, movement) {
        var rect = parent.getBoundingClientRect();
        var relX = e.clientX - rect.left;
        var relY = e.clientY - rect.top;
        $pos.x =
          rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
        $pos.y =
          rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
        gsap.to($ball, { duration: 0.3, x: $pos.x, y: $pos.y });
      }

      // Magic cursor behavior
      // ======================

      // Magnetic item hover.
      $(".magnetic-wrap")
        .on("mouseenter mouseover", function (e) {
          $ball.addClass("magnetic-active");
          gsap.to($ball, { duration: 0.3, width: 70, height: 70, opacity: 1 });
          $active = true;
        })
        .on("mouseleave", function (e) {
          $ball.removeClass("magnetic-active");
          gsap.to($ball, {
            duration: 0.3,
            width: $ballWidth,
            height: $ballHeight,
            opacity: $ballOpacity,
          });
          gsap.to(this.querySelector(".magnetic-item"), {
            duration: 0.3,
            x: 0,
            y: 0,
            clearProps: "all",
          });
          $active = false;
        });

      // Alternative cursor style on hover.
      $(
        ".cursor-alter, .tt-main-menu-list > li > a, .tt-main-menu-list > li > .tt-submenu-trigger > a",
      )
        .not(".magnetic-item") // omit from selection.
        .on("mouseenter", function () {
          gsap.to($ball, {
            duration: 0.3,
            borderWidth: 0,
            opacity: 0.2,
            backgroundColor: "#CCC",
            width: "90px",
            height: "90px",
          });
        })
        .on("mouseleave", function () {
          gsap.to($ball, {
            duration: 0.3,
            borderWidth: $ballBorderWidth,
            opacity: $ballOpacity,
            backgroundColor: "transparent",
            width: $ballWidth,
            height: $ballHeight,
            clearProps: "backgroundColor",
          });
        });

      // Cursor view on hover (data attribute "data-cursor="...").
      $("[data-cursor]").each(function () {
        $(this)
          .on("mouseenter", function () {
            $ball
              .addClass("ball-view")
              .append('<div class="ball-view-inner"></div>');
            $(".ball-view-inner").append($(this).attr("data-cursor"));

            gsap.to($ball, {
              duration: 0.3,
              yPercent: -75,
              padding: "8px 20px", // ✅ instead of fixed width/height
              opacity: 1,
              borderWidth: 0,
              height: "auto", // ✅ allow auto height
            });

            gsap.to(".ball-view-inner", {
              duration: 0.3,
              scale: 1,
              autoAlpha: 1,
            });
          })
          .on("mouseleave", function () {
            gsap.to($ball, {
              duration: 0.3,
              yPercent: -50,
              width: $ballWidth, // back to default circle
              height: $ballHeight,
              opacity: $ballOpacity,
              borderWidth: $ballBorderWidth,
              padding: 0, // ✅ reset padding
            });
            $ball.removeClass("ball-view").find(".ball-view-inner").remove();
          });
        $(this).addClass("not-hide-cursor");
      });

      // Cursor drag on hover (class "cursor-drag"). For Swiper sliders.
      $(".swiper").each(function () {
        if ($(this).parent().attr("data-simulate-touch") === "true") {
          if ($(this).parent().hasClass("cursor-drag")) {
            $(this)
              .on("mouseenter", function () {
                $ball.append('<div class="ball-drag"></div>');
                gsap.to($ball, {
                  duration: 0.3,
                  width: 60,
                  height: 60,
                  opacity: 1,
                });
              })
              .on("mouseleave", function () {
                $ball.find(".ball-drag").remove();
                gsap.to($ball, {
                  duration: 0.3,
                  width: $ballWidth,
                  height: $ballHeight,
                  opacity: $ballOpacity,
                });
              });
            $(this).addClass("not-hide-cursor");

            // Ignore "data-cursor" on hover.
            $(this)
              .find("[data-cursor]")
              .on("mouseenter mouseover", function () {
                $ball.find(".ball-drag").remove();
                return false;
              })
              .on("mouseleave", function () {
                $ball.append('<div class="ball-drag"></div>');
                gsap.to($ball, {
                  duration: 0.3,
                  width: 60,
                  height: 60,
                  opacity: 1,
                });
              });
          }
        }
      });

      // Cursor drag on mouse down / click and hold effect (class "cursor-drag-mouse-down"). For Swiper sliders.
      $(".swiper").each(function () {
        if ($(this).parent().attr("data-simulate-touch") === "true") {
          if ($(this).parent().hasClass("cursor-drag-mouse-down")) {
            $(this)
              .on("mousedown pointerdown", function (e) {
                if (e.which === 1) {
                  // Affects the left mouse button only!
                  gsap.to($ball, {
                    duration: 0.2,
                    width: 60,
                    height: 60,
                    opacity: 1,
                  });
                  $ball.append('<div class="ball-drag"></div>');
                }
              })
              .on("mouseup pointerup", function () {
                $ball.find(".ball-drag").remove();
                if ($(this).find("[data-cursor]:hover").length) {
                } else {
                  gsap.to($ball, {
                    duration: 0.2,
                    width: $ballWidth,
                    height: $ballHeight,
                    opacity: $ballOpacity,
                  });
                }
              })
              .on("mouseleave", function () {
                $ball.find(".ball-drag").remove();
                gsap.to($ball, {
                  duration: 0.2,
                  width: $ballWidth,
                  height: $ballHeight,
                  opacity: $ballOpacity,
                });
              });

            // Ignore "data-cursor" on mousedown.
            $(this)
              .find("[data-cursor]")
              .on("mousedown pointerdown", function () {
                return false;
              });

            // Ignore "data-cursor" on hover.
            $(this)
              .find("[data-cursor]")
              .on("mouseenter mouseover", function () {
                $ball.find(".ball-drag").remove();
                return false;
              });
          }
        }
      });

      // Cursor close on hover.
      $(".cursor-close").each(function () {
        $(this).addClass("ball-close-enabled");
        $(this)
          .on("mouseenter", function () {
            $ball.addClass("ball-close-enabled");
            $ball.append('<div class="ball-close">Close</div>');
            gsap.to($ball, {
              duration: 0.3,
              yPercent: -75,
              width: 80,
              height: 80,
              opacity: 1,
            });
            gsap.from(".ball-close", { duration: 0.3, scale: 0, autoAlpha: 0 });
          })
          .on("mouseleave click", function () {
            $ball.removeClass("ball-close-enabled");
            gsap.to($ball, {
              duration: 0.3,
              yPercent: -50,
              width: $ballWidth,
              height: $ballHeight,
              opacity: $ballOpacity,
            });
            $ball.find(".ball-close").remove();
          });

        // Hover on "cursor-close" inner elements.
        $(
          ".cursor-close a, .cursor-close button, .cursor-close .tt-btn, .cursor-close .hide-cursor",
        )
          .not(".not-hide-cursor") // omit from selection (class "not-hide-cursor" is for global use).
          .on("mouseenter", function () {
            $ball.removeClass("ball-close-enabled");
          })
          .on("mouseleave", function () {
            $ball.addClass("ball-close-enabled");
          });
      });

      // ================================================================
      // Scroll between anchors
      // ================================================================

      $('a[href^="#"]')
        .not('[href$="#"]') // omit from selection
        .not('[href$="#0"]') // omit from selection
        .on("click", function () {
          var target = this.hash;

          // If fixed header position enabled.
          if ($("#tt-header").hasClass("tt-header-fixed")) {
            var $offset = $("#tt-header").height();
          } else {
            var $offset = 0;
          }

          // You can use data attribute (for example: data-offset="100") to set top offset in HTML markup if needed.
          if ($(this).data("offset") != undefined)
            $offset = $(this).data("offset");

          return false;
        });

      // Show/hide magic cursor
      // =======================

      // Hide on hover.
      $(
        "a, button, .tt-btn, .tt-form-control, .tt-form-radio, .tt-form-check, .hide-cursor",
      ) // class "hide-cursor" is for global use.
        .not(".not-hide-cursor") // omit from selection (class "not-hide-cursor" is for global use).
        .not(".cursor-alter") // omit from selection
        .not(".tt-main-menu-list > li > a") // omit from selection
        .not(".tt-main-menu-list > li > .tt-submenu-trigger > a") // omit from selection
        .on("mouseenter", function () {
          gsap.to($ball, { duration: 0.3, scale: 0, opacity: 0 });
        })
        .on("mouseleave", function () {
          gsap.to($ball, { duration: 0.3, scale: 1, opacity: $ballOpacity });
        });

      // Hide on click.
      $("a")
        .not('[target="_blank"]') // omit from selection.
        .not('[href^="#"]') // omit from selection.
        .not('[href^="mailto"]') // omit from selection.
        .not('[href^="tel"]') // omit from selection.
        .not(".lg-trigger") // omit from selection.
        .not(".video-player") // omit from selection.
        .not(".tt-btn-disabled") // omit from selection.
        .on("click", function () {
          gsap.to($ball, { duration: 0.3, scale: 1.3, autoAlpha: 0 });
        });

      // Show/hide on document leave/enter.
      $(document)
        .on("mouseleave", function () {
          gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 0 });
        })
        .on("mouseenter", function () {
          gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 1 });
        });

      // Show as the mouse moves.
      $(document).mousemove(function () {
        gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 1 });
      });
    }
  }
  // Info Flow
  const pfinfoflow1Text = document.querySelectorAll(".pf-caption-cursor-card");
  function followImageCursor(event, pfinfoflow1Text) {
    const contentBox = pfinfoflow1Text.getBoundingClientRect();
    const dx = event.clientX - contentBox.x;
    const dy = event.clientY - contentBox.y;
    pfinfoflow1Text.children[1].style.transform = `translate(${dx}px, ${dy}px)`;
  }
  pfinfoflow1Text.forEach((item, i) => {
    item.addEventListener("mousemove", (event) => {
      setInterval(followImageCursor(event, item), 100);
    });
  });

  //Counter Js
  document.querySelectorAll(".counter_number").forEach((el) => {
    const finalValue = parseInt(el.textContent.replace(/\D/g, ""), 10) || 0;
    const counter = { value: 0 };

    gsap.to(counter, {
      value: finalValue,
      duration: 2,
      ease: "power1.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        once: true,
      },
      onUpdate: () => {
        let v = Math.floor(counter.value);
        // leading zero logic
        el.textContent = v < 10 ? "0" + v : v;
      },
    });
  });

  // Home7 Bar AAnimation=
  let bb = gsap.matchMedia();

  bb.add("(min-width: 992px)", () => {

    const bars = document.querySelectorAll(".home7-graph-section .single-data");

    bars.forEach((bar, index) => {
      
      const numberEl = bar.querySelector("h3");
      const finalValue = parseInt(numberEl.textContent);

      // set initial state
      gsap.set(bar, {
        scaleY: 0,
        transformOrigin: "bottom"
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".home7-graph-section",
          start: "top 30%",
          toggleActions: "play none none reverse",
          markers: false,
        }
      });

      tl.to(bar, {
        scaleY: 1,
        duration: 1.2,
        ease: "power3.out"
      }, 0)

      .fromTo(numberEl,
        { innerText: 0 },
        {
          innerText: finalValue,
          duration: 1.2,
          ease: "power1.out",
          snap: { innerText: 1 },
          onUpdate: function () {
            numberEl.innerText = Math.floor(numberEl.innerText) + "%";
          }
        },
        0
      );

    });

  });



  //Quantity Increment
  $(".quantity__minus").on("click", function (e) {
    e.preventDefault();
    var input = $(this).siblings(".quantity__input");
    var value = parseInt(input.val(), 10);
    if (value > 1) {
      value--;
    }
    input.val(value.toString().padStart(2, "0"));
  });
  $(".quantity__plus").on("click", function (e) {
    e.preventDefault();
    var input = $(this).siblings(".quantity__input");
    var value = parseInt(input.val(), 10);
    value++;
    input.val(value.toString().padStart(2, "0"));
  });

  //Cart Menu Quantity button toggle
  $(".qty-btn").on("click", function (e) {
    e.stopPropagation();
    // Toggle "active" class for the current quantity button and its related elements
    $(this).next(".quantity-area").toggleClass("active");

    // Remove "active" class from other quantity buttons and related elements
    $(".quantity-area")
      .not($(this).next(".quantity-area"))
      .removeClass("active");
  });
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".quantity-area").length) {
      // Remove "active" class from all quantity buttons and related elements
      $(".quantity-area").removeClass("active");
    }
  });

  // Payment Method
  $(function () {
    $(".choose-payment-method ul li").on("click", function () {
      $(".choose-payment-method ul li").removeClass("active"); // Remove active class from all list items
      if ($(this).hasClass("stripe")) {
        $("#StripePayment").show();
        $("#OfflinePayment").hide();
        $(this).addClass("active"); // Add active class to the clicked list item
      } else if ($(this).hasClass("paypal")) {
        $("#OfflinePayment").hide();
        $("#StripePayment").hide();
        $(this).addClass("active"); // Add active class to the clicked list item
      } else if ($(this).hasClass("offline")) {
        $("#OfflinePayment").show();
        $("#StripePayment").hide();
        $(this).addClass("active"); // Add active class to the clicked list item
      } else {
        $("#StripePayment").hide();
        $("#OfflinePayment").hide();
      }
    });
  });


})(jQuery);
