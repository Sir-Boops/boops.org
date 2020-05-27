window.onload = function() {
  main();
};


function main() {
  for ( var i = 0; i < 5; i++ ) {
    var obj = document.getElementById("box")
    if (i+1 < 5) {
      obj.appendChild(document.createTextNode(generatePassword() + "\n\n"))
    } else {
      obj.appendChild(document.createTextNode(generatePassword()))
    }
  }
};

function generatePassword() {
  var chars = "abcdefghijklmnopqrstuvwxyz123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<,>./?\"\';:\\|]}[{=+-_)(*&^%$#@!\`~"
  var ans = "";
  for ( var i = 0; i < 25; i++) {
    ans = ans + chars[randomNum(chars.length - 1)]
  }
  return ans
}

function randomNum(max) {
  return Math.floor(Math.random() * (max + 1));
}
