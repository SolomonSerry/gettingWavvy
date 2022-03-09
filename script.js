duration = document.querySelector("#duration")
current = document.querySelector("#current")
playPause = document.querySelector("#playPause")
stop = document.querySelector("#stop")

const timeCalc = (value) => {
    seconds = Math.floor(value % 60);
    minutes = Math.floor((value / 60) % 60); 

    if (seconds < 10) {
        seconds = "0" + seconds;
    };

    return minutes + ":" + seconds;
};

const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'violet',
    progressColor: 'purple',
    barWidth: 2,
    responsive: true, 
    hideScrollbar:true,
    barRadius: 3
});

wavesurfer.load("/audio/werkIt2.wav");

playPause.addEventListener('click', () => {
    wavesurfer.playPause();
});

stop.addEventListener('click', () => {
    wavesurfer.stop();
});

wavesurfer.on("ready", function(e) {
    duration.textContent = timeCalc(wavesurfer.getDuration())
});

wavesurfer.on("audioprocess", function(e) {
    current.textContent = timeCalc(wavesurfer.getCurrentTime())
});

wavesurfer.on("play", function(e) {
    playPause.classList.remove("fi-br-play")
    playPause.classList.add("fi-br-pause")
});

wavesurfer.on("pause", function(e) {
    playPause.classList.remove("fi-br-pause")
    playPause.classList.add("fi-br-play")
});

wavesurfer.on("seek", function(e) {
    current.textContent = timeCalc(wavesurfer.getCurrentTime())
});