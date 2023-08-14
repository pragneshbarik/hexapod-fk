const rate = 0.01;
configs = [
  {
    l1: 100,
    l2: 50,
    baseVector: [10, 20, 0],
    initAngles: [-20, 0, 100],
    rate: rate,
  },
  {
    l1: 100,
    l2: 50,
    baseVector: [10, 0, 0],
    initAngles: [0, 0, 100],
    rate: rate,
  },
  {
    l1: 100,
    l2: 50,
    baseVector: [10, -20, 0],
    initAngles: [20, 0, 100],
    rate: rate,
  },
  {
    l1: 100,
    l2: 50,
    baseVector: [-10, -20, 0],
    initAngles: [160, 0, 100],
    rate: rate,
  },
  {
    l1: 100,
    l2: 50,
    baseVector: [-10, 0, 0],
    initAngles: [180, 0, 100],
    rate: rate,
  },
  {
    l1: 100,
    l2: 50,
    baseVector: [-10, 20, 0],
    initAngles: [200, 0, 100],
    rate: rate,
  },
];

class Hexapod {
  constructor() {
    this.arms = [];
    for (let i = 0; i < 6; i++) {
      this.arms.push(new Arm(configs[i]));
    }
  }

  forward() {
    for (let i = 0; i < 3; i++) {
      this.arms[i].run(-1);
    }
    for (let i = 3; i < 6; i++) {
      this.arms[i].run(1);
    }
  }

  backward() {
    for (let i = 0; i < 3; i++) {
      this.arms[i].run(1);
    }
    for (let i = 3; i < 6; i++) {
      this.arms[i].run(-1);
    }
  }

  rotatecw() {
    for (let i = 0; i < 6; i++) {
      this.arms[i].run(1);
    }
  }

  rotateccw() {
    for (let i = 0; i < 6; i++) {
      this.arms[i].run(-1);
    }
  }

  idle() {
    for (let i = 0; i < 6; i++) {
      this.arms[i].run(0);
    }
  }
}
