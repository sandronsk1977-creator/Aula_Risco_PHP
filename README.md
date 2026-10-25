# PHP2Shell Cyber Lab 2026

Laboratório virtual interativo de investigação, correção e validação de vulnerabilidades PHP.

## Descrição

O PHP2Shell Cyber Lab 2026 é uma aplicação educacional totalmente local, executada no navegador, sem backend, sem Docker e sem dependências externas. Foi desenvolvido para ensinar a identificação, investigação, correção e validação de vulnerabilidades críticas do PHP.

## Objetivos de Aprendizagem

1. Identificar versões e configurações de risco
2. Compreender vulnerabilidades do PHP
3. Analisar evidências simuladas
4. Escolher medidas corretivas
5. Validar se as correções foram aplicadas corretamente
6. Produzir um relatório de conclusão

## CVEs Abordadas

- **CVE-2026-109618** - RCE via OOM corruption
- **CVE-2026-109619** - RCE via stale global state
- **CVE-2026-115560** - RCE via session upload progress com handler customizado

> **Importante:** Todas as informações técnicas foram validadas com base em fontes oficiais. Quando informações não puderam ser confirmadas, foram identificadas como "pendente de validação". Nenhum mecanismo de exploração real é apresentado.

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript puro
- LocalStorage
- SVG (quando aplicável)

## Como Abrir

1. Baixe ou clone este repositório
2. Abra o arquivo `index.html` diretamente em seu navegador web
3. Não é necessário instalar pacotes, servidor web ou dependências

**Compatível com:** Chrome, Firefox, Edge, Opera (versões modernas)

## Estrutura do Projeto

```
php2shell-cyber-lab/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos do laboratório
├── js/
│   ├── app.js          # Aplicação principal
│   ├── missions.js     # Sistema de missões
│   ├── simulator.js    # Simulador visual
│   ├── terminal.js     # Terminal simulado
│   ├── scoring.js      # Sistema de pontuação
│   └── reports.js      # Gerador de relatórios
├── data/
│   └── cves.js         # Dados das CVEs validados
├── assets/
│   └── icons/          # Ícones
└── README.md           # Este arquivo
```

## Missões

### Missão 1 - Reconhecimento do ambiente
Examine um servidor fictício com Debian, Apache, PHP e identifique configurações relevantes.

### Missão 2 - Investigação da CVE-2026-109618
Analise o mecanismo de RCE via corrupção por falta de memória (OOM).

### Missão 3 - Investigação da CVE-2026-109619
Analise o mecanismo de RCE via estado global obsoleto (use-after-free).

### Missão 4 - Investigação da CVE-2026-115560
Analise esta vulnerabilidade com condições específicas e suas mitigações documentadas.

### Missão 5 - Aplicação das correções
Simule a aplicação de correções em um painel de configuração.

### Missão 6 - Validação final
Identifique problemas corrigidos e pendentes, gere seu relatório.

## Funcionalidades

- **Dashboard interativo** - Visão geral do progresso
- **Sistema de missões** - 6 missões progressivas
- **Gamificação** - Pontos, medalhas e classificação
- **Terminal simulado** - Comandos didáticos (sem execução real)
- **Simulador visual** - Diagramas de eventos passo a passo
- **Persistência** - Progresso salvo no LocalStorage
- **Relatórios** - Geração e impressão em PDF
- **Design SOC** - Interface inspirada em Security Operations Center

## Segurança

- ✓ Nenhuma exploração real
- ✓ Nenhuma execução de comandos do sistema
- ✓ Nenhuma comunicação de rede obrigatória
- ✓ Sem formulários para servidores externos
- ✓ Sem coleta de dados
- ✓ Todo conteúdo é estático e local
- ✓ Simulações determinísticas

## Aviso Legal

**Ambiente educacional. Os eventos, comandos e resultados de exploração apresentados são simulados e não executam ataques reais.**

Este laboratório foi criado exclusivamente para fins educacionais. As informações sobre vulnerabilidades são baseadas em divulgações públicas oficiais. Este é um certificado educacional interno, sem alegar acreditação externa.

## Fontes de Referência

- [PHP Security Advisories](https://www.php.net/security-note.php)
- [PHP GitHub Security Advisories](https://github.com/php/php-src/security/advisories)
- [PHP Release Announcements](https://www.php.net/archive/)

---

**PHP2Shell Cyber Lab 2026** - Aprenda investigação, correção e validação de vulnerabilidades PHP de forma segura e prática.
