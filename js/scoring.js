// Sistema de pontuação e gamificação
class ScoringSystem {
  constructor() {
    this.points = 0;
    this.missionPoints = [0, 0, 0, 0, 0, 0];
    this.hintsUsed = [0, 0, 0, 0, 0, 0];
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    this.badges = [];
  }

  addPoints(missionId, amount) {
    this.missionPoints[missionId] += amount;
    this.points += amount;
    this.save();
  }

  useHint(missionId) {
    this.hintsUsed[missionId]++;
    const penalty = 5;
    this.points = Math.max(0, this.points - penalty);
    this.save();
    return penalty;
  }

  recordAnswer(correct) {
    if (correct) {
      this.correctAnswers++;
    } else {
      this.wrongAnswers++;
    }
    this.save();
  }

  awardBadge(badge) {
    if (!this.badges.includes(badge)) {
      this.badges.push(badge);
      this.save();
    }
  }

  getFinalScore() {
    let total = this.points;
    // Bônus por completar todas as missões
    const completed = this.missionPoints.filter((p, idx) => idx > 0 && this.getMissionComplete(idx)).length;
    if (completed === 5) {
      total += 50;
    }
    return total;
  }

  getMissionComplete(missionId) {
    // Verifica se missão foi completada (simplificado)
    return this.missionPoints[missionId] >= 10;
  }

  getRank() {
    const score = this.getFinalScore();
    if (score >= 200) return "Especialista em Segurança PHP";
    if (score >= 150) return "Analista de Segurança";
    if (score >= 100) return "Investigador Júnior";
    if (score >= 50) return "Aprendiz";
    return "Iniciante";
  }

  save() {
    const data = {
      points: this.points,
      missionPoints: this.missionPoints,
      hintsUsed: this.hintsUsed,
      correctAnswers: this.correctAnswers,
      wrongAnswers: this.wrongAnswers,
      badges: this.badges
    };
    localStorage.setItem('php2shell_scoring', JSON.stringify(data));
  }

  load() {
    const saved = localStorage.getItem('php2shell_scoring');
    if (saved) {
      const data = JSON.parse(saved);
      this.points = data.points || 0;
      this.missionPoints = data.missionPoints || [0, 0, 0, 0, 0, 0];
      this.hintsUsed = data.hintsUsed || [0, 0, 0, 0, 0, 0];
      this.correctAnswers = data.correctAnswers || 0;
      this.wrongAnswers = data.wrongAnswers || 0;
      this.badges = data.badges || [];
    }
  }

  reset() {
    this.points = 0;
    this.missionPoints = [0, 0, 0, 0, 0, 0];
    this.hintsUsed = [0, 0, 0, 0, 0, 0];
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    this.badges = [];
    localStorage.removeItem('php2shell_scoring');
  }
}
