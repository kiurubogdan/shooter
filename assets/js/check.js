"use strict";
var passField = document.getElementById("pass");
var pass = "240807";
var pass_btn = document.getElementById("pass-btn");
var passContain = document.getElementById("pass-contain");
var appContain = document.getElementById("app-contain");

pass_btn.onclick = function () {
	if (passField.value === pass) {
		passContain.style = "display: none;";
		appContain.style = "display: block;";
		startGame();
	} else {
		document.getElementById("msg").innerHTML = "Неправильный пароль";
	}
};