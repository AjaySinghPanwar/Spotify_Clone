// Adding the elements to song item container
var refToSongItemContainer = document.getElementsByClassName("song-item-container")[0];

for (let i = 0; i < 9; ++i) {
    let songItemContent = `<div class="song-item">
                            <img alt="cover${i + 1}" />
                            <span id="song-name"></span>
                            <span class="song-list-play"
                            ><span class="timestamp"
                                ><span class="duration"></span><i id="${i}" class="fas song-item-play fa-play-circle"></i></span
                            ></span>
                          </div>`
    refToSongItemContainer.innerHTML += songItemContent;
}


// Initialize the variable
let songIndex = 0;
let audioElement = new Audio("/assets/songs/1.mp3");
let masterPlay = document.getElementById("master-play");
let myProgressBar = document.getElementById("my-progress-bar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("master-song-name");
let songItems = Array.from(document.getElementsByClassName("song-item"));

let songs = [
    { songName: "Questions", songPath: "/assets/songs/1.mp3", coverPath: "/assets/images/cover1.jpg", songDuration: "03:22" },
    { songName: "Got It All", songPath: "/assets/songs/2.mp3", coverPath: "/assets/images/cover2.jpg", songDuration: "03:10" },
    { songName: "Kitho", songPath: "/assets/songs/3.mp3", coverPath: "/assets/images/cover3.jpg", songDuration: "03:19" },
    { songName: "Layeeah", songPath: "/assets/songs/4.mp3", coverPath: "/assets/images/cover4.jpg", songDuration: "03:06" },
    { songName: "Solace", songPath: "/assets/songs/5.mp3", coverPath: "/assets/images/cover5.jpg", songDuration: "03:16" },
    { songName: "Sambh", songPath: "/assets/songs/6.mp3", coverPath: "/assets/images/cover6.jpg", songDuration: "02:55" },
    { songName: "Tu Hi Aa", songPath: "/assets/songs/7.mp3", coverPath: "/assets/images/cover7.jpg", songDuration: "03:11" },
    { songName: "Vaari", songPath: "/assets/songs/8.mp3", coverPath: "/assets/images/cover8.jpg", songDuration: "02:53" },
    { songName: "Vibe", songPath: "/assets/songs/9.mp3", coverPath: "/assets/images/cover9.jpg", songDuration: "03:13" }
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByTagName("span")[0].innerText = songs[i].songName;
    element.getElementsByClassName("duration")[0].innerText = songs[i].songDuration;
});


// Handle play pause click
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        makeAllPlays();
        gif.style.opacity = 0;
    }
});

// Listen to events
audioElement.addEventListener("timeupdate", () => {
    // Update seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});


const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("song-item-play")).forEach((element) => {
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    });
};

Array.from(document.getElementsByClassName("song-item-play")).forEach((element) => {
    element.addEventListener("click", (e) => {
        makeAllPlays();
        let songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src = `/assets/songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    })
});

document.getElementById("next").addEventListener("click", () => {
    if (songIndex >= 8) {
        songIndex = 0;
    }
    else {
        songIndex += 1
    }

    audioElement.src = `/assets/songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    makeAllPlays();
});

document.getElementById("previous").addEventListener("click", () => {
    if (songIndex <= 0) {
        songIndex = 8;
    }
    else {
        songIndex -= 1
    }

    audioElement.src = `/assets/songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    makeAllPlays();
})