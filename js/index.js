const marcas = [
  { nombre: "Chanel", img: "chanel.jpg", slug: "chanel" },
  { nombre: "Dior", img: "dior.jpg", slug: "dior" },
  { nombre: "Armani", img: "armani.jpg", slug: "armani" },
  { nombre: "Versace", img: "versace.png", slug: "versace" }
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