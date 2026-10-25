# Manual do aluno • PHP2Shell Cyber Lab 2026

**SF Cyber Academy** · laboratório educacional de vulnerabilidades PHP 2026.

Este manual acompanha o arquivo `index.html`. Ele explica o que fazer em cada etapa, como usar as dicas e como interpretar a nota, o certificado e o laudo.

---

## 1. Antes de começar

- Abra o `index.html` no navegador (Chrome, Edge ou Firefox). Não precisa instalar nada.
- Tudo roda localmente. O progresso é salvo no `localStorage` do navegador.
- Os terminais e as CVEs são **simulados**: nenhum comando é executado de verdade.
- Digite seu nome no campo do cabeçalho. Ele aparece no certificado e no laudo.

## 2. Conhecendo a tela

| Área | Para que serve |
|:---|:---|
| **Aula** | Conceitos de RCE, OOM, use-after-free, sessões e mitigação. |
| **Manual** | Este guia, dentro do laboratório. |
| **Comandos** | Lista dos comandos aceitos pelo terminal simulado. |
| **Exportar** | Baixa o laudo `.md` com o progresso atual. |
| **Concluir** | Abre o certificado. |
| **Reiniciar** | Zera todo o progresso salvo. |
| **Barra de progresso** | Missões concluídas, nota, etapa atual e próximo passo. |
| **Trilha** | Quatro etapas com checagem de compreensão. |
| **Missões** | Seis desafios com validação automática e dicas. |
| **Terminal** | Consultas simuladas ao ambiente. |
| **Ambiente** | Painel de hardening usado na missão 5. |

## 3. Roteiro das missões

### Missão 1 • Reconhecimento (10 pts)

Responda qual versão do PHP está no ambiente e o que significa rodar via `mod_php`.
Dica: o painel do ambiente mostra `8.2.11`; o `mod_php` embute o interpretador no processo do Apache.

### Missão 2 • CVE-2026-109618 (15 pts)

Faça a triagem da falha de RCE por corrupção no tratamento de falta de memória:
gravidade, tipo e versões corrigidas. Consulte a tabela do card **Objetivo e ambiente**.

### Missão 3 • CVE-2026-109619 (15 pts)

Identifique o mecanismo central — **use-after-free no estado global do worker** — e marque as afirmações verdadeiras.
Reiniciar o Apache alivia o sintoma, mas não corrige a causa raiz.

### Missão 4 • CVE-2026-115560 (15 pts)

Selecione as mitigações corretas e o status honesto:
desligar `session.upload_progress`, usar o handler `php`, atualizar o PHP quando possível e registrar **parcialmente validado**.

### Missão 5 • Aplicação das correções (20 pts)

No painel **Ambiente**, ajuste:

| Item | Valor-alvo |
|:---|:---|
| Versão do PHP | 8.2.35 |
| SAPI | php-fpm |
| `session.upload_progress` | Off |
| `session.serialize_handler` | php |

Depois clique em **Validar hardening**.

### Missão 6 • Validação final (25 pts)

Classifique os três cenários:

| Cenário | Resposta |
|:---|:---|
| Ambiente atualizado para PHP 8.2.35 | Corrigido |
| Mesmo worker reutilizado após erro fatal | Pendente |
| `session.upload_progress` ativo com handler modificado | Pendente |

## 4. Dicas em três níveis

Cada missão tem o botão **Pedir dica**:

1. **Conceito** — o que fazer e por quê.
2. **Comandos/configuração** — os pontos-chave.
3. **Resposta comentada** — a solução completa.

No **Modo prática** as três dicas ficam liberadas e a nota não é contabilizada.

## 5. Terminal simulado

Use os botões rápidos ou digite:

```text
php -v
php -i
php -m
apache2ctl -M
grep session.upload_progress /etc/php/8.2/apache2/php.ini
grep session.serialize_handler /etc/php/8.2/apache2/php.ini
uname -a
whoami
clear
help
```

O terminal reflete o painel do ambiente: se você trocar para php-fpm, o `apache2ctl -M` deixa de mostrar `php_module`.

## 6. Trilha e checagem de compreensão

A trilha tem quatro etapas. Cada uma tem três perguntas que **não contam nota**.
Ao responder, a explicação aparece imediatamente e há um atalho para a seção da Aula.
Você pode refazer a checagem quando quiser; o laboratório guarda o seu melhor resultado.

## 7. Competências

Seis indicadores mostram o que você domina, independentemente da nota:

- Reconhecimento do ambiente
- Triagem de CVE
- Memória e RCE
- Sessão PHP
- Hardening
- Validação e laudo

Cada competência combina o progresso das missões com o resultado da checagem da etapa.

## 8. Meus erros

Erros de validação e respostas erradas no quiz são classificados por tema.
O painel **Meus erros** mostra a quantidade e a explicação de cada categoria.
Errar a mesma coisa várias vezes é um ótimo sinal de onde estudar.

## 9. Nota, certificado e laudo

- A nota vai de 0 a 100 e é recalculada a cada mudança.
- O certificado é liberado com as 6 missões concluídas, mas pode ser visualizado antes (como "em andamento").
- O certificado é **educacional interno**, sem acreditação externa.
- O laudo `.md` inclui nome, data, nota, missões, ambiente final, competências e erros.

## 10. Uso responsável

- Não insira dados pessoais ou segredos.
- Não teste sistemas de terceiros sem autorização.
- Confirme as CVEs em [CVE.org](https://www.cve.org/) e no [NVD](https://nvd.nist.gov/) antes de citá-las em um relatório real.
- Mitigar não é corrigir: sem patch oficial, o status correto é **parcialmente validado**.

---

**SF Cyber Academy • PHP2Shell Cyber Lab 2026**
