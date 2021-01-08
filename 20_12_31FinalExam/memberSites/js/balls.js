
// 画板操作
$(function () {
  let wrap = $(".self-header");
  let canvas = document.querySelector(".self-header .generate-ball"),
    ctx = canvas.getContext("2d");
  let timer, flag = true;
  console.log(ctx);

  setSize();
  $(window).resize(setSize);

  function setSize() {
    canvas.height = window.innerHeight;
    canvas.width = document.body.clientWidth;
  };

  let balls = [];
  let pool = [];
  const MAX_PARTICLES = 320;

  startUp();
  function startUp(){
    let x = (canvas.width * 0.5) + randomNum(-100, 100);
    let y = (canvas.height * 0.5) + randomNum(-100, 100);

    for (let i = 0; i < 30; i++) {
      balls.push( new Ball(ctx, x, y, random(20, 40)) );
    }
    motionBall(balls);
  };

  // 一次鼠标进入移动最多只能有280个球。
  // 如果超过就用旧球。 (重复使用被创建出来的球s，只是改变了属性而已)

  wrap.on("click mousemove", (e) => {
    flag = true;
    let x = e.pageX,
      y = e.pageY;


    // console.log({
    //   pool,
    //   balls
    // });
    for (let i = 0; i < randomNum(3, 6); i++) {
      if (balls.length >= MAX_PARTICLES) {
        pool.push(balls.shift());
      }
      let obj;
      if (pool.length) {
        obj = pool.pop();

        // console.log("Old:" + obj);
      } else {
        obj = new Ball(ctx, x, y, random(10, 40));

        // console.log("New:" + obj);
      };
      obj.wander = random(0.5, 2);
      obj.drag = random(0.9, 0.99);
      obj.speedX = Math.sin(random(0, Math.PI * 2)) * random(2, 8);
      obj.speedY = Math.cos(random(0, Math.PI * 2)) * random(2, 8);
      obj.alive = true;
      obj.r = random(10, 40);
      obj.x = x;
      obj.y = y;
      balls.push(obj);
    }

  });

  // 鼠标离开
  // wrap.mouseleave((e) => {
  //   flag = false;
  // });
  $(window).blur(() => {
    flag = false;
  });

  // 定时器会一直执行，不断的判断flag是否为true，是则执行，否则返回
  timer = setInterval(motionBall.bind(null, balls), 1000 / 60);

  function motionBall(balls) {
    if (!flag) return;
    // 把以下代码去掉 会有神奇的彩蛋
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let el;
    for (let i = balls.length - 1; i >= 0; i--) {
      el = balls[i];
      if (el.alive) {
        el.boom();
      } else {
        pool.push(balls.splice(i, 1)[0]);
      };

    }

  }

});

class Ball {
  constructor(ctx, x, y, radius) {
    this.ctx = ctx;

    this.r = radius;

    this.alive = true;

    this.x = x;
    this.y = y;
    this.wander = 0.15;
    this.theta = randomNum(0, Math.PI * 2);
    this.drag = 0.92;
    this.speedX = 0;
    this.speedY = 0;

    this.color = `rgba(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)}, ${random(0, 1)})`;

    this.ctx.globalCompositeOperation = "lighter";
  }

  makeBall() {
    let pencil = this.ctx;
    pencil.beginPath();

    pencil.fillStyle = this.color;
    pencil.arc(this.x, this.y, this.r, 0, (Math.PI * 2));
    pencil.fill();
    pencil.closePath();
  }

  boom() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedX *= this.drag;
    this.speedY *= this.drag;
    this.theta += (Math.random() * (0.5 - (-0.5)) + -0.5) * this.wander;

    this.speedX += Math.sin(this.theta) * 0.2;
    this.speedY += Math.cos(this.theta) * 0.2;

    // this.r -= Math.random() * 0.8;
    this.r *= 0.96;
    this.alive = this.r > 0.5;

    this.r > 0 && this.makeBall();
  }
};




// // 画板操作
// $(function () {
//   let wrap = $(".self-header");
//   let canvas = document.querySelector(".self-header .generate-ball"),
//     ctx = canvas.getContext("2d");
//   let timer, flag = true;
//   console.log(ctx);

//   setSize();
//   $(window).resize(setSize);

//   function setSize() {
//     canvas.height = document.body.clientHeight;
//     canvas.width = document.body.clientWidth;
//   };

//   let balls = [];

//   // ctx.arc(100, 100, 10, 0, (1.3 * Math.PI), false);

//   let counter = 0;
//   wrap.on("click mousemove", (e) => {
//     flag = true;
//     // console.log(e.type);
//     let x = e.clientX,
//       y = e.clientY;

//     counter++;

//     if (counter % 5 == 0) {

//       for (let i = 0; i < 20; i++) {
//         balls.push(new Ball(ctx, x, y, randomNum(10, 20)));
//       }
//     }

//   });

//   // 鼠标离开
//   wrap.mouseleave((e) => {
//     flag = false;
//   });

//   // 定时器会一直执行，不断的判断flag是否为true，是则执行，否则返回
//   timer = setInterval(motionBall, 1000 / 60);

//   function motionBall() {
//     if (!flag) return;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     balls.forEach(function (item) {


//       requestAnimationFrame(function () {
//         item.boom();
//       });

//       if (balls.length >= 200) {
//         balls.shift();
//       }
//       // console.log(item);
//     });
//   }

// });

// class Ball {
//   constructor(ctx, x, y, radius) {
//     this.ctx = ctx;

//     this.x = x;
//     this.y = y;
//     this.r = radius;

//     this.speedX = randomNum(3, 8);
//     this.speedY = randomNum(3, 8);

//     this.dir = randomNum(0, 5);
//     if (this.dir == 1) {
//       this.speedX = -this.speedX;
//       this.speedY = -this.speedY;
//     } else if (this.dir == 2) {
//       this.speedX = this.speedX;
//       this.speedY = -this.speedY;
//     } else if (this.dir == 3) {
//       this.speedX = -this.speedX;
//       this.speedY = this.speedY;
//     } else {
//       this.speedX = this.speedX;
//       this.speedY = -this.speedY;
//     }

//     this.color = `rgba(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)}, ${Math.random()})`;
//   }

//   makeBall() {
//     let pencil = this.ctx;
//     pencil.beginPath();

//     pencil.fillStyle = this.color;
//     pencil.arc(this.x, this.y, this.r, 0, (Math.PI * 2));
//     pencil.fill();
//     pencil.closePath();
//   }

//   boom() {
//     this.x += this.speedX;
//     this.y += this.speedY;
//     this.r -= Math.random() * 0.8;

//     this.r > 0 && this.makeBall();
//   }
// };



// $(function () {

//   $(document.body).on("mousemove", (e) => {
//     let xI = e.clientX / (window.innerWidth / 2) - 1;
//     let yI = e.clientY / (window.innerHeight / 2) - 1;

//     $(".self-header .self-avatar").css({
//       "--perX": xI,
//       "--perY": yI
//     });
//   })

// });