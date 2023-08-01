//CHUVA DE CÓDIGO 

 const c = document.getElementById("matrix");

 const ctx = c.getContext("2d");

 c.height = window.innerHeight;
 c.width = window.innerWidth;

 const letters = ["а", "о", "э", "у", "ы", "и", "е", "ё", "ю", "я", "б", "в", "г", "д", "ж", "з", "й", "к", "л", "м", "н", "п", "р", "с", "т", "ф", "х", "ц", "ч", "ш", "щ", "ь"];

const fontSize = 18;

const columns = c.width / fontSize;

const drops = new Array(Math.floor(columns)).fill(1);

function chuvaDeLetras() {

  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, c.width, c.height);

  ctx.fillStyle = "#0F0";
  ctx.font = `${fontSize}px arial`;

  for (let i = 0; i < drops.length; i++) {
  
    const text = letters[Math.floor(Math.random() * letters.length)];

    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > c.height && Math.random() > 0.95) {
      drops[i] = 0;
    }

    drops[i]++;
  }

  window.requestAnimationFrame(chuvaDeLetras);
}

chuvaDeLetras()