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
    
    // 2. Área dos Espelhos (com valores EXATOS, sem arredondamento)
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

    // 3. Área Total (com valor EXATO)
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
