<div align="center">

<img src="assets/php2shell-cyber-lab-animated.svg" alt="PHP2Shell Cyber Lab 2026 — laboratório virtual interativo" width="100%">

# 🛡️ SF Cyber Academy • PHP2Shell Cyber Lab 2026

### Laboratório virtual de vulnerabilidades PHP 2026

**Investigue. Aprenda. Corrija. Valide.**

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Arquivo%20único-0A7E8C?style=for-the-badge" alt="Arquivo único">
  <img src="https://img.shields.io/badge/Modo-Local-6C43B5?style=for-the-badge" alt="Execução local">
</p>

</div>

---

## 📌 Sobre o projeto

O **PHP2Shell Cyber Lab 2026** é um laboratório educacional em **um único `index.html`** (HTML + CSS + JavaScript puro, sem framework e sem build). O aluno assume o papel de analista de segurança de uma empresa fictícia cujo servidor roda **PHP 8.2.11 com mod_php**, sessões ativas e um worker reaproveitado entre requisições.

A trilha cobre três vulnerabilidades de 2026:

| CVE | Tema | Gravidade |
|:---|:---|:---|
| **CVE-2026-109618** | RCE via corrupção no tratamento de falta de memória (OOM) | Crítica (CVSS 9.2) |
| **CVE-2026-109619** | RCE / use-after-free no estado global do worker | Crítica (CVSS 9.2) |
| **CVE-2026-115560** | `session.upload_progress` + serialize handler em runtime | Parcialmente validada |

> **Importante:** o laboratório é educativo. Os cenários, terminais e resultados são simulados e não executam ataques reais. Os dados das CVEs seguem o material didático do projeto e devem ser confirmados em fontes oficiais antes de qualquer uso em relatório.

## 🚀 Como usar

**Aluno**

1. Abra o **`index.html`** no navegador (Chrome, Edge ou Firefox) ou acesse **<https://php2shell2026.projetosdisruptivos.com.br>**. Não precisa instalar nada nem subir servidor.
2. Leia a **Aula** no cabeçalho e o card **Objetivo e ambiente**.
3. Digite seu nome no campo do cabeçalho — ele aparece no certificado e no laudo.
4. Siga as **6 missões**, use o **terminal simulado** e o **painel do ambiente**.
5. Ao terminar, gere o **laudo `.md`** e o **certificado** (imprimir ou salvar em PDF).
6. O progresso é salvo automaticamente no navegador (`localStorage`).

**Professor**

- Use o laboratório como atividade guiada: as missões 2, 3 e 4 são a triagem das três CVEs; a missão 5 é o hardening e a 6 é a validação final.
- O botão **Meus erros** mostra as categorias em que a turma mais erra.
- O **laudo `.md`** pode ser recolhido como entrega.

## 🗺️ Trilha de aprendizagem

| Etapa | Tema | Missões |
|:---:|:---|:---|
| 1 | Fundamentos e reconhecimento | 1 |
| 2 | CVEs de memória | 2 e 3 |
| 3 | Sessão e mitigação | 4 e 5 |
| 4 | Validação e entrega | 6 |

Cada etapa tem uma **checagem de compreensão com 3 perguntas que não contam nota**. Se errar, a explicação aparece na hora e há um atalho para a seção correspondente da Aula.

## 🎯 Missões e pontuação

| # | Missão | O que é validado | Pontos |
|:---:|:---|:---|:---:|
| 1 | Reconhecimento | versão do PHP e diferença entre CLI e mod_php | 10 |
| 2 | CVE-2026-109618 | gravidade, tipo de falha e versões corrigidas | 15 |
| 3 | CVE-2026-109619 | causa raiz (use-after-free) e reutilização do worker | 15 |
| 4 | CVE-2026-115560 | mitigações corretas e status honesto da validação | 15 |
| 5 | Aplicação das correções | PHP 8.2.35, php-fpm, upload_progress Off, handler `php` | 20 |
| 6 | Validação final | classificação de 3 cenários como corrigido/pendente | 25 |

**Total: 100 pontos.** A nota é recalculada a cada mudança: se você desfizer uma configuração correta, a missão volta a pendente. Cada missão tem **três níveis de dica** (conceito → comandos → resposta comentada).

## 💻 Terminal simulado

O terminal é didático: **nada é executado no computador**. Ele reflete o estado do painel do ambiente.

```text
php -v
php -i
php -m
php -r "echo PHP_VERSION;"
apache2ctl -M
grep session.upload_progress /etc/php/8.2/apache2/php.ini
grep session.serialize_handler /etc/php/8.2/apache2/php.ini
uname -a
whoami
clear
help
```

## 🛠️ Painel do ambiente (hardening)

Quatro ajustes compõem a missão 5:

| Item | Estado vulnerável | Estado endurecido |
|:---|:---|:---|
| Versão do PHP | 8.2.11 | **8.2.35** |
| SAPI | mod_php | **php-fpm** |
| `session.upload_progress` | On | **Off** |
| `session.serialize_handler` | php_serialize | **php** |

## 🧪 Recursos de aprendizagem

- **Modo prática:** a nota não é contabilizada e as dicas ficam liberadas.
- **Meus erros:** classifica os erros repetidos por tema (reconhecimento, triagem, causa, mitigação, hardening, validação).
- **Competências:** seis indicadores independentes da nota (reconhecimento, triagem, memória/RCE, sessão, hardening, validação).
- **Certificado:** nome do aluno, data, nota, missões e competências. Educacional, sem acreditação externa.
- **Laudo `.md`:** exporta nome, data, nota, status das missões, ambiente final, competências e erros.
- **Tema claro/escuro:** alterna no cabeçalho e fica salvo.

## 🧰 Tecnologias

| Tecnologia | Utilização |
|:---|:---|
| **HTML5** | Estrutura e conteúdo do laboratório. |
| **CSS3** | Layout responsivo, tema claro/escuro e impressão do certificado. |
| **JavaScript** | Missões, validação, terminal simulado, trilha, quiz e persistência local. |

Sem backend, sem dependências externas e sem build. Os únicos recursos externos são os links de referência (CVE.org e NVD).

## 🔐 Segurança e uso responsável

- Utilize apenas para fins educacionais e defensivos.
- Não insira senhas, tokens ou dados confidenciais: o progresso fica no seu navegador.
- Não teste sistemas de terceiros sem autorização explícita.
- Trate terminais, evidências e resultados como material didático simulado.
- Confirme identificador, versões afetadas e status das CVEs em fontes oficiais.

### Referências

- [CVE Program](https://www.cve.org/)
- [National Vulnerability Database (NVD)](https://nvd.nist.gov/)
- [PHP Security Advisories](https://www.php.net/security/)

## 📄 Licença

A licença ainda precisa ser definida pelo responsável pelo repositório. Antes de reutilizar, modificar ou redistribuir, confira se existe um arquivo `LICENSE` e quais condições se aplicam.

---

<div align="center">

**SF Cyber Academy • PHP2Shell Cyber Lab 2026**

*Aprender segurança na prática e com responsabilidade.*

</div>
