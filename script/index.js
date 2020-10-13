const form = document.querySelector(".change-superhero");
const card = document.querySelector(".card");
const cardDetails = document.querySelector(".card-body");
const superheroImage = document.querySelector(".superheroImage");
const nodata = document.querySelector(".no-data");

const imageSrc = "https://via.placeholder.com/480x100.png?text=Loading";

//get the superhero details from the API
const getSuperhero = async (superhero) => {
  const responses = await fetch(
    `https://superhero-search.p.rapidapi.com/?hero=${superhero}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "superhero-search.p.rapidapi.com",
        "x-rapidapi-key": "d81564b8c8msh978d801da9f622cp1b9a84jsn3aa3abcc2ced",
      },
    }
  );

  const data = await responses.json();
  console.log(data);
  return data;
};

form.addEventListener("submit", (e) => {
  nodata.innerHTML = ``;
  superheroImage.setAttribute("src", imageSrc);
  e.preventDefault();

  const superhero = form.superhero.value.trim();
  form.reset();

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }

  getSuperhero(superhero)
    .then((data) => updateUI(data))
    .catch((err) => noData());
});

const noData = () => {
  card.classList.add("d-none");
  nodata.innerHTML = `<p>No Data Found</p>`;
};

const updateUI = (data) => {
  superheroImage.setAttribute("src", data.images.sm);

  cardDetails.innerHTML = `
        <p><span class="font-weight-bold">Name : </span>${data.name}</p>
        <p><span class="font-weight-bold">Full Name : </span>${data.biography.fullName}</p>
        <p><span class="font-weight-bold">First Appearence : </span>${data.biography.firstAppearance}</p>
        <p><span class="font-weight-bold">Publisher : </span>${data.biography.publisher}</p>
        <p><span class="font-weight-bold">Occupation : </span>${data.work.occupation}</p>
        <div class="row">
            <div class="col-sm">
              <div class="progress">
                <div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:${data.powerstats.combat}%">
                  Combat : ${data.powerstats.combat}%
                </div>
              </div>


                <p></p>
            </div>
        </div>
        <div class="row"> 
            <div class="col-sm">
              <div class="progress">
                <div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:${data.powerstats.durability}%">
                  Durability : ${data.powerstats.durability}%
                </div>
              </div>


                <p></p>
            </div>
        </div>
        <div class="row"> 
            <div class="col-sm">
              <div class="progress">
                <div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:${data.powerstats.intelligence}%">
                  Intelligence : ${data.powerstats.intelligence}%
                </div>
              </div>


                <p></p>
            </div>
        </div>
        <div class="row">  
            <div class="col-sm">
              <div class="progress">
                <div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:${data.powerstats.power}%">
                  Power : ${data.powerstats.power}%
                </div>
              </div>

              
                <p></p>
            </div>
        </div>
        <div class="row">  
            <div class="col-sm">
            <div class="progress">
              <div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:${data.powerstats.speed}%">
                Speed : ${data.powerstats.speed}%
              </div>
            </div>

            
                <p></p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
            <div class="progress">
              <div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:${data.powerstats.strength}%">
                Strength :  ${data.powerstats.strength}%
              </div>
            </div>

            
                <p></p>
            </div>
        </div>
        
        
        
        `;
};
