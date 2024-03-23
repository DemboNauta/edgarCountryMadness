window.addEventListener("DOMContentLoaded", ()=>{
    let localidad = document.getElementById("localidad");
    let localidades = document.getElementById("localidades");
    let buscar = document.getElementById("buscar");
    let aceptar = document.getElementById("aceptar");
    let arrayResultadosAJAX;
    //Esta función permite usar la api de virtualearth para listar todas las ciudades
    async function peticionLocalidades() {
        try {
            let url = `https://dev.virtualearth.net/REST/v1/Locations/${localidad.value.trim()}?maxResults=20&key=MiGtaezrn550Y2zxAanE~fgg0btSeHQ1509aqAVqXlA~Av367PS242wIqVFPQxMOWDApwz4_wZ9pY_JVD5RuXFvB_DPipIU34DQuwQe6C-yT&output=json`;
            const resp = await fetch(url);
            const respJson = await resp.json();
            arrayResultadosAJAX = respJson["resourceSets"][0]["resources"];
            return arrayResultadosAJAX;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    //Esta función usa la api de geodb para obtener el id del lugar usando latitud y longitud
    async function peticionCiudad(la, lo) {
        const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/places?location=${la}${lo}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'fe868c7464msh4e0084abeab8ac9p16ec2bjsn3dbfcfc38c99',
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            return await result.data[0].id;
        } catch (error) {
            console.error(error);
            throw new Error('Error en la solicitud de información de la ciudad.');
        }
    }
    //Esta función tambien usa geo db y permite obtener datos más definidos usando el id obtenido anteiormente
    async function datosCiudad(id) {
        const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/places/${id}?languageCode=ES`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'fe868c7464msh4e0084abeab8ac9p16ec2bjsn3dbfcfc38c99',
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            return result
        } catch (error) {
            console.error(error);
        }
    }

    buscar.addEventListener("click", () => {
        peticionLocalidades().then((entregaCorrecta) => {
            localidades.innerHTML = "";
            for (let ciudad of entregaCorrecta) {
                localidades.innerHTML += `<option>${ciudad["name"]}</option>`;
            }
        }).catch((error) => {
            console.log(error);
        });
    })

    aceptar.addEventListener("click", () => {

    if(localidades.value!=""){
        document.getElementById("detallesCiudad").style.display = "block";
        document.getElementById("cargandoMensajeCiudad").style.display = "block";

    let indiceCiudad = localidades.selectedIndex;
    let ciudad = arrayResultadosAJAX[indiceCiudad];
    let nombre = ciudad["name"];
    let latitud = ciudad["point"]["coordinates"][0];
    let longitud = ciudad["point"]["coordinates"][1];
    let id;

    peticionCiudad(latitud, longitud).then((respJson) => {
        id = respJson;
        setTimeout(() => {
            datosCiudad(id).then((resp) => {
                const ciudadData = resp;

                
                const detallesCiudadDiv = document.getElementById("detallesCiudad");
                detallesCiudadDiv.style.display="block";
                document.getElementById("cargandoMensajeCiudad").style.display = "none";
                if(ciudadData.data.population==0){
                    ciudadData.data.population="Información no encontrada";
                }else{
                    ciudadData.data.population += " habitantes"
                }
                detallesCiudadDiv.innerHTML = `
                    <h2>${ciudadData.data.city}</h2>
                    <p>País: ${ciudadData.data.country}</p>
                    <p>Región: ${ciudadData.data.region}</p>
                    <p id="poblacion">Población: ${ciudadData.data.population}</p>
                    <p>Latitud: ${ciudadData.data.latitude}</p>
                    <p>Longitud: ${ciudadData.data.longitude}</p>
                    <p>Altura del nivel del mar: ${ciudadData.data.elevationMeters} m</p>
                    <p>Zona Horaria: ${ciudadData.data.timezone}</p>
                `;
            }).catch((error) => {
                console.log(error);
            });
        }, 1500);
    }).catch((error) => {
        console.log(error);
    });
        
    }else{
        localidades.style.border="2px solid red";
    }
        
});

})
