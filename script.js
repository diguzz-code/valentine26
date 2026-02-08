const bgMusic = document.getElementById("bgMusic");
bgMusic.volume = 0;
document.addEventListener("click", () => {
    if(bgMusic.paused){
        bgMusic.play().catch(()=>{});
        let vol = 0;
        const fadeIn = setInterval(()=>{
        vol += 0.02;
        if(vol >= 0.5){ vol=0.5; clearInterval(fadeIn);}
        bgMusic.volume = vol;
        },100);
    }
},{once:true});

let noClicks = 0;
const messages = [
"Gaiuzz🥺",
"Dai bby..",
"Solo tu..",
"Mia🌙",
"..💫"
];

const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const fist = document.getElementById("fist");
const mainContent = document.getElementById("mainContent");

/* HEARTS */
function createHeart(){
const heart = document.createElement("div");
heart.className="heart";
heart.innerText="❤️";
heart.style.left = yesBtn.offsetLeft + Math.random()*yesBtn.offsetWidth + "px";
heart.style.top = yesBtn.offsetTop + "px";
document.body.appendChild(heart);
setTimeout(()=>heart.remove(),3000);
}

/* NO CLICK */
noBtn.addEventListener("click", ()=>{
    if(noClicks>=5) return;
    noClicks++;
    noBtn.innerText = messages[noClicks-1];
    yesBtn.style.width = Math.min(220+noClicks*35,window.innerWidth-40)+"px";
    createHeart();

    if(noClicks===5){
        const rect = noBtn.getBoundingClientRect();
        fist.style.display = "block";
        fist.style.setProperty("--hit-x", rect.left+"px");
        fist.style.setProperty("--hit-y", rect.top+"px");
        fist.style.animation = "fistPunch 0.9s ease-out forwards";
        yesBtn.style.animation = "yesBounce 0.6s";
        noBtn.style.animation = "noShake 0.6s";

        setTimeout(()=>{
            noBtn.style.display="none";
            fist.style.display="none";
            yesBtn.style.width=window.innerWidth-40+"px";
            yesBtn.style.fontSize="38px";
            },900);
        }
});

/* YES CLICK */
yesBtn.addEventListener("click", ()=>{
mainContent.style.display = "none";

const finalScreen = document.createElement("div");
finalScreen.style.display = "flex";
finalScreen.style.flexDirection = "column";
finalScreen.style.alignItems = "center";
finalScreen.style.justifyContent = "center";
finalScreen.style.minHeight = "100vh";
finalScreen.style.textAlign="center";
finalScreen.innerHTML = `
    <h1 style="font-size:4.5em;">Siiii🌙❤️</h1>
    <video id="finalHappyImage" style="width: 95%; height: 450px; border-radius: 22px; margin: 20px auto; display: block; object-fit: cover;" autoplay loop muted>
        <source src="minion_heart.mp4" type="video/mp4">
    </video>
    <canvas id="confettiCanvas" style="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;"></canvas>
`;
document.body.appendChild(finalScreen);
startConfetti();
});

/* CONFETTI */
function startConfetti(){
const canvas=document.getElementById("confettiCanvas");
const ctx=canvas.getContext("2d");
canvas.width=innerWidth;
canvas.height=innerHeight;

const confetti = Array.from({length:120}, ()=>({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*6+4,
    d: Math.random()*100,
    color: `hsl(${Math.random()*360},100%,50%)`
}));

let angle = 0;
setInterval(()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    angle+=0.01;
    confetti.forEach(c=>{
        ctx.beginPath();
        ctx.strokeStyle=c.color;
        ctx.lineWidth=c.r;
        ctx.moveTo(c.x,c.y);
        ctx.lineTo(c.x+2,c.y+c.r*2);
        ctx.stroke();
        c.y+=Math.cos(angle+c.d)+3;
        if(c.y>canvas.height) c.y=-10;
    });
    },20);
}