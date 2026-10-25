// Aplicação principal PHP2Shell Cyber Lab 2026
class PHP2ShellLab {
  constructor() {
    this.missionSystem = new MissionSystem();
    this.scoringSystem = new ScoringSystem();
    this.reportGenerator = new ReportGenerator(this.missionSystem, this.scoringSystem);
    this.terminal = null;
    this.simulator = null;
    
    this.scoringSystem.load();
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.renderDashboard();
    this.showWarning();
  }

  setupEventListeners() {
    // Botão iniciar treinamento
    const startBtn = document.getElementById('start-training');
    if (startBtn) {
      startBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.goToMission(1);
      }, true);
    }

    // Botão reiniciar progresso
    const resetBtn = document.getElementById('reset-progress');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja reiniciar todo o progresso? Esta ação não pode ser desfeita.')) {
          this.missionSystem.resetProgress();
          this.scoringSystem.reset();
          this.renderDashboard();
          alert('Progresso reiniciado com sucesso!');
        }
      });
    }

    // Navegação lateral
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const missionId = parseInt(link.dataset.mission);
        this.goToMission(missionId);
      });
    });
  }

  showWarning() {
    const warning = document.createElement('div');
    warning.className = 'permanent-warning';
    warning.innerHTML = `
      <span class="warning-icon">⚠️</span>
      <span>Ambiente educacional. Os eventos, comandos e resultados de exploração apresentados são simulados e não executam ataques reais.</span>
    `;
    document.body.appendChild(warning);
  }

  renderDashboard() {
    const dashboard = document.getElementById('dashboard-view');
    const missionView = document.getElementById('mission-view');
    const reportView = document.getElementById('report-view');
    
    if (dashboard) dashboard.style.display = 'block';
    if (missionView) missionView.style.display = 'none';
    if (reportView) reportView.style.display = 'none';
    
    // Atualizar estatísticas
    const completed = this.missionSystem.missionProgress.filter((m, idx) => idx > 0 && m).length;
    const pending = 5 - completed;
    
    document.getElementById('missions-completed').textContent = completed;
    document.getElementById('missions-pending').textContent = pending;
    document.getElementById('total-score').textContent = this.scoringSystem.getFinalScore();
    document.getElementById('correct-answers').textContent = this.scoringSystem.correctAnswers;
    
    // Progresso geral
    const progressBar = document.getElementById('overall-progress');
    if (progressBar) {
      progressBar.style.width = (completed / 5) * 100 + '%';
    }
    
    // Status das missões
    for (let i = 1; i <= 5; i++) {
      const statusEl = document.getElementById(`mission-${i}-status`);
      if (statusEl) {
        if (this.missionSystem.isMissionComplete(i)) {
          statusEl.textContent = '✓ Concluída';
          statusEl.className = 'status-complete';
        } else {
          statusEl.textContent = '○ Pendente';
          statusEl.className = 'status-pending';
        }
      }
    }
    
    // Atualizar nav
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, idx) => {
      if (idx === 0) {
        link.classList.toggle('active', true);
      } else {
        const missionId = parseInt(link.dataset.mission);
        link.classList.toggle('active', missionId === this.missionSystem.currentMission);
        link.classList.toggle('completed', this.missionSystem.isMissionComplete(missionId));
      }
    });
  }

  goToMission(missionId) {
    this.missionSystem.currentMission = missionId;
    
    const dashboard = document.getElementById('dashboard-view');
    const missionView = document.getElementById('mission-view');
    const reportView = document.getElementById('report-view');
    
    if (dashboard) dashboard.style.display = 'none';
    if (missionView) missionView.style.display = 'none';
    if (reportView) reportView.style.display = 'none';
    
    if (missionId === 0) {
      if (dashboard) dashboard.style.display = 'block';
      this.renderDashboard();
      return;
    }
    
    if (missionId === 99) {
      // Gerar relatório
      if (reportView) {
        dashboard.style.display = 'none';
        missionView.style.display = 'none';
        reportView.style.display = 'block';
        reportView.innerHTML = this.reportGenerator.displayReport();
        
        // Adicionar botões
        const actions = document.createElement('div');
        actions.className = 'report-actions';
        actions.innerHTML = `
          <button onclick="app.renderDashboard()" class="btn-secondary">Voltar ao Dashboard</button>
          <button onclick="app.reportGenerator.printReport()" class="btn-primary">Imprimir/Salvar PDF</button>
        `;
        reportView.appendChild(actions);
      }
      return;
    }
    
    if (missionView) {
      missionView.style.display = 'block';
      this.renderMission(missionId);
    }
    
    // Atualizar nav
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, idx) => {
      if (idx === 0) {
        link.classList.toggle('active', false);
      } else {
        const mid = parseInt(link.dataset.mission);
        link.classList.toggle('active', mid === missionId);
      }
    });
  }

  renderMission(missionId) {
    const mission = this.missionSystem.getMission(missionId);
    const content = document.getElementById('mission-content');
    if (!mission || !content) return;
    
    content.innerHTML = `
      <div class="mission-header">
        <h2>${mission.title}</h2>
        <p>${mission.description}</p>
      </div>
    `;
    
    if (mission.type === 'quiz') {
      this.renderQuizMission(mission, content);
    } else if (mission.type === 'investigation') {
      this.renderInvestigationMission(mission, content);
    } else if (mission.type === 'simulator') {
      this.renderSimulatorMission(mission, content);
    } else if (mission.type === 'final') {
      this.renderFinalMission(mission, content);
    }
  }

  renderQuizMission(mission, container) {
    mission.questions.forEach((q, idx) => {
      const qDiv = document.createElement('div');
      qDiv.className = 'question-block';
      qDiv.innerHTML = `
        <h3>Questão ${idx + 1}</h3>
        <p class="question-text">${q.question}</p>
        <div class="options">
          ${q.options.map(opt => `
            <button class="option-btn" data-question="${q.id}" data-option="${opt.id}">
              ${opt.id.toUpperCase()}) ${opt.text}
            </button>
          `).join('')}
        </div>
        <div id="explanation-${q.id}" class="explanation" style="display:none;"></div>
      `;
      container.appendChild(qDiv);
    });
    
    // Event listeners
    container.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const qId = btn.dataset.question;
        const optId = btn.dataset.option;
        this.checkAnswer(mission, qId, optId, btn);
      });
    });
    
    // Botão completar missão
    const completeBtn = document.createElement('button');
    completeBtn.className = 'btn-primary';
    completeBtn.textContent = 'Concluir Missão 1';
    completeBtn.style.marginTop = '20px';
    completeBtn.addEventListener('click', () => {
      this.missionSystem.completeMission(1);
      this.scoringSystem.addPoints(1, 30);
      alert('Missão 1 concluída! +30 pontos');
      this.goToMission(0);
    });
    container.appendChild(completeBtn);
  }

  checkAnswer(mission, qId, optId, btn) {
    const question = mission.questions.find(q => q.id === qId);
    const option = question.options.find(o => o.id === optId);
    
    // Desabilitar todas as opções desta questão
    const allBtns = document.querySelectorAll(`button[data-question="${qId}"]`);
    allBtns.forEach(b => b.disabled = true);
    
    const expDiv = document.getElementById(`explanation-${qId}`);
    
    if (option.correct) {
      btn.classList.add('correct');
      this.scoringSystem.recordAnswer(true);
      this.scoringSystem.addPoints(mission.id, 10);
      expDiv.innerHTML = `<div class="exp-correct">✓ Correto! +10 pontos<br><br>${question.explanation}</div>`;
    } else {
      btn.classList.add('wrong');
      // Mostrar resposta correta
      allBtns.forEach(b => {
        const opt = question.options.find(o => o.id === b.dataset.option);
        if (opt.correct) b.classList.add('correct');
      });
      this.scoringSystem.recordAnswer(false);
      expDiv.innerHTML = `<div class="exp-wrong">✗ Incorreto<br><br>${question.explanation}</div>`;
    }
    expDiv.style.display = 'block';
  }

  renderInvestigationMission(mission, container) {
    const cve = CVE_DATA[mission.cve];
    
    const infoDiv = document.createElement('div');
    infoDiv.className = 'cve-info';
    infoDiv.innerHTML = `
      <h3>Dados da ${mission.cve}</h3>
      <table class="cve-table">
        <tr><td><strong>Gravidade:</strong></td><td>${cve.gravidade} (CVSS: ${cve.cvss})</td></tr>
        <tr><td><strong>Tipo:</strong></td><td>${cve.tipo}</td></tr>
        <tr><td><strong>Componente afetado:</strong></td><td>${cve.componente_afetado}</td></tr>
        <tr><td><strong>Versões afetadas:</strong></td><td>${cve.versoes_afetadas}</td></tr>
        <tr><td><strong>Versões corrigidas:</strong></td><td>${cve.versoes_corrigidas}</td></tr>
        <tr><td><strong>Status validação:</strong></td><td>${cve.status_validacao}</td></tr>
      </table>
    `;
    container.appendChild(infoDiv);
    
    mission.steps.forEach((step, idx) => {
      if (step.type === 'info') {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-block info';
        stepDiv.innerHTML = `<h4>${step.title}</h4><p>${step.content}</p>`;
        container.appendChild(stepDiv);
      } else if (step.type === 'warning') {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-block warning';
        stepDiv.innerHTML = `<h4>⚠️ ${step.title}</h4><p>${step.content}</p>`;
        container.appendTag stepDiv;
      } else if (step.type === 'quiz') {
        const qDiv = document.createElement('div');
        qDiv.className = 'question-block';
        qDiv.innerHTML = `
          <h3>Questão</h3>
          <p class="question-text">${step.question}</p>
          <div class="options">
            ${step.options.map(opt => `
              <button class="option-btn" data-step-quiz="${mission.id}-${idx}" data-option="${opt.id}">
                ${opt.id.toUpperCase()}) ${opt.text}
              </button>
            `).join('')}
          </div>
          <div id="exp-${mission.id}-${idx}" class="explanation" style="display:none;"></div>
        `;
        container.appendChild(qDiv);
      }
    });
    
    // Event listeners para quizzes
    container.querySelectorAll('button[data-step-quiz]').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.stepQuiz;
        const optId = btn.dataset.option;
        const [mId, sIdx] = key.split('-');
        this.checkInvestigationAnswer(mission, parseInt(sIdx), optId, btn);
      });
    });
    
    const completeBtn = document.createElement('button');
    completeBtn.className = 'btn-primary';
    completeBtn.textContent = `Concluir ${mission.title}`;
    completeBtn.style.marginTop = '20px';
    completeBtn.addEventListener('click', () => {
      this.missionSystem.completeMission(mission.id);
      this.scoringSystem.addPoints(mission.id, 40);
      this.scoringSystem.awardBadge(mission.cve);
      alert(`${mission.title} concluída! +40 pontos | Medalha: ${mission.cve}`);
      this.goToMission(0);
    });
    container.appendChild(completeBtn);
  }

  checkInvestigationAnswer(mission, stepIdx, optId, btn) {
    const step = mission.steps[stepIdx];
    const option = step.options.find(o => o.id === optId);
    
    const allBtns = document.querySelectorAll(`button[data-step-quiz="${mission.id}-${stepIdx}"]`);
    allBtns.forEach(b => b.disabled = true);
    
    const expDiv = document.getElementById(`exp-${mission.id}-${stepIdx}`);
    
    if (option.correct) {
      btn.classList.add('correct');
      this.scoringSystem.recordAnswer(true);
      this.scoringSystem.addPoints(mission.id, 15);
      expDiv.innerHTML = `<div class="exp-correct">✓ Correto! +15 pontos<br><br>${step.explanation}</div>`;
    } else {
      btn.classList.add('wrong');
      allBtns.forEach(b => {
        const opt = step.options.find(o => o.id === b.dataset.option);
        if (opt.correct) b.classList.add('correct');
      });
      this.scoringSystem.recordAnswer(false);
      expDiv.innerHTML = `<div class="exp-wrong">✗ Incorreto<br><br>${step.explanation}</div>`;
    }
    expDiv.style.display = 'block';
  }

  renderSimulatorMission(mission, container) {
    container.innerHTML += `
      <div class="simulator-panel">
        <h3>Painel de Configuração Simulado</h3>
        <div class="config-section">
          <h4>Estado Inicial</h4>
          <table class="config-table">
            <tr><td>PHP Version</td><td class="status-warn">8.2.11 (Vulnerável)</td></tr>
            <tr><td>mod_php</td><td class="status-warn">Habilitado</td></tr>
            <tr><td>memory_limit</td><td>128M</td></tr>
            <tr><td>session.upload_progress.enabled</td><td>1 (Habilitado)</td></tr>
          </table>
        </div>
        
        <div class="correction-section">
          <h4>Selecione a Correção</h4>
          <select id="correction-select" class="select-input">
            <option value="">-- Selecione --</option>
            <option value="update">Atualizar PHP para versão corrigida (8.2.35+)</option>
            <option value="disable-mod">Desativar mod_php (usar PHP-FPM)</option>
            <option value="limit-memory">Aumentar memory_limit</option>
            <option value="disable-upload">Desativar session.upload_progress</option>
          </select>
          <button id="apply-correction" class="btn-primary" style="margin-top:10px;">Aplicar Correção Simulada</button>
        </div>
        
        <div class="validation-section" style="display:none; margin-top:20px;">
          <h4>Validação</h4>
          <button id="run-validation" class="btn-secondary">Executar Validação</button>
          <div id="validation-result" class="validation-result"></div>
        </div>
      </div>
    `;
    
    document.getElementById('apply-correction').addEventListener('click', () => {
      const select = document.getElementById('correction-select');
      if (select.value === 'update') {
        alert('Correção aplicada: PHP atualizado para versão corrigida (simulado)');
        document.querySelector('.validation-section').style.display = 'block';
        this.scoringSystem.addPoints(5, 25);
      } else {
        alert('Correção não adequada para mitigar todas as CVEs. Atualização para versão corrigida é necessária.');
      }
    });
    
    document.getElementById('run-validation').addEventListener('click', () => {
      const result = document.getElementById('validation-result');
      result.innerHTML = `
        <div class="validation-success">
          ✓ Validação concluída<br>
          ✓ CVE-2026-109618: Corrigido<br>
          ✓ CVE-2026-109619: Corrigido<br>
          ⚠ CVE-2026-115560: Requer análise adicional<br>
          <br><strong>Estado: Parcialmente corrigido - Atualização completa necessária</strong>
        </div>
      `;
      this.scoringSystem.addPoints(5, 15);
    });
    
    const completeBtn = document.createElement('button');
    completeBtn.className = 'btn-primary';
    completeBtn.textContent = 'Concluir Missão 5';
    completeBtn.style.marginTop = '20px';
    completeBtn.addEventListener('click', () => {
      this.missionSystem.completeMission(5);
      alert('Missão 5 concluída! +40 pontos');
      this.goToMission(0);
    });
    container.appendChild(completeBtn);
  }

  renderFinalMission(mission, container) {
    container.innerHTML += `
      <div class="final-mission">
        <h3>Validação Final - Múltiplos Cenários</h3>
        <p>Identifique quais problemas foram corrigidos e quais permanecem pendentes.</p>
        
        <div class="scenario">
          <h4>Cenário 1: Ambiente atualizado para PHP 8.2.35</h4          <label><input type="radio" name="s1" value="corrigido"> Corrigido</label><br>
          <label><input type="radio" name="s1" value="pendente"> Pendente</label>
        </div>
        
        <div class="scenario">
          <h4>Cenário 2: Mesmo worker reutilizado com erro fatal</h4>
          <label><input type="radio" name="s2" value="corrigido"> Corrigido</label><br>
          <label><input type="radio" name="s2" value="pendente"> Pendente</label>
        </div>
        
        <div class="scenario">
          <h4>Cenário 3: session.upload_progress habilitado com serialize handler modificado</h4>
          <label><input type="radio" name="s3" value="corrigido"> Corrigido</label><br>
          <label><input type="radio" name="s3" value="pendente"> Pendente</label>
        </div>
        
        <button id="check-final" class="btn-primary" style="margin-top:20px;">Verificar Respostas</button>
        <div id="final-result"></div>
      </div>
    `;
    
    document.getElementById('check-final').addEventListener('click', () => {
      const s1 = document.querySelector('input[name="s1"]:checked');
      const s2 = document.querySelector('input[name="s2"]:checked');
      const s3 = document.querySelector('input[name="s3"]:checked');
      
      if (!s1 || !s2 || !s3) {
        alert('Responda todos os cenários');
        return;
      }
      
      let correct = 0;
      if (s1.value === 'corrigido') correct++;
      if (s2.value === 'corrigido') correct++;
      if (s3.value === 'pendente') correct++;
      
      this.scoringSystem.recordAnswer(correct === 3);
      if (correct === 3) {
        this.scoringSystem.addPoints(6, 50);
        document.getElementById('final-result').innerHTML = '<div class="exp-correct">✓ Todas as respostas corretas! +50 pontos</div>';
      } else {
        document.getElementById('final-result').innerHTML = `<div class="exp-wrong">Parcial: ${correct}/3 corretos</div>`;
      }
    });
    
    const reportBtn = document.createElement('button');
    reportBtn.className = 'btn-primary';
    reportBtn.textContent = 'Gerar Relatório Final';
    reportBtn.style.marginTop = '20px';
    reportBtn.addEventListener('click', () => {
      this.missionSystem.completeMission(6);
      this.goToMission(99);
    });
    container.appendChild(reportBtn);
  }
}

// Inicializar aplicação quando DOM estiver pronto
function initApp() {
  if (!window.app) {
    window.app = new PHP2ShellLab();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
