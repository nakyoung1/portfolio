"use strict";
$(function () {
    // 스크롤 이벤트 감지
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 100) {
            $("#topButton").fadeIn(); // 버튼 나타남
        }
        else {
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
            $("header").css({
                "background-color": "#eee",
                color: "#111",
            });
            $("#header-list a").css({ color: "#111" });
        }
        else {
            $("header").css({
                "background-color": "#111",
                color: "#eee",
            });
            $("#header-list a").css({ color: "#eee" });
        }
    });
    $(".project-box").on("click", function () {
        var link = $(this).find("a").attr("href"); // <a> 태그 안의 href 값을 가져옴
        if (link) {
            window.open(link, "_blank"); // 새 창에서 링크 열기
        }
    });
});
