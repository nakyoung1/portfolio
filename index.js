"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
$(function () {
  // 스크롤 이벤트 감지
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 100) {
      $("#topButton").fadeIn(); // 버튼 나타남
    } else {
      $("#topButton").fadeOut(); // 버튼 사라짐
    }
  });
  // 버튼 클릭 시 최상단으로 이동
  $("#topButton").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 300); // 0.5초(500ms) 동안 스크롤 업
  });
  $("header p").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 300); // 0.5초(500ms) 동안 스크롤 업
  });
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 100) {
      $("nav").css({
        "background-color": "#eee",
        color: "#111",
      });
      $("#header-list a").css({ color: "#111" });
      $("#header-list a")
        .on("mouseenter", function () {
          // 마우스를 올렸을 때
          $(this).css("color", "#8d5d5d");
        })
        .on("mouseleave", function () {
          // 마우스를 뗐을 때
          $(this).css("color", "#111");
        });
      $("#weather-container").css({
        display: "none",
      });
    } else {
      $("nav").css({
        "background-color": "transparent",
        color: "#eee",
      });
      $("#header-list a").css({ color: "#eee" });
      $("#header-list a")
        .on("mouseenter", function () {
          // 마우스를 올렸을 때
          $(this).css("color", "#8d5d5d");
        })
        .on("mouseleave", function () {
          // 마우스를 뗐을 때
          $(this).css("color", "#eee");
        });
      $("#weather-container").css({
        display: "block",
      });
    }
  });
  $(".project-box").on("click", function () {
    var link = $(this).find("a").attr("href"); // <a> 태그 안의 href 값을 가져옴
    if (link) {
      window.open(link, "_blank"); // 새 창에서 링크 열기
    }
  });
});
// 다크모드 토글
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  document.getElementById("theme-toggle").textContent = isLight
    ? "dark"
    : "light";
});

// 초기 언어 상태 확인 (localStorage에서)
let currentLang = localStorage.getItem("lang") || "ko";
document.body.classList.add(`lang-${currentLang}`);
document.getElementById("lang-toggle").textContent =
  currentLang === "ko" ? "EN" : "KO";

// 언어 전환 버튼 이벤트
const langToggleBtn = document.getElementById("lang-toggle");
langToggleBtn.addEventListener("click", () => {
  currentLang = currentLang === "ko" ? "en" : "ko";

  // 버튼 텍스트 변경
  langToggleBtn.textContent = currentLang === "ko" ? "EN" : "KO";

  // 클래스 적용
  document.body.classList.remove("lang-ko", "lang-en");
  document.body.classList.add(`lang-${currentLang}`);

  // localStorage에 저장
  localStorage.setItem("lang", currentLang);
});

// 탑버튼 + 스크롤 이벤트
const scrollContainer = document.querySelector(".container");
const topBtn = document.getElementById("top-button");
const topBar = document.querySelector(".top-bar");
let lastScrollY = 0;

scrollContainer.addEventListener("scroll", () => {
  const currentScroll = scrollContainer.scrollTop;

  // 탑버튼 표시 여부
  if (currentScroll > 300) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }

  // 내릴 때 top-bar 숨기고, 올릴 때 보이게
  if (currentScroll > lastScrollY && currentScroll > 100) {
    topBar.classList.add("hide");
  } else {
    topBar.classList.remove("hide");
  }

  lastScrollY = currentScroll;
});

// top버튼 클릭 시 위로 부드럽게 이동
topBtn.addEventListener("click", () => {
  scrollContainer.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// 마우스가 위쪽 80px 근처 오면 top-bar 다시 보이게
document.addEventListener("mousemove", (e) => {
  if (e.clientY < 80) {
    topBar.classList.remove("hide");
  }
});

let hideTimer = null;

document.addEventListener("mousemove", (e) => {
  // 메인 섹션에 있는지 확인
  const inMain = scrollContainer.scrollTop < window.innerHeight * 0.5;

  // 메인에 있으면 항상 보이게
  if (inMain) {
    topBar.classList.remove("hide");
    return;
  }

  if (e.clientY < 80) {
    topBar.classList.remove("hide");
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      topBar.classList.add("hide");
    }, 800);
  }
});

// codeRain.js
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("codeRain");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const letters = "01<>/{}[]()=+constletfunction;".split("");
  const fontSize = 18;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function draw() {
    const isLight = document.body.classList.contains("light");

    ctx.fillStyle = isLight ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff88";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 40);

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});
