# 📦 Guia Completo de Configuração

## Pré-requisitos

- Conta Google com acesso ao Google Drive
- Acesso ao Google Apps Script
- Navegador moderno

## Passo 1: Preparar o Google Apps Script

### 1.1 Criar um novo projeto

1. Acesse [Google Apps Script](https://script.google.com)
2. Clique em "Novo projeto"
3. Nomeie o projeto como "Sistema Transferência Arquivos"

### 1.2 Configurar os arquivos

#### Arquivo 1: Code.gs
1. Na aba "Editor", você verá um arquivo "Code.gs"
2. Copie **TODO** o conteúdo de `Code.gs` do repositório
3. Cole no editor do Apps Script
4. Pressione Ctrl+S para salvar

#### Arquivo 2: Index.html
1. Clique no ícone "+" ao lado de "Code.gs"
2. Selecione "HTML"
3. Nomeie como "Index"
4. Copie **TODO** o conteúdo de `Index.html` do repositório
5. Cole no editor
6. Pressione Ctrl+S para salvar

### 1.3 Autorizar o script

1. Clique em "Executar" no topo
2. Selecione a função `setupInicial`
3. Clique em "Executar"
4. Na popup de autorização, clique em "Revisar permissões"
5. Selecione sua conta Google
6. Clique em "Permitir" nas telas de consentimento
7. Aguarde a conclusão (verá mensagem "Execução concluída")

## Passo 2: Implantar a Aplicação Web

### 2.1 Deploy

1. Clique em "Deploy" no topo
2. Selecione "Nova implantação"
3. Configure conforme abaixo:
   - **Tipo**: Selecione "Aplicação web"
   - **Executar como**: (Sua conta)
   - **Quem tem acesso**: "Qualquer pessoa"
4. Clique em "Implantar"

### 2.2 Copiar a URL

1. Copie a URL fornecida (será algo como: `https://script.google.com/macros/d/...`)
2. Guarde esta URL para acessar o sistema

## Passo 3: Configurar Agendamentos

### 3.1 Encontrar IDs das Pastas

#### Para encontrar o ID da sua pasta no Google Drive:

1. Abra [Google Drive](https://drive.google.com)
2. Navegue até a pasta desejada
3. Copie o ID da URL:
   ```
   https://drive.google.com/drive/folders/[ID_DA_PASTA]
   ```
4. O [ID_DA_PASTA] é o que você precisa

**Exemplo:**
```
URL: https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j1k2l
ID: 1a2b3c4d5e6f7g8h9i0j1k2l
```

### 3.2 Criar primeiro agendamento

1. Acesse a URL do deploy
2. Vá para a aba "➕ Novo Agendamento"
3. Preencha:
   - **Nome**: "Teste Inicial" (ou outro nome)
   - **Pasta Origem**: Cole o ID da pasta de origem
   - **Pasta Destino**: Cole o ID da pasta de destino
   - **Horário**: Defina um horário (ex: 09:00)
   - **Dias**: Selecione pelo menos um dia
   - **Tipo de Arquivo**: "Últimos arquivos salvos"
   - **Quantidade**: 5
   - **Status**: "Ativo"
4. Clique em "💾 Salvar Agendamento"

### 3.3 Verificar agendamento

1. Vá para a aba "📋 Meus Agendamentos"
2. Seu agendamento deve aparecer na lista
3. Vá para "📊 Histórico" para verificar execuções

## Passo 4: Configurações Avançadas

### 4.1 Fuso Horário

O fuso horário padrão é "America/Sao_Paulo" (Brasília).

Para alterar:
1. Abra o arquivo `appsscript.json` no Apps Script
2. Modifique a propriedade `timeZone`
3. Salve

**Fusos horários comuns:**
- `America/Sao_Paulo` - Brasília
- `America/New_York` - New York
- `America/Los_Angeles` - Los Angeles
- `Europe/London` - Londres
- `Europe/Paris` - Paris

### 4.2 Aumentar limite de histórico

O sistema mantém por padrão 1000 registros de histórico.

Para alterar:
1. Abra `Code.gs`
2. Procure pela linha: `if (historico.length > 1000)`
3. Substitua 1000 pelo número desejado
4. Salve

## Passo 5: Testes

### 5.1 Teste de transferência

1. Na aba "📋 Meus Agendamentos"
2. Coloque alguns arquivos na pasta de origem
3. Clique em "Editar" em um agendamento
4. Mude o horário para 1 minuto no futuro
5. Aguarde 5-6 minutos
6. Verifique o "📊 Histórico"

### 5.2 Verificar logs

1. No Apps Script, clique em "Visualizar logs"
2. Verifique se há mensagens de execução

## Troubleshooting

### Erro: "Pasta não encontrada"

**Solução:**
- Verifique se o ID está correto
- Certifique-se que tem permissão de acesso à pasta
- Teste acessando a pasta manualmente no Drive

### Erro: "Nenhum arquivo encontrado"

**Solução:**
- Coloque arquivos na pasta de origem
- Verifique se os arquivos correspondem ao critério (padrão de nome, etc)

### Agendamento não executa

**Solução:**
1. Verifique se o agendamento está "Ativo"
2. Verifique se o dia da semana está selecionado
3. Verifique o horário está correto
4. Aguarde pelo menos 5 minutos
5. Verifique os logs

### Esqueci a URL do deploy

**Solução:**
1. Abra o projeto no Apps Script
2. Clique em "Deploy" > "Manage deployments"
3. Selecione o deploy mais recente
4. Copie a URL

## Dicas Importantes

✅ **Faça:**
- Teste com poucas transferências primeiro
- Use nomes descritivos para agendamentos
- Revise o histórico regularmente
- Mantenha backup das pastas importantes

❌ **Não faça:**
- Não coloque o ID da pasta errado
- Não exclua pastas em uso
- Não compartilhe a URL pública com pessoas não autorizadas
- Não modifique Code.gs sem entender o que está fazendo

## Próximos Passos

1. ✅ Configure múltiplos agendamentos
2. ✅ Exporte e estude os logs
3. ✅ Customize o padrão de cores (opcional)
4. ✅ Implemente automações adicionais (opcional)

## Suporte

Se encontrar problemas:

1. **Verifique o console do Apps Script**: Execute > Exibir logs
2. **Valide as permissões**: Certifique-se que tem acesso às pastas
3. **Teste manualmente**: Tente transferir um arquivo manualmente
4. **Consulte a documentação**: Google Apps Script Drive API

---

**Última atualização**: June 2026
