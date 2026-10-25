// Simulador visual de eventos
class EventSimulator {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.currentStep = 0;
    this.steps = [];
    this.isPlaying = false;
    this.animationId = null;
  }

  setScenario(scenario) {
    if (scenario === 'cve-109618') {
      this.steps = [
        {title: "1. Requisição HTTP chega", desc: "Cliente envia requisição não autenticada ao servidor", type: "request"},
        {title: "2. mod_php inicia processamento", desc: "Apache com mod_php processa a requisição", type: "server"},
        {title: "3. Parsing de entrada", desc: "Durante parsing, alocação de memória falha (OOM)", type: "warning"},
        {title: "4. Estado parcialmente inicializado", desc: "longjmp() deixa memória da requisição em estado inválido", type: "danger"},
        {title: "5. Request shutdown", desc: "Shutdown processa estado inválido como se fosse válido", type: "danger"},
        {title: "6. Corrupção de memória", desc: "Corrupção leva à possibilidade de RCE", type: "exploit"},
        {title: "7. CORRIGIDO com patch", desc: "Validação adequada do estado evita corrupção", type: "fixed"}
      ];
    } else if (scenario === 'cve-109619') {
      this.steps = [
        {title: "1. Requisição A no Worker", desc: "Worker PHP processa requisição", type: "request"},
        {title: "2. Erro fatal ocorre", desc: "Erro fatal interrompe operação/limpeza", type: "warning"},
        {title: "3. Estado não resetado", desc: "Estado global com ponteiro para memória liberada persiste", type: "danger"},
        {title: "4. Worker reutilizado", desc: "Mesmo worker atende Requisição B", type: "server"},
        {title: "5. Reutilização de estado stale", desc: "Código acessa memória já liberada (use-after-free)", type: "danger"},
        {title: "6. Exploração possível", desc: "Controle pode ser tomado via estado corrompido", type: "exploit"},
        {title: "7. CORRIGIDO com patch", desc: "Estado é corretamente resetado entre requisições", type: "fixed"}
      ];
    } else if (scenario === 'general') {
      this.steps = [
        {title: "Cliente HTTP", desc: "Navegador/cliente faz requisição", type: "request"},
        {title: "Apache + mod_php", desc: "Servidor recebe e passa para PHP", type: "server"},
        {title: "PHP Engine", desc: "Motor PHP processa requisição", type: "php"},
        {title: "Sessões/Uploads", desc: "Recursos da aplicação", type: "info"},
        {title: "Resposta", desc: "Resposta enviada ao cliente", type: "response"}
      ];
    }
    this.currentStep = 0;
    this.draw();
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.draw();
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.draw();
    }
  }

  reset() {
    this.currentStep = 0;
    this.draw();
  }

  draw() {
    if (!this.ctx || !this.canvas) return;
    
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    // Limpar canvas
    ctx.fillStyle = '#0a0e27';
    ctx.fillRect(0, 0, width, height);
    
    // Título
    ctx.fillStyle = '#00d4ff';
    ctx.font = 'bold 16px Courier New';
    ctx.fillText('SIMULADOR VISUAL DE EVENTOS', 10, 25);
    
    ctx.fillStyle = '#8b92b8';
    ctx.font = '12px Courier New';
    ctx.fillText('[AVISO] Simulação didática - Não executa ataques reais', 10, 45);
    
    if (this.steps.length === 0) {
      ctx.fillStyle = '#ffaa00';
      ctx.font = '14px Courier New';
      ctx.fillText('Selecione um cenário para visualizar', 10, 80);
      return;
    }
    
    // Desenhar passos
    const step = this.steps[this.currentStep];
    const colors = {
      request: '#00ff88',
      server: '#00d4ff',
      php: '#ffaa00',
      warning: '#ffaa00',
      danger: '#ff4444',
      exploit: '#ff00ff',
      fixed: '#00ff88',
      info: '#8b92b8',
      response: '#00ff88'
    };
    
    ctx.fillStyle = colors[step.type] || '#ffffff';
    ctx.font = 'bold 14px Courier New';
    ctx.fillText(`PASSO ${this.currentStep + 1}/${this.steps.length}: ${step.title}`, 10, 80);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Courier New';
    const words = step.desc.split(' ');
    let line = '';
    let y = 110;
    words.forEach(word => {
      const testLine = line + word + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > width - 20 && line !== '') {
        ctx.fillText(line, 10, y);
        line = word + ' ';
        y += 20;
      } else {
        line = testLine;
      }
    });
    ctx.fillText(line, 10, y);
    
    // Indicador de progresso
    ctx.fillStyle = '#1a1f4d';
    ctx.fillRect(10, height - 40, width - 20, 10);
    ctx.fillStyle = '#00d4ff';
    const progress = ((this.currentStep + 1) / this.steps.length) * (width - 20);
    ctx.fillRect(10, height - 40, progress, 10);
    
    ctx.fillStyle = '#8b92b8';
    ctx.font = '10px Courier New';
    ctx.fillText('Progresso da simulação', 10, height - 50);
  }

  start() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    const play = () => {
      if (!this.isPlaying) return;
      if (this.currentStep < this.steps.length - 1) {
        this.nextStep();
        setTimeout(play, 1500);
      } else {
        this.isPlaying = false;
      }
    };
    play();
  }

  pause() {
    this.isPlaying = false;
  }
}
