
const videoInfos = nodecg.Replicant('videoInfos')
const videoShow = nodecg.Replicant('videoShow')

const UrlChange = nodecg.Replicant('UrlChange', 'leaderboard')

var videocontainer = document.getElementById('video');
var videosource = document.getElementById('sourceVid');

videoShow.on('change', (newValue) => {
    switch (newValue) {
        case true:
            videosource.setAttribute('src', videoInfos.value);
            videocontainer.load();
            videocontainer.play();
            $('#video').fadeIn(1000)
            break;
        case false:
            $('#video').fadeOut(1000)
    }
})
