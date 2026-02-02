const form = document.getElementById('form-atividade');
const emojiAprovado = '&#x1F601'
const emojiReprovado = '&#x1F616'
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite o valor da nota mínima:"))

let linhas = '';

form.addEventListener('submit', function(e) {
    e.preventDefault();

    addLine();
    refreshTable();
    refreshfinalAverage();
});

function addLine() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNota = document.getElementById('nota-atividade');

    if (atividades.includes(inputNomeAtividade.value)){
        alert(`A atividade ${inputNomeAtividade.value} já foi inserida`);
    } else{
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNota.value));

        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNota.value}</td>`;
        linha += `<td class='emoji'>${inputNota.value >= notaMinima ? emojiAprovado : emojiReprovado }</td>`;
        linha += `<tr/>`

        linhas += linha;
    }
    inputNomeAtividade.value = '';
    inputNota.value = '';
}

function refreshTable() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function refreshfinalAverage() {
    const finalAverage = calcFinalAverage();

    document.getElementById('final-average-value').innerHTML = finalAverage;
    document.getElementById('final-average-result').innerHTML = finalAverage >= notaMinima ? spanAprovado : spanReprovado;
}

function calcFinalAverage() {
    let sumNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        sumNotas += notas[i];
    }

    return sumNotas / notas.length;
}