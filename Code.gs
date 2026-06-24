// Propriedades do Script para armazenar dados
const SCRIPT_PROPERTIES = PropertiesService.getScriptProperties();
const AGENDAMENTOS_KEY = 'agendamentos';
const HISTORICO_KEY = 'historico';

/**
 * Servi a interface HTML
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setWidth(1200)
    .setHeight(800)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

/**
 * Salva um novo agendamento
 */
function salvarAgendamento(dados) {
  try {
    validarDados(dados);

    const agendamentos = obterAgendamentosDb();
    const id = Utilities.getUuid();

    const novoAgendamento = {
      id: id,
      nome: dados.nome,
      pastaOrigem: dados.pastaOrigem,
      pastaDestino: dados.pastaDestino,
      descricao: dados.descricao || '',
      horario: dados.horario,
      diasSemana: dados.diasSemana,
      status: dados.status,
      tipoArquivo: dados.tipoArquivo,
      quantidadeUltimos: dados.quantidadeUltimos || null,
      nomeEspecifico: dados.nomeEspecifico || null,
      prefixoPadrao: dados.prefixoPadrao || null,
      sufixoPadrao: dados.sufixoPadrao || null,
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString()
    };

    agendamentos.push(novoAgendamento);
    salvarAgendamentosDb(agendamentos);

    // Criar trigger para este agendamento se estiver ativo
    if (dados.status === 'ativo') {
      criarTrigger(id, dados.horario, dados.diasSemana);
    }

    return { sucesso: true, id: id };
  } catch (erro) {
    throw new Error('Erro ao salvar agendamento: ' + erro.toString());
  }
}

/**
 * Carrega todos os agendamentos
 */
function carregarAgendamentos() {
  try {
    return obterAgendamentosDb();
  } catch (erro) {
    throw new Error('Erro ao carregar agendamentos: ' + erro.toString());
  }
}

/**
 * Obtém um agendamento específico
 */
function obterAgendamento(id) {
  try {
    const agendamentos = obterAgendamentosDb();
    return agendamentos.find(a => a.id === id) || null;
  } catch (erro) {
    throw new Error('Erro ao obter agendamento: ' + erro.toString());
  }
}

/**
 * Atualiza um agendamento
 */
function atualizarAgendamento(dados) {
  try {
    const agendamentos = obterAgendamentosDb();
    const index = agendamentos.findIndex(a => a.id === dados.id);

    if (index === -1) {
      throw new Error('Agendamento não encontrado');
    }

    const agendamentoAtual = agendamentos[index];

    agendamentos[index] = {
      ...agendamentoAtual,
      nome: dados.nome,
      pastaOrigem: dados.pastaOrigem,
      pastaDestino: dados.pastaDestino,
      horario: dados.horario,
      status: dados.status,
      dataAtualizacao: new Date().toISOString()
    };

    salvarAgendamentosDb(agendamentos);

    // Atualizar triggers
    limparTriggers(dados.id);
    if (dados.status === 'ativo') {
      criarTrigger(dados.id, dados.horario, agendamentos[index].diasSemana);
    }

    return { sucesso: true };
  } catch (erro) {
    throw new Error('Erro ao atualizar agendamento: ' + erro.toString());
  }
}

/**
 * Deleta um agendamento
 */
function deletarAgendamento(id) {
  try {
    const agendamentos = obterAgendamentosDb();
    const novoArray = agendamentos.filter(a => a.id !== id);

    salvarAgendamentosDb(novoArray);

    // Remover triggers associados
    limparTriggers(id);

    return { sucesso: true };
  } catch (erro) {
    throw new Error('Erro ao deletar agendamento: ' + erro.toString());
  }
}

/**
 * Carrega histórico de execuções
 */
function carregarHistorico() {
  try {
    const historico = obterHistoricoDb();
    return historico.sort((a, b) => {
      return new Date(b.dataExecucao) - new Date(a.dataExecucao);
    });
  } catch (erro) {
    throw new Error('Erro ao carregar histórico: ' + erro.toString());
  }
}

/**
 * Executa a transferência de um agendamento
 */
