window.onload = function() {
  main();
};

var anss = "abcdefghijklmnopqrstuvwxyz123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<,>./?\"\';:\\|]}[{=+-_)(*&^%$#@!\`~ "
var ans = "abcdefghijklmnopqrstuvwxyz123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<,>./?\"\';:\\|]}[{=+-_)(*&^%$#@!\`~"
var an = "abcdefghijklmnopqrstuvwxyz123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function main() {
  genAns()
  genAn()
  genAnss()
}

function genAns() {
  document.getElementById("box1_0").value = generatePassword(ans, 25);
  document.getElementById("box1_1").value = generatePassword(ans, 25);
  document.getElementById("box1_2").value = generatePassword(ans, 25);
  document.getElementById("box1_3").value = generatePassword(ans, 25);
  document.getElementById("box1_4").value = generatePassword(ans, 25);
}

function genAnss() {
  document.getElementById("box3_0").value = generatePassword(anss, 25);
  document.getElementById("box3_1").value = generatePassword(anss, 25);
  document.getElementById("box3_2").value = generatePassword(anss, 25);
  document.getElementById("box3_3").value = generatePassword(anss, 25);
  document.getElementById("box3_4").value = generatePassword(anss, 25);
}

function genAn() {
  document.getElementById("box2_0").value = generatePassword(an, 25);
  document.getElementById("box2_1").value = generatePassword(an, 25);
  document.getElementById("box2_2").value = generatePassword(an, 25);
  document.getElementById("box2_3").value = generatePassword(an, 25);
  document.getElementById("box2_4").value = generatePassword(an, 25);
}

function onClick() {
  if(document.getElementById("length").value > 128 || document.getElementById("length").value < 1) {
    document.getElementById("length").value = 25;
  }

  if (document.getElementById("type").value == "anss") {
    document.getElementById("box0_0").value = generatePassword(anss, document.getElementById("length").value);
  }

  if (document.getElementById("type").value == "ans") {
    document.getElementById("box0_0").value = generatePassword(ans, document.getElementById("length").value);
  }

  if (document.getElementById("type").value == "an") {
    document.getElementById("box0_0").value = generatePassword(an, document.getElementById("length").value);
  }

  document.getElementById("box0_0").style.width = document.getElementById("length").value + "em";
}

function generatePassword(chars, len) {
  var res = "";
  for ( var i = 0; i < len; i++) {
    res = res + chars[randomNum(chars.length - 1)]
  }
  return res
}

function randomNum(max) {
  return Math.floor(Math.random() * (max + 1));
}
