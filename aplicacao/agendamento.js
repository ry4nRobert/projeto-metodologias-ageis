let agendamentos = [];

document.getElementById('ag-data').min = new Date().toISOString().split('T')[0];



function agendar() {
    const nome    = document.getElementById('ag-nome').value.trim();
    const servico = document.getElementById('ag-servico').value;
    const data    = document.getElementById('ag-data').value;
    const hora    = document.getElementById('ag-hora').value;

    if (!nome || !servico || !data || !hora) {
        toast('Preencha todos os campos!', false);
        return;
    }


    const [ano, mes, dia] = data.split('-');
    const dataFormatada = `${dia}/${mes}/${ano}`;

    agendamentos.push({
        id: Date.now(),
        nome,
        servico,
        dataFormatada,
        hora
    });

    renderLista();
    toast(`${nome} agendado com sucesso!`);
    limparCampos();
}



function remover(id) {
    agendamentos = agendamentos.filter(a => a.id !== id);
    renderLista();
}

function renderLista() {
    const lista = document.getElementById('ag-lista');
    const badge = document.getElementById('ag-count');

    badge.textContent = agendamentos.length;

    if (agendamentos.length === 0) {
        lista.innerHTML = `
            <div class="ag-empty">
                <i class="ti ti-calendar-off"></i>
                Nenhum agendamento ainda
            </div>
        `;
        return;
    }

    lista.innerHTML = agendamentos.map(a => `
        <div class="ag-item">
            <div class="ag-item-icon">
                <i class="ti ti-user"></i>
            </div>
            <div class="ag-item-body">
                <div class="ag-item-name">${a.nome}</div>
                <div class="ag-item-service">${a.servico}</div>
                <div class="ag-item-meta">
                    <span><i class="ti ti-calendar"></i>${a.dataFormatada}</span>
                    <span><i class="ti ti-clock"></i>${a.hora}</span>
                </div>
            </div>
            <button class="ag-del" onclick="remover(${a.id})" aria-label="Remover agendamento de ${a.nome}">
                <i class="ti ti-trash"></i>
            </button>
        </div>
    `).join('');
}

function toast(msg, sucesso = true) {
    const el    = document.getElementById('ag-toast');
    const msgEl = document.getElementById('ag-toast-msg');

    msgEl.textContent = msg;
    el.style.background = sucesso ? '#3B6D11' : '#A32D2D';

    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2800);
}

function limparCampos() {
    document.getElementById('ag-nome').value    = '';
    document.getElementById('ag-servico').value = '';
    document.getElementById('ag-data').value    = '';
    document.getElementById('ag-hora').value    = '';
}