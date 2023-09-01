var time = 0
var mode = 0//是否为离子团模式

var origin = "none"
var replace = "none"


function hide() {
    document.getElementById("H").className = "a";
    document.getElementById("He").className = "a";
    document.getElementById("Li").className = "a";
    document.getElementById("Be").className = "a";
    document.getElementById("B").className = "a";
    document.getElementById("C").className = "a";
    document.getElementById("N").className = "a";
    document.getElementById("O").className = "a";
    document.getElementById("F").className = "a";
    document.getElementById("Ne").className = "a";
    document.getElementById("Na").className = "a";
    document.getElementById("Mg").className = "a";
    document.getElementById("Al").className = "a";
    document.getElementById("Si").className = "a";
    document.getElementById("P").className = "a";
    document.getElementById("S").className = "a";
    document.getElementById("Cl").className = "a";
    document.getElementById("Ar").className = "a";
    document.getElementById("K").className = "a";
    document.getElementById("Ca").className = "a";
    document.getElementById("Sc").className = "a";
    document.getElementById("Ti").className = "a";
    document.getElementById("V").className = "a";
    document.getElementById("Cr").className = "a";
    document.getElementById("Mn").className = "a";
    document.getElementById("Fe").className = "a";
    document.getElementById("Co").className = "a";
    document.getElementById("Ni").className = "a";
    document.getElementById("Cu").className = "a";
    document.getElementById("Zn").className = "a";
    document.getElementById("Ga").className = "a";
    document.getElementById("Ge").className = "a";
    document.getElementById("As").className = "a";
    document.getElementById("Se").className = "a";
    document.getElementById("Br").className = "a";
    document.getElementById("Kr").className = "a";
    document.getElementById("Rb").className = "a";
    document.getElementById("Sr").className = "a";
    document.getElementById("Y").className = "a";
    document.getElementById("Zr").className = "a";
    document.getElementById("Nb").className = "a";
    document.getElementById("Mo").className = "a";
    document.getElementById("Tc").className = "a";
    document.getElementById("Ru").className = "a";
    document.getElementById("Rh").className = "a";
    document.getElementById("Pd").className = "a";
    document.getElementById("Ag").className = "a";
    document.getElementById("Cd").className = "a";
    document.getElementById("In").className = "a";
    document.getElementById("Sn").className = "a";
    document.getElementById("Sb").className = "a";
    document.getElementById("Te").className = "a";
    document.getElementById("I").className = "a";
    document.getElementById("Xe").className = "a";
    document.getElementById("Cs").className = "a";
    document.getElementById("Ba").className = "a";
    document.getElementById("Lu").className = "a";
    document.getElementById("Hf").className = "a";
    document.getElementById("Ta").className = "a";
    document.getElementById("W").className = "a";
    document.getElementById("Re").className = "a";
    document.getElementById("Os").className = "a";
    document.getElementById("Ir").className = "a";
    document.getElementById("Pt").className = "a";
    document.getElementById("Au").className = "a";
    document.getElementById("Hg").className = "a";
    document.getElementById("Tl").className = "a";
    document.getElementById("Pb").className = "a";
    document.getElementById("Bi").className = "a";
    document.getElementById("Po").className = "a";
    document.getElementById("At").className = "a";
    document.getElementById("Rn").className = "a";
    document.getElementById("Fr").className = "a";
    document.getElementById("Ra").className = "a";
    document.getElementById("Lr").className = "a";
    document.getElementById("Rf").className = "a";
    document.getElementById("Db").className = "a";
    document.getElementById("Sg").className = "a";
    document.getElementById("Bh").className = "a";
    document.getElementById("Hs").className = "a";
    document.getElementById("Mt").className = "a";
    document.getElementById("Ds").className = "a";
    document.getElementById("Rg").className = "a";
    document.getElementById("Cn").className = "a";
    document.getElementById("Nh").className = "a";
    document.getElementById("Fl").className = "a";
    document.getElementById("Mc").className = "a";
    document.getElementById("Lv").className = "a";
    document.getElementById("Ts").className = "a";
    document.getElementById("Og").className = "a";
}

