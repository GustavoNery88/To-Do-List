let campoListaDeItens = document.getElementById("to-do-list");

function novaTarefa() {
    let inputEntrada = document.getElementById("input-nova-tarefa");
    if (!inputEntrada.value) {
        inputEntrada.style.border = "1px solid red"
        alert('Digite algo para inserir em sua lista');
    } else if (verificarTarefaRepetida(inputEntrada.value)) {
        alert("Já existe uma tarefa com essa descrição!");
    } else {
        inputEntrada.style.border = "none"
        let values = JSON.parse(localStorage.getItem("valoresGuardados") || '[]');
        values.push({
            nome: inputEntrada.value,
        });
        localStorage.setItem("valoresGuardados", JSON.stringify(values));
        inputEntrada.value = "";
        atualizarLista();
    }
}

function verificarTarefaRepetida(novaTarefa) {
    let values = JSON.parse(localStorage.getItem("valoresGuardados") || '[]');
    for (let i = 0; i < values.length; i++) {
        if (values[i].nome === novaTarefa) {
            return true;
        }
    }
    return false;
}

function atualizarLista() {
    let values = JSON.parse(localStorage.getItem("valoresGuardados") || '[]');
    localStorage.setItem("valoresGuardados", JSON.stringify(values));
    let listaHTML = "";

    for (let i = 0; i < values.length; i++) {
        listaHTML += `<li>${values[i].nome}  <button onclick='removerItem("${values[i].nome}")'> <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
      </svg> </button></li>`;
    }

    campoListaDeItens.innerHTML = listaHTML;
}

function removerItem(data) {
    let values = JSON.parse(localStorage.getItem("valoresGuardados") || '[]');
    let index = values.findIndex(x => x.nome === data);
    values.splice(index, 1);
    localStorage.setItem("valoresGuardados", JSON.stringify(values));
    atualizarLista();
}


// Chama a função atualizarLista ao carregar a página
atualizarLista();
