var pagUrl = "";
if (document.getElementById("senate_data")) {
  var pagUrl = 'https://api.propublica.org/congress/v1/113/senate/members.json'
} else {
  var pagUrl = 'https://api.propublica.org/congress/v1/113/house/members.json'
};

var miembros = [];

var datos = new Vue({
  el: '#app',
  data: {
    pagUrl: pagUrl,
    members: [],
    membersAux: [],
    democrats: [],
    republicans: [],
    independents: [],
    numberOfDemocrats: 0,
    numberOfIndependents: 0,
    numberOfRepublicans: 0,
    total: 0,
    democratsVotes: 0,
    republicansVotes: 0,
    independentsVotes: 0,
    total_average: 0,
    diezPorcent: 0,
    ordenadosA: [],
    leastAttendance: [],
    mostAttendance: [],
    least_loyal: [],
    most_loyal: [],
  },
  methods: {
    // FUNCION PARA TRAER LA DATA Y LLENAR MIS DATOS GENERALES
    traeData: function () {
      fetch(pagUrl, {
        headers: {
          'X-API-Key': 'D2sQEk1LttT9w8Vydx7vfZZtD3Cag10zupr6TxbL'
        }
      }).then(function (laRespuesta) {
        return laRespuesta.json()
      }).then(function (dataGral) {
        datos.members = dataGral.results[0].members;
        miembros = dataGral.results[0].members;
        datos.membersAux = dataGral.results[0].members;
        datos.democrats = miembros.filter(item => item.party == "D");
        datos.republicans = miembros.filter(item => item.party == "R");
        datos.independents = miembros.filter(item => item.party == "I")
        datos.numberOfDemocrats = datos.democrats.length;
        datos.numberOfRepublicans = miembros.filter(item => item.party == "R").length;
        datos.numberOfIndependents = miembros.filter(item => item.party == "I").length;
        datos.total = parseInt(datos.numberOfDemocrats + datos.numberOfIndependents + datos.numberOfRepublicans);
        datos.democratsVotes = datos.sumaVotes(datos.democrats).toFixed(2);
        datos.republicansVotes = datos.sumaVotes(datos.republicans).toFixed(2);
        datos.independentsVotes = datos.sumaVotes(datos.independents).toFixed(2);
        datos.total_average = datos.sumaVotes(miembros).toFixed(2);
        datos.diezPorcent = Math.round(miembros.length * 0.10);
        datos.mostAttendance = datos.menores10(datos.ordenarA());
        datos.leastAttendance = datos.mayores10(datos.ordenarA());
        datos.least_loyal = datos.topMenosLoyalty(datos.ordenarL());
        datos.most_loyal = datos.topMostLoyalty(datos.ordenarL());
        console.log(pagUrl);

      }).catch((error) => console.error("Error de Fetch"))
    },
    // FUNCION PARA FILTRAR DATA
    filtrar: function () {
      // variables a crear
      let items = [];
      let aux = [];
      let stateSelect = document.getElementById("select-states").value;
      let final = [];

      // traer checkboxes checked
      let checkeds = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(element => element.value);

      // Filtro de Party 
      checkeds.forEach(element => {
        aux = datos.membersAux;
        aux = datos.membersAux.filter(item => item.party === element);
        items.push.apply(items, aux);
      })
      // Seleccion de State
      for (var i = 0; i < items.length; i++) {
        if (items[i].state == stateSelect || stateSelect == "ALL") {
          final.push(items[i])
        };
      }
      datos.members = final;
    },
    // FUNCION PARA OBTERNER PORCENTAJE DE VOTOS POR PARTIDO
    sumaVotes: function (array) {
      let suma = (0);
      for (let i = 0; i < array.length; i++) {
        suma = suma + array[i].votes_with_party_pct;
        // console.log(suma)
      }
      // console.log(typeof (suma));
      if (suma > -1) {
        return suma / array.length;
      } else {
        return suma
      }
    },
    // funciones para Ordenar la data
    ordenarA: function () {
      /*console.log("entra a ordenarA")*/
      var dataSortAttendance = miembros.sort(function (a, b) {
        if (a.missed_votes_pct > b.missed_votes_pct) {

          return 1;
        }
        if (a.missed_votes_pct < b.missed_votes_pct) {

          return -1;
        }
        // a must be equal to b

        return 0;
      });
      return dataSortAttendance;
    },
    ordenarL: function () {
      var dataSortLoyalty = miembros.sort(function (a, b) {
        if (a.votes_with_party_pct > b.votes_with_party_pct) {
          return 1;
        }
        if (a.votes_with_party_pct < b.votes_with_party_pct) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      return dataSortLoyalty;
    },
    // FUNCIONES PARA TOMAR EL ARRAY DEL 10%
    // top 10 menores ATTENDANCE
    menores10: function (data) {
      var menores = [];
      for (var x = 0; x < datos.diezPorcent; x++)
        menores.push(data[x]);

      while (menores[menores.length - 1].missed_votes_pct === data[x].missed_votes_pct) {
        menores.push(data[x]);
        x++
      }
      return menores;
    },
    // top 10 mayores ATTENDANCE
    mayores10: function (data) {
      var mayores = [];
      for (var x = data.length - 1; x >= data.length - datos.diezPorcent; x--) {
        mayores.push(data[x]);
      }
      while (mayores[mayores.length - 1].missed_votes_pct === data[x].missed_votes_pct) {
        mayores.push(data[x]);
        x++
        // console.log(data[x]);
      }
      return mayores;
    },
    //  loyalty
    topMenosLoyalty: function (data) {
      var menores = [];
      for (var x = 0; x < datos.diezPorcent; x++)
        menores.push(data[x]);

      while (menores[menores.length - 1].votes_with_party_pct === data[x].votes_with_party_pct) {
        menores.push(data[x]);
        x++
      }
      return menores;
    },
    topMostLoyalty: function (data) {
      var mayores = [];
      for (var x = data.length - 1; x >= data.length - datos.diezPorcent; x--) {
        mayores.push(data[x]);
      }
      while (mayores[mayores.length - 1].votes_with_party_pct === data[x].votes_with_party_pct) {
        mayores.push(data[x]);
        x++
        // console.log(data[x]);  
      }
      return mayores;
    }
  } // aca termina methods
});
datos.traeData();
/* PENDIENTES: 
    1- solo quitar el NaN cuando es 0 los insdependientes.*/