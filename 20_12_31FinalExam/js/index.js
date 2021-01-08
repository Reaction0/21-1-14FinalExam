$(function (){
  // $(".anchor-links").click(() => {
    
  // });


  let objs = $(".observe-object");
  let anchors = $(".anchor-links li"),
  curIdx = 0;

  // anchors.click(function (){
  //   let target = $(`.observe-object[data-index=${$(this).index()}]`);

  //   console.log(target);
  // });

  // 更新状态
  let io = new IntersectionObserver((entire) => {
    entire.forEach((item, idx) => {
      let target = item.target,
        status = item.isIntersecting;
      if(status){
        curIdx = $(target).attr("data-index");
        anchors.eq(curIdx).addClass("active").siblings().removeClass("active");
      }
      
    });
  });

  objs.each((idx, item) => io.observe(item));
});
