const discos = [
  {
    nome: "LP Barbra Streisand Superman CBS Vinil Original Raro",
    preco: 150,
    genero: "Pop",
    categoria: "Discos",
    ano: 1977,
    imagem: "imagens/Barbra-Streisand-Superman.webp",
    link: "https://produto.mercadolivre.com.br/MLB-4617527295-lp-barbra-streisand-superman-1977-vinil-original-cbs-raro-_JM"
  },
  {
    nome: "LP Foreigner – Unusual Heat",
    preco: 180,
    genero: "Rock",
    categoria: "Discos",
    ano: 1991,
    imagem: "imagens/LP Foreigner.jpg",
    link: "https://produto.mercadolivre.com.br/MLB-4618806247-lp-foreigner-unusual-heat-1991-vinil-original-atlanticwea-_JM"
  },
  {
    nome: "Nirvana - Nevermind",
    preco: 300,
    genero: "Rock",
    categoria: "Discos",
    ano: 1991,
    imagem: "https://via.placeholder.com/200",
    link: "https://www.mercadolivre.com.br/"
  },
  {
    nome: "Racionais MC's - Sobrevivendo no Inferno",
    preco: 250,
    genero: "Hip Hop",
    categoria: "Discos",
    ano: 1997,
    imagem: "https://via.placeholder.com/200",
    link: "https://www.mercadolivre.com.br/"
    
  },
  {
    nome: "Clube da Esquina",
    preco: 180,
    genero: "MPB",
    categoria: "Discos",
    ano: 1972,
    imagem: "https://via.placeholder.com/200",
    link: "https://www.mercadolivre.com.br/"
  },
  {
    nome: "Vitrola Raveo Sonetto com Bluetooth",
    preco: 489.50,
    categoria: "Vitrolas",
    ano:2025,
    imagem: "imagens/vitrola.webp",
    link: "https://meli.la/1JQkAqY"
  }
];

let currentPage = 1;
const perPage = 4;

function render() {
  const grid = document.getElementById("products");
  const pagination = document.getElementById("pagination");

  const genero = document.getElementById("genre").value;
  const priceRange = document.getElementById("priceRange").value;
  const sort = document.getElementById("sort").value;
  const yearFilter = document.getElementById("yearFilter").value;

let filtrados = discos.filter(d => {
  let precoValido = true;
  let preco = Number(d.preco);
  let anoValido = true;

  if (isNaN(preco)) return false;

  // PREÇO
  switch (priceRange) {
    case "0-100":
      precoValido = d.preco >= 0 && d.preco <= 100;
      break;
    case "100-200":
      precoValido = d.preco > 100 && d.preco <= 200;
      break;
    case "200-300":
      precoValido = d.preco > 200 && d.preco <= 300;
      break;
    case "300-500":
      precoValido = d.preco > 300 && d.preco <= 500;
      break;
    case "500+":
      precoValido = d.preco > 500;
      break;
  }

  // ANO
  switch (yearFilter) {
    case "1970":
      anoValido = d.ano >= 1970 && d.ano <= 1979;
      break;
    case "1980":
      anoValido = d.ano >= 1980 && d.ano <= 1989;
      break;
    case "1990":
      anoValido = d.ano >= 1990 && d.ano <= 1999;
      break;
    case "2000":
      anoValido = d.ano >= 2000 && d.ano <= 2009;
      break;
    case "2010":
      anoValido = d.ano >= 2010;
      break;
  }

  return (
    (genero === "" || d.genero === genero) &&
    precoValido &&
    anoValido &&
    (categoriaSelecionada === "" || d.categoria === categoriaSelecionada)
  );
});

  // Ordena sempre do menor para o maior
  filtrados.sort((a, b) => a.preco - b.preco);

  // Se quiser permitir inverter manualmente:
  if (sort === "priceDesc") {
    filtrados.reverse();
  }

  const totalPages = Math.ceil(filtrados.length / perPage);
  const start = (currentPage - 1) * perPage;
  const paginated = filtrados.slice(start, start + perPage);

  grid.innerHTML = "";

  paginated.forEach(disco => {
    grid.innerHTML += `
      <div class="card">
        <a href="${disco.link}" target="_blank">
          <img src="${disco.imagem}" alt="${disco.nome}" loading="lazy">
        </a>
        <div class="title">${disco.nome}</div>
        <div>${disco.ano}</div>
        <div class="price">${Number(disco.preco).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        })}
</div>
        <div class="installments">parcelamento em 12x</div>
        <a href="${disco.link}" target="_blank" class="buy-btn">
          Comprar no Mercado Livre
        </a>
      </div>
    `;
  });

  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
      <button onclick="goToPage(${i})">${i}</button>
    `;
  }
}

let categoriaSelecionada = "";

function filtrarCategoria(cat) {
  categoriaSelecionada = cat;
  currentPage = 1;
  render();
}

function goToPage(page) {
  currentPage = page;
  render();
}

document.getElementById("priceRange").addEventListener("change", render);
document.getElementById("genre").addEventListener("change", render);
document.getElementById("sort").addEventListener("change", render);
document.getElementById("yearFilter").addEventListener("change", render);
document.getElementById("sort").addEventListener("change", render);

render();