// Sistema de missões do PHP2Shell Cyber Lab 2026
class MissionSystem {
  constructor() {
    this.currentMission = 0;
    this.missions = this.createMissions();
    this.userAnswers = {};
    this.missionProgress = [false, false, false, false, false, false];
    this.loadProgress();
  }

  createMissions() {
    return [
      // Missão 0 - Placeholder
      { id: 0, title: "Dashboard", type: "dashboard" },
      
      // Missão 1
      {
        id: 1,
        title: "Missão 1 — Reconhecimento do ambiente",
        description: "Examine o servidor fictício e identifique informações relevantes sobre o ambiente PHP.",
        type: "quiz",
        questions: [
          {
            id: "m1q1",
            question: "Qual versão do PHP está sendo utilizada neste ambiente simulado?",
            options: [
              { id: "a", text: "PHP 7.4.3" },
              { id: "b", text: "PHP 8.2.11", correct: true },
              { id: "c", text: "PHP 5.6.40" },
              { id: "d", text: "PHP 8.1.0" }
            ],
            explanation: "No ambiente simulado, foi identificada a versão PHP 8.2.11. Embora corrigida em 8.2.35, esta versão simula um ambiente vulnerável para fins educacionais."
          },
          {
            id: "m1q2",
            question: "Qual a diferença entre PHP CLI e PHP utilizado pelo Apache (mod_php)?",
            options: [
              { id: "a", text: "Não há diferença" },
              { id: "b", text: "São binários completamente diferentes com configurações distintas e, no caso de mod_php, executam dentro do processo Apache", correct: true },
              { id: "c", text: "Apenas a versão" },
              { id: "d", text: "PHP CLI sempre é mais seguro" }
            ],
            explanation: "PHP CLI é executado independentemente, enquanto mod_php roda embutido no processo Apache. Com mod_php, o código PHP é executado com os privilégios do Apache e, em certos casos, antes mesmo da aplicação, aumentando a exposição em caso de vulnerabilidades no core do PHP."
          },
          {
            id: "m1q3",
            question: "Por que as atualizações de segurança são importantes para PHP?",
            options: [
              { id: "a", text: "Apenas para melhorar performance" },
              { id: "b", text: "Para corrigir vulnerabilidades que podem permitir execução remota de código", correct: true },
              { id: "c", text: "Apenas por questões de compatibilidade" },
              { id: "d", text: "Não são necessárias se o site é pequeno" }
            ],
            explanation: "Vulnerabilidades no core do PHP, como as apresentadas, podem permitir RCE não autenticado, afetando todo o servidor mesmo que a aplicação esteja segura."
          }
        ]
      },
      
      // Missão 2
      {
        id: 2,
        title: "Missão 2 — Investigação da CVE-2026-109618",
        description: "Analise a vulnerabilidade RCE via OOM corruption.",
        type: "investigation",
        cve: "CVE-2026-109618",
        steps: [
          {
            type: "info",
            title: "Descrição validada",
            content: CVE_DATA["CVE-2026-109618"].descricao_validada
          },
          {
            type: "quiz",
            question: "Com base na descrição, qual evento desencadeia a vulnerabilidade?",
            options: [
              { id: "a", text: "Um acesso inválido a arquivo" },
              { id: "b", text: "Falha de alocação de memória (OOM) durante inicialização da requisição", correct: true },
              { id: "c", text: "Sobrecarga de CPU" },
              { id: "d", text: "Muitos cookies" }
            ],
            explanation: "CVE-2026-109618 ocorre quando uma alocação de memória falha durante a inicialização/processamento da requisição, deixando o estado parcialmente inicializado."
          },
          {
            type: "quiz",
            question: "Qual a medida corretiva documentada para esta vulnerabilidade?",
            options: [
              { id: "a", text: "Desativar o mod_php" },
              { id: "b", text: "Aumentar o memory_limit" },
              { id: "c", text: "Atualizar para PHP 8.2.35, 8.3.36, 8.4.27 ou 8.5.12", correct: true },
              { id: "d", text: "Bloquear requisições POST" }
            ],
            explanation: "Não há mitigação completa alternativa documentada - a única solução segura é atualizar para uma versão corrigida."
          }
        ]
      },
      
      // Missão 3
      {
        id: 3,
        title: "Missão 3 — Investigação da CVE-2026-109619",
        description: "Analise a vulnerabilidade RCE via stale global state.",
        type: "investigation",
        cve: "CVE-2026-109619",
        steps: [
          {
            type: "info",
            title: "Descrição validada",
            content: CVE_DATA["CVE-2026-109619"].descricao_validada
          },
          {
            type: "quiz",
            question: "Por que o mesmo worker PHP é importante para esta vulnerabilidade?",
            options: [
              { id: "a", text: "Não é importante" },
              { id: "b", text: "O estado global persiste entre requisições no mesmo worker e pode apontar para memória liberada", correct: true },
              { id: "c", text: "Workers diferentes compartilham memória" },
              { id: "d", text: "Apenas para balanceamento" }
            ],
            explanation: "CVE-2026-109619 explora estado global persistente do worker. Se não resetado corretamente após erro fatal, uma requisição subsequente no mesmo worker pode reutilizar esse estado (use-after-free)."
          },
          {
            type: "quiz",
            question: "Qual tipo de corrupção de memória está envolvido?",
            options: [
              { id: "a", text: "Buffer overflow" },
              { id: "b", text: "Use-after-free", correct: true },
              { id: "c", text: "Stack overflow" },
              { id: "d", text: "Integer overflow" }
            ],
            explanation: "Ocorre use-after-free - o código tenta acessar memória que já foi liberada."
          }
        ]
      },
      
      // Missão 4
      {
        id: 4,
        title: "Missão 4 — Investigação da CVE-2026-115560",
        description: "Analise esta vulnerabilidade com condições mais específicas.",
        type: "investigation",
        cve: "CVE-2026-115560",
        steps: [
          {
            type: "info",
            title: "Descrição validada (parcial)",
            content: CVE_DATA["CVE-2026-115560"].descricao_validada
          },
          {
            type: "warning",
            title: "Atenção - Status de validação",
            content: "Esta CVE está PARCIALMENTE VALIDADA. Alguns detalhes técnicos ainda estão pendentes de confirmação. Não há patch emergencial disponível no momento das informações coletadas."
          },
          {
            type: "quiz",
            question: "Qual mitigação temporária está documentada para CVE-2026-115560?",
            options: [
              { id: "a", text: "Desativar PHP completamente" },
              { id: "b", text: "Definir session.upload_progress.enabled=0", correct: true },
              { id: "c", text: "Remover mod_php" },
              { id: "d", text: "Desativar todas as sessões" }
            ],
            explanation: "A mitigação documentada pelo PHP é desativar session.upload_progress via session.upload_progress.enabled=0."
          },
          {
            type: "quiz",
            question: "Por que não podemos afirmar que desativar uma configuração sempre corrige esta CVE?",
            options: [
              { id: "a", text: "Porque não está documentado que esta seja a única condição e há complexidade na exploração", correct: true },
              { id: "b", text: "Porque não funciona" },
              { id: "c", text: "Porque é sempre false" },
              { id: "d", text: "Não há razão" }
            ],
            explanation: "Conforme instruído, não devemos afirmar que desativar uma configuração corrige uma CVE a menos que esteja documentado para o cenário específico. Para CVE-2026-115560, a mitigação session.upload_progress.enabled=0 está documentada, mas o status de validação é parcial."
          }
        ]
      },
      
      // Missão 5
      {
        id: 5,
        title: "Missão 5 — Aplicação das correções",
        description: "Simule a aplicação de correções no painel de configuração.",
        type: "simulator",
        tasks: [
          "Examinar o estado inicial",
          "Identificar o problema",
          "Selecionar a correção adequada",
          "Aplicar a correção simulada",
          "Executar validação",
          "Comparar resultados"
        ]
      },
      
      // Missão 6
      {
        id: 6,
        title: "Missão 6 — Validação final",
        description: "Identifique problemas corrigidos e pendentes, gere relatório.",
        type: "final"
      }
    ];
  }

  getMission(id) {
    return this.missions.find(m => m.id === id);
  }

  completeMission(id) {
    this.missionProgress[id] = true;
    this.saveProgress();
  }

  isMissionComplete(id) {
    return this.missionProgress[id] || false;
  }

  saveProgress() {
    localStorage.setItem('php2shell_missions', JSON.stringify(this.missionProgress));
  }

  loadProgress() {
    const saved = localStorage.getItem('php2shell_missions');
    if (saved) {
      this.missionProgress = JSON.parse(saved);
    } else {
      this.missionProgress = [false, false, false, false, false, false, false];
    }
  }

  resetProgress() {
    this.missionProgress = [false, false, false, false, false, false, false];
    this.userAnswers = {};
    localStorage.removeItem('php2shell_missions');
  }
}
