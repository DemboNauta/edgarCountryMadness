window.addEventListener("load", async () => {
    async function buscaPais(){
        let pais=document.getElementById("pais");
        const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/countries?namePrefix=${pais.value}&namePrefixDefaultLangResults=true&languageCode=ES`;
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
            return result;
        } catch (error) {
            console.error(error);
        }
    }
    async function datosPais(code){
        const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${code}?languageCode=es`;
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
            return result;
        } catch (error) {
            console.error(error);
        }
    }
    let buscarPais=document.getElementById("buscarPais");

    buscarPais.addEventListener("click",()=>{
        document.getElementById("cargandoMensaje").style.display = "block";

        buscaPais().then((respJson)=>{
            let code=respJson.data[0].code;
            setTimeout(() => {
                datosPais(code).then((resp) => {
                    document.getElementById("cargandoMensaje").style.display = "none";
                    let datosDelPais = document.getElementById("datosDelPais");
                    datosDelPais.innerHTML="";
                    let h2 = document.createElement("h2");
                    let nombreP = document.createElement("p");
                    let codigoP = document.createElement("p");
                    let capitalP = document.createElement("p");
                    let callingCodeP = document.createElement("p");
                    let monedaP = document.createElement("p");
                    let img = document.createElement("img");
                    let numRegionsP = document.createElement("p");
                    datosDelPais.style.border="3px solid white"
                    h2.textContent = "Datos del país";
                    nombreP.textContent = `Nombre: ${resp.data.name}`;
                    codigoP.textContent = `Código: ${resp.data.code}`;
                    capitalP.textContent = `Capital: ${resp.data.capital}`;
                    callingCodeP.textContent = `Prefijo telefónico: ${resp.data.callingCode}`;
                    monedaP.textContent = `Moneda: ${resp.data.currencyCodes[0]}`;
                    img.src = resp.data.flagImageUri;
                    img.alt = `Bandera de ${resp.data.name}`;
                    img.width = "300";
                    numRegionsP.textContent = `Número de regiones/comunidades: ${resp.data.numRegions}`;
                    
                    datosDelPais.appendChild(h2);
                    datosDelPais.appendChild(nombreP);
                    datosDelPais.appendChild(codigoP);
                    datosDelPais.appendChild(capitalP);
                    datosDelPais.appendChild(callingCodeP);
                    datosDelPais.appendChild(monedaP);
                    datosDelPais.appendChild(img);
                    datosDelPais.appendChild(numRegionsP);

                }).catch((error) => {
                    console.log(error);
                });
            }, 1500);

        })
    })
})
