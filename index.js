const mp3player = document.getElementById("mp3player");
const label = document.getElementById("label");
const playbtn = document.getElementById("play");
const pausebtn = document.getElementById("pause");
const load = document.getElementById("load");

load.addEventListener("click", event =>{
    get();
    playbtn.style.display = "flex";
    pausebtn.style.display = "none";
})

pausebtn.addEventListener("click", event =>{
    mp3player.pause();
})

playbtn.addEventListener("click", event => {
    mp3player.play();
})

mp3player.addEventListener("play", () => {
    playbtn.style.display = "none";
    pausebtn.style.display = "flex";
})

mp3player.addEventListener("pause", () => {
    pausebtn.style.display = "none";
    playbtn.style.display = "flex";
});

async function get(){
    try{
        const response = await fetch(`https://api.alquran.cloud/v1/ayah/random/ar.alafasy`);
        const data = await response.json();
        
        const aya = data.data.text;
        const audio = data.data.audio;

        mp3player.src = audio;
        label.textContent = aya;


        
    }
    catch(error){
        console.error(error)
    }
}

const seek = document.getElementById("seek");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

// format seconds as m:ss
function formatTime(sec){
    if (isNaN(sec)) return "0;00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`
}

// when metadata loads, we know the duration
mp3player.addEventListener("loadedmetadata", () => {
    seek.max = mp3player.duration;
    durationEl.textContent = formatTime(mp3player.duration);
});

// update bar as audio plays
mp3player.addEventListener("timeupdate", () => {
    seek.value = mp3player.currentTime;
    currentTimeEl.textContent = formatTime(mp3player.currentTime);

    const percent = (mp3player.currentTime / mp3player.duration) * 100 || 0;
    seek.style.setProperty("--progress", `${percent}%`);
});

// let user drag the bar to seek
seek.addEventListener("input", () => {
    mp3player.currentTime = seek.value;
});