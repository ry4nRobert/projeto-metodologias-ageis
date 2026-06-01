<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/estilos/loginstyle.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <title>Cadastro — HrOficinas</title>
    <style>
        .error-msg {
            color: #f09595;
            font-size: 12px;
            margin-top: -20px;
            margin-bottom: 10px;
            padding-left: 8px;
            display: none;
        }
        .error-msg.visible { display: block; }
        .input-box input.invalid { border-color: #E24B4A; }

        .toast-reg {
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%) translateY(60px);
            color: #fff;
            font-size: 13px;
            font-weight: 500;
            padding: 11px 22px;
            border-radius: 99px;
            display: flex;
            align-items: center;
            gap: 8px;
            opacity: 0;
            transition: opacity 0.2s, transform 0.25s;
            pointer-events: none;
            white-space: nowrap;
            z-index: 100;
        }
        .toast-reg.show {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }

        .senha-force {
            display: flex;
            gap: 4px;
            margin-top: -18px;
            margin-bottom: 12px;
            padding-left: 4px;
        }
        .bar {
            flex: 1;
            height: 3px;
            border-radius: 4px;
            background: #333;
            transition: background 0.3s;
        }
    </style>
</head>
<body>
    <main class="container">
        <h1>Cadastro</h1>

        <div class="input-box">
            <input placeholder="Nome completo" type="text" id="reg-nome">
            <i class="bx bxs-user"></i>
        </div>
        <p class="error-msg" id="err-nome">Nome deve ter ao menos 2 letras (só letras).</p>

        <div class="input-box">
            <input placeholder="E-mail" type="email" id="reg-email">
            <i class="bx bxs-envelope"></i>
        </div>
        <p class="error-msg" id="err-email">Informe um e-mail válido.</p>

        <div class="input-box">
            <input placeholder="Senha (mín. 6 caracteres)" type="password" id="reg-senha">
            <i class="bx bxs-lock-alt"></i>
        </div>
        <div class="senha-force">
            <div class="bar" id="bar1"></div>
            <div class="bar" id="bar2"></div>
            <div class="bar" id="bar3"></div>
        </div>
        <p class="error-msg" id="err-senha">Senha deve ter no mínimo 6 caracteres.</p>

        <div class="input-box">
            <input placeholder="Confirmar senha" type="password" id="reg-confirma">
            <i class="bx bxs-lock"></i>
        </div>
        <p class="error-msg" id="err-confirma">As senhas não coincidem.</p>

        <button type="button" class="login" onclick="registrar()">Criar conta</button>

        <div class="register-link">
            <p>Já tem uma conta? <a href="login.html">Faça login</a></p>
        </div>
    </main>

    <div class="toast-reg" id="toast-reg">
        <i id="toast-icon" class="bx bx-check"></i>
        <span id="toast-msg">Conta criada!</span>
    </div>

    <script>
        // Só letras no campo nome
        document.getElementById('reg-nome').addEventListener('input', function () {
            this.value = this.value.replace(/[^A-Za-zÀ-ÿ\s\-']/g, '');
        });

        // Força da senha
        document.getElementById('reg-senha').addEventListener('input', function () {
            const v = this.value;
            const force = (v.length >= 6 ? 1 : 0) + (/[A-Z]/.test(v) || /\d/.test(v) ? 1 : 0) + (/[^A-Za-z0-9]/.test(v) ? 1 : 0);
            const colors = ['#A32D2D', '#E28B4A', '#3B6D11'];
            ['bar1','bar2','bar3'].forEach((id, i) => {
                document.getElementById(id).style.background = i < force ? colors[force-1] : '#333';
            });
        });

        function showToast(msg, sucesso = true) {
            const el = document.getElementById('toast-reg');
            document.getElementById('toast-msg').textContent = msg;
            document.getElementById('toast-icon').className = sucesso ? 'bx bx-check' : 'bx bx-error-circle';
            el.style.background = sucesso ? '#3B6D11' : '#A32D2D';
            el.classList.add('show');
            setTimeout(() => el.classList.remove('show'), 3000);
        }

        function limparErros() {
            ['err-nome','err-email','err-senha','err-confirma'].forEach(id => document.getElementById(id).classList.remove('visible'));
            ['reg-nome','reg-email','reg-senha','reg-confirma'].forEach(id => document.getElementById(id).classList.remove('invalid'));
        }

        function registrar() {
            limparErros();
            const nome     = document.getElementById('reg-nome').value.trim();
            const email    = document.getElementById('reg-email').value.trim();
            const senha    = document.getElementById('reg-senha').value;
            const confirma = document.getElementById('reg-confirma').value;

            let valido = true;

            if (!nome || !/^[A-Za-zÀ-ÿ\s\-']{2,60}$/.test(nome)) {
                document.getElementById('err-nome').classList.add('visible');
                document.getElementById('reg-nome').classList.add('invalid');
                valido = false;
            }

            if (!email || !/\S+@\S+\.\S+/.test(email)) {
                document.getElementById('err-email').classList.add('visible');
                document.getElementById('reg-email').classList.add('invalid');
                valido = false;
            }

            if (!senha || senha.length < 6) {
                document.getElementById('err-senha').classList.add('visible');
                document.getElementById('reg-senha').classList.add('invalid');
                valido = false;
            }

            if (senha !== confirma) {
                document.getElementById('err-confirma').classList.add('visible');
                document.getElementById('reg-confirma').classList.add('invalid');
                valido = false;
            }

            if (!valido) return;

            const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
            if (usuarios.find(u => u.email === email)) {
                showToast('E-mail já cadastrado!', false);
                document.getElementById('reg-email').classList.add('invalid');
                return;
            }

            usuarios.push({ nome, email, senha });
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            showToast('Conta criada com sucesso!');
            setTimeout(() => window.location.href = 'login.html', 1800);
        }

        document.addEventListener('keydown', e => { if (e.key === 'Enter') registrar(); });
    </script>
</body>
</html>