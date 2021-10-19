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
        console.log(playerElement);

        if (playerElement == null) {
            console.error("Cannot construct video player within null element");
            return;
        }

        this.video = document.createElement('video');
        this.video.controls = true;
        this.video.className = "video-player";
        this.video.width = width;
        this.video.height = height;

        playerElement.appendChild(this.video);
    }

    /**
     * Sets the video element src as the file path
     * 
     * @param {string} filePath url of mp4 file to be loaded
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

    resize(width, height) {
        this.width = width;
        this.height = height;
    }

}


let player = new VideoPlayer("video-container", 1000, 600);
const sampleVideo = "http://techslides.com/demos/sample-videos/small.mp4";

player.load(sampleVideo);
player.play();