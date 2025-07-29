// Music player functionality
document.addEventListener('DOMContentLoaded', function() {
    // Copy contract address
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const address = document.querySelector('.contract-address span').textContent;
            navigator.clipboard.writeText(address);
            alert('Contract address copied to clipboard!');
        });
    }
    
    // Notification interactions
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(notification => {
        notification.addEventListener('click', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        });
    });
    
    // Music Player Implementation
    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const volumeBtn = document.getElementById('volumeBtn');
    const progressBar = document.getElementById('progressBar');
    
    // Playlist
    const playlist = [
        'music/1.mp3',
        'music/2.mp3',
        'music/3.mp3',
        'music/4.mp3',
        'music/5.mp3'
    ];
    
    let currentTrackIndex = 0;
    let isPlaying = false;
    let isMuted = false;
    
    // Initialize player
    function initPlayer() {
        audioPlayer.src = playlist[currentTrackIndex];
        updateProgress();
    }
    
    // Play/Pause functionality
    function togglePlay() {
        if (isPlaying) {
            audioPlayer.pause();
            playBtn.textContent = '▶';
            isPlaying = false;
        } else {
            audioPlayer.play();
            playBtn.textContent = '⏸';
            isPlaying = true;
        }
    }
    
    // Previous track
    function prevTrack() {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        audioPlayer.src = playlist[currentTrackIndex];
        if (isPlaying) {
            audioPlayer.play();
        }
    }
    
    // Next track
    function nextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        audioPlayer.src = playlist[currentTrackIndex];
        if (isPlaying) {
            audioPlayer.play();
        }
    }
    
    // Toggle volume
    function toggleVolume() {
        if (isMuted) {
            audioPlayer.volume = 1;
            volumeBtn.textContent = '🔊';
            isMuted = false;
        } else {
            audioPlayer.volume = 0;
            volumeBtn.textContent = '🔇';
            isMuted = true;
        }
    }
    
    // Update progress bar
    function updateProgress() {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = progress + '%';
    }
    
    // Event listeners
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevTrack);
    nextBtn.addEventListener('click', nextTrack);
    volumeBtn.addEventListener('click', toggleVolume);
    
    // Progress bar click to seek
    const progressBarContainer = document.querySelector('.progress-bar');
    progressBarContainer.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percentage = clickX / width;
        audioPlayer.currentTime = percentage * audioPlayer.duration;
    });
    
    // Audio events
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', nextTrack);
    audioPlayer.addEventListener('loadedmetadata', function() {
        // Track loaded successfully
    });
    
    // Initialize the player
    initPlayer();
}); 