# 📚 Exemplos de Uso do Sistema

## Exemplo 1: Transferência Diária de Relatórios

### Cenário
Você precisa transferir automaticamente os últimos 3 relatórios criados diariamente às 8:00 da manhã.

### Configuração

```
Nome: Transferência Diária de Relatórios
Pasta Origem: 1a2b3c4d5e6f7g8h (Pasta: "Relatórios em Processamento")
Pasta Destino: 9i8j7k6l5m4n3o2p (Pasta: "Relatórios Processados")
Horário: 08:00
Dias: Segunda, Terça, Quarta, Quinta, Sexta (dias úteis)
Status: Ativo
Tipo de Arquivo: Últimos arquivos salvos
Quantidade: 3
```

### Resultado
A cada dia útil às 8:00 da manhã, os 3 últimos relatórios serão automaticamente movidos para a pasta de processados.

---

## Exemplo 2: Transferência de Arquivo Específico

### Cenário
Um sistema externo cria um arquivo específico chamado "export_vendas_diarias.xlsx" que precisa ser movido para um local centralizado imediatamente após criação.

### Configuração

```
Nome: Exportação Diária de Vendas
Pasta Origem: 2b3c4d5e6f7g8h9i (Pasta: "Exportação Automática")
Pasta Destino: 0j1k2l3m4n5o6p7q (Pasta: "Vendas Consolidadas")
Horário: 07:00
Dias: Segunda, Terça, Quarta, Quinta, Sexta
Status: Ativo
Tipo de Arquivo: Nome específico
Nome Exato: export_vendas_diarias.xlsx
```

### Resultado
Todos os dias úteis às 7:00 da manhã, se o arquivo `export_vendas_diarias.xlsx` existir, será movido automaticamente.

---

## Exemplo 3: Transferência por Padrão de Nome

### Cenário
Você tem um aplicativo que gera arquivos com nomenclatura padrão: `backup_` + (data/número aleatório) + `.zip`
Esses arquivos precisam ser automaticamente transferidos para um backup seguro toda noite às 23:00.

### Configuração

```
Nome: Backup Noturno Automático
Pasta Origem: 3c4d5e6f7g8h9i0j (Pasta: "Backups Temporários")
Pasta Destino: 1k2l3m4n5o6p7q8r (Pasta: "Backups Arquivados")
Horário: 23:00
Dias: Segunda, Terça, Quarta, Quinta, Sexta, Sábado, Domingo
Status: Ativo
Tipo de Arquivo: Padrão de nome
Prefixo: backup_
Sufixo: .zip
```

### Resultado
Toda noite às 23:00, todos os arquivos que começam com "backup_" e terminam com ".zip" serão transferidos.

---

## Exemplo 4: Transferência Semanal de Extratos

### Cenário
Você recebe extratos bancários toda segunda-feira e precisa movê-los para uma pasta de arquivo após revisão.

### Configuração

```
Nome: Arquivo Semanal de Extratos
Pasta Origem: 4d5e6f7g8h9i0j1k (Pasta: "Extratos para Revisar")
Pasta Destino: 2l3m4n5o6p7q8r9s (Pasta: "Extratos Arquivados")
Horário: 10:00
Dias: Terça (dia seguinte para revisar e transferir)
Status: Ativo
Tipo de Arquivo: Últimos arquivos salvos
Quantidade: 1
```

### Resultado
Toda terça-feira às 10:00, o último extrato enviado será transferido para arquivo.

---

## Exemplo 5: Múltiplos Agendamentos em Cadeia

### Cenário
Você tem um fluxo de processamento onde:
1. Arquivos chegam em "Entrada"
2. Processador lê de "Entrada" e coloca em "Processamento"
3. Sistema precisa transferir de "Processamento" para "Saída" após sucesso

### Configuração Agendamento 1

```
Nome: Mover para Processamento
Pasta Origem: 5e6f7g8h9i0j1k2l (Entrada)
Pasta Destino: 3m4n5o6p7q8r9s0t (Processamento)
Horário: 09:00
Dias: Todos
Status: Ativo
Tipo: Últimos - Quantidade: 10
```

