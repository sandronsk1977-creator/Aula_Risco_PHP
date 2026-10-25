// Sistema de relatórios
class ReportGenerator {
  constructor(missionSystem, scoringSystem) {
    this.missionSystem = missionSystem;
    this.scoringSystem = scoringSystem;
  }

  generateReport() {
    const completedMissions = this.missionSystem.missionProgress.filter((m, idx) => idx > 0 && m).length;
    const totalScore = this.scoringSystem.getFinalScore();
    const rank = this.scoringSystem.getRank();
    
    const report = {
      titulo: "Relatório de Conclusão - PHP2Shell Cyber Lab 2026",
      data: new Date().toLocaleString('pt-BR'),
      laboratorio: "PHP2Shell Cyber Lab 2026",
      tipo: "Certificado educacional interno",
      
      resumo: {
        missoesConcluidas: completedMissions,
        totalMissoes: 5,
        pontuacao: totalScore,
        classificacao: rank,
        respostasCorretas: this.scoringSystem.correctAnswers,
        errosCometidos: this.scoringSystem.wrongAnswers
      },
      
      missoes: [
        { id: 1, nome: "Reconhecimento do ambiente", concluida: this.missionSystem.isMissionComplete(1), pontos: this.scoringSystem.missionPoints[1] },
        { id: 2, nome: "Investigação da CVE-2026-109618", concluida: this.missionSystem.isMissionComplete(2), pontos: this.scoringSystem.missionPoints[2] },
        { id: 3, nome: "Investigação da CVE-2026-109619", concluida: this.missionSystem.isMissionComplete(3), pontos: this.scoringSystem.missionPoints[3] },
        { id: 4, nome: "Investigação da CVE-2026-115560", concluida: this.missionSystem.isMissionComplete(4), pontos: this.scoringSystem.missionPoints[4] },
        { id: 5, nome: "Aplicação das correções", concluida: this.missionSystem.isMissionComplete(5), pontos: this.scoringSystem.missionPoints[5] }
      ],
      
      correcoesAplicadas: [
        "Identificação de versões vulneráveis do PHP",
        "Compreensão dos mecanismos CVE-2026-109618 e CVE-2026-109619",
        "Análise das condições para CVE-2026-115560",
        "Aplicação de correções simuladas no painel de configuração",
        "Validação das correções"
      ],
      
      recomendacoes: [
        "Sempre manter PHP atualizado para as versões mais recentes com patches de segurança",
        "Monitorar anúncios de segurança do PHP Group",
        "Aplicar patches imediatamente em ambientes de produção",
        "Utilizar versões suportadas do PHP",
        "Implementar práticas de hardening do servidor web",
        "Para CVE-2026-115560, avaliar necessidade de session.upload_progress.enabled=0 em configurações específicas"
      ],
      
      referencias: [
        "PHP Security Advisories - https://www.php.net/security-note.php",
        "GitHub Security Advisories - php/php-src",
        "PHP 8.2.35/8.3.36/8.4.27/8.5.12 Release Announcements",
        "CVE-2026-109618, CVE-2026-109619, CVE-2026-115560 - Documentação oficial"
      ],
      
      aviso: "Ambiente educacional. Os eventos, comandos e resultados de exploração apresentados são simulados e não executam ataques reais. Este certificado é educacional interno, sem alegar acreditação externa."
    };
    
    return report;
  }

  displayReport() {
    const report = this.generateReport();
    const reportHtml = `
      <div class="report-container">
        <div class="report-header">
          <h1>PHP2Shell Cyber Lab 2026</h1>
          <h2>Relatório de Conclusão</h2>
          <p class="report-type">${report.tipo}</p>
        </div>
        
        <div class="report-section">
          <h3>Informações Gerais</h3>
          <p><strong>Data:</strong> ${report.data}</p>
          <p><strong>Laboratório:</strong> ${report.laboratorio}</p>
        </div>
        
        <div class="report-section">
          <h3>Resumo de Desempenho</h3>
          <div class="report-grid">
            <div class="report-item">
              <span class="report-label">Missões Concluídas</span>
              <span class="report-value">${report.resumo.missoesConcluidas}/5</span>
            </div>
            <div class="report-item">
              <span class="report-label">Pontuação Total</span>
              <span class="report-value">${report.resumo.pontuacao}</span>
            </div>
            <div class="report-item">
              <span class="report-label">Classificação</span>
              <span class="report-value">${report.resumo.classificacao}</span>
            </div>
            <div class="report-item">
              <span class="report-label">Respostas Corretas</span>
              <span class="report-value">${report.resumo.respostasCorretas}</span>
            </div>
            <div class="report-item">
              <span class="report-label">Erros Cometidos</span>
              <span class="report-value">${report.resumo.errosCometidos}</span>
            </div>
          </div>
        </div>
        
        <div class="report-section">
          <h3>Detalhamento por Missão</h3>
          <table class="report-table">
            <thead>
              <tr>
                <th>Missão</th>
                <th>Status</th>
                <th>Pontos</th>
              </tr>
            </thead>
            <tbody>
              ${report.missoes.map(m => `
                <tr>
                  <td>${m.nome}</td>
                  <td>${m.concluida ? '✓ Concluída' : '✗ Pendente'}</td>
                  <td>${m.pontos}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <div class="report-section">
          <h3>Correções Aplicadas no Simulador</h3>
          <ul>
            ${report.correcoesAplicadas.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>
        
        <div class="report-section">
          <h3>Recomendações de Segurança</h3>
          <ul>
            ${report.recomendacoes.map(r => `<li>${r}</li>`).join('')}
          </ul>
        </div>
        
        <div class="report-section">
          <h3>Referências Técnicas Utilizadas</h3>
          <ul class="references">
            ${report.referencias.map(r => `<li>${r}</li>`).join('')}
          </ul>
        </div>
        
        <div class="report-footer">
          <p class="warning-text">${report.aviso}</p>
        </div>
      </div>
    `;
    
    return reportHtml;
  }

  printReport() {
    const reportHtml = this.displayReport();
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Relatório - PHP2Shell Cyber Lab 2026</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; background: white; color: black; }
            .report-container { max-width: 800px; margin: 0 auto; }
            .report-header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; }
            .report-header h1 { color: #0066cc; margin: 0; }
            .report-header h2 { color: #333; margin: 10px 0; }
            .report-type { font-style: italic; color: #666; }
            .report-section { margin: 30px 0; }
            .report-section h3 { color: #0066cc; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
            .report-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
            .report-item { display: flex; justify-content: space-between; padding: 8px; background: #f5f5f5; }
            .report-label { font-weight: bold; }
            .report-table { width: 100%; border-collapse: collapse; }
            .report-table th, .report-table td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            .report-table th { background: #f0f0f0; }
            .warning-text { background: #fff3cd; padding: 10px; border: 1px solid #ffc107; font-size: 12px; }
            ul { margin: 10px 0; padding-left: 20px; }
            li { margin: 5px 0; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          ${reportHtml}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }
}
