function validateForm() {
    var frmValor = document.forms["formLancamento"]["valor"].value;
    if (frmValor == "") {
      alert("Campo valor vazio");
      return false;
    }
  }

// function selectId(id){
//     return document.getElementById(id);
// }

// function empty(input){
//     return input.value.trim()==="";
// }

// function errorMessage(message){
//     errorListUl.innerHTML += "<li>" + message + "</li>";
// }

// let valor = select('Valor');

// let errorListUl = document.querySelector('#error-list ul');

// form.addEventListener("submit",function(ev){
//     ev.prevenDefault();

//     errorListUl.innerHTML = '';

//     if(empty(valor.value)) {
//         erroListUl.innerHTML += "<li> Campo <b>valor<b> não informado</li>";
//     }
// });

