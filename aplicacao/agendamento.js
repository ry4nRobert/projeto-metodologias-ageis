// Verifica se o usuário está logado
function verificarLogin() {
    const usuario = sessionStorage.getItem('usuarioLogado') || localStorage.getItem('usuarioLogado');
    if (!usuario) {
        // Salva a intenção de ir para agendamento
        sessionStorage.setItem('redirecionarPara', 'agendamento.html');
        window.location.href = 'login.html';
    }
}

verificarLogin();

let agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');

// Define mínimo de data como hoje
const hoje = new Date();
document.getElementById('ag-data').min = hoje.toISOString().split('T')[0];

// Atualiza horários mínimos ao mudar a data
document.getElementById('ag-data').addEventListener('change', function () {
    atualizarHoraMin();
});

function atualizarHoraMin() {
    const dataInput = document.getElementById('ag-data').value;
    const horaInput = document.getElementById('ag-hora');

    if (!dataInput) return;

    const dataSelecionada = new Date(dataInput + 'T00:00:00');
    const agora = new Date();
    const ehHoje = dataSelecionada.toDateString() === agora.toDateString();

    if (ehHoje) {
        // Se for hoje, horário mínimo é a hora atual + 1h (arredondado)
        const horaAtual = agora.getHours();
        const minAtual = agora.getMinutes();
        let horaMin = horaAtual + 1;
        if (minAtual > 0) horaMin++;
        if (horaMin < 7) horaMin = 7;
        if (horaMin > 18) {
            toast('Não há mais horários disponíveis para hoje.', false);
            document.getElementById('ag-data').value = '';
            horaInput.min = '07:00';
            return;
        }
        horaInput.min = `${String(horaMin).padStart(2, '0')}:00`;
    } else {
        horaInput.min = '07:00';
    }
}

function validarNome(nome) {
    // Permite letras (incluindo acentuadas), espaços e hífens
    return /^[A-Za-zÀ-ÿ\s\-']{2,60}$/.test(nome);
}

function validarDataHora(data, hora) {
    if (!data || !hora) return false;
    const dataHora = new Date(`${data}T${hora}:00`);
    const agora = new Date();
    return dataHora > agora;
}

function agendar() {
    const nome    = document.getElementById('ag-nome').value.trim();
    const servico = document.getElementById('ag-servico').value;
    const data    = document.getElementById('ag-data').value;
    const hora    = document.getElementById('ag-hora').value;

    if (!nome || !servico || !data || !hora) {
        toast('Preencha todos os campos!', false);
        return;
    }

    if (!validarNome(nome)) {
        toast('Nome inválido! Use apenas letras.', false);
        document.getElementById('ag-nome').focus();
        return;
    }

    if (!validarDataHora(data, hora)) {
        toast('Data e horário não podem ser no passado!', false);
        return;
    }

    // Verifica horário comercial (07:00 às 18:00)
    const [h] = hora.split(':').map(Number);
    if (h < 7 || h >= 18) {
        toast('Horário fora do expediente (07h–18h)!', false);
        return;
    }

    const [ano, mes, dia] = data.split('-');
    const dataFormatada = `${dia}/${mes}/${ano}`;

    const novoAgendamento = {
        id: Date.now(),
        nome,
        servico,
        dataFormatada,
        hora
    };

    agendamentos.push(novoAgendamento);
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

    renderLista();
    toast(`${nome} agendado com sucesso!`);
    limparCampos();
}

function remover(id) {
    agendamentos = agendamentos.filter(a => a.id !== id);
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
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
    const icon  = el.querySelector('i');

    msgEl.textContent = msg;
    el.style.background = sucesso ? '#3B6D11' : '#A32D2D';
    icon.className = sucesso ? 'ti ti-check' : 'ti ti-alert-circle';

    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2800);
}

function limparCampos() {
    document.getElementById('ag-nome').value    = '';
    document.getElementById('ag-servico').value = '';
    document.getElementById('ag-data').value    = '';
    document.getElementById('ag-hora').value    = '';
}

// Validação em tempo real do campo nome (bloqueia números)
document.getElementById('ag-nome').addEventListener('input', function () {
    const val = this.value;
    // Remove qualquer caractere que não seja letra, espaço, hífen ou apóstrofo
    this.value = val.replace(/[^A-Za-zÀ-ÿ\s\-']/g, '');
});

// Renderiza ao carregar
renderLista();

// Exibe nome do usuário logado
const usuarioLogado = sessionStorage.getItem('usuarioLogado') || localStorage.getItem('usuarioLogado');
if (usuarioLogado) {
    try {
        const u = JSON.parse(usuarioLogado);
        const el = document.getElementById('ag-usuario');
        if (el) el.textContent = u.nome || u.email || 'Usuário';
    } catch(e) {}
}

function logout() {
    sessionStorage.removeItem('usuarioLogado');
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'login.html';
}