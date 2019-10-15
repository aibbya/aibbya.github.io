// llama funcion para cargar pag por 1er vez
verifyPage();

// detecta cambios  en los filtros
document.getElementById('filterParty').addEventListener('change', function () {
  verifyPage();
  mostrarSelect();
});
//verifica que data tomar-------------------------------
function verifyPage() {

  if (document.getElementById("senate_house")) {
    createTable(filterTable(dataHouse.results[0].members), "senate_house");
  } else {
    createTable(filterTable(dataSenate.results[0].members), "senate_data");
  }
}
//  crea tabla--------------------
function createTable(data, id) {
  var myTable = document.getElementById(id);
  myData = addTableToHTML(data);
  myTable.innerHTML = myData;
}
// rellena tabla----------------------------
function addTableToHTML(array) {
  var paraHTML = "<thead > <tr><th> Name </th><th> Party </th> <th> State </th> <th> Seniority </th><th> Porcentage  </th></tr></thead>";
  paraHTML += "<tbody>";

  array.forEach(function (members) {
    paraHTML += '<tr>';
    if (members.middle_name === null) {
      paraHTML += '<td><a href= "' + members.url + '">' + members.first_name + ' ' + members.last_name + '</a></td>';
    } else {
      paraHTML += '<td><a href= "' + members.url + '">' + members.first_name + ' ' + members.middle_name + ' ' + members.last_name + '</a></td>';
    }
    paraHTML += "<td class= 'party'>" + members.party + "</td>";

    paraHTML += "<td class= 'state'>" + members.state + "</td>";
    // addToDropDown(members.state);
    paraHTML += "<td class= 'seniority'>" + members.seniority + "</td>";
    paraHTML += "<td class= 'party'>" + members.votes_with_party_pct + " % </td>";
    paraHTML += "</tr>";
  });
  paraHTML += "</tbody>";
  return paraHTML;
}
// filtra la tabla segun los datos seleccionados
function filterTable(array) {
  // variables a crear
  let items = [];
  let aux = [];
  let stateSelect = document.getElementById("select-states").value;
  let final = [];

  // traer checkboxes checked
  let checkeds = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(element => element.value);

  // Filtro de Party 
  checkeds.forEach(element => {
    aux = [];
    aux = array.filter(item => item.party === element);
    items.push.apply(items, aux);
  })
  // return items;

  // Seleccion de State
  for (var i = 0; i < items.length; i++) {
    if (items[i].state == stateSelect || stateSelect == "ALL") {
      final.push(items[i])
    };
}
  return final;
}

function mostrarSelect() {
  var stateSelect = document.getElementById("select-states").value;

  console.log(stateSelect);
};

// 2DA FORMA DE DE HACER EL SELECT crear el dropdown de los estados desde js
 function addToDropDown (state) {
  var desplegarStates = document.getElementById('select-states');
  var option = document.createElement('OPTION');

  if (desplegarStates.getElementByClassName(state).length == 0){
    option.className = state;
    option.nodeValue = state;
    option.textContent = state;
    desplegarStates.appenChild(option)
  }
};