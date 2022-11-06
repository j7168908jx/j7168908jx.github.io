let changeTreeSeason = function () {
    let tree = document.getElementById("elegant-tree-img");
    const d = new Date();
    let month = d.getMonth() + 1;
    const delta = (-tree.width / 2).toString() + "px";
    if (month >= 3 && month <= 5)
        tree.style.marginTop = delta;
    else if (month >= 6 && month <= 8)
        ;
    else if (month >= 9 && month <= 11)
        tree.style.marginLeft = delta;
    else {
        tree.style.marginTop = delta;
        tree.style.marginLeft = delta;
    }
};

changeTreeSeason();
window.addEventListener("resize", changeTreeSeason);
