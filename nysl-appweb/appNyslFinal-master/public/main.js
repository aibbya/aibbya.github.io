$(document).ready(function () {
  const historial = ['#index']
  $('#index .botonPpal').click(function (evento) {
    evento.preventDefault();
    // console.log('Boton:' + evento.target);

    let proximaSection = evento.currentTarget.children[0].hash;
    console.log(proximaSection)

    $('#contenedor .mostrar').removeClass('mostrar');
    historial.push(proximaSection)
    $(proximaSection).addClass('mostrar');

  })

  $('.logo').click(function (evento) {
    evento.preventDefault();
    console.log(evento.target.offsetParent.hash);
    let proximaSection = evento.target.offsetParent.hash;
    console.log(proximaSection);
    $('#contenedor .mostrar').removeClass('mostrar');
    $(proximaSection).addClass('mostrar');

  })

  $(document).on('click', '.irSedes', function (evento) {
    evento.preventDefault();
    console.log('asdasd');
    let proximaSection = evento.target.hash;
    $('#contenedor .mostrar').removeClass('mostrar');
    $('#sedes').addClass('mostrar')
  });

  $(document).on('click', '.irForos', function (evento) {
    console.log('hoa')
    evento.preventDefault();


    $('#contenedor .mostrar').removeClass('mostrar');
    $('#foros').addClass('mostrar')
  });
  $(document).on('click', '.back', function (evento) {
    console.log('hoa')
    evento.preventDefault();
    let ultimaPagina = historial[historial.length-1]

    $('#contenedor .mostrar').removeClass('mostrar');
    $('#foros').addClass('mostrar')
    historial.pop();
  });
  mostrarSedes();
  mostrarEquipos();
  mostrarFechasseptiembre();


})

function mostrarSedes() {
  datos.sedes.forEach(location => {

    $('#locations ').append(`
                <div class="mt-3">
  <div class="col-8 mx-auto align-middle d-block boton botonSedes" data-toggle="modal" data-target="#${location.id}">
      <span>${location.name}</span>
  </div>

  <div class="modal fade" id="${location.id}">
      <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content ">
          <!-- Modal header -->
              <div class="modal-header">
                  <div>
                      <h4 class="modal-title">${location.name}</h4>
                      <br>
                      <h6>${location.address}</h6>
                  </div>

                  <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              
               <!-- Modal body -->
              <div class="modal-body">
                  <div class="embed-responsive embed-responsive-16by9 ">                       
                  <iframe class="border" src="${location.map}"></iframe>
                  </div>
               </div>

           </div>
       </div>
   </div>

 </div>
   `)

  })
}

function mostrarEquipos() {

  datos.equipos.forEach(team => {
    $('#teams').append(`
      <div id="${team.team_id}" class="col-8 mx-auto d-block boton botonEquipos" data-toggle="modal" data-target="#m${team.team_id}">
          <span>${team.team_name}</span>
          <img class="icons" src="${team.team_logo_img}" alt="${team.team_name}">
      </div>

      <div class="modal fade" id="m${team.team_id}">
      <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content ">
          <!-- Modal header -->
              <div class="modal-header">
                  <div>
                      <h4 class="modal-title">${team.team_name}</h4>
                      <br>
                      <h6>Puntuación: ${team.points}</h6>
                  </div>

                  <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              
               <!-- Modal body -->
              <div class="modal-body">
                  <div>                       
                  <p> Posición: ${team.team_position}</p>
                  </div>
               </div>

           </div>
       </div>
   </div>
      `)
  })


}

function mostrarFechasseptiembre() {
  var juegos01Sep = datos.juegos.filter(x => x.day === "01");
  var juegos08Sep = datos.juegos.filter(x => x.day === "08");
  var juegos15Sep = datos.juegos.filter(x => x.day === "15");
  var juegos22Sep = datos.juegos.filter(x => x.day === "22");
  var juegos29Sep = datos.juegos.filter(x => x.day === "29");

  function armmaDia(juego) {

    $('#septiembre').append(`
      <h3 data-toggle="collapse" data-target=".` + juego[0].dayID + `" aria-expanded="false" aria-controls="juego1 juego2"
      class="dias">` + juego[0].fullDay + `</h3>`);

    juego.forEach(partido => {
      $('#septiembre').append(`
        <div class="collapse offset-1 ` + partido.dayID + ` " id="` + partido.idCollap + `">
        <h4 id="` + partido.matchID + `" data-toggle="collapse" href=".` + partido.horario + `" aria-expanded="false" aria-controls="` + partido.matchID + `">` + partido.team1 + ` vs ` + partido.team2 + ` </h4>
        <p class="juego collapse ` + partido.horario + `"> hora: ` + partido.time + `Sede: ` + partido.location + ` <a class="irSedes" href="#sedes"> (Ver Sedes) </a> <br>
        <a class="irForos" href="#foros"> Ir al foro de este partido </a> </p> 
        </div>
        `);
    })

  }

  armmaDia(juegos01Sep);
  armmaDia(juegos08Sep);
  armmaDia(juegos15Sep);
  armmaDia(juegos22Sep);
  armmaDia(juegos29Sep);

}