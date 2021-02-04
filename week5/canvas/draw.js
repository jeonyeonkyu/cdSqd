const canvas = document.getElementById('small_man');
const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.fillStyle = '#ffffff';
ctx.arc(140, 120, 70, 0, Math.PI * 2);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = '#000000'
ctx.arc(180, 90, 8, 0, Math.PI * 2);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = '#000000'
ctx.arc(140, 120, 70, 50, 13.2);
ctx.lineTo(140, 120);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 4;
ctx.moveTo(80, 400);
ctx.lineTo(140, 260);
ctx.lineTo(200, 400);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = '#ffffff';
ctx.fillRect(70, 190, 140, 120);
ctx.closePath();