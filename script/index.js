//get the superhero details

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
};

getSuperhero('deadpool');
