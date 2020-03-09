/**
 * A minimal complex number class
 */
export default class Complex {
  /**
   * Create a new complex number
   * @param {number} a Real component
   * @param {number} b Complex component
   */
  constructor(a = 0, b = 0) {
    this.re = a;
    this.im = b;
  }

  /**
   * Return the angle represented by this number in complex plane
   * in radians
   */
  angle() {
    return Math.atan2(this.im, this.re);
  }

  /**
   * Magnitude of the vector
   */
  length() {
    return Math.sqrt(this.im * this.im + this.re * this.re);
  }

  add(z) {
    return new Complex(this.re + z.re, this.im + z.im);
  }

  sub(z) {
    return new Complex(this.re - z.re, this.im - z.im);
  }

  mult(z) {
    return new Complex(
      this.re * z.re - this.im * z.im,
      this.re * z.im + this.im * z.re
    );
  }

  scale(x) {
    return new Complex(this.re * x, this.im * x);
  }
}
