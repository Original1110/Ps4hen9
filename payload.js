<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>PS4 Loader</title>

<style>
body{
    margin:0;
    height:100vh;
    background:#000;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    font-family:Arial;
    color:white;
}

#progressContainer{
    width:70%;
    height:35px;
    border:2px solid #FFD700;
    border-radius:20px;
    overflow:hidden;
    background:rgba(255,255,255,0.1);
}

#progressBar{
    width:0%;
    height:100%;
    background:linear-gradient(90deg,#FFD700,#87FF33);
    transition:width .2s;
}

#progressText{
    margin-top:15px;
    font-size:28px;
    color:#FFD700;
    text-shadow:2px 2px #000;
}

#status{
    margin-top:10px;
    font-size:20px;
    color:white;
}
</style>
</head>

<body>

<h1 style="color:#FFD700;">GoldHEN Loader</h1>

<div id="progressContainer">
    <div id="progressBar"></div>
</div>

<div id="progressText">0%</div>
<div id="status">Starting...</div>

<script>
const bar = document.getElementById("progressBar");
const text = document.getElementById("progressText");
const status = document.getElementById("status");

let progress = 0;
let fake;

// 🔵 تحميل وهمي 0 → 70
function fakeLoad(){
    fake = setInterval(() => {
        if(progress < 70){
            progress++;
            bar.style.width = progress + "%";
            text.innerHTML = progress + "%";
        }
    }, 70);
}

fakeLoad();

// 🔵 تحميل الملف الحقيقي
fetch('./payload.bin')
.then(res => res.arrayBuffer())
.then(data => {

    clearInterval(fake);

    window.pld = new Uint32Array(data);

    status.innerHTML = "Injecting GoldHEN...";

    // 🔵 إكمال إلى 100
    let finish = setInterval(() => {

        if(progress < 100){
            progress += 2;
            if(progress > 100) progress = 100;

            bar.style.width = progress + "%";
            text.innerHTML = progress + "%";
        }

        if(progress === 100){
            clearInterval(finish);
            status.innerHTML = "GoldHEN Loaded Successfully ✓";
            text.style.color = "#87FF33";
        }

    }, 30);

});
</script>

</body>
</html>
