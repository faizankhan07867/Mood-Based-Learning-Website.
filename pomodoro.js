let pomodoroTime = 25 * 60; // 25 minutes
let breakTime = 5 * 60;     // 5 minutes break
let isBreak = false;
let timeLeft = pomodoroTime;
let isRunning = false;
let intervalId;
let startTime;

elements.startBtn.addEventListener('click', startTimer);
elements.pauseBtn.addEventListener('click', pauseTimer);
elements.resetBtn.addEventListener('click', resetTimer);
elements.musicToggle.addEventListener('click', toggleMusic);

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now();
        elements.startBtn.style.display = 'none';
        elements.pauseBtn.style.display = 'inline-flex';
        tick();
        intervalId = setInterval(tick, 1000);
    }
}

function pauseTimer() {
    isRunning = false;
    clearInterval(intervalId);
    elements.startBtn.style.display = 'inline-flex';
    elements.pauseBtn.style.display = 'none';
}

function resetTimer() {
    pauseTimer();
    timeLeft = isBreak ? breakTime : pomodoroTime;
    updateDisplay();
    elements.startBtn.style.display = 'inline-flex';
    elements.pauseBtn.style.display = 'none';
}

function tick() {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
        updateProgress();
        updateSessionTime();
    } else {
        timerComplete();
    }
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    elements.timerDisplay.textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateProgress() {
    const total = isBreak ? breakTime : pomodoroTime;
    const progress = ((total - timeLeft) / total) * 100;
    elements.progressFill.style.width = progress + '%';
}

function updateSessionTime() {
    if (startTime) {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        elements.sessionTime.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

function timerComplete() {
    clearInterval(intervalId);
    isRunning = false;
    
    if (isBreak) {
        // Pomodoro completed
        userData.pomodorosCompleted++;
        elements.pomodoroCount.textContent = userData.pomodorosCompleted;
        showNotification('🎉 Pomodoro Complete! Great job!', 'success');
        playBreakMusic();
    } else {
        // Start break
        isBreak = true;
        timeLeft = breakTime;
        showNotification('⏸️ Time for a 5-minute break!', 'warning');
        elements.timerDisplay.textContent = 'BREAK';
        elements.timerDisplay.style.color = '#f39c12';
    }
    
    saveUserData();
    updateAnalytics();
}

function playBreakMusic() {
    elements.musicPlayer.style.display = 'flex';
    elements.breakMusic.play().catch(() => {
        console.log('Music autoplay blocked by browser');
    });
    elements.musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
}

function toggleMusic() {
    if (elements.breakMusic.paused) {
        elements.breakMusic.play();
        elements.musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        elements.breakMusic.pause();
        elements.musicToggle.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function showNotification(message, type) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}