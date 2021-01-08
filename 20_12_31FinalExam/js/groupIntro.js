$(function () {

  let spans = $(".mark-progress li .count");

  // 更新状态
  let io = new IntersectionObserver((entire) => {
    entire.forEach((item, idx) => {
      let target = item.target,
        status = item.isIntersecting;
      if (status) {
        increaseNum($(target));
      }

    });
  });

  spans.each((idx, item) => io.observe(item));

});

function increaseNum(el) {
  let num = ~~(el.attr("data-to"));
  let reNum;


  let timer = setInterval(() => {
    reNum = ~~(el.text());

    if (reNum < num) {
      (reNum < 10) ? el.text((++reNum)): el.text(++reNum);
    } else {
      timer && clearInterval(timer);
    };
  }, el.data("speed"));
  console.log(~~el.text());
}