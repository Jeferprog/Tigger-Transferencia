# 🔄 Sistema de Agendamento de Transferência de Arquivos

Um sistema completo para agendar e gerenciar transferências automáticas de arquivos no Google Drive através de Google Apps Script (GAS).

## ✨ Funcionalidades

- **Criar Agendamentos**: Configure agendamentos de transferência de arquivos
- **Origem e Destino Configuráveis**: Escolha as pastas de origem e destino no Google Drive
- **Horários Programáveis**: Defina a hora e os dias da semana para execução
- **Múltiplos Tipos de Seleção**:
  - Últimos arquivos salvos na pasta
  - Arquivo com nome específico
  - Arquivos por padrão de nome (prefixo + aleatório + sufixo)
- **Ativar/Desativar**: Controle quais agendamentos estão ativos
- **Histórico de Execuções**: Acompanhe todas as transferências realizadas
- **Interface Moderna**: Design responsivo com padrão Cresol

## 🚀 Como Usar

### 1. Preparação no Google Apps Script

1. Acesse [Google Apps Script](https://script.google.com)
2. Crie um novo projeto
3. Copie o conteúdo de `Code.gs` para o editor do Apps Script
4. Crie um novo arquivo HTML e copie o conteúdo de `Index.html`
5. Execute a função `setupInicial()` no console do Apps Script
6. Autorize o script para acessar o Google Drive

### 2. Implantação

1. No Apps Script, clique em "Deploy" > "New Deployment"
2. Selecione o tipo como "Web app"
3. Configure "Execute as" com sua conta
4. Configure "Who has access" como "Anyone"
5. Copie a URL de implantação

### 3. Criando um Agendamento

1. Acesse a URL de implantação
2. Vá para a aba "Novo Agendamento"
3. Preencha os dados:
   - **Nome**: Um identificador único para o agendamento
   - **Pasta Origem**: ID da pasta no Google Drive (encontre em: drive.google.com/drive/folders/ID)
   - **Pasta Destino**: ID da pasta de destino
   - **Horário**: Hora em que a transferência será realizada
   - **Dias**: Selecione os dias da semana
   - **Tipo de Arquivo**: Escolha como os arquivos serão selecionados
4. Clique em "Salvar Agendamento"

### 4. Como Encontrar o ID da Pasta

1. Abra a pasta no Google Drive
2. Copie o ID da URL: `https://drive.google.com/drive/folders/**1a2b3c4d5e6f7g8h**`
3. Cole o ID no campo correspondente

## 📋 Abas da Interface

### ➕ Novo Agendamento
- Crie novos agendamentos de transferência
- Configure origem, destino e critérios de seleção
- Agende horários e dias específicos

### 📋 Meus Agendamentos
- Visualize todos os agendamentos criados
- Veja o status (ativo/inativo)
- Edite agendamentos existentes
- Delete agendamentos não utilizados

### 📊 Histórico
- Acompanhe todas as transferências realizadas
- Veja data e hora de execução
- Quantidade de arquivos transferidos
- Status (sucesso/erro) e mensagens

## ⚙️ Tipos de Seleção de Arquivos

### 1. Últimos Arquivos Salvos
- Seleciona os N últimos arquivos modificados
- Ideal para processar os arquivos mais recentes
- Configuração: Quantidade de arquivos

### 2. Nome Específico
- Procura por arquivo com nome exato
- Ideal para arquivos nomeados padronizadamente
- Configuração: Nome completo do arquivo

### 3. Padrão de Nome
- Busca arquivos que correspondam a um padrão
- Formato: prefixo + parte aleatória + sufixo
- Exemplos:
  - `relatorio_` + aleatório + `.pdf`
  - `export_` + aleatório + `.xlsx`

## 🔄 Como Funciona o Agendamento

1. Um trigger interno é criado para verificar a hora a cada 5 minutos
2. Quando a hora chega e é um dos dias selecionados, a transferência é executada
3. O resultado é registrado no histórico
4. Você pode acompanhar o progresso na aba "Histórico"

## 📱 Compatibilidade

- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Responsivo para dispositivos móveis

## 🎨 Design

O sistema utiliza o padrão de cores Cresol:
- Azul principal: #003d7a, #0052a3
- Cinza neutro: #f5f5f5, #e8eef7
- Ênfase em usabilidade e clareza visual

## ⚠️ Limitações e Notas

- O agendamento é verificado a cada 5 minutos
- Máximo de 1000 registros no histórico (mais antigos são removidos)
- Requer permissões para acessar o Google Drive
- As transferências respeitam as cotas do Google Drive

## 🛠️ Troubleshooting

### "Pasta não encontrada"
- Verifique se o ID está correto
- Certifique-se que possui permissão de acesso

### "Nenhum arquivo encontrado"
- Verifique se há arquivos na pasta de origem
- Valide os critérios de seleção (padrão de nome, quantidade)

### Histórico vazio
- Aguarde a próxima execução agendada
- Ou teste manualmente através do Apps Script

## 📞 Suporte

Para problemas ou sugestões, verifique:
1. O console do Apps Script (logs)
2. As permissões do Drive
3. Os IDs das pastas estão corretos

## 📄 Licença

Sistema criado para uso interno - Padrão Cresol