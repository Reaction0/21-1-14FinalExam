$(function () {

  let totalPage = 0;
  let curPage = 1;

  let isInit = true;
  let pagesBox = $(".pagination"),
    listPage = pagesBox.children(),
    lLen = listPage.length,
    numItem = pagesBox.children(":not(.roll-item)").length;

  // 初始化分配有多少页
  function initPage(total, page) {
    if (!isInit) return;
    isInit = false;

    totalPage = total;
    curPage = page;

    resetPage(page);
  };
  initPage(12, 1);

  // 翻页
  function resetPage(page) {
    if (page < 1 || page > totalPage) {
      return false;
    }
    curPage = page;
    changePage(page);
  };
  

  // 页数变化
  function changePage(page) {
    let stateShow = [],
      light;

    console.log("跳转到：" + page);


    if (page < 6) { // 右
      stateShow = [1, 2, 3, 4, 5, 6, 7, "...", totalPage];

      light = page;
    } else if (page > totalPage - 5) { // 左
      stateShow = [1, "...", totalPage - 6, totalPage - 5, totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage];

      light = numItem - (totalPage - page);
    } else {
      stateShow = [1, "...", page - 2, page - 1, page, page + 1, page + 2, "...", totalPage];

      light = Math.floor(lLen / 2);
    }

    // console.log(light);
    renderShow(stateShow, light);
  };

  // 渲染页数呈现
  function renderShow(arr, curIdx) {
    let list = pagesBox.children(":not(.roll-item)");

    listPage.eq(curIdx).addClass("active").siblings().removeClass("active");

    arr.forEach((item, idx) => {
      list.eq(idx).text(item);

      if (item == "...") {
        list.eq(idx).css("border", "none");
      } else {
        list.eq(idx).css("border", "1px solid");
      }
    });
  };

  // 注册点击 翻页事件
  listPage.on("click", function () {
    let dir = $(this).attr("data-to") || ~~($(this).text());

    if (typeof dir == "string") {
      resetPage(dir == "next" ? curPage + 1 : curPage - 1);
    } else {
      resetPage(dir);
    }
  });

});