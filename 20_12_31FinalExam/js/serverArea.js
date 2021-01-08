$(function (){

  let headerWords = $(".header-company-name .wenzi"),
  hMotion = new operationMotion(headerWords, -1);

  $(document.body).on("mousemove", (e) => {
    let xI = e.clientX / (window.innerWidth / 2) - 1;
    let yI = e.clientY / (window.innerHeight / 2) - 1;

    // 文字s
    hMotion.setXY(e);
  });
});