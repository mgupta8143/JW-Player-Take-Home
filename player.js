class VideoPlayer {
    /**
     * Instantiates a video player within a given element
     * 
     * @param {string} divId - id of element to instantiate video player within 
     * @param {number} width - desired with of video element in pixels
     * @param {number} height - desired height of video element in pixels
     * @constructor
     */
    constructor(divId, width, height) {
        this.divId = divId;
        this.width = width;
        this.height = height;
        this.video = null;

        const playerElement = document.getElementById(divId);

        if (playerElement === null) {
            console.error("Cannot construct video player within null element");
            return;
        }

        this.video = document.createElement('video');
        this.video.controls = true;
        this.video.className = "video-player";
        this.video.width = width;
        this.video.height = height;

        playerElement.appendChild(this.video);

        this.video.addEventListener('play', function(evt) {
            this.isPlaying = true;
            this.hasEnded = false;
        });

        this.video.addEventListener('pause', function(evt) {
            this.isPlaying = false;
            this.hasEnded = false;
        });

        this.video.addEventListener('ended', function(evt) {
            this.isPlaying = false;
            this.hasEnded = true;
        });

    }

    /**
     * Sets the video element src as the file path
     * 
     * @param {string} filePath - url of mp4 file to be loaded
     */
    load(filePath) {
        this.video.src =  filePath;
    }

    /**
     * Plays the video element loaded
     */
    play() {
        this.video.play();
    }

    /**
     * Pauses the video element loaded
     */
    pause() {
        this.video.pause();
    }

    /**
     * Resizes video element to width and height desired in pixels
     * 
     * @param {number} width - desired width of video element in pixels
     * @param {number} height - desired height of video element in pixels
     */
    resize(width, height) {
        this.width = width;
        this.height = height;
        this.video.width = width;
        this.video.height = height;
    }

    getHeight() {
        return this.height;
    }

    getWidth() {
        return this.width;
    }

    setAutoplay(autoplay) {
        this.video.autoplay = autoplay;
    }

    setVolume(volume) {
        this.video.volume = Math.floor(volume / 100.0);
    }

    getVolume() {
        return this.video.volume;
    }

    setMute(mute) {
        this.video.muted = mute;
    }

    getMute() {
        return this.video.muted;
    }

    getDuration() {
        return this.video.duration;
    }

    setFullscreen(fullscreen) {
        this.video.fullscreen = fullscreen;
    }

    getPlaybackState() {
        if (this.video.hasEnded) return "ended";
        if (this.video.isPlaying) return "playing";
        return "paused";
    }
}


let player = new VideoPlayer("video-container", 1000, 600);
const sampleVideo = "http://techslides.com/demos/sample-videos/small.mp4";

player.load(sampleVideo);
player.setVolume(50);

setInterval(() => {
    console.log(player.getPlaybackState());
}, 200);