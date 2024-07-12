export class Details {
  constructor(dataID, activeForDetails) {
    this.dataID = dataID;
    this.active = activeForDetails;
    let data = this.dataID;
    $("#closeBtn").on("click", () => {
      $("#gameDetails").hide(0);
      $("#Games").show(0);
    });
  }

  async showDetails(data) {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${data}ّ`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "44cfa94704mshc65a6b7f811531dp1ad0a4jsn4dfe3bd9c29b",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    try {
      const details = await fetch(url, options);
      const result = await details.json();
      console.log(result);
      let gameDetails = ``;
      gameDetails = `<div class="col-md-4">
    <img src=${result.thumbnail}  alt="" />
    </div>
    <div class="col-md-8">
    <h3>Title:${result.title}</h3>
    
    <p>Category: <span class="badge bg-primary">${this.active}</span></p>
    <p>Platform: <span class="badge bg-primary"> ${result.platform}</span></p>
    <p>Status: <span class="badge bg-primary">${result.status}</span></p>
    <p>
    ${result.description}
    </p>
         <a class="btn btn-outline-primary" target="_blank" href=${result.game_url}>Show Game</a>
    </div>`;

      document.querySelector(".game-details .row").innerHTML = gameDetails;
      this.clickDetails();
    } catch (error) {
      console.error(error);
    }
  }

  clickDetails() {
    $("#gameDetails").show(0);
    $("#Games").hide(0);
  }
}
