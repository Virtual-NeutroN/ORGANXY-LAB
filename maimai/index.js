function adjustScale() {
    const designWidth = 1640;
    // 获取当前窗口的宽度
    const windowWidth = window.innerWidth;
    // 计算缩放比例
    const scale = windowWidth / designWidth;

    // 设置body的缩放比例
    document.body.style.transform = `scale(${scale})`;
    // 设置缩放后中心对齐
    document.body.style.transformOrigin = '0 0';
    // 修复缩放后可能出现的溢出滚动条
    document.body.style.width = `${designWidth}px`;
}

// 页面加载时调用调整函数
window.addEventListener('load', adjustScale);
// 窗口大小改变时也调用调整函数
window.addEventListener('resize', adjustScale);



document.addEventListener("DOMContentLoaded", function() {
    toggleDiv('rating', document.querySelector('.query-btn'));
});



function toggleDiv(divId, btn) {
    // 隐藏所有内容
    const contents = document.querySelectorAll('.query-content');
    contents.forEach(content => {
        content.classList.add('hidden');
    });

    // 移除所有按钮的active类
    const buttons = document.querySelectorAll('.query-btn');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // 显示当前点击的内容
    const currentContent = document.getElementById(divId);
    if (currentContent) {
        currentContent.classList.remove('hidden');
        btn.classList.add('active'); // 添加active类
    }
}

async function fetchData() {
    try {
        const response = await fetch('maiinfo.json');
        const data = await response.json();
        return data; // 返回获取的数据
    } catch (error) {
        console.error('获取数据时出错:', error);
        return [];
    }
}

async function updateSongOptions() {
    const input = document.getElementById('difficulty').value.trim().toLowerCase(); // 转为小写
    const select = document.getElementById('song-select');
    select.innerHTML = '<option value="">选择歌曲</option>'; // 清空下拉列表

    if (input) {
        const data = await fetchData();
        const difficultyLabels = ['bas', 'adv', 'exp', 'mas', 'rem'];

        data.forEach(item => {
            if (item.title.toLowerCase().includes(input)) { // 转为小写进行匹配
                const title = item.title;
                const levels = item.ds;
                const types = item.type;

                levels.forEach((ds, index) => {
                    const option = document.createElement('option');
                    option.value = ds; 
                    option.textContent = `[${types}] ${title} || 定数:${ds} (${difficultyLabels[index]})`;
                    select.appendChild(option);
                });
            }
        });
    }
}

document.getElementById('difficulty').addEventListener('input', updateSongOptions);

document.getElementById('song-select').addEventListener('change', function() {
    const selectedValue = this.value;
    document.getElementById('difficulty').value = selectedValue; // 填入输入框
});

// Rating因子表格，根据达成率区间对应的因子
const ratingFactorsTable = [
    { minAccuracy: 100.5, factor: 0.224, rank :'SSS<sup>+</sup>' },
    { minAccuracy: 100.4999, factor: 0.222, rank :'SSS<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 100, factor: 0.216, rank :'SSS<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 99.9999, factor: 0.214, rank :'SS<sup>+</sup>' },
    { minAccuracy: 99.5, factor: 0.211, rank :'SS<sup>+</sup>' },
    { minAccuracy: 99, factor: 0.208, rank :'SS<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 98.9999, factor: 0.206, rank :'S<sup>+</sup>' },
    { minAccuracy: 98, factor: 0.203, rank :'S<sup>+</sup>' },
    { minAccuracy: 97, factor: 0.2, rank :'S<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 96.9999, factor: 0.176, rank :'AAA<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 94, factor: 0.168, rank :'AAA<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 90, factor: 0.152, rank :'AA<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 80, factor: 0.136, rank :'A<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 79.9999, factor: 0.128, rank :'BBB<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 75, factor: 0.12, rank :'BBB<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 70, factor: 0.112, rank :'BB<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 60, factor: 0.096, rank :'B<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 50, factor: 0.08, rank :'C<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 40, factor: 0.064, rank :'D<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 30, factor: 0.048, rank :'D<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 20, factor: 0.032, rank :'D<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 10, factor: 0.016, rank :'D<sup style="visibility: hidden;">+</sup>' }
];

// 根据达成率获取对应的因子
function getRatingFactor(accuracy) {
    for (const entry of ratingFactorsTable) {
        if (accuracy >= entry.minAccuracy) {
            return entry.factor;
        }
    }
    return 0; // 如果达成率低于最低值，返回0
}

// 根据达成率获取评级
function getRank(accuracy) {
    for (const entry of ratingFactorsTable) {
        if (accuracy >= entry.minAccuracy) {
            return entry.rank;
        }
    }
    return 'D<sup style="visibility: hidden;">+</sup>'; // 如果达成率低于最低值，返回D
}

function rating () {
    const difficulty = parseFloat(document.getElementById('difficulty').value.trim());
    const accuracy = parseFloat(document.getElementById('accuracy').value.trim());

    if (!isNaN(difficulty) && !isNaN(accuracy) && accuracy >= 0 && accuracy <= 101 ) {
        const ratingFactor = getRatingFactor(accuracy);
        const rank = getRank(accuracy);
        if (accuracy <= 100.5) {
            const rating = difficulty * accuracy * ratingFactor;
            document.querySelector('.rating-score').textContent = `${Math.floor(rating)}`;
            document.querySelector('.rank-score').innerHTML = `${rank}`;
            document.querySelector('.dif').textContent = `Lv. ${difficulty}`;
            document.querySelector('.acc').textContent = `${accuracy}`;
            document.querySelector('.raf').textContent = `${ratingFactor}`;
            document.querySelector('.rat').textContent = `${rating.toFixed(4)}`;
        }else {
            const rating = difficulty * 100.5 * ratingFactor;
            document.querySelector('.rating-score').textContent = `${Math.floor(rating)}`;
            document.querySelector('.rank-score').innerHTML = `${rank}`;
            document.querySelector('.dif').textContent = `Lv. ${difficulty}`;
            document.querySelector('.acc').textContent = `${accuracy}`;
            document.querySelector('.raf').textContent = `${ratingFactor}`;
            document.querySelector('.rat').textContent = `${rating.toFixed(4)}`;
        }
    } else {
        document.querySelector('.rating-score').textContent = `Err`;
        document.querySelector('.rank-score').innerHTML = `Err<sup style="visibility: hidden;">+</sup>`;
        document.querySelector('.dif').textContent = `请正确输入`;
        document.querySelector('.acc').textContent = `请正确输入`;
        document.querySelector('.raf').textContent = `---`;
        document.querySelector('.rat').textContent = `---/----`;
    }
};

document.getElementById('download').addEventListener('click', function() {
    html2canvas(document.getElementById('ratingCard'), { scale: 3 }).then(function(canvas) {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'ratingCard.png'; 
        document.body.appendChild(link);
        link.click(); 
        document.body.removeChild(link); 
    });
});