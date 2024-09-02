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

    //彩蛋弹窗
    function popup() {
        
        click++
        if (click == 1 || click ==2) {
        var blur = document.getElementById("blur"); // 根据id获取元素
        blur.classList.toggle("active"); // 切换指定id对应的class
        var popup = document.getElementById("popup"); // 同上
        popup.classList.toggle("active"); // 同上
        }

        if (click == 2) {
            var chat = document.querySelector('.chat');
            var button = document.querySelector('.cta-btn');
            // 扩展按钮，确保 chat 元素有位置
            button.classList.add('expanded');
    
            // 显示 chat 元素
            chat.classList.add('show');
            button.textContent = '发送🚀'
        }

    }