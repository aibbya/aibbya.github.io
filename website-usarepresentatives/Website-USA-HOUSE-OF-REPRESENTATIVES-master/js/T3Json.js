console.log("probando");
/* VARIABLES GENERALES */

var membersHouse = dataHouse.results[0].members;
var membersSenate = dataSenate.results[0].members;
var republicans = selectData().filter(item => item.party == "R");
var independents = selectData().filter(item => item.party == "I");
var democrats = selectData().filter(item => item.party == "D")
var democratsVotes = parseFloat(sumaVotes(selectData().filter(item => item.party == "D")));
var republicansVotes = parseFloat(sumaVotes(republicans));
var independentsVotes = parseFloat(sumaVotes(independents));
var diezPorcent = Math.round(selectData().length * 0.10);

var menoresMisses = menores10(ordenarA(selectData()));
var mayoresMisses = mayores10(ordenarA(selectData()));
var mostLoyalty = topMostLoyalty(ordenarL(selectData()));
var menosLoyalty = topMenosLoyalty(ordenarL(selectData()));

// DATA JSON..... ----------------------

var stadistic = {
  "numberOfDemocrats": 0,
  "numberOfIndependents": 0,
  "numberOfRepublicans": 0,
  "total": 0,
  "democratsVotes": 0,
  "republicansVotes": 0,
  "independentsVotes": 0,
  "total_average": 0,
  "leastAttendance": [],
  "mostAttendance": [],
  "least_loyal": [],
  "most_loyal": [],
};

function llenarStadistic() {
  stadistic.numberOfDemocrats = selectData().filter(item => item.party == "D").length;
  stadistic.numberOfRepublicans = selectData().filter(item => item.party == "R").length;
  stadistic.numberOfIndependents = selectData().filter(item => item.party == "I").length;
  stadistic.total = parseInt(stadistic.numberOfDemocrats + stadistic.numberOfIndependents + stadistic.numberOfRepublicans);
  stadistic.democratsVotes = (sumaVotes(selectData().filter(item => item.party == "D")));
  stadistic.republicansVotes = (sumaVotes(republicans));
  stadistic.independentsVotes = (sumaVotes(independents));
  stadistic.total_average = (sumaVotes(selectData())).toFixed(2);
  stadistic.mostAttendance = menores10(ordenarA(selectData()));
  stadistic.leastAttendance = mayores10(ordenarA(selectData()));
  stadistic.least_loyal = topMenosLoyalty(ordenarL(selectData()));
  stadistic.most_loyal = topMostLoyalty(ordenarL(selectData()));
}


/* 
°°°°°°°°°°°°°°°°°°°°°°°°°°°
°  FUNCIONES °
°°°°°°°°°°°°°°°°°°°°°°°°°°°      */

// selecciona la data a usar
function selectData() {

  if (document.getElementById("estadisticaGralSENATE")) {
    return membersSenate;
  } else {
    return membersHouse;
  }
}
// Miembros por partido
function members(array, value) {
  array.filter(item => item.party == value).length
}

//   % Voted w/ Party
function sumaVotes(array) {
  let suma = (0);
  for (let i = 0; i < array.length; i++) {
    suma = suma + array[i].votes_with_party_pct;
  }
  if (suma > -1) {
    console.log(typeof (suma));
    return suma / array.length;
  }
};

// console.log(sumaVotes(independents))

// Ordenar 

