document.addEventListener('DOMContentLoaded', () => {
    // 获取背景容器
    const background = document.createElement('div');
    background.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -1;
      background-image: url("../img/b.png");
      background-size: 110% auto;
      background-position: center;
      transition: transform 0.3s ease-out;
    `;
    document.body.prepend(background);
  
    // 鼠标移动效果
    let mouseX = 0, mouseY = 0;
    const sensitivity = 0.03; // 灵敏度调节
  
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - window.innerWidth/2) * sensitivity;
      mouseY = (e.clientY - window.innerHeight/2) * sensitivity;
      updateBackground();
    });

  
    // 更新背景位置
    function updateBackground() {
      const totalX = mouseX;
      const totalY = mouseY;
      background.style.transform = `
        translate(${totalX}px, ${totalY}px)
        scale(1.05)
      `;
    }
  
    // 初始化重置
    window.addEventListener('resize', () => {
      background.style.backgroundSize = '105% auto';
    });
  });