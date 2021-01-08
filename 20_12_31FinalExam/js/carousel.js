function carousel(box, props) {
  let {
    el,
    index,
    iWidth,
    len,
    timing,
    duration
  } = props;
  let ctrlBtns = $(".carousel .carousel-control");
  let indicators = $(".carousel-indicators li"),
    iChild = indicators.children("i");

  $(window).resize(() => {
    iWidth = el.outerWidth();
  });


  // 箭头
  ctrlBtns.click(function () {
    let dir = $(this).data("dir");

    // 更新索引
    moveControl(dir);

    // 还原
    iChild.stop();
    iChild.width(0);

    // 更新活动对象
    box.stop().animate({
      left: `${index * iWidth}px`
    });

    // 再次运行轮子
    intervalRequest();
  });

  // 指示器
  // indicators.click(function () {
  //   index = Number($(this).data("slide-to")) * -1;

  //   otherMove();
  // });


  // 更新索引 & 无缝轮播的控制
  function moveControl(dir) {
    if (dir == "right") {
      if (index <= -len) {
        box.css("left", 0);
        index = 0;
      }
      index--;
    } else {
      if (index == 0) {
        box.css("left", -(len) * iWidth);
        index = -len;
      }
      index++;
    };

  };

  intervalRequest();

  function intervalRequest(dir = "right") {
    console.log("我还在运行");
    iChild.eq(Math.abs(index <= -5 ? 0 : index)).animate({
      width: "100%"
    }, timing, "linear", () => {

      moveControl(dir);

      iChild.width(0);

      console.log("Callback:" + index);
      box.stop().animate({
        left: `${index * iWidth}px`
      }, props.duration());

      intervalRequest();
    });

  };

};