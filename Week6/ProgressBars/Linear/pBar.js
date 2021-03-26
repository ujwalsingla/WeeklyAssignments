function move() {
    var num = document.getElementById('num').value;
    var elem = document.getElementById("myBar");
    elem.style.width = num + "%";
    elem.innerHTML = num  + "%";
}
