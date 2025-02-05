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
      background-image: url("./img/b.png");
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

//展开人员
document.addEventListener('DOMContentLoaded', function () {
    const toggleIcon = document.getElementById('toggle-icon');
    const membersContainer = document.getElementById('members-container');

    toggleIcon.addEventListener('click', function () {
        membersContainer.classList.toggle('expanded');
        toggleIcon.classList.toggle('expanded');
        if (membersContainer.classList.contains('expanded')) {
            toggleIcon.innerHTML = '&#x25B2;'; // 向上三角形
        } else {
            toggleIcon.innerHTML = '&#x25BC;'; // 向下三角形
        }
    });
});

var click = 0


function respond() {
    var input = document.getElementById("userInput").value;
    var messagesDiv = document.getElementById("messages");

    // 分类回复
    var response = '';

    if (/为什么(.*)/.test(input)) {
        // 如果句子是“为什么xx”，回答“是因为xx”
        response = input.replace(/为什么/, "是因为");
    } else if (/是什么|是啥|是.*吗/.test(input)) {
        // 如果句子是“xx是什么/是啥/是yy吗？”，回答“xx是xx/xx是yy”
        response = input.replace(/是什么|是啥/, "是" + input.split('是')[0])
            .replace(/是(.*)吗/, "是" + input.match(/是(.*)吗/)[1]);
    } else if (/你|这|哪/.test(input) || /吗\?|？$/.test(input)) {
        // 疑问句改成陈述句，并处理“你”改“我”，“这”改“那”，“哪”改“那”
        response = input.replace(/你/g, "我")
            .replace(/这/g, "那")
            .replace(/哪/g, "那")
            .replace(/吗\?|？$/, "。");
    } else if (/要不要|还是|什么|是不是|或者/.test(input)) {
        // 选择疑问句，包含“要不要/还是/什么/是不是/或者”，回复“你自己决定。”
        response = "你自己决定。";
    } else if (/不|没/.test(input)) {
        // 否定句回复“抱歉”
        response = "抱歉。";
    } else {
        // 陈述句随机表示“赞同”
        var agreeResponses = ["我也是这么觉得的。", "确实如此。", "我完全同意。"];
        response = agreeResponses[Math.floor(Math.random() * agreeResponses.length)];
    }

    // 显示用户输入
    var userMessage = document.createElement("p");
    userMessage.textContent = "你: " + input;
    messagesDiv.appendChild(userMessage);

    // 显示机器人的回复
    var botMessage = document.createElement("p");
    botMessage.textContent = "小烯: " + response;
    messagesDiv.appendChild(botMessage);

    // 清空输入框
    document.getElementById("userInput").value = "";

    // 自动滚动到底部
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}


//彩蛋弹窗
function popup() {

    click++
    if (click == 1 || click == 2) {
        var blurA = document.getElementById("blurA"); // 根据id获取元素
        blurA.classList.toggle("active"); // 切换指定id对应的class
        var blurB = document.getElementById("blurB"); // 根据id获取元素
        blurB.classList.toggle("active"); // 切换指定id对应的class
        var popup = document.getElementById("popup"); // 同上
        popup.classList.toggle("active"); // 同上
    }

    if (click == 2) {
        var chat = document.querySelector('.chat');
        var button = document.querySelector('.cta-btn');
        var messages = document.querySelector('.messages');
        // 扩展按钮，确保 chat 元素有位置
        button.classList.add('expanded');

        // 显示 chat 元素
        chat.classList.add('show');
        messages.classList.add('show');
        button.textContent = '发送🚀'
    } else if (click >= 3) {
        respond()
    }

}

