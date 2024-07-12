const closeInput = document.getElementById("closeBtn");
const detailsInput = document.getElementById("gameDetails");
const games = document.getElementById("Games");

const navItem = document.querySelectorAll(".nav-item a");
let active = document.querySelector(".nav-item .active");

// ==============Events=========================
closeInput.addEventListener("click", function () {
  detailsInput.classList.add("d-none");
  games.classList.remove("d-none");
});

let dataContent;
for (let i = 0; i < navItem.length; i++) {
  navItem[i].addEventListener("click", function () {
    active.classList.remove("active");
    navItem[i].classList.add("active");
    dataContent = navItem[i].getAttribute("data-content");

    getData(dataContent);
  });
}

getData(active.getAttribute("data-content"));
// ===============functions=========================

async function getData(category) {
  document.querySelector(".loading").classList.remove("d-none");
  const option = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
    option
  );

  const response = await api.json();

  displayData(response);
  document.querySelector(".loading").classList.add("d-none");
  console.log(response);
}

function displayData(data) {
  let gamesData = ``;
  for (let i = 0; i < data.length; i++) {
    gamesData += ` <div class="col-md-3">
            <div class="card " style="width: 18rem" onclick="showDetails(${data[i].id})">
              <img src=${data[i].thumbnail} class="card-img-top" alt="..." />
              <div class="card-body">
                <div class="tittle d-flex justify-content-between">
                  <h5 class="card-title">${data[i].title}</h5>
                  <button class="btn py-0" id="freeBtn"  onclick="showDetails(${data[i].id})">Free</button>
                </div>

                <p class="card-text">
                ${data[i].short_description}
                </p>
              </div>
              <div class="card-footer w-100 d-flex justify-content-between">
                <span class="badge bg-secondary">${data[i].genre}</span>
                <span class="badge bg-secondary"> ${data[i].platform}</span>
              </div>
            </div>
          </div>`;
  }

  document.querySelector("#Games .row").innerHTML = gamesData;

  const freeBtns = document.querySelectorAll("#freeBtn");
  for (let i = 0; i < freeBtns.length; i++) {
    freeBtns[i].addEventListener("click", function () {
      detailsInput.classList.remove("d-none");
      games.classList.add("d-none");
    });
  }
  const card = document.querySelectorAll(".card");
  for (let i = 0; i < card.length; i++) {
    card[i].addEventListener("click", function () {
      detailsInput.classList.remove("d-none");
      games.classList.add("d-none");
      /*  console.log(card[i]); */
    });
  }
}
