var time = 0
var mode = 0//是否为离子团模式
//mode = 1为小括号输入时的状态
//2为小括号输入合并到上一级的状态
var midMode = 0
//0没开启，1是输入时的状态
//2是中括号并入上一级的状态
var ionMode = 0
//0未开启，1是进入利子符号标识
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
    document.getElementById("La").className = "a";
    document.getElementById("Ce").className = "a";
    document.getElementById("Pr").className = "a";
    document.getElementById("Nd").className = "a";
    document.getElementById("Pm").className = "a";
    document.getElementById("Sm").className = "a";
    document.getElementById("Eu").className = "a";
    document.getElementById("Gd").className = "a";
    document.getElementById("Tb").className = "a";
    document.getElementById("Dy").className = "a";
    document.getElementById("Ho").className = "a";
    document.getElementById("Er").className = "a";
    document.getElementById("Tm").className = "a";
    document.getElementById("Yb").className = "a";
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
    document.getElementById("Ac").className = "a";
    document.getElementById("Th").className = "a";
    document.getElementById("Pa").className = "a";
    document.getElementById("U").className = "a";
    document.getElementById("Np").className = "a";
    document.getElementById("Pu").className = "a";
    document.getElementById("Am").className = "a";
    document.getElementById("Cm").className = "a";
    document.getElementById("Bk").className = "a";
    document.getElementById("Cf").className = "a";
    document.getElementById("Es").className = "a";
    document.getElementById("Fm").className = "a";
    document.getElementById("Md").className = "a";
    document.getElementById("No").className = "a";
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
    document.getElementById("La").className = "b";
    document.getElementById("Ce").className = "b";
    document.getElementById("Pr").className = "b";
    document.getElementById("Nd").className = "b";
    document.getElementById("Pm").className = "b";
    document.getElementById("Sm").className = "b";
    document.getElementById("Eu").className = "b";
    document.getElementById("Gd").className = "b";
    document.getElementById("Tb").className = "b";
    document.getElementById("Dy").className = "b";
    document.getElementById("Ho").className = "b";
    document.getElementById("Er").className = "b";
    document.getElementById("Tm").className = "b";
    document.getElementById("Yb").className = "b";
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
    document.getElementById("Ac").className = "b";
    document.getElementById("Th").className = "b";
    document.getElementById("Pa").className = "b";
    document.getElementById("U").className = "b";
    document.getElementById("Np").className = "b";
    document.getElementById("Pu").className = "b";
    document.getElementById("Am").className = "b";
    document.getElementById("Cm").className = "b";
    document.getElementById("Bk").className = "b";
    document.getElementById("Cf").className = "b";
    document.getElementById("Es").className = "b";
    document.getElementById("Fm").className = "b";
    document.getElementById("Md").className = "b";
    document.getElementById("No").className = "b";
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
function e() {
    document.getElementById("+").className = "f"
    document.getElementById("==").className = "f"
    document.getElementById("↓").className = "f"
    document.getElementById("↑").className = "f"
}
function e2() {
    document.getElementById("+").className = "a"
    document.getElementById("==").className = "a"
    document.getElementById("↓").className = "a"
    document.getElementById("↑").className = "a"
}
function f2() {
    document.getElementById("st").removeAttribute("readonly")
    document.getElementById("confirmSt").className = "f"
    document.getElementById("pIon").className = "f"
    document.getElementById("nIon").className = "f"
    document.getElementById("st").className = "f"
}
function f() {
    document.getElementById("pIon").className = "a"
    document.getElementById("nIon").className = "a"
    document.getElementById("st").setAttribute("readonly", "readonly")
    document.getElementById("confirmSt").className = "a"
    document.getElementById("st").className = "a"
}
function root(id) {
    if (id == "root") {
        if (document.getElementById("root").className == "b") {
            document.getElementById("root").className = "a"
            document.getElementById("put").className = "b"
            show()
            mode = 1
            d2()
            f()
            e2()
            document.getElementById("midroot").className = "a"
        }
    } else if (id == "put") {
        document.getElementById("midroot").className = "b"
        if (document.getElementById("root").className == "a") {
            hide()
            f()
            mode = 2
            document.getElementById("root").className = "b"
            document.getElementById("put").className = "a"
            if (midMode == 1) {            //打包
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
                var targetElement = document.getElementById("showMidRoot");
                while (parentElement.firstChild) {
                    targetElement.appendChild(parentElement.firstChild);
                }
                document.getElementById("showRoot").innerHTML = ""
                d()
            } else {
                var newSpan1 = document.createElement("span");
                newSpan1.className = "include"
                newSpan1.textContent = "(";
                document.getElementById("showRoot").firstChild.insertAdjacentElement("beforebegin", newSpan1);
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
}
function midroot(id) {
    if (id == "midroot") {
        if (document.getElementById("midroot").className == "b") {
            document.getElementById("midroot").className = "a"
            document.getElementById("midput").className = "b"
            show()
            midMode = 1
            d2()
            f()
            e2()
        }
    } else if (id == "midput") {
        f()
        hide()
        midMode = 2
        document.getElementById("midroot").className = "b"
        document.getElementById("midput").className = "a"
        //打包
        var newSpan3 = document.createElement("span");
        newSpan3.className = "midInclude"
        newSpan3.textContent = "[";
        document.getElementById("showMidRoot").firstChild.insertAdjacentElement("beforebegin", newSpan3);
        var newSpan4 = document.createElement("span");
        newSpan4.className = "midInclude"
        newSpan4.textContent = "]";
        document.getElementById("showMidRoot").appendChild(newSpan4)
        var parentElement = document.getElementById("showMidRoot");
        var targetElement = document.getElementById("end");
        while (parentElement.firstChild) {
            targetElement.appendChild(parentElement.firstChild);
        }
        document.getElementById("showMidRoot").innerHTML = ""
        d()
    }
}
function a(id) {
    if (document.getElementById(id).className == "b") {
        time++
        var newSpan = document.createElement("span");
        newSpan.className = "element"
        newSpan.textContent = id;
        if (mode == 1) {
            var container = document.getElementById("showRoot");
        } else if (midMode == 1) {
            var container = document.getElementById("showMidRoot");
        } else {
            var container = document.getElementById("end");
        }
        container.appendChild(newSpan);
        f2()
        d()
        if (mode == 0 && midMode == 0) {
            e()
        }
    }
}
function doVE1() {
    if (mode == 2) {
        mode = 0
        show()
        f2()
    } else if (midMode == 2) {
        midMode = 0
        show()
        f2()
    } else {
        d2()
        f2()
    }
}
function b(id) {
    if (ionMode == 1) {
        for (let chooseNum = 0; chooseNum < 10; chooseNum++) {
            if (chooseNum == id) {
                if (chooseNum == 1) {//特殊情况(是1时)
                    var newSup = document.createElement("sup");
                    newSup.textContent = "+";
                    if (mode == 1) {
                        var container = document.getElementById("showRoot");
                    } else if (midMode == 1) {
                        var container = document.getElementById("showMidRoot");
                    } else if (mode == 2) {
                        var container = document.getElementById("end");
                    } else if (midMode == 2) {
                        var container = document.getElementById("end");
                    } else if (midMode == 1 && mode == 1) {
                        var container = document.getElementById("showMidRoot");
                    } else {
                        var container = document.getElementById("end");
                    }
                    container.appendChild(newSup);
                } else {//否则
                    var newSup = document.createElement("sup");
                    newSup.textContent = id + "+";
                    if (mode == 1) {
                        var container = document.getElementById("showRoot");
                    } else if (midMode == 1) {
                        var container = document.getElementById("showMidRoot");
                    } else if (mode == 2) {
                        var container = document.getElementById("end");
                    } else if (midMode == 2) {
                        var container = document.getElementById("end");
                    } else if (midMode == 1 && mode == 1) {
                        var container = document.getElementById("showMidRoot");
                    } else {
                        var container = document.getElementById("end");
                    }
                    container.appendChild(newSup);
                }
                d2()
                f2()
                ionMode = 0
                if (mode == 0 && midMode == 0) {
                    e()
                }
                show()
            }
        }
        if (id == "n") {
            var newSup = document.createElement("sup");
            newSup.textContent = id + "+";
            if (mode == 1) {
                var container = document.getElementById("showRoot");
            } else if (midMode == 1) {
                var container = document.getElementById("showMidRoot");
            } else if (mode == 2) {
                var container = document.getElementById("end");
            } else if (midMode == 2) {
                var container = document.getElementById("end");
            } else if (midMode == 1 && mode == 1) {
                var container = document.getElementById("showMidRoot");
            } else {
                var container = document.getElementById("end");
            }
            container.appendChild(newSup);
            d2()
            f2()
            if (mode == 0 && midMode == 0) {
                e()
            }
        }
    } else if (ionMode == 2) {
        for (let chooseNum = 0; chooseNum < 10; chooseNum++) {
            if (chooseNum == id) {
                if (chooseNum == 1) {//特殊情况(是1时)
                    var newSup = document.createElement("sup");
                    newSup.textContent = "-";
                    if (mode == 1) {
                        var container = document.getElementById("showRoot");
                    } else if (midMode == 1) {
                        var container = document.getElementById("showMidRoot");
                    } else if (mode == 2) {
                        var container = document.getElementById("end");
                    } else if (midMode == 2) {
                        var container = document.getElementById("end");
                    } else if (midMode == 1 && mode == 1) {
                        var container = document.getElementById("showMidRoot");
                    } else {
                        var container = document.getElementById("end");
                    }
                    container.appendChild(newSup);
                } else {//否则
                    var newSup = document.createElement("sup");
                    newSup.textContent = id + "-";
                    if (mode == 1) {
                        var container = document.getElementById("showRoot");
                    } else if (midMode == 1) {
                        var container = document.getElementById("showMidRoot");
                    } else if (mode == 2) {
                        var container = document.getElementById("end");
                    } else if (midMode == 2) {
                        var container = document.getElementById("end");
                    } else if (midMode == 1 && mode == 1) {
                        var container = document.getElementById("showMidRoot");
                    } else {
                        var container = document.getElementById("end");
                    }
                    container.appendChild(newSup);
                }
                d2()
                f2()
                ionMode = 0
                if (mode == 0 && midMode == 0) {
                    e()
                }
                show()
            }
        }
        if (id == "n") {
            var newSup = document.createElement("sup");
            newSup.textContent = id + "+";
            if (mode == 1) {
                var container = document.getElementById("showRoot");
            } else if (midMode == 1) {
                var container = document.getElementById("showMidRoot");
            } else if (mode == 2) {
                var container = document.getElementById("end");
            } else if (midMode == 2) {
                var container = document.getElementById("end");
            } else if (midMode == 1 && mode == 1) {
                var container = document.getElementById("showMidRoot");
            } else {
                var container = document.getElementById("end");
            }
            container.appendChild(newSup);
            d2()
            f2()
            if (mode == 0 && midMode == 0) {
                e()
            }
        }
    } else {
        function insert() {
            var newSpan = document.createElement("span");
            newSpan.className = "num"
            newSpan.textContent = id;
            // 获取容器元素
            if (mode == 1) {
                var container = document.getElementById("showRoot");
                show()
            } else if (midMode == 1) {
                var container = document.getElementById("showMidRoot");
                show()
            } else if (mode == 2) {
                var container = document.getElementById("end");
                midMode = 0
                show()
                f2()
            } else if (midMode == 2) {
                var container = document.getElementById("end");
                midMode = 0
                show()
                f2()
            } else if (midMode == 1 && mode == 1) {
                var container = document.getElementById("showMidRoot");
                mode = 0
                show()
            } else {
                var container = document.getElementById("end");
                container.appendChild(newSpan);
                f2()
                if (mode == 0 && midMode == 0) {
                    e()
                }
            }
            container.appendChild(newSpan);
            show()
        }
        if (document.getElementById(id).className == "b" && time >= 1) {
            for (let chooseNum = 0; chooseNum < 10; chooseNum++) {
                if (chooseNum == id) {
                    if (chooseNum == 1) {//特殊情况(是1时)
                        doVE1()
                    } else {//否则
                        insert()
                    }
                    d2()
                    f2()
                    if (mode == 0 && midMode == 0) {
                        e()
                    }
                }
            }
        }
        if (id == "n") {
            insert()
            d2()
            f2()
            if (mode == 0 && midMode == 0) {
                e()
            }
        }
    }
}
function inputC(value) {
    if (document.getElementById("confirm").className == "b") {
        if (ionMode == 1) {
            if (value == "") {
                alert("哥你还没输入底数呢就插入")
            } else {
                if (value == 1) {//特殊情况(是1时)
                    var newSup = document.createElement("sup");
                    newSup.textContent = "+";
                    if (mode == 1) {
                        var container = document.getElementById("showRoot");
                    } else if (midMode == 1) {
                        var container = document.getElementById("showMidRoot");
                    } else if (mode == 2) {
                        var container = document.getElementById("end");
                    } else if (midMode == 2) {
                        var container = document.getElementById("end");
                    } else if (midMode == 1 && mode == 1) {
                        var container = document.getElementById("showMidRoot");
                    } else {
                        var container = document.getElementById("end");
                    }
                    container.appendChild(newSup);
                } else {//否则
                    var newSup = document.createElement("sup");
                    newSup.textContent = value + "+";
                    if (mode == 1) {
                        var container = document.getElementById("showRoot");
                    } else if (midMode == 1) {
                        var container = document.getElementById("showMidRoot");
                    } else if (mode == 2) {
                        var container = document.getElementById("end");
                    } else if (midMode == 2) {
                        var container = document.getElementById("end");
                    } else if (midMode == 1 && mode == 1) {
                        var container = document.getElementById("showMidRoot");
                    } else {
                        var container = document.getElementById("end");
                    }
                    container.appendChild(newSup);
                }
                show()
                ionMode = 0
            }
            d2()
        } else if (ionMode == 2) {
            if (value == "") {
                alert("哥你还没输入底数呢就插入")
            } else {
                if (value == 1) {//特殊情况(是1时)
                    var newSup = document.createElement("sup");
                    newSup.textContent = "-";
                    if (mode == 1) {
                        var container = document.getElementById("showRoot");
                    } else if (midMode == 1) {
                        var container = document.getElementById("showMidRoot");
                    } else if (mode == 2) {
                        var container = document.getElementById("end");
                    } else if (midMode == 2) {
                        var container = document.getElementById("end");
                    } else if (midMode == 1 && mode == 1) {
                        var container = document.getElementById("showMidRoot");
                    } else {
                        var container = document.getElementById("end");
                    }
                    container.appendChild(newSup);
                } else {//否则
                    var newSup = document.createElement("sup");
                    newSup.textContent = value + "-";
                    if (mode == 1) {
                        var container = document.getElementById("showRoot");
                    } else if (midMode == 1) {
                        var container = document.getElementById("showMidRoot");
                    } else if (mode == 2) {
                        var container = document.getElementById("end");
                    } else if (midMode == 2) {
                        var container = document.getElementById("end");
                    } else if (midMode == 1 && mode == 1) {
                        var container = document.getElementById("showMidRoot");
                    } else {
                        var container = document.getElementById("end");
                    }
                    container.appendChild(newSup);
                }
                show()
                ionMode = 0

            }
            d2()
        } else {
            if (value == "") {
                alert("哥你还没输入底数呢就插入")
            } else {
                if (value == "1") {//特殊情况(是1时)
                    doVE1()
                } else {//否则
                    var newSpan = document.createElement("span");
                    newSpan.className = "num"
                    newSpan.textContent = value;
                    if (mode == 1) {
                        var container = document.getElementById("showRoot");
                        show()
                        e2()
                    } else if (midMode == 1) {
                        var container = document.getElementById("showMidRoot");
                        show()
                        e2()
                    } else if (mode == 2) {
                        var container = document.getElementById("end");
                        mode = 0
                        show()
                        f2()
                    } else if (midMode == 2) {
                        var container = document.getElementById("end");
                        midMode = 0
                        show()
                        f2()
                    } else if (mode == 2 && midMode == 1) {
                        var container = document.getElementById("showMidRoot");
                        mode = 0
                        show()
                    } else {
                        var container = document.getElementById("end");
                        f2()
                    }
                    container.appendChild(newSpan);
                }
            }
            d2()
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
            if (ionMode == 1) {
                var newSup = document.createElement("sup");
                newSup.textContent = document.getElementById("x").innerHTML + "+";
                if (mode == 1) {
                    var container = document.getElementById("showRoot");
                    show()
                    e2()
                } else if (midMode == 1) {
                    var container = document.getElementById("showMidRoot");
                    show()
                    e2()
                } else if (mode == 2) {
                    var container = document.getElementById("end");
                    mode = 0
                    show()
                    f2()
                } else if (midMode == 2) {
                    var container = document.getElementById("end");
                    midMode = 0
                    show()
                    f2()
                } else if (mode == 2 && midMode == 1) {
                    var container = document.getElementById("showMidRoot");
                    mode = 0
                    show()
                } else {
                    var container = document.getElementById("end");
                    f2()
                }
                container.appendChild(newSup);
                d2()
            } else if (ionMode == 1) {
                var newSup = document.createElement("sup");
                newSup.textContent = document.getElementById("x").innerHTML + "-";
                if (mode == 1) {
                    var container = document.getElementById("showRoot");
                    show()
                    e2()
                } else if (midMode == 1) {
                    var container = document.getElementById("showMidRoot");
                    show()
                    e2()
                } else if (mode == 2) {
                    var container = document.getElementById("end");
                    mode = 0
                    show()
                    f2()
                } else if (midMode == 2) {
                    var container = document.getElementById("end");
                    midMode = 0
                    show()
                    f2()
                } else if (mode == 2 && midMode == 1) {
                    var container = document.getElementById("showMidRoot");
                    mode = 0
                    show()
                } else {
                    var container = document.getElementById("end");
                    f2()
                }
                container.appendChild(newSup);
                d2()
            } else {
                var newSpan = document.createElement("span");
                newSpan.className = "num"
                newSpan.textContent = document.getElementById("x").innerHTML;
                if (mode == 1) {
                    var container = document.getElementById("showRoot");
                    show()
                    e2()
                } else if (midMode == 1) {
                    var container = document.getElementById("showMidRoot");
                    show()
                    e2()
                } else if (mode == 2) {
                    var container = document.getElementById("end");
                    mode = 0
                    show()
                    f2()
                } else if (midMode == 2) {
                    var container = document.getElementById("end");
                    midMode = 0
                    show()
                    f2()
                } else if (mode == 2 && midMode == 1) {
                    var container = document.getElementById("showMidRoot");
                    mode = 0
                    show()
                } else {
                    var container = document.getElementById("end");
                    f2()
                }
                container.appendChild(newSpan);
                d2()
            }
        }
    }
}
function InputD(value) {
    if (document.getElementById("confirmSt").className == "f") {
        if (value == "") {
            alert("哥你还没输入状态呢就插入")
        } else {
            var newSpan = document.createElement("span");
            newSpan.className = "status"
            newSpan.textContent = "(" + value + ")";
            if (mode == 1) {
                var container = document.getElementById("showRoot");
            } else if (midMode == 1) {
                var container = document.getElementById("showMidRoot");
            } else {
                var container = document.getElementById("end");
            }
            container.appendChild(newSpan);
        }
    }
}
function gas(id) {
    if (document.getElementById(id).className == "f") {
        var newSpan = document.createElement("span");
        newSpan.className = "symbol"
        newSpan.textContent = id
        var container = document.getElementById("end");
        container.appendChild(newSpan);
        show()
    }
}
function solid(id) {
    if (document.getElementById(id).className == "f") {
        var newSpan = document.createElement("span");
        newSpan.className = "symbol"
        newSpan.textContent = id
        var container = document.getElementById("end");
        container.appendChild(newSpan);
        show()
    }
}
function result(id) {
    if (document.getElementById(id).className == "f") {
        if (id == "+") {
            var newSpan = document.createElement("span");
            newSpan.className = "plus"
            newSpan.textContent = id
            var container = document.getElementById("end");
            container.appendChild(newSpan);
        } else {
            var newSpan = document.createElement("span");
            newSpan.className = "equals"
            newSpan.textContent = id
            var container = document.getElementById("end");
            container.appendChild(newSpan);
        }
        show()
    }
}
function Ion(id) {
    if (document.getElementById(id).className == "f") {
        d()
        hide()
        e2()
        document.getElementById("root").className = "a"
        document.getElementById("midroot").className = "a"
        if (id == "pIon") {
            ionMode = 1
        } else {
            ionMode = 2
        }
    }
}
function replaceWithSubscript(className) {// 创建一个函数来替换class为num的元素中的数字为下标形式
    var elements = document.querySelectorAll('.' + className);

    var subscriptMap = {
        '0': '₀',
        '1': '₁',
        '2': '₂',
        '3': '₃',
        '4': '₄',
        '5': '₅',
        '6': '₆',
        '7': '₇',
        '8': '₈',
        '9': '₉'
    };
    elements.forEach(function (element) {
        replaceTextNode(element, subscriptMap, /\d/g);
    });
}
function replaceWithNormal(className) {// 创建一个函数来将class为num的元素中的下标形式的数字替换为普通数字
    var elements = document.querySelectorAll('.' + className);

    var normalMap = {
        '₀': '0',
        '₁': '1',
        '₂': '2',
        '₃': '3',
        '₄': '4',
        '₅': '5',
        '₆': '6',
        '₇': '7',
        '₈': '8',
        '₉': '9'
    };
    elements.forEach(function (element) {
        replaceTextNode(element, normalMap, /[₀₁₂₃₄₅₆₇₈₉]/g);
    });
}
function replaceTextNode(node, map, regex) {// 递归处理文本节点
    if (node.nodeType === Node.TEXT_NODE) {
        node.textContent = node.textContent.replace(regex, function (match) {
            return map[match];
        });
    } else {
        node.childNodes.forEach(function (child) {
            replaceTextNode(child, map, regex);
        });
    }
}
function recover(id) {
    if (document.getElementById(id).className == "b" && id == "recover") {
        replaceWithSubscript('num')
    } else if (document.getElementById(id).className == "b" && id == "cover") {
        replaceWithNormal('num')
    }
}
