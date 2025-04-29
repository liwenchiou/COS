let currentRotation = 0;
let isRotating = false;
let rotationInterval = null;
const segments = []; // 存放動態生成的區塊內容
const colors = [
  "#ff9999",
  "#99ccff",
  "#99ff99",
  "#ffcc99",
  "#ffa500",
  "#6a5acd",
  "#ff9999",
  "#99ccff",
  "#99ff99",
  "#ffcc99",
  "#ffa500",
  "#6a5acd",
  "#ff9999",
  "#99ccff",
  "#99ff99",
  "#ffcc99",
  "#ffa500",
  "#6a5acd",
  "#ff9999",
  "#99ccff",
  "#99ff99",
  "#ffcc99",
  "#ffa500",
  "#6a5acd",
]; // 預設區塊顏色

function addSegment() {
  const input_v = document.querySelector("#input_value");
  if(input_v==""){
    alert("選項不可為空!!");
    return;
  }
  // console.log(input_v.value);
  // return;
  const segmentCount = segments.length + 1; // 更新分割區塊數量
  // const segmentCount = segments.length; // 更新分割區塊數量
  const angle = 360 / segmentCount; // 每個區塊的角度
  const wheel = document.getElementById("wheel");
  wheel.innerHTML = ""; // 清空現有分割並重新繪製

  segments.push(`${input_v.value}`); // 新增文字內容
  input_v.value = "";

  segments.forEach((text, index) => {
    const startAngle = index * angle;
    const endAngle = startAngle + angle;

    // 計算區塊的起點和終點座標
    const x1 = 150 + 150 * Math.cos(((startAngle - 90) * Math.PI) / 180);
    const y1 = 150 + 150 * Math.sin(((startAngle - 90) * Math.PI) / 180);
    const x2 = 150 + 150 * Math.cos(((endAngle - 90) * Math.PI) / 180);
    const y2 = 150 + 150 * Math.sin(((endAngle - 90) * Math.PI) / 180);

    // 繪製區塊的路徑
    const largeArcFlag = angle > 180 ? 1 : 0;
    const pathData = `M150,150 L${x1},${y1} A150,150 0 ${largeArcFlag},1 ${x2},${y2} Z`;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    path.setAttribute("fill", colors[index % colors.length]);
    path.setAttribute("stroke", "black");
    path.setAttribute("stroke-width", "1");
    // path.setAttribute("stroke-linejoin", "round");
    wheel.appendChild(path);

    // 計算文字的中心座標
    const textAngle = (startAngle + endAngle) / 2;
    const textX = 150 + 100 * Math.cos(((textAngle - 90) * Math.PI) / 180);
    const textY = 150 + 100 * Math.sin(((textAngle - 90) * Math.PI) / 180);

    const textElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    textElement.setAttribute("x", textX);
    textElement.setAttribute("y", textY);
    textElement.textContent = text;
    wheel.appendChild(textElement);
  });
}

function toggleRotation() {
  if (isRotating) {
    clearInterval(rotationInterval); // 停止旋轉
    isRotating = false;
    checkSegment();
  } else {
    rotationInterval = setInterval(() => {
      currentRotation += 178; // 每次旋轉 5 度
      document.getElementById(
        "wheel"
      ).style.transform = `rotate(${currentRotation}deg)`;
    }, 50); // 每 50 毫秒更新一次
    isRotating = true;
  }
}

function checkSegment() {
  const arrowAngle = ((currentRotation % 360) + 360) % 360; // 計算箭頭的當前角度
  const segmentCount = segments.length;
  const anglePerSegment = 360 / segmentCount;

  // 判斷箭頭指向的區塊
  const segmentIndex = Math.floor(((360 - arrowAngle) % 360) / anglePerSegment);
  const targetSegment = segments[segmentIndex];

  alert(`你選到的是 : ${targetSegment}`);
}

// addSegment();
