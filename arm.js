class Arm {
  constructor(config) {
    this.l1 = config.l1;
    this.l2 = config.l2;
    this.baseVector = config.baseVector;
    this.initAngles = config.initAngles;
    this.theta_1 = 0;
    this.theta_2 = 0;
    this.theta_3 = 110;
    this.rate = config.rate;
    // this.finalPos = [];
  }

  update(state) {
    if (state == 0) return;
    if (state === "INCREASE_HEIGHT") {
      this.theta_3 += 1;
      return;
    }

    if (state === "DECREASE_HEIGHT") {
      this.theta_3 -= 1;
      return;
    }
    this.theta_1 =
      state * 20 * sin(Date.now() * this.rate) - this.initAngles[0];

    this.theta_2 =
      30 * cos(Date.now() * this.rate) > 0
        ? 30 * cos(Date.now() * this.rate)
        : 0 - this.initAngles[1];
  }

  Sphere(x, y, z, r) {
    push();
    translate(x, y, z);
    noStroke();
    fill("blue");
    sphere(r);
    pop();
  }

  armCoordinates() {
    const deg_to_rad = Math.PI / 180;
    const angle_1 = deg_to_rad * this.theta_1;
    const angle_2 = deg_to_rad * this.theta_2;
    const angle_3 = deg_to_rad * this.theta_3;

    // calculating joint position using forward kinematics.
    let p1 = [
      this.l1 * Math.cos(angle_2) * Math.cos(angle_1),
      this.l1 * Math.cos(angle_2) * Math.sin(angle_1),
      this.l1 * Math.sin(angle_2),
    ];

    let r = Math.sqrt(
      this.l1 * this.l1 +
        this.l2 * this.l2 -
        2 * this.l1 * this.l2 * Math.cos(angle_3)
    );
    let alpha = Math.asin((Math.sin(angle_3) * this.l2) / r);
    let beta = angle_2 - alpha;

    let p2 = [
      r * Math.cos(beta) * Math.cos(angle_1),
      r * Math.cos(beta) * Math.sin(angle_1),
      r * Math.sin(beta),
    ];

    const a1 = p1.map((val, idx) => val + this.baseVector[idx]);
    const a2 = p2.map((val, idx) => val + this.baseVector[idx]);

    return [a1, a2];
  }

  run(state) {
    this.update(state);
    let arm_pos = this.armCoordinates();
    this.Sphere(...arm_pos[0], 5);
    line(...this.baseVector, ...arm_pos[0]);
    line(...arm_pos[0], ...arm_pos[1]);
    this.Sphere(...arm_pos[1], 5);
  }
}

// module.exports = Arm;
