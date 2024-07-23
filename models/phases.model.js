export class Phases {

  actualPhase = 0;

  velocityXOfEnemys = 4;
  velocityYOfEnemys = 2;
  generationTime = 200;

  constructor() {

  }

  verifyPhase(numberOfEnemysKilled) {
    switch (numberOfEnemysKilled) {
      case 3:
        this.nextPhase();
        break;
      case 8:
        this.nextPhase();
        break;
      case 13:
        this.nextPhase();
        break;
      default:
        break;
    }
  }

  nextPhase() {
    this.actualPhase++;
    this.velocityXOfEnemys += 0.5;
    this.velocityYOfEnemys += 0.5;
    this.generationTime -= 30;
    console.log("phase: ", this.actualPhase, "values: vel x:", this.velocityXOfEnemys, "vel y: ", this.velocityYOfEnemys);
  }

  getNextGenerationTime() {
    return this.generationTime;
  }

  getVelocityX() {
    return this.velocityXOfEnemys;
  }

  getVelocityY() {
    return this.velocityYOfEnemys;
  }

  getPhaseNumber() {
    return this.actualPhase;
  }

}