//Poner una imagen aleatoria de fondo
let number = Math.floor(Math.random() * 6) + 1;
//let number = 1;
let imagePath = "url('/img/login/login" + number + ".jpg')";
$('body').css("background-image", imagePath);