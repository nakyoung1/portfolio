$(function () {
     // 스크롤 이벤트 감지
     $(window).on("scroll", function () {
          if (($(this).scrollTop() as number) > 100) {
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
          if (($(this).scrollTop() as number) > 100) {
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

const weatherCity = document.getElementById("weather-city")!;
const weather = document.getElementById("weather")!;
const weatherIcon = document.getElementById("weather-icon")!;

function getTemp() {
     navigator.geolocation.getCurrentPosition(async (position) => {
          let lat = position.coords.latitude;
          let long = position.coords.longitude;
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=034db30f421b1daff5ebe414f46fc87c&units=metric&lang=kr`);
          const data = await response.json();
          const iconCode = data.weather[0].icon;
          const url = `https://openweathermap.org/img/wn/${iconCode}.png`;
          console.log(data);
          //구조분해
          weatherIcon.innerHTML = `<img src="${url}" alt="Weather Icon">`;
          weather.innerHTML = `온도 : ${data.main.temp}℃<br>습도 : ${data.main.humidity}`;
          weatherCity.innerHTML = data.name;
     });
}

getTemp();
