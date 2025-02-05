// document.oncontextmenu = function () { //菜单不显示，不然右键按倒菜单夺笋那
//   return false;
//}


var time = 0
var mode = 0//是否为离子团模式
//mode = 1为小括号输入时的状态
//2为小括号输入合并到上一级的状态
var midMode = 0
//0没开启，1是输入时的状态
//2是中括号并入上一级的状态
var ionMode = 0
//0未开启，1是进入利子符号标识

function hideE() {
    document.querySelectorAll('.alkali-metal').forEach(function (element) { element.classList.add('a'); });
    document.querySelectorAll('.alkaline-earth-metal').forEach(function (element) { element.classList.add('a'); });
    document.querySelectorAll('.transition-metal').forEach(function (element) { element.classList.add('a'); });
    document.querySelectorAll('.post-transition-metal').forEach(function (element) { element.classList.add('a'); });
    document.querySelectorAll('.metalloid ').forEach(function (element) { element.classList.add('a'); });
    document.querySelectorAll('.nonmetal').forEach(function (element) { element.classList.add('a'); });
    document.querySelectorAll('.halogen').forEach(function (element) { element.classList.add('a'); });
    document.querySelectorAll('.noble-gas').forEach(function (element) { element.classList.add('a'); });
    document.querySelectorAll('.lanthanide ').forEach(function (element) { element.classList.add('a'); });
    document.querySelectorAll('.actinide').forEach(function (element) { element.classList.add('a'); });
    document.querySelectorAll('.alkali-metal').forEach(function (element) { element.classList.remove('b'); })
    document.querySelectorAll('.alkaline-earth-metal').forEach(function (element) { element.classList.remove('b'); })
    document.querySelectorAll('.transition-metal').forEach(function (element) { element.classList.remove('b'); })
    document.querySelectorAll('.post-transition-metal').forEach(function (element) { element.classList.remove('b'); })
    document.querySelectorAll('.metalloid ').forEach(function (element) { element.classList.remove('b'); })
    document.querySelectorAll('.nonmetal').forEach(function (element) { element.classList.remove('b'); })
    document.querySelectorAll('.halogen').forEach(function (element) { element.classList.remove('b'); })
    document.querySelectorAll('.noble-gas').forEach(function (element) { element.classList.remove('b'); })
    document.querySelectorAll('.lanthanide ').forEach(function (element) { element.classList.remove('b'); })
    document.querySelectorAll('.actinide').forEach(function (element) { element.classList.remove('b'); })
}
function showE() {
    document.querySelectorAll('.alkali-metal').forEach(function (element) { element.classList.add('b'); });
    document.querySelectorAll('.alkaline-earth-metal').forEach(function (element) { element.classList.add('b'); });
    document.querySelectorAll('.transition-metal').forEach(function (element) { element.classList.add('b'); });
    document.querySelectorAll('.post-transition-metal').forEach(function (element) { element.classList.add('b'); });
    document.querySelectorAll('.metalloid ').forEach(function (element) { element.classList.add('b'); });
    document.querySelectorAll('.nonmetal').forEach(function (element) { element.classList.add('b'); });
    document.querySelectorAll('.halogen').forEach(function (element) { element.classList.add('b'); });
    document.querySelectorAll('.noble-gas').forEach(function (element) { element.classList.add('b'); });
    document.querySelectorAll('.lanthanide ').forEach(function (element) { element.classList.add('b'); });
    document.querySelectorAll('.actinide').forEach(function (element) { element.classList.add('b'); });
    document.querySelectorAll('.alkali-metal').forEach(function (element) { element.classList.remove('a'); })
    document.querySelectorAll('.alkaline-earth-metal').forEach(function (element) { element.classList.remove('a'); })
    document.querySelectorAll('.transition-metal').forEach(function (element) { element.classList.remove('a'); })
    document.querySelectorAll('.post-transition-metal').forEach(function (element) { element.classList.remove('a'); })
    document.querySelectorAll('.metalloid ').forEach(function (element) { element.classList.remove('a'); })
    document.querySelectorAll('.nonmetal').forEach(function (element) { element.classList.remove('a'); })
    document.querySelectorAll('.halogen').forEach(function (element) { element.classList.remove('a'); })
    document.querySelectorAll('.noble-gas').forEach(function (element) { element.classList.remove('a'); })
    document.querySelectorAll('.lanthanide ').forEach(function (element) { element.classList.remove('a'); })
    document.querySelectorAll('.actinide').forEach(function (element) { element.classList.remove('a'); })
}

