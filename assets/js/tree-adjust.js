!function () {
    let tree = document.getElementById("elegant-tree-img");
    const d = new Date();
    let month = d.getMonth() + 1;

    if (month >= 3 && month <= 5)
        tree.style.marginTop = "-125px";
    else if (month >= 6 && month <= 8)
        ;
    else if (month >= 9 && month <= 11)
        tree.style.marginLeft = "-125px";
    else {
        tree.style.marginTop = "-125px";
        tree.style.marginLeft = "-125px";
    }
}();