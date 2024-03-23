window.addEventListener("DOMContentLoaded", () => {
    let btnTutorial = document.getElementById("btnTutorial");
    let contadorTutorial = document.getElementById("contadorTutorial");
    let tutorialDiv = document.getElementById("tutorial");
    let btnJugar = document.getElementById("btnJugar");
    let banderaPais = document.getElementById("banderaPais"); 

    btnTutorial.addEventListener("click", () => {
        tutorialDiv.classList.remove('hidden');
        tutorialDiv.classList.add('fade-in');
        btnTutorial.classList.add('hidden');
        contadorTutorial.style.fontWeight = "bolder";
        contadorTutorial.style.color = "red";
        contadorTutorial.style.fontSize = "1.5em";
        contador=0;
        contadorTutorial.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            let intervalo = setInterval(() => {
                if (contador >= 14) {
                    clearInterval(intervalo);
                }
                contador++;
                contadorTutorial.textContent = contador;
            }, 1500);
        }, 7000);
    });

    btnJugar.addEventListener("click", () => {

        tutorialDiv.innerHTML = "";
    });

    const paisesDisponibles = [
        { nombre: "Argentina", codigo: "AR" },
        { nombre: "España", codigo: "ES" },
        { nombre: "México", codigo: "MX" },
        { nombre: "Colombia", codigo: "CO" },
        { nombre: "Perú", codigo: "PE" },
        { nombre: "Chile", codigo: "CL" },
        { nombre: "Ecuador", codigo: "EC" },
        { nombre: "Venezuela", codigo: "VE" },
        { nombre: "Guatemala", codigo: "GT" },
        { nombre: "Cuba", codigo: "CU" },
        { nombre: "Alemania", codigo: "DE" },
        { nombre: "Francia", codigo: "FR" },
        { nombre: "Italia", codigo: "IT" },
        { nombre: "Reino Unido", codigo: "GB" },
        { nombre: "Países Bajos", codigo: "NL" },
        { nombre: "Suiza", codigo: "CH" },
        { nombre: "Suecia", codigo: "SE" },
        { nombre: "Noruega", codigo: "NO" },
        { nombre: "Dinamarca", codigo: "DK" },
        { nombre: "Finlandia", codigo: "FI" },
        { nombre: "Portugal", codigo: "PT" },
        { nombre: "Grecia", codigo: "GR" },
        { nombre: "Polonia", codigo: "PL" },
        { nombre: "Austria", codigo: "AT" },
        { nombre: "Bélgica", codigo: "BE" },
        { nombre: "Hungría", codigo: "HU" },
        { nombre: "Irlanda", codigo: "IE" },
        { nombre: "República Checa", codigo: "CZ" },
        { nombre: "Eslovaquia", codigo: "SK" },
        { nombre: "Croacia", codigo: "HR" },
        { nombre: "Brasil", codigo: "BR" },
        { nombre: "Estados Unidos", codigo: "US" },
        { nombre: "Canadá", codigo: "CA" },
        { nombre: "Uruguay", codigo: "UY" },
        { nombre: "Paraguay", codigo: "PY" },
        { nombre: "Bolivia", codigo: "BO" },
        { nombre: "Costa Rica", codigo: "CR" },
        { nombre: "Panamá", codigo: "PA" },
        { nombre: "Nicaragua", codigo: "NI" },
        { nombre: "El Salvador", codigo: "SV" },
        { nombre: "Honduras", codigo: "HN" },
        { nombre: "República Dominicana", codigo: "DO" },
        { nombre: "Jamaica", codigo: "JM" },
        { nombre: "Trinidad y Tobago", codigo: "TT" }
    ];
    let paisesRestantes = [...paisesDisponibles];

    let puntos = 0;
    let paisActual = null;

    function obtenerValorMaximo() {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('maximo=')) {
                return cookie.substring('maximo='.length);
            }
        }
        return null;
    }
    const valorMaximo = obtenerValorMaximo();
    async function obtenerNombrePaisAleatorio() {
        document.getElementById("maximosPuntos").textContent=obtenerValorMaximo();
        
        
        if (paisesRestantes.length === 0) {
            alert("¡Has adivinado todos los países!");
            return;
        }

        const indiceAleatorio = Math.floor(Math.random() * paisesRestantes.length);
        paisActual = paisesRestantes[indiceAleatorio].codigo;
        paisNom = paisesRestantes[indiceAleatorio].nombre;


        paisesRestantes.splice(indiceAleatorio, 1);

        const resultado = await buscaPais(paisActual);
        mostrarInformacion(resultado);
    }

    async function gifErrorGenerator() {
        const url = 'https://giphy.p.rapidapi.com/v1/gifs/search?api_key=5MQ8nkzzAaNxW3QbnGztFMlcgwZbrStu&q=mal&limit=25';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'fe868c7464msh4e0084abeab8ac9p16ec2bjsn3dbfcfc38c99',
                'X-RapidAPI-Host': 'giphy.p.rapidapi.com'
            }
        };
    
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            let gifUrl;
            let gifRandom=Math.floor(Math.random()*25);
            gifUrl = result.data[gifRandom].images.original.url;
            return gifUrl;
            
        } catch (error) {
            console.error(error);
        }
    }
    
    function confirmarPais() {

        const inputPais = document.getElementById('inputPais');
        if (inputPais.value.toLowerCase().trim()=== paisNom.toLowerCase()) {
            puntos++;
            inputPais.value="";
            let mensajeAcierto = document.getElementById("mensajeAcierto");
            mensajeAcierto.classList.add("mostrar");
            setTimeout(() => {
                mensajeAcierto.classList.remove("mostrar");
            }, 1000);
        } else {
            document.getElementById("paisCorrecto").textContent=paisNom;
            if(puntos>obtenerValorMaximo()){
                document.cookie=`maximo=${puntos}`;
            }
            
            gifErrorGenerator().then((bien)=>{
                document.getElementById("fotoError").src= bien
                document.getElementById("fotoError").classList.add("mostrar")
                    document.getElementById("mensajeError").classList.add("mostrar")
                
                setTimeout(() => {
                    document.getElementById("fotoError").classList.remove("mostrar")
                    document.getElementById("mensajeError").classList.remove("mostrar")
                }, 2500);

            }).catch((mal)=>{
                console.log(mal);
            })
            inputPais.value="";
            puntos=0;
        }

        obtenerNombrePaisAleatorio();
    }

    async function buscaPais(paisActual) {
        const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${paisActual}?languageCode=es`;
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

    function mostrarInformacion(infoPais) {
        const contadorPuntos = document.getElementById('contadorPuntos');
        const paisInfo = infoPais.data;
        banderaPais.src = paisInfo.flagImageUri ?? '';
        contadorPuntos.textContent = puntos;
    }



    btnJugar.addEventListener("click", ()=>{
        document.getElementById("informacionPais").classList.remove("hidden");
        obtenerNombrePaisAleatorio();
    })

    document.getElementById("btnAdivinar").addEventListener("click",()=>{
        confirmarPais();
    })
});