function showN() {
    document.querySelectorAll('.func').forEach(function (element) { element.classList.add('b'); });
    document.querySelectorAll('.func').forEach(function (element) { element.classList.remove('a'); })
}

function hideN() {
    document.querySelectorAll('.func').forEach(function (element) { element.classList.add('a'); });
    document.querySelectorAll('.func').forEach(function (element) { element.classList.remove('b'); })
}

function a(id) {
    if ((document.getElementById(id).classList.contains("b") || document.getElementById(id).classList.contains("favorite-item")) && !document.getElementById(id).classList.contains("ns")) {
        time++
        showN()
        var newSpan = document.createElement("span");
        newSpan.className = "elements"
        newSpan.textContent = id;
        var container = document.getElementById("end");
        container.appendChild(newSpan);
    }
}

function b(id) {
    show()
}


function p() {
    const elementsToHide = [
        document.getElementById('↑'),
        document.getElementById('↓'),
        document.getElementById('+'),
        document.getElementById('·')
    ];
    const numm = document.querySelector('.numm');
    let expandedDiv = document.querySelector('.expanded-div');

    if (numm) {
        numm.classList.toggle('rotated');
    }

    // 展开或折叠逻辑
    if (!isExpanded) {
        // 如果还没有展开，隐藏元素
        // 隐藏元素时添加 "hide" 动画
        elementsToHide.forEach(el => {
            el.classList.remove('show');
            el.classList.add('hide');
            setTimeout(() => el.style.display = 'none', 300); // 等待动画完成后隐藏
        });

        // 插入新的 div
        if (!expandedDiv) {
            expandedDiv = document.createElement('div');
            expandedDiv.className = 'expanded-div';
            expandedDiv.innerHTML = '';
            document.querySelector('.periodic-table').appendChild(expandedDiv);
        }
        expandedDiv.style.display = 'block';
        isExpanded = true;
    } else {
        // 如果已经展开，则恢复原状
        // 显示元素时添加 "show" 动画
        elementsToHide.forEach(el => {
            el.style.display = 'flex';
            el.classList.remove('hide');
            el.classList.add('show');
        });

        // 隐藏新的 div
        if (expandedDiv) {
            expandedDiv.className = 'expanded-divh';
            setTimeout(() => {
                expandedDiv.style.display = 'none'; // 延迟设置为 'none'，以便完成动画
            }, 300);
        }

        isExpanded = false;
    }
}

function np() {
    if (document.querySelector('.expanded-containerma').classList.contains('show')) {
        document.querySelector('.expanded-containerma').classList.remove('show');
        document.querySelector('.expanded-containerma').classList.add('hide');
        document.querySelector('.expanded-containermb').classList.remove('hide');
        document.querySelector('.expanded-containermb').classList.add('show');
    } else {
        document.querySelector('.expanded-containerma').classList.remove('hide');
        document.querySelector('.expanded-containerma').classList.add('show');
        document.querySelector('.expanded-containermb').classList.remove('show');
        document.querySelector('.expanded-containermb').classList.add('hide');
    }
}

function n() {
    if (document.querySelector('.expanded-containerna').classList.contains('show')) {
        document.querySelector('.expanded-containerna').classList.remove('show');
        document.querySelector('.expanded-containerna').classList.add('hide');
        document.querySelector('.expanded-containernb').classList.remove('hide');
        document.querySelector('.expanded-containernb').classList.add('show');
    } else {
        document.querySelector('.expanded-containerna').classList.remove('hide');
        document.querySelector('.expanded-containerna').classList.add('show');
        document.querySelector('.expanded-containernb').classList.remove('show');
        document.querySelector('.expanded-containernb').classList.add('hide');
    }
}

// 定义一个黑名单，包含不允许匹配的 class
var blacklist = ['alkali-metal', 'alkaline-earth-metal', 'transition-metal', 'post-transition-metal', 'metalloid', 'nonmetal', 'halogen', 'noble-gas', 'lanthanide', 'actinide', 'func', 'funcs', 'element', 'a', 'b', 's', 'ns', 'star'];