### Configuração Agendamento 2

```
Nome: Mover para Saída
Pasta Origem: 3m4n5o6p7q8r9s0t (Processamento)
Pasta Destino: 1u2v3w4x5y6z7a8b (Saída)
Horário: 15:00
Dias: Todos
Status: Ativo
Tipo: Últimos - Quantidade: 10
```

### Resultado
Fluxo automatizado de processamento ao longo do dia.

---

## Exemplo 6: Processamento Mensal

### Cenário
Fechamento mensal onde arquivos precisam ser consolidados no primeiro dia útil de cada mês.

### Configuração

```
Nome: Consolidação Mensal
Pasta Origem: 6f7g8h9i0j1k2l3m (Pasta: "Mensal")
Pasta Destino: 4n5o6p7q8r9s0t1u (Pasta: "Histórico Mensal")
Horário: 06:00
Dias: Segunda (presumindo rodar primeira segunda do mês)
Status: Ativo
Tipo de Arquivo: Últimos arquivos salvos
Quantidade: 50
```

**Nota:** Para execução exatamente no primeiro dia do mês, você pode criar dois agendamentos:
- Um para 1º de cada mês às 6:00 (segunda-feira se aplicável)
- Outro para 2º de cada mês às 6:00 (como fallback)

---

## Exemplo 7: Transferência com Padrão Temporal

### Cenário
Você gera relatórios com nome padrão: `relatorio_` + data/hora + `.pdf`

### Configuração

```
Nome: Arquivar Relatórios Diários
Pasta Origem: 7g8h9i0j1k2l3m4n (Pasta: "Relatórios Gerados")
Pasta Destino: 5o6p7q8r9s0t1u2v (Pasta: "Relatórios Arquivo")
Horário: 18:00
Dias: Segunda, Terça, Quarta, Quinta, Sexta
Status: Ativo
Tipo de Arquivo: Padrão de nome
Prefixo: relatorio_
Sufixo: .pdf
```

---

## Monitoramento e Troubleshooting

### Como verificar se está funcionando?

1. **No dia/hora agendada**, aguarde 5-10 minutos
2. Vá para a aba "📊 Histórico"
3. Procure por uma entrada recente com status "SUCESSO"

### Se não encontrar execução:

1. **Verifique os logs**:
   - Apps Script Console > Visualizar logs
   - Procure por mensagens de erro

2. **Verifique configuração**:
   - O horário está correto?
   - O dia da semana está selecionado?
   - O agendamento está marcado como "Ativo"?

3. **Teste manualmente**:
   - Apps Script > Execute > setupInicial
   - Depois execute > sincronizarTriggers
   - Verifique os logs

### Exemplo de log bem-sucedido

```
[Ago de 24, 2026 9:00:15 AM] Arquivos transferidos com sucesso
[Ago de 24, 2026 9:00:15 AM] 3 arquivo(s) transferido(s)
```

---

## Dicas de Otimização

### 1. Quantidade de Arquivos
- **Pequena** (1-5): Para processamento crítico
- **Média** (5-20): Para uso geral
- **Grande** (20+): Apenas se necessário (pode ser lento)

### 2. Padrão de Nomes
- Use prefixos únicos para fácil identificação
- Evite caracteres especiais
- Seja consistente no padrão

### 3. Horários
- Não agende muitos agendamentos no mesmo horário
- Prefira horários fora de pico (ex: 23:00 em vez de 09:00)
- Considere fuso horário (padrão: São Paulo)

### 4. Manutenção
- Revise o histórico regularmente
- Archive histórico antigo (após 6 meses)
- Limpe agendamentos não utilizados

---

## Scripts de Teste (Opcional)

Se quiser testar manualmente via console Apps Script:

```javascript
// Executar transferência imediatamente
executarTransferencia('ID_DO_AGENDAMENTO');

// Sincronizar (verificar todos os agendamentos)
sincronizarTriggers();

// Ver agendamentos
console.log(carregarAgendamentos());

// Ver histórico
console.log(carregarHistorico());
```

---

**Última atualização**: June 2026