function show() {
    document.getElementById("H").className = "b";
    document.getElementById("He").className = "b";
    document.getElementById("Li").className = "b";
    document.getElementById("Be").className = "b";
    document.getElementById("B").className = "b";
    document.getElementById("C").className = "b";
    document.getElementById("N").className = "b";
    document.getElementById("O").className = "b";
    document.getElementById("F").className = "b";
    document.getElementById("Ne").className = "b";
    document.getElementById("Na").className = "b";
    document.getElementById("Mg").className = "b";
    document.getElementById("Al").className = "b";
    document.getElementById("Si").className = "b";
    document.getElementById("P").className = "b";
    document.getElementById("S").className = "b";
    document.getElementById("Cl").className = "b";
    document.getElementById("Ar").className = "b";
    document.getElementById("K").className = "b";
    document.getElementById("Ca").className = "b";
    document.getElementById("Sc").className = "b";
    document.getElementById("Ti").className = "b";
    document.getElementById("V").className = "b";
    document.getElementById("Cr").className = "b";
    document.getElementById("Mn").className = "b";
    document.getElementById("Fe").className = "b";
    document.getElementById("Co").className = "b";
    document.getElementById("Ni").className = "b";
    document.getElementById("Cu").className = "b";
    document.getElementById("Zn").className = "b";
    document.getElementById("Ga").className = "b";
    document.getElementById("Ge").className = "b";
    document.getElementById("As").className = "b";
    document.getElementById("Se").className = "b";
    document.getElementById("Br").className = "b";
    document.getElementById("Kr").className = "b";
    document.getElementById("Rb").className = "b";
    document.getElementById("Sr").className = "b";
    document.getElementById("Y").className = "b";
    document.getElementById("Zr").className = "b";
    document.getElementById("Nb").className = "b";
    document.getElementById("Mo").className = "b";
    document.getElementById("Tc").className = "b";
    document.getElementById("Ru").className = "b";
    document.getElementById("Rh").className = "b";
    document.getElementById("Pd").className = "b";
    document.getElementById("Ag").className = "b";
    document.getElementById("Cd").className = "b";
    document.getElementById("In").className = "b";
    document.getElementById("Sn").className = "b";
    document.getElementById("Sb").className = "b";
    document.getElementById("Te").className = "b";
    document.getElementById("I").className = "b";
    document.getElementById("Xe").className = "b";
    document.getElementById("Cs").className = "b";
    document.getElementById("Ba").className = "b";
    document.getElementById("Lu").className = "b";
    document.getElementById("Hf").className = "b";
    document.getElementById("Ta").className = "b";
    document.getElementById("W").className = "b";
    document.getElementById("Re").className = "b";
    document.getElementById("Os").className = "b";
    document.getElementById("Ir").className = "b";
    document.getElementById("Pt").className = "b";
    document.getElementById("Au").className = "b";
    document.getElementById("Hg").className = "b";
    document.getElementById("Tl").className = "b";
    document.getElementById("Pb").className = "b";
    document.getElementById("Bi").className = "b";
    document.getElementById("Po").className = "b";
    document.getElementById("At").className = "b";
    document.getElementById("Rn").className = "b";
    document.getElementById("Fr").className = "b";
    document.getElementById("Ra").className = "b";
    document.getElementById("Lr").className = "b";
    document.getElementById("Rf").className = "b";
    document.getElementById("Db").className = "b";
    document.getElementById("Sg").className = "b";
    document.getElementById("Bh").className = "b";
    document.getElementById("Hs").className = "b";
    document.getElementById("Mt").className = "b";
    document.getElementById("Ds").className = "b";
    document.getElementById("Rg").className = "b";
    document.getElementById("Cn").className = "b";
    document.getElementById("Nh").className = "b";
    document.getElementById("Fl").className = "b";
    document.getElementById("Mc").className = "b";
    document.getElementById("Lv").className = "b";
    document.getElementById("Ts").className = "b";
    document.getElementById("Og").className = "b";
}

