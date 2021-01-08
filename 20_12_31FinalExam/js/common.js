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
  // 回到顶部End



  $(".group-members > li").each((idx, item) => {
    // item.style.setProperty("--self-color", "#" + randomColor1());
    item.style.setProperty("--self-color", randomColor2());
  });

  let box = $("#carousel .carousel-inner");
  let items = $(".carousel-inner .item");
  let props = {};
  props = {
    index: 0,
    timing: 3000,
    duration() {
      return (this.timing * 0.2);
    },
    len: items.length,
    iWidth: items.eq(0).outerWidth(),
    el: items.eq(0)
  };

  // box.append(items.eq(0).clone(true));

  // 开启轮播图
  // box[0] && carousel(box, props);
});



function random(min, max) {
  return Math.random() * (max - min) + min;
};



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


// 鼠标操纵物体
class operationMotion {
  constructor(el, dir = 1) {
    this.el = el;
    this.dir = dir; // 是否与鼠标互为反方向 -1 || 1
    this.iW = window.innerWidth;
    this.iH = window.innerHeight;
  }

  getXY(event) {
    let xI = event.clientX / (this.iW / 2) - 1;
    let yI = event.clientY / (this.iH / 2) - 1;

    return {
      xI,
      yI
    };
  }

  setXY(event) {
    let vals = this.getXY(event);

    this.el.css({
      "--perX": this.dir * vals.xI,
      "--perY": this.dir * vals.yI
    });
  }
}