$(function () {
  let items = $("#carousel .carousel-inner .item"),
    iLen = items.length;
  let ctrlBtns = $(".carousel .carousel-control");
  let index = 0;


  // 设置样式
  items.css({
    position: "absolute",
    left: 0,
    top: 0,
    // opacity: 0
  });
  $(".carousel-inner .item:not(:first-child)").css("display", "none");
  iLen = $("#carousel .carousel-inner .item").length;
  let indicators = $(".carousel-indicators li"),
    iChild = indicators.children("i");

  ctrlBtns.on("click", function () {
    iChild.stop();
    loopFade($(this).data("dir"), iLen);
    fade(items, index);
  });

  loopFade(false, iLen, 0);

  // 循环
  function loopFade(dir, totalLen, idx) {
    index = dir ? dir == "right" ? index + 1 : index - 1 : idx;
    index %= totalLen;

    // console.log(index);

    $(".carousel-indicators li i").width(0);
    
    iChild.eq(index).stop().animate({
      width: "100%"
    }, 3000, function (){
      
      
      loopFade("right", iLen);
      fade(items, index);
    });
  };


});

function fade(items, idx) {
  items.siblings().fadeOut();

  items.eq(idx).fadeIn();
};