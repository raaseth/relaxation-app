const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');


    //sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //Time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');

    //Get the length of the outlin
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength);
    //Duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    
    //play different sounds
    sounds.forEach(sound => {
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            if(song.played) {
                song.pause();
                video.pause();
                play.src= './svg/play.svg';
            }
        });
    });

    //play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    //select sound
    timeSelect.forEach(Option => {
        Option.addEventListener('click', function() {
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${("0" + Math.floor(fakeDuration / 60)).slice(-2)}:${("0" + Math.floor(fakeDuration % 60)).slice(-2)}`;
        });
    });

    //Create a function specefic to stop and play the sounds
    const checkPlaying = song => {
        if(song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        }else {
            song.pause();
            video.pause();
            play.src= './svg/play.svg';
        }
    };
        
    //animating the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime; 
        let seconds = Math.floor(elapsed % 60);
        let minutes= Math.floor(elapsed / 60);

        //Animating the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        //Animating the text
        timeDisplay.textContent = `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;

        if(currentTime >= fakeDuration){
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }
    };
};

app();