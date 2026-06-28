// ===== FUNÇÃO ESPELHOS - CORRIGIDA =====
function toggleEspelhos() {
    const select = document.getElementById('temEspelhos');
    const container = document.getElementById('espelhosContainer');
    
    console.log('Toggle chamado. Valor:', select.value); // Para debug
    
    if (select.value === "sim") {
        container.style.display = 'block';
        container.classList.add('active');
    } else {
        container.style.display = 'none';
        container.classList.remove('active');
        // Limpa os campos quando desativado
        document.getElementById('espelhoAtras').value = '';
        document.getElementById('espelhoEsquerda').value = '';
        document.getElementById('espelhoDireita').value = '';
    }
}

// ===== FUNÇÃO PRINCIPAL =====
document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();

    // Captura os valores
    const nomeCliente = document.getElementById('nomeCliente').value.trim();
    const telefoneCliente = document.getElementById('telefoneCliente').value.trim();
    const vendedor = document.getElementById('vendedor').value.trim();
    const tipoPedra = document.getElementById('tipoPedra').value;
    const valorPedra = parseFloat(document.getElementById('valorPedra').value) || 0;
    const tamanhoFrente = parseFloat(document.getElementById('tamanhoFrente').value) || 0;
    const tamanhoLateral = parseFloat(document.getElementById('tamanhoLateral').value) || 0;
    const modeloViolao = document.getElementById('modeloViolao').value;
    const valorCuba = parseFloat(document.getElementById('valorCuba').value) || 0;
    const temFuroTorneira = document.getElementById('temFuroTorneira').value;

    // Espelhos
    const temEspelhos = document.getElementById('temEspelhos').value;
    const espelhoAtras = parseFloat(document.getElementById('espelhoAtras').value) || 0;
    const espelhoEsquerda = parseFloat(document.getElementById('espelhoEsquerda').value) || 0;
    const espelhoDireita = parseFloat(document.getElementById('espelhoDireita').value) || 0;

    // Validações
    const erros = [];
    if (!nomeCliente) erros.push("Nome do cliente é obrigatório");
    if (!telefoneCliente) erros.push("Telefone é obrigatório");
    if (!vendedor) erros.push("Vendedor é obrigatório");
    if (!tipoPedra) erros.push("Selecione o tipo de pedra");
    if (valorPedra <= 0) erros.push("Valor da pedra deve ser maior que zero");
    if (tamanhoFrente <= 0) erros.push("Comprimento deve ser maior que zero");
    if (tamanhoLateral <= 0) erros.push("Largura deve ser maior que zero");

    if (temEspelhos === "sim") {
        if (espelhoAtras < 0 || espelhoEsquerda < 0 || espelhoDireita < 0) {
            erros.push("Espelhos não podem ter valores negativos");
        }
    }

    if (erros.length > 0) {
        alert("⚠️ Por favor, corrija os seguintes erros:\n\n" + erros.join("\n"));
        return;
    }

    // ===== CÁLCULOS =====
    
    // 1. Área da Bancada
    const areaBase = tamanhoFrente * tamanhoLateral;
    
    // 2. Área dos Espelhos
    let areaEspelhos = 0;
    let detalhesEspelhos = [];
    
    if (temEspelhos === "sim") {
        if (espelhoAtras > 0) {
            const area = tamanhoFrente * (espelhoAtras / 100);
            areaEspelhos += area;
            detalhesEspelhos.push({
                nome: "Espelho Atrás",
                dimensao: tamanhoFrente.toFixed(2) + "m × " + espelhoAtras + "cm",
                area: area,
                custo: area * valorPedra
            });
        }
        if (espelhoEsquerda > 0) {
            const area = tamanhoLateral * (espelhoEsquerda / 100);
            areaEspelhos += area;
            detalhesEspelhos.push({
                nome: "Espelho Esquerda",
                dimensao: tamanhoLateral.toFixed(2) + "m × " + espelhoEsquerda + "cm",
                area: area,
                custo: area * valorPedra
            });
        }
        if (espelhoDireita > 0) {
            const area = tamanhoLateral * (espelhoDireita / 100);
            areaEspelhos += area;
            detalhesEspelhos.push({
                nome: "Espelho Direita",
                dimensao: tamanhoLateral.toFixed(2) + "m × " + espelhoDireita + "cm",
                area: area,
                custo: area * valorPedra
            });
        }
    }

    // 3. Área Total
    const areaTotal = areaBase + areaEspelhos;

    // 4. Custos
    const custoBase = areaBase * valorPedra;
    const custoEspelhos = areaEspelhos * valorPedra;
    const custoPedraTotal = areaTotal * valorPedra;

    // 5. Acessórios
    let acessorios = [];
    let totalAcessorios = 0;
    
    if (modeloViolao === "sim") {
        acessorios.push({
            nome: "Modelo Violão",
            valor: 30
        });
        totalAcessorios += 30;
    }
    
    if (temFuroTorneira === "sim") {
        acessorios.push({
            nome: "Furo para Torneira",
            valor: 15
        });
        totalAcessorios += 15;
    }
    
    if (valorCuba > 0) {
        acessorios.push({
            nome: "Cuba",
            valor: valorCuba
        });
        totalAcessorios += valorCuba;
    }

    // 6. VALOR TOTAL
    const valorTotal = custoPedraTotal + totalAcessorios;

    // ===== EXIBIÇÃO =====
    
    // Dados do cliente
    document.getElementById('nomeResultado').textContent = nomeCliente;
    document.getElementById('telefoneResultado').textContent = telefoneCliente;
    document.getElementById('vendedorResultado').textContent = vendedor;
    document.getElementById('tipoPedraResultado').textContent = tipoPedra;
    document.getElementById('valorPedraResultado').textContent = valorPedra.toFixed(2);

    // Detalhamento da Bancada
    document.getElementById('detalheComprimento').textContent = tamanhoFrente.toFixed(2);
    document.getElementById('detalheLargura').textContent = tamanhoLateral.toFixed(2);
    document.getElementById('detalheAreaBase').textContent = areaBase.toFixed(2);
    document.getElementById('detalheCustoBase').textContent = custoBase.toFixed(2);

    // Detalhamento dos Espelhos
    const espelhosContainer = document.getElementById('detalheEspelhos');
    espelhosContainer.innerHTML = '';
    
    if (detalhesEspelhos.length > 0) {
        detalhesEspelhos.forEach((esp) => {
            const div = document.createElement('div');
            div.className = 'detalhe-item';
            div.innerHTML = `
                <span>${esp.nome}</span>
                <span>${esp.dimensao}</span>
                <span>${esp.area.toFixed(2)} m²</span>
                <span>R$ ${esp.custo.toFixed(2)}</span>
            `;
            espelhosContainer.appendChild(div);
        });
    } else {
        espelhosContainer.innerHTML = '<div class="detalhe-item" style="grid-column:1/-1;text-align:center;color:#95A5A6;">Nenhum espelho adicionado</div>';
    }

    document.getElementById('detalheAreaEspelhos').textContent = areaEspelhos.toFixed(2);
    document.getElementById('detalheCustoEspelhos').textContent = custoEspelhos.toFixed(2);

    // Detalhamento dos Acessórios
    const acessoriosContainer = document.getElementById('detalheAcessorios');
    acessoriosContainer.innerHTML = '';
    
    if (acessorios.length > 0) {
        acessorios.forEach(acc => {
            const div = document.createElement('div');
            div.className = 'detalhe-item';
            div.innerHTML = `
                <span>${acc.nome}</span>
                <span>R$ ${acc.valor.toFixed(2)}</span>
            `;
            acessoriosContainer.appendChild(div);
        });
    } else {
        acessoriosContainer.innerHTML = '<div class="detalhe-item" style="grid-column:1/-1;text-align:center;color:#95A5A6;">Nenhum acessório adicionado</div>';
    }

    // Totais
    document.getElementById('detalheAreaTotal').textContent = areaTotal.toFixed(2);
    document.getElementById('detalheCustoPedra').textContent = custoPedraTotal.toFixed(2);
    document.getElementById('detalheCustoAcessorios').textContent = totalAcessorios.toFixed(2);
    document.getElementById('detalheCustoAcessoriosResumo').textContent = totalAcessorios.toFixed(2);
    document.getElementById('valorTotalResultado').textContent = valorTotal.toFixed(2);

    // Mostra o resultado
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.style.display = 'block';
    resultadoDiv.classList.add('active');

    // Scroll suave
    setTimeout(() => {
        resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
});

