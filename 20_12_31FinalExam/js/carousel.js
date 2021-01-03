function carousel(box, props) {
  let { el, index, iWidth, len, timing, duration } = props;
  let ctrlBtns = $(".carousel .carousel-control");
  let indicators = $(".carousel-indicators li");
  let timer, progress;

  $(window).resize(() => {
    iWidth = el.outerWidth();
  });

  intervalRequest();


  // 箭头
  ctrlBtns.click(function () {
    let dir = $(this).data("dir");
    moveControl(dir);

    otherMove();
  });

  // 指示器
  indicators.click(function () {
    index = Number($(this).data("slide-to")) * -1;

    otherMove();
  });

  function otherMove() {
    indicators.children("i").stop();
    intervalRequest();
    indicators.children("i").width(0);

    box.stop().animate({
      left: `${index * iWidth}px`
    });
  }

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

  function intervalRequest() {
    timer && clearInterval(timer);

    indicators.children("i").eq(Math.abs(index <= -5 ? 0 : index)).stop(false, false).animate({
      width: "100%"
    }, timing, () => {

      console.log("Callback:" + index);

      indicators.children("i").css({
        width: 0
      });

      box.stop().animate({
        left: `${index * iWidth}px`
      }, duration);

    });

    // 自动轮播
    timer = setInterval(() => {
      moveControl("right");

      intervalRequest();
    }, timing);

  };
  // function intervalRequest(idx) {
  //   timer && clearInterval(timer);
  //   progress && clearInterval(progress);
  //   let nowTamp = 0;
  //   let percent = 0;
  //   let index = idx == -5 ? 0 : idx;
  //   index = Math.abs(index);

  //   indicators.css("--percent-next", 0);

  //   timer = setInterval(() => {
  //     percent = 0;
  //     nowTamp = 0;
  //     moveControl("right");
  //   }, timing);


  //   progress = setInterval(() => {
  //     nowTamp += 1;

  //     percent = (nowTamp / duration) * 100;
  //     indicators.eq(index).css("--percent-next", `${percent}%`);
  //   }, 6);
  // };



};

