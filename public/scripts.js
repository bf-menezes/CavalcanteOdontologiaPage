const modalOverlay = document.querySelector('.modal-overlay');
const videos = document.querySelectorAll('.video')

for (let video of videos) {
    video.addEventListener('click', function(){
        const videoID = video.getAttribute('id');
        window.location.href = `/video?id=${videoID}`
    })
}