//快速启动原子数目栏
function d() {
    for (let chooseNumID = 1; chooseNumID < 9; chooseNumID++) {
        document.getElementById(chooseNumID).className = "b"
    }
    document.getElementById("down").className = "b"
    document.getElementById("x").className = "b"
    document.getElementById("up").className = "b"
    document.getElementById("y").className = "b"
    document.getElementById("n").className = "b"
    document.getElementById("confirm").className = "b"
    document.getElementById("y").removeAttribute("readonly")
}
function d2() {
    for (let chooseNumID = 1; chooseNumID < 9; chooseNumID++) {
        document.getElementById(chooseNumID).className = "a"
    }
    document.getElementById("down").className = "a"
    document.getElementById("x").className = "a"
    document.getElementById("up").className = "a"
    document.getElementById("y").className = "a"
    document.getElementById("n").className = "a"
    document.getElementById("confirm").className = "a"
    document.getElementById("y").setAttribute("readonly", "readonly")
}
//

function root(id) {
    if (id == "root") {
        if (document.getElementById("root").className == "b") {
            document.getElementById("root").className = "a"
            document.getElementById("put").className = "b"
            show()
            mode = 1
        }
    } else if (id == "put") {
        if (document.getElementById("root").className == "a") {
            hide()
            mode = 2
            document.getElementById("root").className = "b"
            document.getElementById("put").className = "a"
            origin = document.getElementById("end").innerHTML
            replace = document.getElementById("showRoot").innerHTML
            //打包
            var newSpan1 = document.createElement("span");
            newSpan1.className = "include"
            newSpan1.textContent = "(";
            document.getElementById("showRoot").firstChild.insertAdjacentElement("beforebegin", newSpan1);
            console.log(document.getElementById("showRoot").firstChild)
            console.log(newSpan1)
            var newSpan2 = document.createElement("span");
            newSpan2.className = "include"
            newSpan2.textContent = ")";
            document.getElementById("showRoot").appendChild(newSpan2)
            var parentElement = document.getElementById("showRoot");
            var targetElement = document.getElementById("end");

            while (parentElement.firstChild) {
                targetElement.appendChild(parentElement.firstChild);
            }
            document.getElementById("showRoot").innerHTML = ""
            
            d()
        }
    }
}

function a(id) {
    if (document.getElementById(id).className == "b") {
        time++
        console.log(time)
        if (mode == 1) {
            // 创建新元素
            var newSpan = document.createElement("span");
            newSpan.className = "element"
            newSpan.textContent = id;

            // 获取容器元素
            var container = document.getElementById("showRoot");

            // 将新元素添加到容器中
            container.appendChild(newSpan);
        } else {
            // 创建新元素
            var newSpan = document.createElement("span");
            newSpan.className = "element"
            newSpan.textContent = id;

            // 获取容器元素
            var container = document.getElementById("end");

            // 将新元素添加到容器中
            container.appendChild(newSpan);
        }
        //document.getElementById(id).className = "a"
        d()
    }
}


function b(id) {
    if (document.getElementById(id).className == "b" && time >= 1) {
        for (let chooseNum = 0; chooseNum < 10; chooseNum++) {
            if (chooseNum == id) {
                if (chooseNum == 1) {//特殊情况(是1时)
                    if (mode == 2) {
                        document.getElementById("end").innerHTML = origin + replace
                        mode = 0
                        show()
                    } else {
                        d2()
                        timeB = 0
                    }
                    //返回本身(反正没变化)
                } else {//否则
                    if (mode == 1) {
                        document.getElementById("showRoot").innerHTML = document.getElementById("showRoot").innerHTML + id
                    } else if (mode == 2) {
                        // 创建新元素
                        var newSpan = document.createElement("span");
                        newSpan.className = "num"
                        newSpan.textContent = id;

                        // 获取容器元素
                        var container = document.getElementById("end");

                        // 将新元素添加到容器中
                        container.appendChild(newSpan);
                        mode = 0
                        show()
                    } else {
                        // 创建新元素
                        var newSpan = document.createElement("span");
                        newSpan.className = "num"
                        newSpan.textContent = id;

                        // 获取容器元素
                        var container = document.getElementById("end");

                        // 将新元素添加到容器中
                        container.appendChild(newSpan);
                    }
                    d2()
                    timeB = 0
                }
            }
        }
    }
}

