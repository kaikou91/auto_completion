const myInput = document.querySelector("#Recherche")
const btnOk = document.querySelector("#btn");
const autoCm = document.querySelector('#monUl');
const lat = 36.9;
const long = 7.7667;
const mymap = L.map('mapid').setView([lat, long], 10);




//auto compliton du champ
myInput.addEventListener('keyup', (event) => {
    event.preventDefault();
    // console.log(myInput.value);

    const url = `https://places-dsn.algolia.net/1/places/query`;
    fetch(url, {
            method: "POST",
            body: JSON.stringify({ query: myInput.value })
        })
        .then(res => res.json())
        .then((data) => {
            // console.log(data)
            autoCm.innerHTML = '',
                data.hits.forEach(element => {
                    // console.log(element.locale_names.default)
                    autoCm.insertAdjacentHTML('beforeend', `
                <button class="li">${element.locale_names.default}</button>
                `)
                });
        })

});

// const elementList = document.querySelectorAll(".li")
// for (let i = 0; i < elementList.length; i++) {
//     console.log(elementList[i])
//     const elementList = elementList[i]
//     element.addEventListener("click", () => {
//         console.log(element[i])
//     })
// };
// autoCm.addEventListener("click", (event) => {
//     event.preventDefault();
// });

//mapGéo
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2Fpa291IiwiYSI6ImNra3h1dGllZzAzZzcyb3Fvdmx0MzNvMWIifQ.E2Bj_8bT4qrVsTzkQmrroA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    // accessToken: 'your.mapbox.access.token'
}).addTo(mymap);
//indicateur//
var marker = L.marker([lat, long]).addTo(mymap);

autoCm.addEventListener('click', (event) => {
    event.preventDefault();


    console.log(myInput.value);

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${myInput.value}&units=metric&APPID=135165fee6ce87eb1cda40569a3d699c`;
    fetch(url)
        .then(res => res.json())
        // .then(res => console.log(res))
        .then((data) => {
            // console.log(data.coord)
            mymap.setView([data.coord.lat, data.coord.lon], 10);
            var marker = L.marker([data.coord.lat, data.coord.lon]).addTo(mymap);
            autoCm.innerHTML = '';

            //refresh
            //sinon supprimer 

        })

});
//leaflet


// function valeurVent() {
//     if (unitesChoisies.vent == 0) {
//         return valeursCourantes.vent;
//     } else {
//         return valeursCourantes.vent / 3.6;
//     }
// };