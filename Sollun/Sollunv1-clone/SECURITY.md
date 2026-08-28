# 🔐 Security Policy

## Reporting Vulnerabilities

Se você descobrir uma vulnerabilidade de segurança, **NÃO abra uma issue pública**.

Por favor, email: **trindade7474@gmail.com**
                  **sollunproject@gmail.com**

Inclua:
- Descrição da vulnerabilidade
- Passos para reproduzir (se possível)
- Impacto potencial
- Sua sugestão de fix (opcional)

Responderemos em até 48 horas.

---

## 🛡️ Sensitive Information Protection

### Nunca commite:
- ❌ `.env` ou `.env.local`
- ❌ `API_KEY`, `SECRET_KEY`, `PASSWORD`
- ❌ Credenciais de banco de dados
- ❌ Tokens JWT ou OAuth
- ❌ Chaves privadas

### Pastas excluídas (versionadas em `.gitignore`):
```
Credentials-n8n/          # n8n configuration
Docker/.env*             # Docker environment
Variáveis de ambiente/   # Environment variables
.env*                    # Local environment files
```

### Antes de fazer commit:

1. **Verifique o diff:**
   ```bash
   git diff --cached
   git diff --cached -- '*.env' '*.key' '*credentials*'
   ```

2. **Procure por padrões sensíveis:**
   ```bash
   git diff --cached | grep -E 'password|secret|api_key|sk-'
   ```

3. **Use git hooks (recomendado):**
   ```bash
   # Instale um pre-commit hook que detecta secrets
   npm install husky lint-staged --save-dev
   npx husky install
   ```

---

## 🔑 Credenciais Encontradas

### Histórico de Segurança

**Credenciais encontradas em estado sensível:**

| Arquivo | Credencial | Status |
|---------|-----------|--------|
| `Credentials-n8n/.env.production` | Google Client ID/Secret | 🔴 Exposta |
| `Credentials-n8n/.env.production` | OpenAI API Key | 🔴 Exposta |
| `Credentials-n8n/.env.production` | Supabase Service Role | 🔴 Exposta |
| `Credentials-n8n/.env.production` | Flowengine API Key | 🔴 Exposta |

**⚠️ AÇÃO RECOMENDADA:**

Essas credenciais foram encontradas FORA do controle de versão (não commitadas). Mas se foram expostas antes:

1. **Revogue todas as credenciais no GitHub:**
   - Google Cloud Console: Regenerate Client Secret
   - OpenAI: Delete API Key, criar novo
   - Supabase: Regenerate Service Role Key
   - Flowengine: Regenerate API Key

2. **Configure GitHub Secrets para CI/CD:**
   ```bash
   # Não faça upload de .env para CI/CD
   # Use GitHub Actions Secrets em vez disso
   ```

---

## ✅ Best Practices

### 1. Desenvolvimento Local

```bash
# Copie o template
cp .env.example .env.local

# Edite com suas credenciais
nano .env.local

# Confirme que .env.local está em .gitignore
cat .gitignore | grep env.local
```

### 2. Variáveis de Ambiente

```javascript
// ✅ Seguro — carregado em tempo de build
const apiUrl = import.meta.env.VITE_API_URL;

// ❌ Inseguro — exposto no bundle
const apiKey = "sk-..."; // Nunca faça isso!
```

### 3. Dependências

Mantenha `package.json` atualizado:
```bash
npm audit
npm audit fix
npm outdated
```

### 4. Pre-commit Checks

Considere adicionar:
```bash
# Detecta secrets
npm install detect-secrets

# Valida commits
npm install @commitlint/config-conventional
```

---

## 🚨 Incident Response

Se credenciais forem acidentalmente commitadas:

```bash
# 1. Revogue a credencial IMEDIATAMENTE (em seus serviços)

# 2. Remova do histórico Git
git filter-branch --tree-filter 'rm -f .env' HEAD

# 3. Force push (⚠️ cuidado em equipes)
git push origin --force-with-lease

# 4. Notifique o time
# 5. Rote todas as credenciais
```

---

## 🔍 Scanning & Auditing

### GitHub Security Scanning

Habilite no repositório:
- ✅ Dependabot alerts
- ✅ Secret scanning
- ✅ Code scanning (CodeQL)

### Local Scanning

```bash
# OWASP Dependency Check
npm install -g npm-check-updates
npm-check-updates -u

# GitHub Secret Scanning (local)
npm install git-secrets
git secrets --install
git secrets --register-aws
```

---

## 📋 Security Checklist

- [ ] `.env` e `*.key` em `.gitignore`
- [ ] Nenhuma credencial em código fonte
- [ ] `.env.example` com placeholders
- [ ] Dependências auditadas (`npm audit`)
- [ ] GitHub Secrets configurados (para CI/CD)
- [ ] Pre-commit hooks instalados (opcional)
- [ ] Team tem acesso a política de segurança
- [ ] Roteamento de secrets planejado

---

## 📞 Contato

**Security Team:** trindade7474@gmail.com

---

**Última atualização:** 2026-06-09
