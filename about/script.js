// 使用 FullPage.js 或自定义代码来实现滚动切换
document.addEventListener("wheel", function(event) {
    if (event.deltaY > 0) {
      // 向下滚动，显示下一个部分
      movePage('down');
    } else {
      // 向上滚动，显示上一个部分
      movePage('up');
    }
  });
  
  function movePage(direction) {
    const pages = document.querySelectorAll('.page');
    let currentPageIndex = Array.from(pages).findIndex(page => page.classList.contains('active'));
    
    if (direction === 'down' && currentPageIndex < pages.length - 1) {
      pages[currentPageIndex].classList.remove('active');
      pages[currentPageIndex + 1].classList.add('active');
    }
    if (direction === 'up' && currentPageIndex > 0) {
      pages[currentPageIndex].classList.remove('active');
      pages[currentPageIndex - 1].classList.add('active');
    }
  }
  