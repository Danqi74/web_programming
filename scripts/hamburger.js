function ham_open() {
    document.getElementById("hamburger").style.visibility = "hidden";
    document.getElementById("hamburger__nav").style.display = "flex";
}

function ham_close() {
    document.getElementById("hamburger").style.visibility = "visible";
    document.getElementById("hamburger__nav").style.display = "none";
}