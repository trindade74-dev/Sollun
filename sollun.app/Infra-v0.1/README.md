# Fatia vertical — infra mínima

## Rodando

1. Tenha o Docker Desktop instalado e rodando (WSL2 backend).
2. Nessa pasta, rode:
   ```
   docker compose up -d
   ```
3. Confirme que subiu certo:
   ```
   docker compose ps
   ```
   Deve mostrar `sollun-postgres` como `healthy`.
4. Confirme que o schema e o cliente de teste foram criados:
   ```
   docker exec -it sollun-postgres psql -U sollun -d sollun -c "SELECT name, niche FROM clients;"
   ```
   Deve retornar `Burger Test | lanchonete`.

## Conexão

```
host: localhost
port: 5432
user: sollun
password: sollun_dev
database: sollun
```

## Próximo passo

Com o Postgres rodando e o cliente de teste no banco, o próximo passo é o script do
agente: recebe um brief, chama o Claude Agent SDK, e grava o JSON de camadas retornado
na tabela `posts` (linkado ao `client_id` do "Burger Test").
