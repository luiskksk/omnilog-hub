# OmniLog Hub — Backup e Restauração

## Objetivo
Definir como criar uma cópia de segurança do banco e restaurá-la quando necessário.

## Criar backup

Em um terminal onde o cliente MySQL esteja disponível:

```bash
mysqldump -u SEU_USUARIO -p omnilog_hub > database/backups/omnilog_hub.sql
```

Substitua `SEU_USUARIO` pelo usuário do seu MySQL. A senha será solicitada pelo programa.

## Restaurar backup

A restauração deve ser feita em um banco de destino adequado. Para restaurar em um banco existente:

```bash
mysql -u SEU_USUARIO -p omnilog_hub < database/backups/omnilog_hub.sql
```

O arquivo de backup deve ser protegido, pois pode conter dados pessoais. Utilize dados fictícios no projeto acadêmico.

## Verificação
Após a restauração:
1. Confira se as tabelas estão presentes.
2. Consulte alguns registros.
3. Execute as consultas principais.
4. Registre a data, o arquivo utilizado e o resultado.

## Observações
- Não salvar senhas de acesso ao banco nos scripts ou no GitHub.
- Não versionar backups com dados pessoais ou credenciais.
- O comando `mysqldump` precisa estar instalado e disponível no terminal.
- Este procedimento deve ser testado antes de ser considerado validado.
