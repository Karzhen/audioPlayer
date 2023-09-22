const player = document.querySelector('.player'),
    playBtn = document.querySelector('.playPause'),
    prevBtn = document.querySelector('.previousSong'),
    nextBtn = document.querySelector('.nextSong'),
    audio = document.querySelector('.audio'),
    scrollBar = document.querySelector('.scrollBar'),
    progress = document.querySelector('.line'),
    author = document.querySelector('.author'),
    title = document.querySelector('.title'),
    cover = document.querySelector('.cover'),
    playPause = document.querySelector('.playPause'),
    songTime = document.querySelector('.currentTime'),
    durationTime = document.querySelector('.songDuration');

const songs = ['Betsy Capybara','Isolated Ora','Amber Run I Found'];

let currentSongIndex = 0;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.floor(seconds % 60);
    const formattedTime = `${minutes}:${secondsRemainder.toString().padStart(2, '0')}`;
    return formattedTime;
}

 function initSong(song) {
     if (currentSongIndex === 0) {
         title.innerHTML = 'Capybara';
         author.innerHTML = 'Betsy';
         cover.src = 'images/Capybara.jpeg';
     } else if (currentSongIndex === 1) {
         title.innerHTML = 'Isolated';
         author.innerHTML = 'Ora';
         cover.src = 'images/Ora.jpg';
     } else if (currentSongIndex === 2) {
         title.innerHTML = 'I Found';
         author.innerHTML = 'Amber Run';
         cover.src = 'images/I found.jpg';
     }
     audio.src =  `audio/${song}.mp3`;
     audio.addEventListener('loadedmetadata', function () {
         // Обновляем текстовое содержимое элемента durationTime с длительностью аудио
         durationTime.textContent = formatTime(audio.duration);
     });
}

function playSong() {
     player.classList.add('playing');
     cover.classList.add('active');
     playPause.src = 'images/pausePlay.svg';
     audio.play();
}

function pauseSong() {
     player.classList.remove('playing');
     cover.classList.remove('active');
     playPause.src = 'images/playPause.svg';
     audio.pause();
}

function prevSong() {
    currentSongIndex -= 1;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    initSong(songs[currentSongIndex]);
    if (player.classList.contains('playing')) {
        playSong();
    }
}

function nextSong() {
    currentSongIndex += 1;
    if (currentSongIndex > songs.length - 1) {
        currentSongIndex = 0;
    }
    initSong(songs[currentSongIndex]);
    if (player.classList.contains('playing')) {
        playSong();
    }
}

initSong(songs[currentSongIndex]);

 playBtn.addEventListener('click', () => {
     const check = player.classList.contains('playing');
     if (check) {
         pauseSong();
     } else {
         playSong();
     }
 })
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

function updateScrollTime(event) {
     const {duration, currentTime} = event.srcElement;
     const progressPercent = (currentTime / duration) * 100;
     progress.style.width = `${progressPercent}%`;
     songTime.textContent = formatTime(currentTime);
}

function setScrollTime(event) {
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

audio.addEventListener('timeupdate', updateScrollTime);
 scrollBar.addEventListener('click', setScrollTime);
 audio.addEventListener('ended', nextSong);