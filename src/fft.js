import Complex from "./complex.js";

/**
 * SLOW discrete fourier transform O(n^2)
 * @param {Complex[]} samples Sample points(complex number) from the wave to be transformed
 */
function dft(sample) {
  const X = []; // the frequency bin
  const N = sample.length;

  let z = new Complex();

  for (let k = 0; k < N; k++) {
    // for each frequency
    for (let n = 0; n < N; n++) {
      // take the dot product with the sample "vector"
      const val = (2 * Math.PI * k * n) / N;
      const ztemp = new Complex(Math.cos(val), -Math.sin(val));
      z = z.add(Complex.mult(sample[n], ztemp));
    }
    z = z.scale(1 / N);

    X[k] = { freq: k, amp: z.length(), phase: z.angle() };
  }
  return X;
}

// Recursive fast fourier transform O(nlogn)
export function fft(samples) {
  const transform = sample => {
    const N = sample.length; // assume N is a power of 2, if not, pad before this
    if (N == 1) return sample; // only one sample point

    if (Math.log2(N) % 1 !== 0)
      throw new Error("Input size must be a power of 2.");
    const a = [];
    const angle = (2 * Math.PI) / N;
    const omegan = new Complex(Math.cos(angle), -Math.sin(angle)); // principal nth root of unity
    let omega = new Complex(1, 0);

    // divide
    const even = sample.filter((_, idx) => idx % 2 === 0);
    const odd = sample.filter((_, idx) => idx % 2 === 1);

    // conquer
    const yeven = transform(even);
    const yodd = transform(odd);

    // combine
    for (let k = 0; k < sample.length / 2; k++) {
      const t = yodd[k].mult(omega);
      a[k] = yeven[k].add(t);
      a[k + N / 2] = yeven[k].sub(t);
      omega = omega.mult(omegan); // rotate to the next point on the circle
    }
    return a; // the coefficients for each frequency bin
  };
  return format(transform(samples));
}

/**
 * Convert each element to {freq, amp, phase} format
 * @param {Complex[]} ca A complex array of coefficients
 * @return {Object} Well-formatted for drawing
 */
function format(ca) {
  return ca.map((x, idx) => ({
    freq: idx,
    amp: x.length() / ca.length,
    phase: x.angle()
  }));
}
