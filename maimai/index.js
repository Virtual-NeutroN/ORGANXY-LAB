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



document.addEventListener("DOMContentLoaded", function () {
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

async function ratUpdateSongOptions() {
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
async function accUpdateSongOptions() {
    const input = document.getElementById('songs-input').value.trim().toLowerCase(); // 转为小写
    const select = document.getElementById('acc-song-select');
    select.innerHTML = '<option value="">选择歌曲</option>'; // 清空下拉列表

    if (input) {
        const data = await fetchData();

        data.forEach(item => {
            if (item.title.toLowerCase().includes(input)) { // 转为小写进行匹配
                const title = item.title;
                const levels = item.ds;
                const types = item.type;

                const option = document.createElement('option');
                option.value = title;
                option.textContent = `[${types}] ${title}`;
                select.appendChild(option);
            }
        });
    }
}

document.getElementById('difficulty').addEventListener('input', ratUpdateSongOptions);
document.getElementById('songs-input').addEventListener('input', accUpdateSongOptions);

document.getElementById('song-select').addEventListener('change', function () {
    const selectedValue = this.value;
    document.getElementById('difficulty').value = selectedValue; // 填入输入框
});
document.getElementById('acc-song-select').addEventListener('change', function () {
    const selectedValue = this.value;
    document.getElementById('songs-input').value = selectedValue;
});

async function updateLevels() {
    const data = await fetchData();
    const selectedTitle = document.getElementById('songs-input').value
    const levelSelect = document.getElementById('acc-level-select');
    levelSelect.innerHTML = '<option value="">选择难度</option>';

    const songs = data
    const song = songs.find(s => s.title === selectedTitle);
    if (song) {
        song.level.forEach(level => {
            const option = document.createElement('option');
            option.value = level;
            option.textContent = level;
            levelSelect.appendChild(option);
        });
    }
}

// Rating因子表格，根据达成率区间对应的因子
const ratingFactorsTable = [
    { minAccuracy: 100.5, factor: 0.224, rank: 'SSS<sup>+</sup>' },
    { minAccuracy: 100.4999, factor: 0.222, rank: 'SSS<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 100, factor: 0.216, rank: 'SSS<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 99.9999, factor: 0.214, rank: 'SS<sup>+</sup>' },
    { minAccuracy: 99.5, factor: 0.211, rank: 'SS<sup>+</sup>' },
    { minAccuracy: 99, factor: 0.208, rank: 'SS<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 98.9999, factor: 0.206, rank: 'S<sup>+</sup>' },
    { minAccuracy: 98, factor: 0.203, rank: 'S<sup>+</sup>' },
    { minAccuracy: 97, factor: 0.2, rank: 'S<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 96.9999, factor: 0.176, rank: 'AAA<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 94, factor: 0.168, rank: 'AAA<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 90, factor: 0.152, rank: 'AA<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 80, factor: 0.136, rank: 'A<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 79.9999, factor: 0.128, rank: 'BBB<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 75, factor: 0.12, rank: 'BBB<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 70, factor: 0.112, rank: 'BB<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 60, factor: 0.096, rank: 'B<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 50, factor: 0.08, rank: 'C<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 40, factor: 0.064, rank: 'D<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 30, factor: 0.048, rank: 'D<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 20, factor: 0.032, rank: 'D<sup style="visibility: hidden;">+</sup>' },
    { minAccuracy: 10, factor: 0.016, rank: 'D<sup style="visibility: hidden;">+</sup>' }
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

function rating() {
    const difficulty = parseFloat(document.getElementById('difficulty').value.trim());
    const accuracy = parseFloat(document.getElementById('accuracy').value.trim());

    if (!isNaN(difficulty) && !isNaN(accuracy) && accuracy >= 0 && accuracy <= 101) {
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
        } else {
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

document.getElementById('download').addEventListener('click', function () {
    html2canvas(document.getElementById('ratingCard'), { scale: 3 }).then(function (canvas) {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'ratingCard.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});

//计算铺面信息
async function getNotes() {
    let songs = [];
    const data = await fetchData();
    songs = data
    const resultBody = document.getElementById('resultBody');
    const resultTable = document.getElementById('resultTable');
    const infoBody = document.getElementById('infoBody');
    const infoTable = document.getElementById('infoTable');
    const deduction = document.getElementById('deduction')
    const selectedTitle = document.getElementById('songs-input').value;
    const selectedLevel = document.getElementById('acc-level-select').value;
    const song = songs.find(s => s.title === selectedTitle);
    console.log(song.charts)
    if (song) {
        const levelIndex = song.level.indexOf(selectedLevel);
        if (song.level) {
            const notes = song.charts[levelIndex].notes;
            // 清空之前的结果
            resultBody.innerHTML = '';
            // 创建新行 
            const row = document.createElement('tr');
            if (song.type == 'SD') {
                if (notes.length == 4) {
                    notes.splice(3, 0, 0)
                }
                console.log(notes)
                row.innerHTML = ` <td>${song.title}</td> <td>${selectedLevel}</td> <td>${song.type}</td> <td>${notes[0]}</td> <td>${notes[1]}</td> <td>${notes[2]}</td> <td>/</td> <td>${notes[4]}</td>`;
            } else {
                row.innerHTML = ` <td>${song.title}</td> <td>${selectedLevel}</td> <td>${song.type}</td> <td>${notes[0]}</td> <td>${notes[1]}</td> <td>${notes[2]}</td> <td>${notes[3]}</td> <td>${notes[4]}</td> `;
            }
            resultBody.appendChild(row);
            resultTable.style.display = 'table';
            // 显示表格
            infoBody.innerHTML = '';
            // 创建新行 
            var tscore = 0
            var irow = [0, 1, 2, 3, 4]
            var keytype = ['tap', 'hold', 'slide', 'touch', 'break', 'addition']
            var keyscore = [500, 500, 500, 400, 400, 400, 250, 0]
            var brescore = [2500, 2500, 2500, 2000, 1500, 1250, 1000, 0]
            var mulscore = [1, 2, 3, 1, 5,]
            var addscore = [100, 75, 50, 40, 40, 40, 30, 0]
            for (let i = 0; i < 5; i++) {
                tscore = tscore + (notes[i] * mulscore[i] * 500)
            }
            for (let i = 0; i < 6; i++) {
                irow[i] = document.createElement('tr');
                irow[i].innerHTML = `<td>${keytype[i]}</td>`
                for (let j = 0; j < 8; j++) {
                    if (notes[i] == 0) {
                        irow[i].innerHTML = irow[i].innerHTML + `<td>/</td>`
                    } else {
                        if (song.type == 'SD' && i == 3) {
                            irow[i].innerHTML = irow[i].innerHTML + `<td>/</td>`
                        } else if (i == 4) { //绝赞
                            if (deduction.checked == true) {
                                irow[i].innerHTML = irow[i].innerHTML + `<td>${((((2500 / tscore) - (brescore[j] / tscore)) * 100) + (100 / (notes[4] * 100)) - (addscore[j] / (notes[4] * 100))).toFixed(4)}%</td>`
                            } else {
                                irow[i].innerHTML = irow[i].innerHTML + `<td>${(((brescore[j] / tscore) * 100) + (addscore[j] / (notes[4] * 100))).toFixed(4)}%</td>`
                            }
                        }
                        else if (i == 5) { //附加分计算
                            if (deduction.checked == true) {
                                irow[i].innerHTML = irow[i].innerHTML + `<td>${((100 / (notes[4] * 100)) - (addscore[j] / (notes[4] * 100))).toFixed(4)}%</td>`
                            } else {
                                irow[i].innerHTML = irow[i].innerHTML + `<td>${((addscore[j] / (notes[4] * 100))).toFixed(4)}%</td>`
                            }
                        } else {
                            if (deduction.checked == true) {
                                irow[i].innerHTML = irow[i].innerHTML + `<td>${((((500 * mulscore[i]) / tscore) - (keyscore[j] * mulscore[i] / tscore)) * 100).toFixed(4)}%</td>`
                            } else {
                                irow[i].innerHTML = irow[i].innerHTML + `<td>${((keyscore[j] * mulscore[i] / tscore) * 100).toFixed(4)}%</td>`
                            }
                        }
                    }
                }
                infoBody.appendChild(irow[i]);
            }
            infoTable.style.display = 'table';
        } else {
            alert('未找到对应的难度。');
        }
    }
    else {
        alert('未找到对应的歌曲。');
    }


};

