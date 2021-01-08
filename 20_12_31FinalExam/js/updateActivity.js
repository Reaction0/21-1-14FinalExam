$(function (){
  let arrows = $(".art-exchange .arrow");
  let items = $(".activitys-main .activity-item");
  let dots = $(".art-exchange .dot");
  
  // console.log(items.eq(0));
  
  // 箭头
  arrows.click(function (){
    let dir = $(this).hasClass("left");
    updateActivity(dir ? -1 : 1, items);
  });
  
  // 指示器
  dots.click(function (){
    updateActivity("Wong", items, $(this).index());
  });


  function updateActivity(dir, targets, targetIndex){
    let index = targets.data("index");
    let originIndex = index;

    
    let num = targets.length;
    
    // 转类型
    index = ~~index;
    index += dir;
    index %= num;
    // 更新索引
    if(targetIndex !== undefined)index = targetIndex;
    targets.data("index", index);

    console.log("源索引：" + originIndex, "旧索引：" + index);
    
    // 处理旧元素
    let oldCurrent = targets.eq(originIndex);
    oldCurrent.removeClass("current from-left from-right");
    // 处理新元素
    let newCurrent = targets.eq(index);
    newCurrent.removeClass("current to-left from-left to-right from-right");

                      // 计算下一次操作每个元素该何去何从
    // 隐藏方向               判断旧元素应该从哪个方向划出隐藏
    let getAwayDirClass = originIndex < index ? "to-left" : "to-right";
    // 显示方向               判断新元素打算从哪个方向出场
    let dirClass = originIndex < index ? "from-right" : "from-left";
    // console.log(getAwayDirClass, dirClass);
    
    // 离开
    requestAnimationFrame(function (){
      oldCurrent.addClass(getAwayDirClass);
    });
          // KEEP
    console.log(document.body.offsetWidth);
    
    // 进场
    requestAnimationFrame(function (){
      newCurrent.addClass("current " + dirClass);
    });
    dots.eq(index).addClass("current").siblings().removeClass("current");
  }







});