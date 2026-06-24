# ⚡ Guia Rápido - Sistema de Transferência

## O que é?

Sistema automatizado para agendar transferências de arquivos no Google Drive via Google Apps Script.

## Como começar? (3 passos)

### 1️⃣ Copiar código para Google Apps Script

1. Vá em https://script.google.com
2. Crie novo projeto
3. Copie `Code.gs` e `Index.html` para o projeto
4. Execute a função `setupInicial()`

### 2️⃣ Fazer deploy

1. Clique em "Deploy" > "Nova implantação"
2. Selecione "Aplicação web"
3. Copie a URL fornecida

### 3️⃣ Configurar agendamento

1. Acesse a URL
2. Clique em "➕ Novo Agendamento"
3. Preencha os dados e salve

✅ **Pronto!** Seus arquivos serão transferidos automaticamente.

---

## 📚 Documentações

| Documento | Para Quem? | Conteúdo |
|-----------|-----------|----------|
| **README.md** | Todos | Visão geral, funcionalidades, compatibilidade |
| **SETUP.md** | Iniciantes | Passo a passo completo com capturas |
| **EXEMPLOS.md** | Usuários | Casos de uso reais e configurações prontas |
| **Code.gs** | Desenvolvedores | Código comentado, APIs utilizadas |
| **Index.html** | Designers | Frontend, CSS, componentes UI |

---

## 🎯 Casos de Uso Rápidos

### Transferir últimos 5 arquivos diariamente às 8:00
```
Tipo: Últimos arquivos salvos
Quantidade: 5
Horário: 08:00
Dias: Todos
```

### Transferir arquivo específico quando criado
```
Tipo: Nome específico
Nome: seu_arquivo.pdf
Horário: 07:00 (verificação diária)
```

### Transferir com padrão de nome
```
Tipo: Padrão de nome
Prefixo: backup_
Sufixo: .zip
Horário: 23:00 (noite)
```

---

## 🔍 Encontrar IDs de Pastas

```
Google Drive URL:
https://drive.google.com/drive/folders/[ID_AQUI]

Copie [ID_AQUI] nos campos de Origem/Destino
```

**Exemplo:**
- URL: `https://drive.google.com/drive/folders/1abc2def3ghi4jkl`
- ID: `1abc2def3ghi4jkl`

---

## ⚙️ Menu da Interface

```
➕ Novo Agendamento
   └─ Criar novo agendamento

📋 Meus Agendamentos
   ├─ Ver todos os agendamentos
   ├─ Editar existentes
   └─ Deletar não necessários

📊 Histórico
   ├─ Ver execuções passadas
   ├─ Status de sucesso/erro
   └─ Arquivos transferidos
```

---

## 🎨 Design

Padrão Cresol:
- Azul: `#003d7a`, `#0052a3`
- Cinza: `#f5f5f5`, `#e8eef7`
- Verde (sucesso): `#d4edda`
- Vermelho (erro): `#f8d7da`

---

## ❓ FAQ Rápido

**P: Quantas vezes por dia posso agendar?**
A: Sem limite, mas respeita um agendamento por dia por configuração.

**P: Qual é o delay mínimo?**
A: Sistema verifica a cada 5 minutos, então delay mínimo é ~5 min.

**P: Posso mover em vez de copiar?**
A: Sim! Sistema sempre move (remove da origem).

**P: Preciso pagar?**
A: Não, usa sua conta Google gratuita (respeitando quotas).

**P: Como faço backup das configurações?**
A: Exporte do Apps Script ou guarde screenshot dos agendamentos.

---

## 🐛 Problemas Comuns

| Problema | Solução |
|----------|---------|
| Arquivo não encontrado | Verifique se existe na pasta |
| Pasta não encontrada | Teste ID no Google Drive |
| Não executa | Verifique se está "Ativo" |
| Executa em hora errada | Verifique fuso horário |

---

## 📞 Precisa de Ajuda?

1. Leia **README.md** - Visão geral
2. Veja **SETUP.md** - Guia passo a passo  
3. Consulte **EXEMPLOS.md** - Casos reais
4. Verifique **logs** no Apps Script

---

## 🚀 Próximos Passos

- [ ] Criar primeiro agendamento
- [ ] Testar com arquivos pequenos
- [ ] Monitorar histórico
- [ ] Escalar para produção
- [ ] Documentar seus agendamentos

---

**Tempo para começar: ~15 minutos** ⏱️

Versão: 1.0 | Junho 2026
