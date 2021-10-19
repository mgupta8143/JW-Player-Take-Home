class VideoPlayer {
    /**
     * Instantiates a video player within a given element.
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
        this.viewability = 0;

        let self = this; //for callback referencing

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


        const options = {
            root: null,
            rootMargin: '0px',
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
        }

        const callback = function(entries, observer) {
            entries.forEach(function(entry) {
                self.viewability = entry.intersectionRatio;
            });
        };

        let observer = new IntersectionObserver(callback, options);
        observer.observe(this.video);

    }

    /**
     * Sets the video element src as the file path.
     * 
     * @param {string} filePath - url of mp4 file to be loaded
     */
    load(filePath) {
        this.video.src =  filePath;
    }

    /**
     * Plays the video element loaded.
     */
    play() {
        this.video.play();
    }

    /**
     * Pauses the video element loaded.
     */
    pause() {
        this.video.pause();
    }

    /**
     * Resizes video element to width and height desired in pixels.
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

    /**
     * Gets the height of the video in pixels.
     * 
     * @returns the height of the video in pixels
     */
    getHeight() {
        return this.height;
    }

    /**
     * Gets the width of the video in pixels.
     * 
     * @returns the height of the video in pixels
     */
    getWidth() {
        return this.width;
    }

    /**
     * Sets autoplay to either be active or not in the video player.
     * 
     * @param {boolean} autoplay whether autoplay should be turned on in the player or not
     */
    setAutoplay(autoplay) {
        this.video.autoplay = autoplay;
    }

    /**
     * Sets video player volume to a designated percentage.
     * 
     * @param {number} volume integer from 0 to 100 representing percentage of audible volume
     */
    setVolume(volume) {
        this.video.volume = Math.floor(volume) / 100.0;
    }

    /**
     * Returns video player volume within range of 0 to 100.
     * 
     * @returns integer volume of the video from 0 to 100.
     */
    getVolume() {
        return Math.floor(this.video.volume * 100);
    }


    /**
     * Sets wheter video should be muted or not.
     * 
     * @param {boolean} mute true if video should be muted, false otherwise 
     */
    setMute(mute) {
        this.video.muted = mute;
    }

    /**
     * Returns true if video is muted, false otherwise.
     * 
     * @returns boolean representing if video is muted
     */
    getMute() {
        return this.video.muted;
    }

    /**
     * Returns duration of video being played in seconds.
     * 
     * @returns duration of video being played in second
     */
    getDuration() {
        return this.video.duration;
    }

    /**
     * Sets video to fullscreen or not.
     * 
     * @param {boolean} fullscreen true if video should be set to fullscreen
     */
    setFullscreen(fullscreen) {
        this.video.fullscreen = fullscreen;
    }

    /**
     * Returns playback state of video with three strings "ended",
     * "playing", and "paused"
     * 
     * @returns string representing playback state.
     */
    getPlaybackState() {
        if (this.video.hasEnded) return "ended";
        if (this.video.isPlaying) return "playing";
        return "paused";
    }

    /**
     * Returns percentage of player viewable on page
     * 
     * @returns integer representing percentage of player viewable on page
     */
    getViewability() {
        return Math.floor(this.viewability * 100);
    }
}


let player = new VideoPlayer("video-container", 1000, 600);
const sampleVideo = "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4";

player.load(sampleVideo);
player.setVolume(51.345633);

setInterval(() => {
    console.log(player.getViewability());
}, 200);