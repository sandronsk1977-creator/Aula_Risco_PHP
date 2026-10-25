// Terminal simulado - SEM execução real de comandos
class SimulatedTerminal {
  constructor(elementId) {
    this.element = document.getElementById(elementId);
    this.history = [];
    this.historyIndex = -1;
    this.allowedCommands = {
      'help': this.cmdHelp.bind(this),
      'php --version': this.cmdPhpVersion.bind(this),
      'apache status': this.cmdApacheStatus.bind(this),
      'security scan': this.cmdSecurityScan.bind(this),
      'show findings': this.cmdShowFindings.bind(this),
      'apply patch': this.cmdApplyPatch.bind(this),
      'validate': this.cmdValidate.bind(this),
      'clear': this.cmdClear.bind(this)
    };
    this.missionState = 1;
    this.findings = [];
    this.patchesApplied = false;
    this.init();
  }

  init() {
    if (!this.element) return;
    
    this.output = this.element.querySelector('.terminal-output');
    this.input = this.element.querySelector('.terminal-input');
    
    if (this.input) {
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const cmd = this.input.value.trim();
          this.executeCommand(cmd);
          this.input.value = '';
        } else if (e.key === 'ArrowUp') {
          // Histórico simples
          e.preventDefault();
        }
      });
    }
    
    this.writeOutput('[PHP2Shell Cyber Lab] Terminal Simulado - Digite "help" para ajuda');
    this.writeOutput('[AVISO] Nenhum comando é executado no sistema real');
  }

  writeOutput(text, type = 'normal') {
    if (!this.output) return;
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.textContent = text;
    this.output.appendChild(line);
    this.output.scrollTop = this.output.scrollHeight;
  }

  executeCommand(cmd) {
    if (!cmd) return;
    
    this.writeOutput(`root@lab:~# ${cmd}`);
    
    if (this.allowedCommands[cmd]) {
      this.allowedCommands[cmd]();
    } else {
      this.writeOutput('Comando não reconhecido ou não permitido neste terminal simulado.', 'error');
      this.writeOutput('Digite "help" para ver os comandos disponíveis.', 'info');
    }
  }

  cmdHelp() {
    this.writeOutput('=== COMANDOS DISPONÍVEIS (SIMULADOS) ===', 'info');
    this.writeOutput('help              - Exibe esta ajuda');
    this.writeOutput('php --version     - Verifica versão do PHP');
    this.writeOutput('apache status     - Status do Apache');
    this.writeOutput('security scan     - Executa scan de segurança simulado');
    this.writeOutput('show findings     - Exibe vulnerabilidades encontradas');
    this.writeOutput('apply patch       - Aplica correções simuladas');
    this.writeOutput('validate          - Valida correções aplicadas');
    this.writeOutput('clear             - Limpa o terminal');
    this.writeOutput('');
    this.writeOutput('[AVISO] Todos os comandos são simulados e não afetam o sistema real.', 'warning');
  }

  cmdPhpVersion() {
    this.writeOutput('PHP 8.2.11 (cli) (built: Oct  5 2023 15:23:08) (NTS)');
    this.writeOutput('Copyright (c) The PHP Group');
    this.writeOutput('Zend Engine v4.2.11, Copyright (c) Zend Technologies');
    this.writeOutput('    with Zend OPcache v8.2.11, Copyright (c), by Zend Technologies');
    this.writeOutput('[INFO] Versão vulnerável detectada - Atualização recomendada', 'warning');
  }

  cmdApacheStatus() {
    this.writeOutput('Apache/2.4.57 (Debian) Server Status for localhost');
    this.writeOutput('Server Version: Apache/2.4.57 (Debian)');
    this.writeOutput('Server MPM: prefork');
    this.writeOutput('Server Built: 2023-07-20T13:00:00');
    this.writeOutput('Current Time: ' + new Date().toString());
    this.writeOutput('[INFO] mod_php habilitado - Maior exposição às CVEs', 'warning');
  }

  cmdSecurityScan() {
    this.writeOutput('[SCAN] Iniciando varredura de segurança simulada...', 'info');
    setTimeout(() => {
      this.writeOutput('[SCAN] Verificando PHP core...');
      this.writeOutput('[ALERT] CVE-2026-109618 - Possível vulnerabilidade detectada', 'error');
      this.writeOutput('[ALERT] CVE-2026-109619 - Possível vulnerabilidade detectada', 'error');
      this.writeOutput('[WARN] CVE-2026-115560 - Requer análise de configuração', 'warning');
      this.writeOutput('[SCAN] Varredura concluída. 3 achados.', 'info');
      this.findings = [
        {id: 'CVE-2026-109618', severity: 'CRÍTICO', status: 'PENDENTE'},
        {id: 'CVE-2026-109619', severity: 'CRÍTICO', status: 'PENDENTE'},
        {id: 'CVE-2026-115560', severity: 'ALTO', status: 'PENDENTE'}
      ];
    }, 500);
  }

  cmdShowFindings() {
    if (this.findings.length === 0) {
      this.writeOutput('[INFO] Nenhum achado. Execute "security scan" primeiro.', 'info');
      return;
    }
    this.writeOutput('=== ACHADOS DE SEGURANÇA ===', 'info');
    this.findings.forEach(f => {
      const type = f.severity === 'CRÍTICO' ? 'error' : 'warning';
      this.writeOutput(`[${f.severity}] ${f.id} - Status: ${f.status}`, type);
    });
  }

  cmdApplyPatch() {
    this.writeOutput('[PATCH] Aplicando correções simuladas...', 'info');
    setTimeout(() => {
      this.writeOutput('[PATCH] Atualizando PHP para versão corrigida (simulado)');
      this.writeOutput('[PATCH] Aplicando patches de segurança...');
      this.writeOutput('[PATCH] Reiniciando workers PHP (simulado)');
      this.writeOutput('[PATCH] Correções aplicadas com sucesso!', 'success');
      this.patchesApplied = true;
      this.findings.forEach(f => f.status = 'CORRIGIDO');
    }, 800);
  }

  cmdValidate() {
    if (!this.patchesApplied) {
      this.writeOutput('[VALIDATE] Nenhuma correção aplicada. Execute "apply patch" primeiro.', 'warning');
      return;
    }
    this.writeOutput('[VALIDATE] Validando correções...', 'info');
    setTimeout(() => {
      this.writeOutput('[VALIDATE] Verificando CVE-2026-109618... OK', 'success');
      this.writeOutput('[VALIDATE] Verificando CVE-2026-109619... OK', 'success');
      this.writeOutput('[VALIDATE] Verificando configuração... OK', 'success');
      this.writeOutput('[VALIDATE] Todas as correções validadas com sucesso!', 'success');
    }, 600);
  }

  cmdClear() {
    if (this.output) {
      this.output.innerHTML = '';
    }
    this.writeOutput('[PHP2Shell Cyber Lab] Terminal Simulado limpo');
  }
}
