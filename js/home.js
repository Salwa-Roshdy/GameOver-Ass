import { Details } from "./Details.js";
export class AllGames {
  constructor() {
    $("#gameDetails").slideUp(0);
    this.Games = document.getElementById("Games");
    this.navItem = document.querySelectorAll(".nav-item a");

    console.log(Games);
    console.log("hello");
    let navItem = this.navItem;

    let dataContent;
    /*  console.log(this.navItem);
     */
    let activeNow = document.querySelector(".nav-item .active");
    this.getData(activeNow.getAttribute("data-content"));

    for (let i = 0; i < navItem.length; i++) {
      navItem[i].addEventListener("click", () => {
        this.active = document.querySelector(".nav-item .active");
        let active = this.active;

        active.classList.remove("active");
        navItem[i].classList.add("active");
        console.log(active);
        dataContent = navItem[i].getAttribute("data-content");
        console.log(dataContent);
        this.getData(dataContent);
      });
    }
  }

  async getData(category) {
    $(".loading").show(0);
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
    this.displayData(response);
    console.log(response);
    $(".loading").hide(0);
  }
  displayData(data) {
    let gamesData = ``;
    for (let i = 0; i < data.length; i++) {
      gamesData += ` <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div class="card "  data-id="${data[i].id}">
              <div class="card-img "  data-id="${data[i].id}">
                <img src=${data[i].thumbnail} class="card-img-top" alt="..." data-id="${data[i].id}" />
                 <div class="img-layer "> </div>
                 </div>
                <div class="card-body "data-id="${data[i].id}">
                  <div class="tittle d-flex justify-content-between"  data-id="${data[i].id}" >
                    <h5 class="card-title">${data[i].title}</h5>
                    <button class="btn py-0" id="freeBtn"  data-id="${data[i].id}"  >Free</button>
                  </div>
  
                  <p class="card-text" data-id="${data[i].id}">
                  ${data[i].short_description}
                  </p>
                </div>
                <div class="card-footer w-100 d-flex justify-content-between"  data-id="${data[i].id}" >
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
        let id = event.target.getAttribute("data-id");
        let Detail = new Details(id);
        Detail.showDetails(id);
        console.log(id);
      });
    }
    const card = document.querySelectorAll(".card");
    let activeForDetails = document
      .querySelector(".nav-item .active")
      .getAttribute("data-content");

    for (let i = 0; i < card.length; i++) {
      card[i].addEventListener("click", function () {
        let id = card[i].getAttribute("data-id");

       /*  console.log(activeForDetails); */
        let Detail = new Details(id, activeForDetails);
        Detail.showDetails(id,activeForDetails);
        /*   detailsInput.classList.remove("d-none");
        games.classList.add("d-none");
      */
      });
    }
  }
}
