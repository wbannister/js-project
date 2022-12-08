

export default class Edge {
  constructor(x1, y1, x2, y2, layers, color) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.layers = layers;
    this.color = color;
    // rounding below may not be necessary
    this.vertical = (Math.floor(this.x1 * 1) === Math.floor(this.x2 * 1) ? true : false);
  }

  draw(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
  }

  // must iterate through edges and proojectiles when you call this
  // consider generalizing this logic: instead of calculating for both this.vertical and this.horizontal,
  // pass the vector that's perpendicular the drawn here into handlIntersect
  intersects (particle) {
    // Optimization - check layer first
    if (!this.layers.includes(particle.layer)) return false;

    let radi = particle.radius;
    let edgeX = 0;
    let edgeY = 0;
    let gap = 0.1;


    if (this.vertical) {
      if (Math.abs(particle.x - this.x1) < radi) { // is distance greater < radius
        // if (particle.y <= this.y2 + radi && particle.y >= this.y1 - radi) {
        if (particle.y <= this.y2 && particle.y >= this.y1) {
          console.log('this.vertical', this.vertical);
          edgeX = (particle.x < this.x1 ? this.x1 - radi - gap : this.x1 + radi + gap);
          particle.handleIntersect(-1, 1, edgeX, edgeY);
          return true;
        } else {
          // let p1 = (particle.y < this.y1 ? [this.x1, this.y1] : [this.x2, this.y2]);
          // let p2 = [particle.x, particle.y];
          // if (Util.dist(p1, p2) < radi) {
          //   edgeX = (particle.x < this.x1 ? this.x1 - radi - 1 : this.x1 + radi + 1);
          //   particle.handleIntersect(1, -1, edgeX, edgeY);
          //   return true;
          // } else {
            return false;
          // }
        }
      } else {
        return false;
      }
    } else { // Horizontal
      if (Math.abs(particle.y - this.y1) < radi) { // is distance greater < radius
        // if (particle.x <= this.x2 + radi && particle.x >= this.x1 - radi) {
        if (particle.x <= this.x2 + 1 && particle.x >= this.x1 - 1) {
          console.log('this.vertical', this.vertical);
          edgeY = (particle.y < this.y1 ? this.y1 - radi - gap : this.y1 + radi + gap);
          particle.handleIntersect(1, -1, edgeX, edgeY);
          return true;
        } else {
          // let p1 = (particle.y < this.y1 ? [this.x1, this.y1] : [this.x2, this.y2]);
          // let p2 = [particle.x, particle.y];
          // if (Util.dist(p1, p2) < radi) {
          //   edgeY = (particle.y < this.y1 ? this.y1 - radi - 1 : this.y1 + radi + 1);
          //   particle.handleIntersect(1, -1, edgeX, edgeY);
            return true;
          // } else {
            return false;
          // }
        }
      } else {
        return false;
      }
    }
    return null;
  }

  resetParticleY(particle) {
    let radi = particle.radius;
    if (particle.y < this.y) {
      particle.resetPos(particle.x, this.y - radi - 1);
    } else {
      particle.resetPos(particle.x, this.y + radi + 1);
    }
  }

  resetParticleX(particle) {
    if (particle.x < this.x) {
      particle.resetPos(this.x - particle.radius - 1, particle.y);
    } else {
      particle.resetPos(this.x + particle.radius + 1, particle.y);
    }
  }



  }