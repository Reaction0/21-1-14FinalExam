$(function () {

  let backUp = $(".back-up");
  let navbar = $(".navbar");

  scrollDeal();
  $(window).scroll(scrollDeal);


  // 回到顶部
  backUp.click(() => {
    // backTop();
    // $("html, body").animate({ scrollTop: 0 });
    $("html, body").scrollTop(0);


  });

  // function backTop() {
  //   let sVal = $("html").scrollTop() || $("body").scrollTop();
  //   $(window).scrollTop(sVal - (sVal / 9));
  //   if (sVal > 0)requestAnimationFrame(backTop);
  // };


  // $(".navbar-nav .dropdown").children(".dropdown-menu").slideUp();
  // $(".navbar-nav .dropdown").click(function (){
  //   $(this).children(".dropdown-menu").slideDown();
  // });


  $(".group-members > li").each((idx, item) => {
    // item.style.setProperty("--self-color", "#" + randomColor1());
    item.style.setProperty("--self-color", randomColor2());
  });

  let box = $("#carousel .carousel-inner");
  let items = $(".carousel-inner .item");
  let props = {
    index: 0,
    timing: 4000,
    duration: 666,
    len: items.length,
    iWidth: items.eq(0).outerWidth(),
    el: items.eq(0)
  };

  box.append(items.eq(0).clone(true));

  // 开启轮播图
  carousel(box, props);
});




// 随机生成颜色
// function randomColor1(){
//   return Math.random().toString(16).slice(5, 11);
// };
function randomColor2() {
  // return `rgb(${randomNum(200, 255)}, ${randomNum(200, 255)}, ${randomNum(200, 255)})`;
  return `hsl(${randomNum(0, 360)}deg ${randomNum(5, 100)}% ${randomNum(10, 30)}% / 1)`;
};


function randomNum(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

function scrollDeal() {
  let sVal = $("html").scrollTop() || $("body").scrollTop();
  if (sVal > 120) {
    $(".navbar").addClass("invert");
    $(".back-up").show();
  } else {
    $(".navbar").removeClass("invert");
    $(".back-up").hide();
  }
}
