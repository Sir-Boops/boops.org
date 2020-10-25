window.onload = function() {
  main();
};


function main() {
  let ans = "abcdefghijklmnopqrstuvwxyz123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<,>./?\"\';:\\|]}[{=+-_)(*&^%$#@!\`~"
  let an = "abcdefghijklmnopqrstuvwxyz123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  document.getElementById("box0_0").value = generatePassword(ans);
  document.getElementById("box0_1").value = generatePassword(ans);
  document.getElementById("box0_2").value = generatePassword(ans);
  document.getElementById("box0_3").value = generatePassword(ans);
  document.getElementById("box0_4").value = generatePassword(ans);

  document.getElementById("box1_0").value = generatePassword(an);
  document.getElementById("box1_1").value = generatePassword(an);
  document.getElementById("box1_2").value = generatePassword(an);
  document.getElementById("box1_3").value = generatePassword(an);
  document.getElementById("box1_4").value = generatePassword(an);
};

function generatePassword(chars) {
  var ans = "";
  for ( var i = 0; i < 25; i++) {
    ans = ans + chars[randomNum(chars.length - 1)]
  }
  return ans
}

function randomNum(max) {
  return Math.floor(Math.random() * (max + 1));
}