function executarTransferencia(agendamentoId) {
  try {
    const agendamento = obterAgendamento(agendamentoId);

    if (!agendamento) {
      throw new Error('Agendamento não encontrado');
    }

    if (agendamento.status !== 'ativo') {
      throw new Error('Agendamento inativo');
    }

    const pastaOrigem = DriveApp.getFolderById(agendamento.pastaOrigem);
    const pastaDestino = DriveApp.getFolderById(agendamento.pastaDestino);

    let arquivosTransferidos = 0;
    let mensagem = '';

    try {
      if (agendamento.tipoArquivo === 'ultimos') {
        arquivosTransferidos = transferirUltimosArquivos(
          pastaOrigem,
          pastaDestino,
          agendamento.quantidadeUltimos
        );
      } else if (agendamento.tipoArquivo === 'especifico') {
        arquivosTransferidos = transferirArquivoEspecifico(
          pastaOrigem,
          pastaDestino,
          agendamento.nomeEspecifico
        );
      } else if (agendamento.tipoArquivo === 'padrao') {
        arquivosTransferidos = transferirArquivoPorPadrao(
          pastaOrigem,
          pastaDestino,
          agendamento.prefixoPadrao,
          agendamento.sufixoPadrao
        );
      }

      mensagem = `${arquivosTransferidos} arquivo(s) transferido(s) com sucesso`;
      registrarHistorico(agendamento.nome, 'sucesso', arquivosTransferidos, mensagem);

    } catch (erroTransferencia) {
      mensagem = erroTransferencia.toString();
      registrarHistorico(agendamento.nome, 'erro', 0, mensagem);
      throw erroTransferencia;
    }

  } catch (erro) {
    Logger.log('Erro na execução da transferência: ' + erro.toString());
  }
}

/**
 * Transfere os últimos arquivos
 */
function transferirUltimosArquivos(pastaOrigem, pastaDestino, quantidade) {
  const arquivos = obterArquivosOrdenados(pastaOrigem, quantidade);

  if (arquivos.length === 0) {
    return 0;
  }

  arquivos.forEach(arquivo => {
    moverArquivo(arquivo, pastaOrigem, pastaDestino);
  });

  return arquivos.length;
}

/**
 * Transfere arquivo com nome específico
 */
function transferirArquivoEspecifico(pastaOrigem, pastaDestino, nomeExato) {
  const arquivos = pastaOrigem.getFilesByName(nomeExato);

  if (!arquivos.hasNext()) {
    throw new Error('Arquivo ' + nomeExato + ' não encontrado');
  }

  let transferidos = 0;
  while (arquivos.hasNext()) {
    const arquivo = arquivos.next();
    moverArquivo(arquivo, pastaOrigem, pastaDestino);
    transferidos++;
  }

  return transferidos;
}

/**
 * Transfere arquivos por padrão de nome
 */
function transferirArquivoPorPadrao(pastaOrigem, pastaDestino, prefixo, sufixo) {
  const arquivos = pastaOrigem.getFiles();
  let transferidos = 0;

  while (arquivos.hasNext()) {
    const arquivo = arquivos.next();
    const nome = arquivo.getName();

    if (nome.startsWith(prefixo) && nome.endsWith(sufixo)) {
      moverArquivo(arquivo, pastaOrigem, pastaDestino);
      transferidos++;
    }
  }

  if (transferidos === 0) {
    throw new Error('Nenhum arquivo encontrado com o padrão: ' + prefixo + '*' + sufixo);
  }

  return transferidos;
}

/**
 * Move um arquivo para a pasta de destino
 */
function moverArquivo(arquivo, pastaOrigem, pastaDestino) {
  pastaDestino.addFile(arquivo);
  pastaOrigem.removeFile(arquivo);
}

/**
 * Obtém arquivos ordenados por data (mais recentes primeiro)
 */
function obterArquivosOrdenados(pasta, quantidade) {
  const arquivos = [];
  const iter = pasta.getFiles();

  while (iter.hasNext()) {
    arquivos.push({
      arquivo: iter.next(),
      data: iter.next().getLastUpdated()
    });
  }

  arquivos.sort((a, b) => b.data - a.data);

  return arquivos.slice(0, quantidade).map(item => item.arquivo);
}

/**
 * Cria um trigger de tempo para executar a transferência
 */
function criarTrigger(agendamentoId, horario, diasSemana) {
  // O sistema usa sincronizarTriggers() que verifica todos os agendamentos
  // a cada 5 minutos e executa se necessário
  // Não precisa criar triggers individuais

  limparTriggers(agendamentoId);
}

/**
 * Remove triggers associados a um agendamento
 */
function limparTriggers(agendamentoId) {
  const allTriggers = ScriptApp.getProjectTriggers();

  allTriggers.forEach(trigger => {
    if (trigger.getHandlerFunction().includes(agendamentoId)) {
      ScriptApp.deleteTrigger(trigger);
    }
  });
}

/**
 * Registra execução no histórico
 */