function ordenarA(array) {
  var dataSortAttendance = selectData().sort(function (a, b) {
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
}

function ordenarL(array) {
  var dataSortLoyalty = selectData().sort(function (a, b) {
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
}

// top 10 menores

function menores10(data) {
  var menores = [];
  for (var x = 0; x < diezPorcent; x++)
    menores.push(data[x]);

  while (menores[menores.length - 1].missed_votes_pct === data[x].missed_votes_pct) {
    menores.push(data[x]);
    x++
  }
  return menores;
};
// top 10 mayores
function mayores10(data) {
  var mayores = [];
  for (var x = data.length - 1; x >= data.length - diezPorcent; x--) {
    mayores.push(data[x]);
  }

  while (mayores[mayores.length - 1].missed_votes_pct === data[x].missed_votes_pct) {
    mayores.push(data[x]);
    x++
    // console.log(data[x]);
  }
  return mayores;
};

//  loyalty
function topMenosLoyalty(data) {
  var menores = [];
  for (var x = 0; x < diezPorcent; x++)
    menores.push(data[x]);

  while (menores[menores.length - 1].votes_with_party_pct === data[x].votes_with_party_pct) {
    menores.push(data[x]);
    x++
  }
  return menores;
}

function topMostLoyalty(data) {
  var mayores = [];
  for (var x = data.length - 1; x >= data.length - diezPorcent; x--) {
    mayores.push(data[x]);
  }
  while (mayores[mayores.length - 1].votes_with_party_pct === data[x].votes_with_party_pct) {
    mayores.push(data[x]);
    x++
    // console.log(data[x]);  
  }
  return mayores;
}

/* 
°°°°°°°°°°°°°°°°°°°°°°°°°°°
°       TABLAS            °
°°°°°°°°°°°°°°°°°°°°°°°°°°°      */
llenarStadistic();
// tabla1 datos generales
var mytable1 = "<thead > <tr><th> Party </th><th> N° of Reps </th> <th> % Voted w/ Party </th> </thead>";
mytable1 += "<tbody>";
mytable1 += "<tr> <td> Democrats </td> <td class='text-center'>" + stadistic.numberOfDemocrats + "</td> <td class='text-center'>" + stadistic.democratsVotes.toFixed(2) + " % </td> </tr>";
mytable1 += "<tr> <td> Republicans </td> <td class='text-center'>" + stadistic.numberOfRepublicans + "</td> <td class='text-center'>" + stadistic.republicansVotes.toFixed(2) + " % </td> </tr>";
if (independents != 0) {
  mytable1 += "<tr> <td> Independents </td> <td class='text-center'>" + stadistic.numberOfIndependents + "</td> <td class='text-center'>" + stadistic.independentsVotes.toFixed(2) + " % </td> </tr>"
} else {
  mytable1 += "<tr> <td> Independents </td> <td class='text-center'>" + " 0 </td> <td class='text-center'>" + 0 + " % </td> </tr>"
};
// console.log(mytable1);
mytable1 += "<tr> <td> TOTAL </td> <td class='text-center'>" + selectData().length + "</td> <td class='text-center'>" + stadistic.total_average + " % </td> </tr></tbody>"

// tables TOPS
function tableTopsAttendance(array) {
  var mytable2 = "<thead > <tr><th> Name </th><th> Missed Votes</th> <th> % Missed Votes </th> </thead><tbody>";
  array.forEach(element => {
    mytable2 += "<tr>";
    if (element.middle_name === null) {
      mytable2 += '<td><a href= "' + element.url + '">' + element.first_name + ' ' + element.last_name + '</a></td>';
    } else {
      mytable2 += '<td><a href= "' + element.url + '">' + element.first_name + ' ' + element.middle_name + ' ' + element.last_name + '</a></td>';
    }
    mytable2 += "<td class='text-center'>" + element.missed_votes + "</td>";

    mytable2 += "<td class='text-center'>" + element.missed_votes_pct + "% </td> </tr>";


  });
  mytable2 += "</tbody>";
  return mytable2;
}

function tableTopsLoyalty(array) {
  var mytable3 = "<thead > <tr><th> Name </th><th> Number Party Votes</th> <th> % Party Votes </th> </thead><tbody>";
  array.forEach(element => {
    mytable3 += "<tr>";
    if (element.middle_name === null) {
      mytable3 += '<td><a href= "' + element.url + '">' + element.first_name + ' ' + element.last_name + '</a></td>';
    } else {
      mytable3 += '<td><a href= "' + element.url + '">' + element.first_name + ' ' + element.middle_name + ' ' + element.last_name + '</a></td>';
    }
    mytable3 += "<td class='text-center'>" + parseInt((element.votes_with_party_pct * element.total_votes) / 100) + "</td>";

    mytable3 += "<td class='text-center'>" + element.votes_with_party_pct + "% </td> </tr>";

  });
  mytable3 += "</tbody>";
  return mytable3;
}

// IMPRIMIR TABLAS

// tabla1 print
document.getElementById('table1').innerHTML = mytable1;


verifyPage();

function verifyPage() {
  if (document.getElementById("attendance")) {
    // ATTENDANCE table2 LEAST comprometidos print
    document.getElementById('table2').innerHTML = tableTopsAttendance(stadistic.leastAttendance);
    // ATTENDANCE table3 MOST comprometidos print
    document.getElementById('table3').innerHTML = tableTopsAttendance(stadistic.mostAttendance);
  } else {
    // LOYALTY table4 LEAST Lealtad print
    document.getElementById('table4').innerHTML = tableTopsLoyalty(stadistic.least_loyal);

    // LOYALTY table5 MOST lealtad print
    document.getElementById('table5').innerHTML = tableTopsLoyalty(stadistic.most_loyal);
  }
}
/* ME QUEDA PENDIENTE:
2- mejorar diseño 

NOTA: */