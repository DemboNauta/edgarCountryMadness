window.addEventListener("load", () => {
    
    //En esta parte controlo el tema de dependiendo a que opcion le des las demás se oculten
    let sectionDatosLugar= document.getElementById("sectionDatosLugar");
    let sectionAdivinaElPais=document.getElementById("sectionAdivinaElPais");
    let sectionDatosPais=document.getElementById("sectionDatosPais");
    let optionDatosLugar= document.getElementById("optionDatosLugar");
    let adivinaElPais=document.getElementById("adivinaElPais");
    let optionDatosPais=document.getElementById("optionDatosPais");

    optionDatosLugar.addEventListener("click", ()=>{
        sectionDatosLugar.classList.remove("hidden");
        optionDatosLugar.classList.add("selected");
        sectionAdivinaElPais.classList.add("hidden");
        sectionDatosPais.classList.add("hidden");
        adivinaElPais.classList.remove("selected");
        optionDatosPais.classList.remove("selected");


    })
    adivinaElPais.addEventListener("click", ()=>{
        sectionAdivinaElPais.classList.remove("hidden");
        adivinaElPais.classList.add("selected");
        sectionDatosLugar.classList.add("hidden");
        sectionDatosPais.classList.add("hidden");
        optionDatosLugar.classList.remove("selected");
        optionDatosPais.classList.remove("selected");
    })
    optionDatosPais.addEventListener("click", ()=>{
        sectionDatosPais.classList.remove("hidden");
        optionDatosPais.classList.add("selected");
        sectionAdivinaElPais.classList.add("hidden");
        sectionDatosLugar.classList.add("hidden");
        optionDatosLugar.classList.remove("selected");
        adivinaElPais.classList.remove("selected");
    })
//Aqui controlamos el tema oscuro y claro
    const body = document.body;
    const botonTema = document.getElementById('modoOscuro');
    const container=document.getElementById('container');
    const titulo=document.getElementById('titulo');

    botonTema.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        botonTema.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            body.style.backgroundBlendMode = 'difference';
            botonTema.style.backgroundColor = '#182329'; 
            botonTema.style.color = 'white';    
            titulo.style.color = 'white';    
            container.style.backgroundColor="#b1b1b192";        
            container.style.border="3px solid white"
            botonTema.textContent="Modo Claro"
        } else {
            body.style.backgroundBlendMode = 'unset';
            botonTema.style.backgroundColor = '#e2d1c9';            
            botonTema.style.color = '#000';    
            titulo.style.color = 'black';    
            container.style.border="3px solid #e2d1c9"
            botonTema.textContent="Modo Oscuro"

        }
    });
});
