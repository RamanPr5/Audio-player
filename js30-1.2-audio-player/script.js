const main = document.querySelector('.main');
const wallpapper = document.querySelector('.wallpapper');
const button = document.querySelector('.btn');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const blur = document.querySelector('.blur');

const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');

let isPlay = false;

const audio = new Audio();

// *************************************************************************
const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`;
    } 
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
}
// *************************************************************************************

let songs = [
    './assets/audio/09\ -\ Мария.mp3',
    './assets/audio/17\ -\ Забытые\ ботинки.mp3',
    './assets/audio/09\ -\ История\ о\ мертвой\ женщине.mp3',
    './assets/audio/08\ -\ Хороший\ пират-мертвый\ пират!.mp3',
    './assets/audio/06\ -\ Что\ видел\ малыш.mp3',
    './assets/audio/15\ -\ Утопленник.mp3'];
let songIndex = 0;

let images = [
    './assets/img/«Ели_мясо_мужики».jpg',
    './assets/img/Акустический_альбом_\(Переиздание_2000_года\).jpeg',
    './assets/img/Будь_как_дома\,_Путник....jpg',
    './assets/img/Бунт_на_корабле_\(альбом\).jpg',
    './assets/img/Герои_и_злодеи.jpg',
    './assets/img/Жаль_нет_ружья_переиздание_2022.jpg']

let artistSong = [
    'Король и Шут', 
    'Король и Шут',
    'Король и Шут',
    'Король и Шут',
    'Король и Шут',
    'Король и Шут']

  let nameSong = [
    'Мария', 
    'Забытые ботинки',
    'История о мертвой женщине',
    'Хороший пират-мертвый пират!',
    'Что видел малыш',
    'Утопленник']

    function currentSong(song) {
        audio.src = song;
        wallpapper.src = images[songIndex];
        blur.src = images[songIndex];
        document.querySelector('.artist').innerHTML = artistSong[songIndex];
        document.querySelector('.title').innerText = nameSong[songIndex];
        document.querySelector('.current-number').innerText = songIndex + 1;
        document.querySelector('.all').innerText = nameSong.length;
        setInterval(() => {
            progress.value = audio.currentTime;
            document.querySelector('.current-time').innerHTML = formatTime(audio.currentTime);
            }, 500);
            setTimeout(() => {
                progress.max = audio.duration;
                document.querySelector('.song-duration').innerHTML = formatTime(audio.duration);
            }, 300);
    }
    currentSong(songs[songIndex]);

    function playAudio() {
        if(!isPlay){
            audio.play();
            isPlay = true;
            button.classList.add('pause');
            document.querySelector('.btn2').style.visibility = 'hidden';
        } else {
            audio.pause();
            isPlay = false;
            button.classList.remove('pause');
            document.querySelector('.btn2').style.visibility = 'visible';
        }
    }

    button.addEventListener('click',  () => {
        playAudio();
    });
    
    function playNext() {
        songIndex++;
        if (songIndex > songs.length - 1) {
            songIndex = 0;
        }
        currentSong(songs[songIndex]);
        isPlay = false;
        playAudio();
        
    }
    
    next.addEventListener ('click', playNext);
    
    function playPrev() {
        songIndex--;
        if (songIndex < 0) {
            songIndex = songs.length - 1;
        }
        currentSong(songs[songIndex]);
        isPlay = false;
        playAudio();
    }
    
    prev.addEventListener ('click', playPrev);

    function updateProgress(e) {
        const {duration, currentTime} = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`
    }
    
    audio.addEventListener('timeupdate', updateProgress);
    
    
    function setProgress (e) {
     const width = this.clientWidth;
     const clickX = e.offsetX;
    
     const duration = audio.duration;
    
     audio.currentTime = (clickX / width) * duration;
    }
    
    progressContainer.addEventListener('click', setProgress);
    
    audio.addEventListener('ended',playNext);