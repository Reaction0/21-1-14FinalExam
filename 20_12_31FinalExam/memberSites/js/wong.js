$(function () {
  let el = $(".self-box .dynamic-sentence");
  let sentences = eval('(' + el.data("sentences") + ')'),
    sLen = sentences.length;
  let curIndex = 0;
  let timer = delayTimer = null,
    speed = 150,
    delay = 1000;

  inputLetter(removeLetter);

  function inputLetter(callback) {
    let curLets = sentences[curIndex].split(""),
      cLen = curLets.length;
    delayTimer && clearTimeout(delayTimer);

    el.text("");

    curIndex++;
    curIndex %= sLen;

    let pos = 0;
    timer = setInterval(() => {
      if (pos < cLen) {
        el.text(el.text() + curLets[pos]);
      } else {
        timer && clearInterval(timer);

        delayTimer = setTimeout(callback, delay);
      };
      pos++;
    }, speed);

  }

  function removeLetter() {
    let sent = el.text(),
      sLen = sent.length;
    delayTimer && clearTimeout(delayTimer);

    let pos = sLen - 1;
    timer = setInterval(() => {
      if (pos >= 0 && pos < sLen) {
        el.text(sent.substring(0, pos));
      } else {
        timer && clearInterval(timer)

        delayTimer = setTimeout(inputLetter.bind(null, removeLetter), (delay / 2));
      };
      pos--;
    }, speed);
  };


});




// 鼠标移动操纵物体
$(function () {

  let fishHang = $(".self-box .hanging-drop");
  let doraemonEyes = $(".self-header .self-avatar");
  let eyes = new operationMotion(doraemonEyes);
  let fish = new operationMotion(fishHang, -1);

  $(document.body).on("mousemove", (e) => {
    let xI = e.clientX / (window.innerWidth / 2) - 1;
    let yI = e.clientY / (window.innerHeight / 2) - 1;

    // 眼睛
    eyes.setXY(e);

    // 鱼
    fish.setXY(e);
  });

});


// 时间轴进度
$(function () {
  let experiencesBox = $(".honor-items"),
  bH = experiencesBox.outerHeight(),
  experiences = experiencesBox.find("li.item"),
  eH = experiences.outerHeight(true);
  
  $(window).scroll(() => {
    let scrollY = $("html, body").scrollTop();
    let ingY = (scrollY - window.innerHeight) + (window.innerHeight / 2);
    
    let rects = experiencesBox[0].getBoundingClientRect();
    let curIndex = Math.abs(Math.floor(rects.top / eH));
    experiences.eq(curIndex).addClass("active").siblings().removeClass("active");
    
    // console.log("当前预览的是：" + curIndex);
    
    experiencesBox.css({
      "--height": Math.min(bH, ingY) + "px"
    });
    
    
  });
  
});
// 时间轴进度End


// 鼠标移入移出
$(function (){
  
  let items = $(".blog-sites .inner-box .item");
  items.each((idx, item) => {
    new MouseDir(item, item.querySelector(".info-brief")).registerEvent();
  });
  
});
// 鼠标移入移出End