function c(id) {
    if (document.getElementById(id).className == "b" && time >= 1) {
        if (id == "down") {
            if (document.getElementById("x").innerHTML == 9) {
                document.getElementById("x").innerHTML = String(Number(document.getElementById("x").innerHTML) + 1)
            }
            document.getElementById("x").innerHTML = String(Number(document.getElementById("x").innerHTML) - 1)
            console.log(document.getElementById("x").innerHTML)
        } else if (id == "up") {
            document.getElementById("x").innerHTML = String(Number(document.getElementById("x").innerHTML) + 1)
            console.log(document.getElementById("x").innerHTML)
        } else if (id == "x") {
            if (mode == 1) {
                mode = 0
                document.getElementById("showRoot").innerHTML = document.getElementById("showRoot").innerHTML + document.getElementById("x").innerHTML
            } else if (mode == 2) {
                mode = 0
                document.getElementById("end").innerHTML = document.getElementById("end").innerHTML + document.getElementById("x").innerHTML
                show()
            } else {
                document.getElementById("end").innerHTML = document.getElementById("end").innerHTML + document.getElementById("x").innerHTML
            }
            d2()
        }
    }
}


//创建replaceAll()函数
String.prototype.replaceAll = function (FindText, RepText) {
    return this.replace(new RegExp(FindText, "g"), RepText);
}
function recover(id) {
    if (id == "recover") {
        document.getElementById("end").innerHTML = document.getElementById("end").innerHTML.replace(/1/, "₁")
        document.getElementById("end").innerHTML = document.getElementById("end").innerHTML.replace(/2/, "₂")
        document.getElementById("end").innerHTML = document.getElementById("end").innerHTML.replace(/3/, "₃")
        document.getElementById("end").innerHTML = document.getElementById("end").innerHTML.replace(/4/, "₄")
        document.getElementById("end").innerHTML = document.getElementById("end").innerHTML.replace(/5/, "₅")
        document.getElementById("end").innerHTML = document.getElementById("end").innerHTML.replace(/6/, "₆")
        document.getElementById("end").innerHTML = document.getElementById("end").innerHTML.replace(/7/, "₇")
        document.getElementById("end").innerHTML = document.getElementById("end").innerHTML.replace(/8/, "₈")
        document.getElementById("end").innerHTML = document.getElementById("end").innerHTML.replace(/9/, "₉")
        document.getElementById("end").innerHTML = document.getElementById("end").innerHTML.replace(/0/, "₀")
    } else {
        document.getElementById("end").innerHTML = document.getElementById("end").innerHTML.replace(/₁/, "1")
        document.getElementById("end").innerHTML = document.getElementById("end").innerHTML.replace(/₂/, "2")
        document.getElementById("end").innerHTML = document.getElementById("end").innerHTML.replace(/₃/, "3")
        document.getElementById("end").innerHTML = document.getElementById("end").innerHTML.replace(/₄/, "4")
        document.getElementById("end").innerHTML = document.getElementById("end").innerHTML.replace(/₅/, "5")
        document.getElementById("end").innerHTML = document.getElementById("end").innerHTML.replace(/₆/, "6")
        document.getElementById("end").innerHTML = document.getElementById("end").innerHTML.replace(/₇/, "7")
        document.getElementById("end").innerHTML = document.getElementById("end").innerHTML.replace(/₈/, "8")
        document.getElementById("end").innerHTML = document.getElementById("end").innerHTML.replace(/₉/, "9")
        document.getElementById("end").innerHTML = document.getElementById("end").innerHTML.replace(/₀/, "0")
    }
}


