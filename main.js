const { puzzles } = require("./fixture");

function sumSets(n, k, m = 1) {
  let r = new Set();
  if (k == 2) {
    let x = ~~(n / 2) - (n % 2 == 0);
    let y = Math.ceil(n / 2) + (n % 2 == 0);
    let min = Math.max(1, m);
    while (x >= min && y < 10) {
      r.add(new Set([x--, y++]));
    }
    return r;
  }
  let min = Math.max(m, n - 0.5 * k * (19 - k));
  let max = ~~(n / k - 0.5 * (k - 1));
  for (let x = min; x <= max; x++) {
    let y = n - x;
    [...sumSets(y, k - 1, x)]
      .filter(g => !g.has(x))
      .forEach(g => r.add(new Set([x, ...g])));
  }
  return r;
}

function intersection(a, b) {
  return new Set([...a].filter(v => b.has(v)));
}

function getClues(puz) {
  let rows = [];
  let cols = [];
  for (let y = 0; y < puz.length; y++) {
    for (let x = 0; x < puz[0].length; x++) {
      let id = y + "," + x;
      let v = puz[y][x][0];
      let h = puz[y][x][1];
      let tiles = new Set();
      if (v) {
        for (let dy = y + 1; puz[dy] && puz[dy][x] === 0; dy++) {
          tiles.add(dy + "," + x);
        }
        cols[id] = { sum: v, tiles, sums: sumSets(v, tiles.size) };
      }
      if (h) {
        for (let dx = x + 1; puz[y][dx] === 0; dx++) {
          tiles.add(y + "," + dx);
        }
        rows[id] = { sum: h, tiles, sums: sumSets(h, tiles.size) };
      }
    }
  }
  return { rows, cols };
}

function getNeighbors({ rows, cols }) {
  let at = {};
  for (let i in rows) {
    at[i] = new Set();
    for (let j in cols) {
      if (!at[j]) at[j] = new Set();
      if ([...rows[i].tiles].some(t => cols[j].tiles.has(t))) {
        at[i].add(j);
        at[j].add(i);
      }
    }
  }
  console.log(at);
}

console.time("runtime");
let t = getClues(puzzles[0]);
// let n = getNeighbors(t);
console.log(t.rows["2,0"]);
console.timeEnd("runtime");
