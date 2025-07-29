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
    const volumeSlider = document.getElementById('volumeSlider');
    const progressBar = document.getElementById('progressBar');
    const playlistBtn = document.getElementById('playlistBtn');
    const playlistDropdown = document.getElementById('playlistDropdown');
    const playlistItems = document.querySelectorAll('.playlist-item');
    
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
        
        // Set initial volume
        audioPlayer.volume = volumeSlider.value / 100;
        
        // Set first track as active in playlist
        playlistItems[0].classList.add('active');
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
            audioPlayer.volume = volumeSlider.value / 100;
            volumeBtn.textContent = '🔊';
            isMuted = false;
        } else {
            audioPlayer.volume = 0;
            volumeBtn.textContent = '🔇';
            isMuted = true;
        }
    }
    
    // Update volume from slider
    function updateVolume() {
        if (!isMuted) {
            audioPlayer.volume = volumeSlider.value / 100;
        }
    }
    
    // Toggle playlist dropdown
    function togglePlaylist() {
        playlistDropdown.classList.toggle('show');
    }
    
    // Select track from playlist
    function selectTrack(trackIndex) {
        currentTrackIndex = trackIndex;
        audioPlayer.src = playlist[trackIndex];
        if (isPlaying) {
            audioPlayer.play();
        }
        
        // Update active item in playlist
        playlistItems.forEach((item, index) => {
            item.classList.toggle('active', index === trackIndex);
        });
        
        // Close dropdown
        playlistDropdown.classList.remove('show');
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
    volumeSlider.addEventListener('input', updateVolume);
    playlistBtn.addEventListener('click', togglePlaylist);
    
    // Playlist item click events
    playlistItems.forEach((item, index) => {
        item.addEventListener('click', () => selectTrack(index));
    });
    
    // Close playlist dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!playlistBtn.contains(e.target) && !playlistDropdown.contains(e.target)) {
            playlistDropdown.classList.remove('show');
        }
    });
    
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
    
    // Background change functionality
    const bgButtons = document.querySelectorAll('.bg-btn');
    const body = document.body;
    
    // Background options
    const backgrounds = {
        default: {
            backgroundImage: 'url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48Y2lyY2xlIGN4PSIyNSIgY3k9IjI1IiByPSI4IiBmaWxsPSIjODgzM2RkIiBvcGFjaXR5PSIwLjUiLz48L3N2Zz4=\')',
            backgroundColor: 'var(--secondary-bg)'
        },
        gradient: {
            backgroundImage: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
            backgroundColor: 'transparent'
        },
        stars: {
            backgroundImage: 'radial-gradient(2px 2px at 20px 30px, #eee, transparent), radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent), radial-gradient(2px 2px at 50px 160px, #ddd, transparent), radial-gradient(2px 2px at 90px 40px, #fff, transparent), radial-gradient(2px 2px at 130px 80px, rgba(255,255,255,0.6), transparent), radial-gradient(2px 2px at 160px 30px, #ddd, transparent)',
            backgroundColor: '#1a1a2e'
        },
        purple: {
            backgroundImage: 'linear-gradient(45deg, #8833dd 0%, #6a1b9a 100%)',
            backgroundColor: 'transparent'
        },
        green: {
            backgroundImage: 'linear-gradient(45deg, #44cc66 0%, #2e7d32 100%)',
            backgroundColor: 'transparent'
        },
        red: {
            backgroundImage: 'linear-gradient(45deg, #dd3333 0%, #b71c1c 100%)',
            backgroundColor: 'transparent'
        },
        brown: {
            backgroundImage: 'linear-gradient(45deg, #885533 0%, #5d4037 100%)',
            backgroundColor: 'transparent'
        },
        dark: {
            backgroundImage: 'linear-gradient(45deg, #333333 0%, #1a1a1a 100%)',
            backgroundColor: 'transparent'
        },
        cyan: {
            backgroundImage: 'linear-gradient(45deg, #33ccdd 0%, #00838f 100%)',
            backgroundColor: 'transparent'
        }
    };
    
    // Set default background
    let currentBg = 'default';
    bgButtons[0].classList.add('active');
    
    // Background change event listeners
    bgButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bgType = this.getAttribute('data-bg');
            
            // Remove active class from all buttons
            bgButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Apply background
            const bg = backgrounds[bgType];
            body.style.backgroundImage = bg.backgroundImage;
            body.style.backgroundColor = bg.backgroundColor;
            
            currentBg = bgType;
        });
    });
    
    // NFT pattern background change functionality
    const nftPatterns = document.querySelectorAll('.nft-pattern');
    
    nftPatterns.forEach(pattern => {
        pattern.addEventListener('click', function() {
            const bgType = this.getAttribute('data-bg');
            
            // Remove active class from all patterns
            nftPatterns.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked pattern
            this.classList.add('active');
            
            // Apply background
            const bg = backgrounds[bgType];
            body.style.backgroundImage = bg.backgroundImage;
            body.style.backgroundColor = bg.backgroundColor;
            
            currentBg = bgType;
        });
    });
}); 