function registrarHistorico(nomeAgendamento, status, arquivosTransferidos, mensagem) {
  try {
    const historico = obterHistoricoDb();

    const registro = {
      agendamento: nomeAgendamento,
      dataExecucao: new Date().toLocaleString('pt-BR'),
      arquivosTransferidos: arquivosTransferidos,
      status: status,
      mensagem: mensagem,
      timestamp: new Date().getTime()
    };

    historico.push(registro);

    // Manter apenas últimos 1000 registros
    if (historico.length > 1000) {
      historico.shift();
    }

    salvarHistoricoDb(historico);
  } catch (erro) {
    Logger.log('Erro ao registrar histórico: ' + erro.toString());
  }
}

/**
 * Valida os dados do agendamento
 */
function validarDados(dados) {
  if (!dados.nome || dados.nome.trim() === '') {
    throw new Error('Nome do agendamento é obrigatório');
  }

  if (!dados.pastaOrigem || dados.pastaOrigem.trim() === '') {
    throw new Error('Pasta de origem é obrigatória');
  }

  if (!dados.pastaDestino || dados.pastaDestino.trim() === '') {
    throw new Error('Pasta de destino é obrigatória');
  }

  if (!dados.horario || dados.horario.trim() === '') {
    throw new Error('Horário é obrigatório');
  }

  if (!dados.tipoArquivo) {
    throw new Error('Tipo de arquivo é obrigatório');
  }

  // Validar que as pastas existem
  try {
    DriveApp.getFolderById(dados.pastaOrigem);
  } catch (e) {
    throw new Error('Pasta de origem não encontrada ou sem permissão');
  }

  try {
    DriveApp.getFolderById(dados.pastaDestino);
  } catch (e) {
    throw new Error('Pasta de destino não encontrada ou sem permissão');
  }
}

/**
 * Obter agendamentos do banco de dados
 */
function obterAgendamentosDb() {
  const dados = SCRIPT_PROPERTIES.getProperty(AGENDAMENTOS_KEY);
  return dados ? JSON.parse(dados) : [];
}

/**
 * Salvar agendamentos no banco de dados
 */
function salvarAgendamentosDb(agendamentos) {
  SCRIPT_PROPERTIES.setProperty(AGENDAMENTOS_KEY, JSON.stringify(agendamentos));
}

/**
 * Obter histórico do banco de dados
 */
function obterHistoricoDb() {
  const dados = SCRIPT_PROPERTIES.getProperty(HISTORICO_KEY);
  return dados ? JSON.parse(dados) : [];
}

/**
 * Salvar histórico no banco de dados
 */
function salvarHistoricoDb(historico) {
  SCRIPT_PROPERTIES.setProperty(HISTORICO_KEY, JSON.stringify(historico));
}

/**
 * Função para testar agendamento
 */
function testarAgendamento(agendamentoId) {
  try {
    executarTransferencia(agendamentoId);
    return { sucesso: true, mensagem: 'Teste executado com sucesso' };
  } catch (erro) {
    return { sucesso: false, mensagem: erro.toString() };
  }
}

/**
 * Função para sincronizar triggers (deve ser chamada periodicamente)
 */
function sincronizarTriggers() {
  try {
    const agendamentos = obterAgendamentosDb();

    agendamentos.forEach(agendamento => {
      if (agendamento.status === 'ativo') {
        // Verificar se está na hora de executar
        const agora = new Date();
        const horaAtual = ('0' + agora.getHours()).slice(-2) + ':' + ('0' + agora.getMinutes()).slice(-2);
        const diaAtual = agora.getDay();

        // Mapear dias da semana
        const diasMapeo = {
          0: 'domingo',
          1: 'segunda',
          2: 'terca',
          3: 'quarta',
          4: 'quinta',
          5: 'sexta',
          6: 'sabado'
        };

        const diaAtualNome = diasMapeo[diaAtual];

        if (horaAtual === agendamento.horario && agendamento.diasSemana[diaAtualNome]) {
          executarTransferencia(agendamento.id);
        }
      }
    });
  } catch (erro) {
    Logger.log('Erro ao sincronizar triggers: ' + erro.toString());
  }
}

/**
 * Setup inicial - criar triggers de sincronização
 */
function setupInicial() {
  try {
    // Remover triggers antigos
    const allTriggers = ScriptApp.getProjectTriggers();
    allTriggers.forEach(trigger => {
      if (trigger.getHandlerFunction() === 'sincronizarTriggers') {
        ScriptApp.deleteTrigger(trigger);
      }
    });

    // Criar trigger para executar sincronização a cada 5 minutos
    ScriptApp.newTrigger('sincronizarTriggers')
      .timeBased()
      .everyMinutes(5)
      .create();

    Logger.log('Setup inicial concluído - Triggers configurados');
  } catch (erro) {
    Logger.log('Erro no setup inicial: ' + erro.toString());
  }
}