// ===== FUNÇÃO COPIAR =====
function copiarResultado() {
    const resultadoDiv = document.getElementById('resultado');
    if (resultadoDiv.style.display === 'none' || !resultadoDiv.classList.contains('active')) {
        alert("⚠️ Nenhum resultado para copiar. Calcule o orçamento primeiro.");
        return;
    }

    const nome = document.getElementById('nomeResultado').textContent;
    const telefone = document.getElementById('telefoneResultado').textContent;
    const vendedor = document.getElementById('vendedorResultado').textContent;
    const tipoPedra = document.getElementById('tipoPedraResultado').textContent;
    const valorPedra = document.getElementById('valorPedraResultado').textContent;
    const area = document.getElementById('detalheAreaTotal').textContent;
    const totalAcessorios = document.getElementById('detalheCustoAcessoriosResumo').textContent;
    const total = document.getElementById('valorTotalResultado').textContent;

    const texto = `=== ORÇAMENTO XIMENES CONSTRUÇÕES ===\n\n` +
                  `Cliente: ${nome}\n` +
                  `Telefone: ${telefone}\n` +
                  `Vendedor: ${vendedor}\n` +
                  `Tipo de Pedra: ${tipoPedra}\n` +
                  `Valor da Pedra: R$ ${valorPedra}/m²\n` +
                  `Área Total: ${area} m²\n` +
                  `Custo dos Acessórios: R$ ${totalAcessorios}\n` +
                  `Valor Total: R$ ${total}\n\n` +
                  `=== FIM DO ORÇAMENTO ===`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto)
            .then(() => showToast("✅ Orçamento copiado com sucesso!"))
            .catch(() => copyFallback(texto));
    } else {
        copyFallback(texto);
    }
}

