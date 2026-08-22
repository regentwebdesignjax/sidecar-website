import * as THREE from "three";

/**
 * A closed paper envelope, built from two pieces so the flap can carry its own
 * slightly darker material and read as a fold rather than a printed triangle.
 *
 * Envelope proportions follow the app's envelope cards: a wide rectangle with a
 * shallow V flap across the top third.
 */
const W = 1.0;
const H = 0.68;
const D = 0.035;

/** The body: a thin rounded slab. */
export function createBodyGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  const r = 0.06;
  const w = W / 2;
  const h = H / 2;

  shape.moveTo(-w + r, -h);
  shape.lineTo(w - r, -h);
  shape.quadraticCurveTo(w, -h, w, -h + r);
  shape.lineTo(w, h - r);
  shape.quadraticCurveTo(w, h, w - r, h);
  shape.lineTo(-w + r, h);
  shape.quadraticCurveTo(-w, h, -w, h - r);
  shape.lineTo(-w, -h + r);
  shape.quadraticCurveTo(-w, -h, -w + r, -h);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: D,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
    curveSegments: 6,
  });
  geo.center();
  geo.computeVertexNormals();
  return geo;
}

/**
 * The flap: a shallow V spanning the top of the envelope, sitting a hair proud
 * of the body so it catches the key light along its fold.
 */
export function createFlapGeometry(): THREE.BufferGeometry {
  const w = W / 2;
  // The body is centred on the origin, so its top edge sits at +H/2. Drawing
  // the flap's shoulders at exactly that height makes the fold flush with the
  // top of the envelope instead of floating below it.
  const top = H / 2;
  const dip = H * 0.08;

  const shape = new THREE.Shape();
  shape.moveTo(-w, top);
  shape.lineTo(w, top);
  shape.lineTo(0, dip);
  shape.lineTo(-w, top);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.012,
    bevelEnabled: false,
    curveSegments: 1,
  });

  // Only ever move it forward — any Y offset would break the flush top edge.
  geo.translate(0, 0, D / 2 + 0.004);
  geo.computeVertexNormals();
  return geo;
}
