import styled from 'styled-components';

const W = 800;
const H = 248;

// Generate a zigzag polyline points string between x0..x1
function zz(x0, x1, yPeak, yVal, step) {
  const pts = [];
  let hi = true;
  for (let x = x0; x <= x1; x += step) {
    pts.push(`${x},${hi ? yPeak : yVal}`);
    hi = !hi;
  }
  return pts.join(' ');
}

// Sky dots — two rows of scattered stars
const SKY_DOTS = [
  [22,13],[68,6],[134,21],[196,4],[258,16],[326,8],[388,23],[453,5],
  [518,13],[584,18],[648,7],[718,15],[772,10],
  [45,37],[108,30],[172,44],[237,27],[305,41],[374,34],[443,46],
  [514,31],[585,39],[650,35],[712,42],[764,29],
];
// Larger 4-pointed stars in sky (SVG text — y-pos matters only to itself, no alignment risk)
const SKY_BIG = [[155,14],[427,9],[665,20]];

// Dots between back range and middle range
const VAL1 = [[48,88],[148,84],[258,90],[368,85],[478,89],[588,83],[698,88]];

// Dots between middle range and foreground
const VAL2 = [[65,162],[185,157],[305,163],[425,159],[545,162],[665,157],[745,161]];

// Stars scattered in the foreground sky gaps between mountain peaks
const FG_DOTS = [
  [30,180],[75,195],[20,210],[55,222],
  [218,168],[242,182],[225,198],
  [322,165],[358,180],[340,196],[378,192],
  [468,170],[494,186],[476,202],
  [594,167],[620,183],[604,200],
  [700,178],[726,194],[712,210],[748,220],
];

// Middle range: 7 main peaks every 114px, sub-peaks between them
const MID_MAIN = [57, 171, 285, 400, 514, 628, 743];
const MID_SUB  = [114, 228, 342, 457, 571, 685];

// Foreground mountain data as [leftBase, apex, rightBase]
const FG_MAIN = [
  [[49,238], [167,117], [285,238]],
  [[242,238], [400,78],  [558,238]],
  [[515,238], [633,117], [751,238]],
];
const FG_SUB = [
  [[217,238], [285,170], [353,238]],
  [[447,238], [515,170], [583,238]],
];
// Partial mountains entering from the edges
const FG_EDGE = [
  [[0,194], [44,238]],
  [[756,238], [800,194]],
];

const SVG = styled.svg`
  width: 100%;
  max-width: 800px;
  display: block;
  margin: 0 auto 1.5rem;
  opacity: 0.9;
`;

export default function AsciiAvatar() {
  const C = {
    bright: '#00ff41',
    mid:    '#00aa2b',
    dim:    '#005f17',
  };

  return (
    <SVG viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">

      {/* ── Sky stars ── */}
      {SKY_DOTS.map(([x, y], i) => (
        <circle key={`sd${i}`} cx={x} cy={y} r="1.5" fill={C.bright} />
      ))}
      {SKY_BIG.map(([x, y], i) => (
        <text key={`sb${i}`} x={x} y={y} fontSize="11"
          fill={C.bright} fontFamily="JetBrains Mono, monospace" textAnchor="middle">✦</text>
      ))}

      {/* ── Back mountain range (dense zigzag) ── */}
      <polyline points={zz(0, W, 58, 80, 10)} fill="none" stroke={C.dim} strokeWidth="1.2" />

      {/* ── Valley 1 dots ── */}
      {VAL1.map(([x, y], i) => (
        <circle key={`v1${i}`} cx={x} cy={y} r="1.2" fill={C.dim} />
      ))}

      {/* ── Middle mountain range ── */}
      {/* dense zigzag base */}
      <polyline points={zz(3, W-3, 132, 150, 8)} fill="none" stroke={C.mid} strokeWidth="1.2" />
      {/* main peaks: overlapping V-shapes sharing the y=150 baseline */}
      {MID_MAIN.map((px, i) => (
        <polyline key={`mm${i}`}
          points={`${Math.max(0,px-114)},150 ${px},100 ${Math.min(W,px+114)},150`}
          fill="none" stroke={C.mid} strokeWidth="1.2" />
      ))}
      {/* sub-peaks sitting on baseline between main peaks */}
      {MID_SUB.map((px, i) => (
        <polyline key={`ms${i}`}
          points={`${px-18},150 ${px},126 ${px+18},150`}
          fill="none" stroke={C.mid} strokeWidth="1" />
      ))}

      {/* ── Valley 2 dots ── */}
      {VAL2.map(([x, y], i) => (
        <circle key={`v2${i}`} cx={x} cy={y} r="1.2" fill={C.mid} />
      ))}

      {/* ── Foreground stars (in sky gaps between peaks) ── */}
      {FG_DOTS.map(([x, y], i) => (
        <circle key={`fg${i}`} cx={x} cy={y} r="1.5" fill={C.bright} />
      ))}

      {/* ── Foreground mountains ── */}
      {/* edge partials (mountains entering from left/right) */}
      {FG_EDGE.map((pts, i) => (
        <polyline key={`fe${i}`}
          points={pts.map(([x,y]) => `${x},${y}`).join(' ')}
          fill="none" stroke={C.bright} strokeWidth="1.3" />
      ))}
      {/* sub-peaks */}
      {FG_SUB.map((pts, i) => (
        <polyline key={`fs${i}`}
          points={pts.map(([x,y]) => `${x},${y}`).join(' ')}
          fill="none" stroke={C.bright} strokeWidth="1.3" />
      ))}
      {/* main peaks */}
      {FG_MAIN.map((pts, i) => (
        <polyline key={`fm${i}`}
          points={pts.map(([x,y]) => `${x},${y}`).join(' ')}
          fill="none" stroke={C.bright} strokeWidth="1.5" />
      ))}

      {/* ── Ground lines ── */}
      <polyline points={zz(0, W, 238, 244, 10)} fill="none" stroke={C.bright} strokeWidth="1.5" />
      <polyline points={zz(0, W, 244, 248, 8)}  fill="none" stroke={C.mid}    strokeWidth="1.2" />

    </SVG>
  );
}