function copyFallback(texto) {
    const textarea = document.createElement("textarea");
    textarea.value = texto;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand("copy");
        showToast("✅ Orçamento copiado com sucesso!");
    } catch (err) {
        alert("❌ Erro ao copiar. Tente selecionar e copiar manualmente.");
    }
    
    document.body.removeChild(textarea);
}

// ===== FUNÇÃO WHATSAPP =====
function enviarWhatsApp() {
    const nome = document.getElementById('nomeResultado').textContent;
    const total = document.getElementById('valorTotalResultado').textContent;
    const tipoPedra = document.getElementById('tipoPedraResultado').textContent;
    const area = document.getElementById('detalheAreaTotal').textContent;
    const telefone = document.getElementById('telefoneResultado').textContent;
    
    const mensagem = `*ORÇAMENTO XIMENES CONSTRUÇÕES*%0A%0A` +
                    `Cliente: ${nome}%0A` +
                    `Telefone: ${telefone}%0A` +
                    `Tipo de Pedra: ${tipoPedra}%0A` +
                    `Área Total: ${area} m²%0A` +
                    `Valor Total: R$ ${total}%0A%0A` +
                    `*Solicito orçamento detalhado!*`;
    
    const numero = "5511999999999";
    const url = `https://wa.me/${numero}?text=${mensagem}`;
    
    window.open(url, '_blank');
}

// ===== TOAST =====
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: #2C3E50;
        color: white;
        padding: 15px 30px;
        border-radius: 12px;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        animation: slideUp 0.5s ease;
        max-width: 90%;
        text-align: center;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada!');
    
    // Configura o toggle dos espelhos
    const temEspelhosSelect = document.getElementById('temEspelhos');
    
    // Remove qualquer evento anterior e adiciona novo
    temEspelhosSelect.removeEventListener('change', toggleEspelhos);
    temEspelhosSelect.addEventListener('change', toggleEspelhos);
    
    // FORÇA a verificação inicial - Garante que os espelhos comecem ocultos
    const container = document.getElementById('espelhosContainer');
    if (temEspelhosSelect.value === "sim") {
        container.style.display = 'block';
        container.classList.add('active');
    } else {
        container.style.display = 'none';
        container.classList.remove('active');
    }
    
    // Máscara para telefone
    const telefoneInput = document.getElementById('telefoneCliente');
    telefoneInput.addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (value.length > 6) {
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
        }
        this.value = value;
    });
    
    // Adiciona um listener extra no select para garantir
    temEspelhosSelect.addEventListener('click', function() {
        // Força a atualização ao clicar
        setTimeout(toggleEspelhos, 10);
    });
});

// ===== EXPORTA FUNÇÕES PARA O ESCOPO GLOBAL =====
window.toggleEspelhos = toggleEspelhos;
window.copiarResultado = copiarResultado;
window.enviarWhatsApp = enviarWhatsApp;
