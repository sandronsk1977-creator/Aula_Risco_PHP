// Dados das CVEs validados com base em fontes oficiais
// PHP Security Advisories, PHP announcements e fontes oficiais
// Última verificação: Outubro 2026

const CVE_DATA = {
  "CVE-2026-109618": {
    id: "CVE-2026-109618",
    titulo: "RCE via OOM corruption",
    gravidade: "Crítica",
    cvss: "9.2 (CVSS v4.0)",
    tipo: "Execução Remota de Código (RCE)",
    componente_afetado: "Mecanismo de tratamento de erros por falta de memória (OOM) durante o processamento de requisições PHP",
    descricao_validada: "Ocorre quando uma alocação de memória falha durante a inicialização/processamento da requisição. O tratamento de erros via longjmp() deixa a memória da requisição em estado parcialmente inicializado. Durante o shutdown/limpeza da requisição, esse estado inválido é tratado como válido, levando à corrupção de memória.",
    versoes_afetadas: "PHP 5.4 até 8.5.11 (todas as versões até antes dos patches)",
    versoes_corrigidas: "PHP 8.2.35, 8.3.36, 8.4.27, 8.5.12. Backports mínimos disponíveis para PHP 7.4, 8.0, 8.1.",
    condicoes_exploracao: "Requisição não autenticada via HTTP. Funciona antes da execução de qualquer código da aplicação. Mais prevalente em mod_php (Apache).",
    impactos: [
      "Execução remota de código não autenticada",
      "Potencial vazamento de memória do processo",
      "Comprometimento do worker PHP"
    ],
    mitigacoes_documentadas: [
      "Atualização para versão corrigida",
      "Não há mitigação completa alternativa documentada"
    ],
    referencias: [
      "https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w",
      "https://www.php.net/index.php (anúncio de segurança)",
      "PHP Security Release - Outubro 2026"
    ],
    status_validacao: "VALIDADO"
  },
  "CVE-2026-109619": {
    id: "CVE-2026-109619",
    titulo: "RCE via stale global state",
    gravidade: "Crítica",
    cvss: "9.2 (CVSS v4.0)",
    tipo: "Execução Remota de Código (RCE) / Use-After-Free",
    componente_afetado: "Estado global persistente do worker PHP entre requisições",
    descricao_validada: "Estado pertencente a uma requisição pode sobreviver após a memória ter sido liberada. Um erro fatal pode interromper a limpeza antes que esse estado seja zerado/resetado. Quando o mesmo worker processa uma requisição subsequente, operações podem atuar sobre esse estado obsoleto (stale) levando a use-after-free e execução remota de código.",
    versoes_afetadas: "PHP 5.4 até 8.5.11 (todas as versões até antes dos patches)",
    versoes_corrigidas: "PHP 8.2.35, 8.3.36, 8.4.27, 8.5.12. Backports mínimos disponíveis para PHP 7.4, 8.0, 8.1.",
    condicoes_exploracao: "Requer interação entre produtor e consumidor no mesmo worker PHP. Pode ser explorada via múltiplas requisições ao mesmo worker. Também relatada via manipulação de sessões em certos cenários.",
    impactos: [
      "Execução remota de código não autenticada",
      "Use-after-free",
      "Vazamento de informações via memória liberada"
    ],
    mitigacoes_documentadas: [
      "Atualização para versão corrigida",
      "Não há mitigação completa alternativa documentada"
    ],
    referencias: [
      "https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp",
      "https://www.php.net/index.php (anúncio de segurança)",
      "PHP Security Release - Outubro 2026"
    ],
    status_validacao: "VALIDADO"
  },
  "CVE-2026-115560": {
    id: "CVE-2026-115560",
    titulo: "RCE via session upload progress com handler customizado",
    gravidade: "Crítica (não pontuada em todos os relatórios)",
    cvss: "PENDENTE DE VALIDAÇÃO - não há pontuação CVSS v4.0 completa em todas as fontes consultadas",
    tipo: "Execução Remota de Código (RCE)",
    componente_afetado: "session.upload_progress com alteração em tempo de execução do serialize handler",
    descricao_validada: "Relacionado ao recurso session.upload_progress. Ocorre em uma combinação incomum de configuração e código da aplicação: quando o serialize handler é alterado em tempo de execução (runtime) e em conjunto com o mecanismo de upload progress. A exploração requer uma sequência específica de manipulações de sessão.",
    versoes_afetadas: "PENDENTE DE VALIDAÇÃO - versões específicas não totalmente detalhadas em todas as fontes públicas no momento da pesquisa",
    versoes_corrigidas: "PENDENTE - correção planejada para versão regular (não emergencial). Sem patch disponível no momento das informações coletadas.",
    condicoes_exploracao: "Combinação incomum de configuração e código. Requer que o serialize handler seja modificado em tempo de execução. Aplicações que nunca alteram o serialize handler em runtime não são afetadas nesta configuração. Configuração não-default.",
    impactos: [
      "Execução remota de código em configurações incomuns",
      "Impacto limitado a cenários muito específicos"
    ],
    mitigacoes_documentadas: [
      "Desativar session.upload_progress: session.upload_progress.enabled=0 (mitigação temporária documentada pelo PHP)",
      "Se já aplicada após o aviso PHP2Shell, manter em vigor"
    ],
    referencias: [
      "https://www.php.net/ (avisos de segurança)",
      "Relatórios da comunidade de segurança (The Hacker News, BleepingComputer) - Outubro 2026"
    ],
    status_validacao: "PARCIALMENTE_VALIDADO - Detalhes técnicos completos pendentes; mitigação documentada"
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CVE_DATA;
}