// 获取搜索框和所有带有 'element' 的元素
var searchInput = document.getElementById('search');
var elements = document.querySelectorAll('.element');

// 监听输入框的实时输入事件
searchInput.addEventListener('input', function () {
    var searchText = searchInput.value.toLowerCase(); // 获取输入内容并转换为小写

    // 遍历所有 class 为 'element' 的元素
    elements.forEach(function (element) {
        var classList = element.className.toLowerCase().split(' '); // 获取所有 class 并分成数组
        var elementId = element.id.toLowerCase(); // 获取元素的 id

        // 判断是否匹配 class 或 id，并且不在黑名单中
        var matchesClass = classList.some(function (cls) {
            return cls.startsWith(searchText) && !blacklist.includes(cls); // 匹配 class
        });
        var matchesId = elementId.startsWith(searchText) && !blacklist.includes(elementId); // 匹配 id

        // 如果 class 或 id 匹配且不在黑名单中，添加 's' class
        if (searchText == "") {
            element.classList.remove('ns');
            element.classList.remove('s');
        } else {
            if ((matchesClass || matchesId) && searchText !== '') {
                element.classList.add('s');
                element.classList.remove('ns');
            } else {
                // 否则移除 's' class
                element.classList.add('ns');
                element.classList.remove('s');
            }
        }

    });
});


// 收藏夹功能

const items = document.querySelectorAll('.alkali-metal, .alkaline-earth-metal, .transition-metal, .post-transition-metal, .metalloid, .nonmetal, .noble-gas, .lanthanide, .actinide, .halogen');
const favoriteContainer = document.getElementById('favorites');

// 禁用浏览器默认右键菜单

items.forEach(item => {
    item.addEventListener('contextmenu', (event) => {
        if (item.classList.contains('ns')) {

        } else {
            // 创建外层 div 用来包裹克隆的 item 和删除按钮
            const favoriteWrapper = document.createElement('div');
            favoriteWrapper.className = 'favorite-wrapper';

            // 克隆元素
            const clonedItem = item.cloneNode(true);
            clonedItem.querySelectorAll('*').forEach(function (child) {
                if (!(child.tagName === 'DIV' || child.tagName === 'H2')) {
                    child.remove(); // 删除不需要的子元素
                }
            });

            // 修改 class 名
            clonedItem.className = 'favorite-item';

            // 添加删除按钮
            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = '×';
            deleteBtn.className = 'delete-btn';

            // 点击删除按钮从收藏夹移除
            deleteBtn.addEventListener('click', () => {
                favoriteContainer.removeChild(favoriteWrapper);
            });

            // 将克隆的 item 和删除按钮加入到 favoriteWrapper 中
            favoriteWrapper.appendChild(clonedItem);
            favoriteWrapper.appendChild(deleteBtn);

            // 将 favoriteWrapper 添加到收藏栏
            favoriteContainer.appendChild(favoriteWrapper);
        }
    });
});

function s() {
    if (!document.getElementById("end").textContent == "") {
        // 创建外层 div 用来包裹克隆的 item 和删除按钮
        const favoriteWrapper = document.createElement('div');
        favoriteWrapper.className = 'favorite-wrapper';

        // 克隆元素
        const clonedItem = document.createElement('div')
        const clonedItemI = document.createElement('h2')
        clonedItemI.textContent = document.getElementById("end").textContent;

        // 修改 class 名
        clonedItem.className = 'favorite-item';
        clonedItem.setAttribute('onclick', 'a(this.id)')
        clonedItem.setAttribute('id', document.getElementById("end").textContent)

        // 添加删除按钮
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = '×';
        deleteBtn.className = 'delete-btn';

        // 点击删除按钮从收藏夹移除
        deleteBtn.addEventListener('click', () => {
            favoriteContainer.removeChild(favoriteWrapper);
        });

        clonedItem.appendChild(clonedItemI);
        favoriteWrapper.appendChild(clonedItem);
        favoriteWrapper.appendChild(deleteBtn);
        favoriteContainer.appendChild(favoriteWrapper);
    }
}