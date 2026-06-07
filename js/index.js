
const marcas = [
    {nombre: "Carolina Herrera" , img: "carolinaHerrera.png" , slug: "carolinaherrera"},
    {nombre: "Chanel" , img: "bleuDeChanel.png" , slug: "chanel"},
    {nombre: "Dior", img: "dior.jpg", slug: "dior"},
    {nombre: "Giorgio Armani", img: "giorgioArmani.jpg", slug:"armani"},
    {nombre: "Hugo Boss", img: "hugoBoss.jpg", slug: "hugoboss"},
    {nombre: "Saint Laurent", img: "ysl.png", slug: "ysl"},
    {nombre: "Jean Paul Gualtier", img: "jpg.svg", slug: "jpg"},
    {nombre: "Paco Rabanne", img: "pacoRabanne.jpg", slug: "pacorabanne"},
    {nombre: "Versace", img: "versace.png", slug: "versace"},
    {nombre: "Tom Ford", img: "tomFord.png", slug: "tomford"},
    {nombre: "Azzaro", img: "azzaro.png", slug: "azzaro"},
];

const contenedor = document.getElementById("marcas-container");

marcas.forEach(m => {
  contenedor.innerHTML += `
    <div class="cuadro-marcas">
      <a href="tienda.html?marca=${m.slug}">
        <img src="assets/logos/${m.img}" class="imagen-marcas-perfumes">
        <h3>${m.nombre}</h3>
      </a>
    </div>
  `;
});