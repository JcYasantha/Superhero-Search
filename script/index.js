const form = document.querySelector('.change-superhero');
const card = document.querySelector('.card');
const cardDetails = document.querySelector('.card-body');
const superheroImage = document.querySelector('.superheroImage');
const nodata = document.querySelector('.no-data');

const imageSrc = 'https://via.placeholder.com/480x100.png?text=Loading';

//get the superhero details from the API
const getSuperhero = async (superhero) => {
    const responses = await fetch(`https://superhero-search.p.rapidapi.com/?hero=${superhero}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "superhero-search.p.rapidapi.com",
            "x-rapidapi-key": "d81564b8c8msh978d801da9f622cp1b9a84jsn3aa3abcc2ced"
        }
    });

    const data = await responses.json();
    console.log(data);
    return data;
};

form.addEventListener('submit', e => {
    nodata.innerHTML = ``;
    superheroImage.setAttribute('src', imageSrc);
    e.preventDefault();

    const superhero = form.superhero.value.trim();
    form.reset();

    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

    getSuperhero(superhero)
        .then(data => updateUI(data))
        .catch(err => noData());

});

const noData = () => {
    card.classList.add('d-none');
    nodata.innerHTML = `<p>No Data Found</p>`;
};

const updateUI = (data) => {
    superheroImage.setAttribute('src', data.images.sm);

    cardDetails.innerHTML = `
        <p><span class="font-weight-bold">Name : </span>${data.name}</p>
        <p><span class="font-weight-bold">Full Name : </span>${data.biography.fullName}</p>
        <p><span class="font-weight-bold">First Appearence : </span>${data.biography.firstAppearance}</p>
        <p><span class="font-weight-bold">Publisher : </span>${data.biography.publisher}</p>
        <div class="row">
            <div class="col-sm">
                <p><span class="font-weight-bold">Combat : </span>${data.powerstats.combat}%</p>
            </div>
            <div class="col-sm">
                <p><span class="font-weight-bold">Durability : </span>${data.powerstats.durability}%</p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <p><span class="font-weight-bold">Intelligence : </span>${data.powerstats.intelligence}%</p>
            </div>
            <div class="col-sm">
                <p><span class="font-weight-bold">Power : </span>${data.powerstats.power}%</p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <p><span class="font-weight-bold">Speed : </span>${data.powerstats.speed}%</p>
            </div>
            <div class="col-sm">
                <p><span class="font-weight-bold">Strength : </span>${data.powerstats.strength}%</p>
            </div>
        </div>
        
        
        
        `;
};
