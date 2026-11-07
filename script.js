const canvas = document.getElementById('simCanvas');
const ctx = canvas.getContext('2d');

const COLS = 100;
const ROWS = 120;
const CELL_SIZE = 4; // 1セルの大きさ(px)

let isRunning = false;

document.getElementById('runBtn').addEventListener('click', () => {
  if (isRunning) return;
  runSimulation();
});

async function runSimulation() {
  isRunning = true;
  document.getElementById('message').innerText = "";
  
  // キャンバスの初期化
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // スタートライン (行30) を黄色で描画
  ctx.fillStyle = '#FFFF00';
  ctx.fillRect(0, 30 * CELL_SIZE, COLS * CELL_SIZE, CELL_SIZE);
  
  let row = 30;
  let col = 1;
  let head = 0;
  let tail = 0;

  document.getElementById('headCount').innerText = head;
  document.getElementById('tailCount').innerText = tail;

  for (let i = 2; i <= 101; i++) {
    const r = Math.random();
    const bi = r <= 0.5 ? 0 : 1;

    if (bi === 0) {
      row += 1;
      tail += 1;
      document.getElementById('tailCount').innerText = tail;
    } else {
      row -= 1;
      head += 1;
      document.getElementById('headCount').innerText = head;
    }

    // 移動後のセルを黒色で描画
    ctx.fillStyle = '#000000';
    ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);

    // 壁判定
    if (row === 2) {
      document.getElementById('message').innerText = "上の壁にぶちあたりました．Try Again.";
      break;
    }

    col += 1;
    
    // 画面更新用のウェイト (15ミリ秒待機でスムーズなアニメーション)
    await new Promise(resolve => setTimeout(resolve, 15));
  }
  
  isRunning = false;
}
