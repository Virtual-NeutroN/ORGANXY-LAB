document.addEventListener('DOMContentLoaded', () => {
    // 主题切换功能
    const themeToggle = document.createElement('div');
    themeToggle.id = 'themeToggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        cursor: pointer;
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: 
            transform 0.3s ease,
            background-color 0.5s ease,
            box-shadow 0.5s ease;
    `;
    document.body.appendChild(themeToggle);

    // 主题切换功能
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        // 添加临时类以启用过渡
        document.body.classList.add('theme-transition');

        setTimeout(() => {
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);

            // 移除临时类
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 500);
        }, 10);
    });

    // 更新主题图标
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-moon';
            themeToggle.style.background = 'rgba(40, 40, 40, 0.85)';
        } else {
            icon.className = 'fas fa-sun';
            themeToggle.style.background = 'rgba(255, 255, 255, 0.7)';
        }
    }

    // 初始化主题
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // 添加临时类以启用初始过渡
    document.body.classList.add('theme-transition');
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 500);

    // 获取背景容器并设置初始样式
    const savedBg = localStorage.getItem('background');
    console.log(localStorage.getItem('background'))

    const background = document.createElement('div');
    if (savedBg == null) {
        savedBg = 'url(/img/b.png)';
    }
    background.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -2;
      background-image: ${savedBg};
      background-size: 100% auto;
      background-position: center;
      transition: transform 0.3s ease-out;
    `;
    document.body.prepend(background);

    // 鼠标移动效果
    let mouseX = 0, mouseY = 0;
    var sensitivity = 0.02; // 灵敏度调节
    var bgscale = 1.03;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * sensitivity;
        mouseY = (e.clientY - window.innerHeight / 2) * sensitivity;
        updateBackground();
    });

    // 更新背景位置
    function updateBackground() {
        const totalX = mouseX;
        const totalY = mouseY;
        background.style.transform = `
            translate(${totalX}px, ${totalY}px)
            scale(${bgscale})
        `;
    }

    // 初始化重置
    window.addEventListener('resize', () => {
        background.style.backgroundSize = '102% auto';
    });

    // 侧边栏点击事件
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            // 移除所有激活状态
            sidebarItems.forEach(i => i.classList.remove('active'));
            // 添加当前激活状态
            item.classList.add('active');

            const target = item.getAttribute('data-target');
            // 隐藏所有内容块
            document.querySelectorAll('.content-block').forEach(block => {
                block.style.display = 'none';
            });
            // 显示目标内容块
            document.getElementById(target).style.display = 'block';
            unlockContent()
        });
    });

    // 初始化设置首页为激活状态
    document.querySelector('.sidebar-item[data-target="home"]').classList.add('active');

    // 监听灵敏度调节条的变化
    const sensitivitySlider = document.getElementById('sensitivity-slider');
    sensitivitySlider.addEventListener('input', () => {
        sensitivity = parseFloat(sensitivitySlider.value);
    });

    // 监听缩放比例调节条的变化
    const scaleSlider = document.getElementById('scale-slider');
    scaleSlider.addEventListener('input', () => {
        bgscale = parseFloat(scaleSlider.value);
    });


    // 在index.js中添加
    // 壁纸切换功能
    const bgToggle = document.getElementById('bgToggle');
    const bgSelector = document.getElementById('bgSelector');
    const bgOptions = document.querySelectorAll('.bg-option');


    // 切换壁纸选择面板显示/隐藏
    bgToggle.addEventListener('click', () => {
        bgSelector.classList.toggle('show');
    });

    // 选择壁纸
    bgOptions.forEach(option => {
        option.addEventListener('click', () => {
            const bgValue = option.getAttribute('data-bg');
            document.body.firstElementChild.style.backgroundImage = bgValue;

            // 保存到本地存储
            localStorage.setItem('background', bgValue);

            // 关闭选择面板
            bgSelector.classList.remove('show');
        });
    });


});

var clickSI = 0
function unlockContent() {
    if (clickSI >= 5) {
        document.getElementById('click-block').style.display = 'block';
    }
    clickSI++
}




// 展开人员
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

var click = 0;
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
    } else if (input == "") {
        // 不给发空格
        response = "不许发空白！";

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


// 彩蛋弹窗
function popup() {
    click++;
    if (click == 1 || click == 2) {
        var blurA = document.getElementById("blurA"); // 根据id获取元素
        blurA.classList.toggle("eactive"); // 切换指定id对应的class
        var blurB = document.getElementById("blurB"); // 根据id获取元素
        blurB.classList.toggle("eactive"); // 切换指定id对应的class
        var popup = document.getElementById("popup"); // 同上
        popup.classList.toggle("eactive"); // 同上
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
        respond();
    }
}