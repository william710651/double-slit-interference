// 取得 canvas 元素
const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

// 取得滑動條元素
const wavelengthSlider = document.getElementById('wavelength');
const slitDistanceSlider = document.getElementById('slitDistance');
const screenDistanceSlider = document.getElementById('screenDistance');

// 設定初始值
let wavelength = parseInt(wavelengthSlider.value) * 1e-9; // 將 nm 轉換為 m
let slitDistance = parseInt(slitDistanceSlider.value) * 1e-6; // 將 μm 轉換為 m
let screenDistance = parseFloat(screenDistanceSlider.value); // 保持 m

// 更新滑動條的值
wavelengthSlider.oninput = () => wavelength = parseInt(wavelengthSlider.value) * 1e-9;
slitDistanceSlider.oninput = () => slitDistance = parseInt(slitDistanceSlider.value) * 1e-6;
screenDistanceSlider.oninput = () => screenDistance = parseFloat(screenDistanceSlider.value);

// 繪製雙狹縫干涉圖案的函數
function drawDoubleSlit() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除畫布

    for (let x = -canvas.width / 2; x < canvas.width / 2; x++) {
        // 計算角度
        let theta = Math.atan((x / canvas.width) * canvas.height / screenDistance); // 將 x 座標轉換為角度

        // 計算干涉強度
        let beta = (Math.PI * slitDistance * Math.sin(theta)) / wavelength;
        let I = Math.pow(Math.cos(beta), 2);

        // 繪製強度圖案
        let y = canvas.height / 2 - I * canvas.height / 2;
        ctx.beginPath();
        ctx.moveTo(x + canvas.width / 2, canvas.height / 2);
        ctx.lineTo(x + canvas.width / 2, y);
        ctx.strokeStyle = 'white';
        ctx.stroke();
    }

    requestAnimationFrame(drawDoubleSlit);
}

// 開始動畫
drawDoubleSlit();
