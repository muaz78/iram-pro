/**
 * ROMANTIC PROPOSAL FOR IRAM — VANILLA JAVASCRIPT LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation elements
  const stage1 = document.getElementById('stage-1');
  const stage2 = document.getElementById('stage-2');
  const stage3 = document.getElementById('stage-3');
  const stage4 = document.getElementById('stage-4');
  const stage5 = document.getElementById('stage-5');

  const btnOpen = document.getElementById('btn-open');
  const btnStart = document.getElementById('btn-start');
  const btnToProposal = document.getElementById('btn-to-proposal');
  const btnYes = document.getElementById('btn-yes');
  const btnPlayful = document.getElementById('btn-playful');
  const btnMemoryOpen = document.getElementById('btn-memory-open');
  const btnModalClose = document.getElementById('btn-modal-close');
  const memoryModal = document.getElementById('memory-modal');

  // Stage Switcher Helper
  function goToStage(fromStage, toStage, callback) {
    fromStage.classList.remove('active');
    setTimeout(() => {
      toStage.classList.add('active');
      if (callback) callback();
    }, 450);
  }

  // --- AUDIO SYNTHESIZER FALLBACK ---
  let isPlaying = false;
  let audioCtx = null;
  let audioTimer = null;
  let audioStep = 0;
  const musicBtn = document.getElementById('music-btn');
  const bgAudio = document.getElementById('bg-audio');

  const notes = {
    'F3': 174.61, 'A3': 220.00, 'C4': 261.63, 'D4': 293.66, 'E4': 329.63,
    'G4': 392.00, 'A4': 440.00, 'B4': 493.88, 'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'G5': 783.99
  };

  const chords = [
    { pad: [174.61, 261.63, 329.63, 440.00], mel: [523.25, 440.00, 329.63, 392.00] },
    { pad: [130.81, 196.00, 246.94, 329.63], mel: [783.99, 659.25, 523.25, 587.33] },
    { pad: [220.00, 261.63, 329.63, 392.00], mel: [523.25, 659.25, 587.33, 523.25] },
    { pad: [196.00, 293.66, 392.00, 493.88], mel: [587.33, 493.88, 392.00, 440.00] }
  ];

  function initAudioSynth() {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioCtxClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, time, duration, type = 'sine', gainVal = 0.05) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, time);
      g.gain.setValueAtTime(0.001, time);
      g.gain.exponentialRampToValueAtTime(gainVal, time + 0.08);
      g.gain.exponentialRampToValueAtTime(0.0001, time + duration);
      osc.connect(g);
      g.connect(audioCtx.destination);
      osc.start(time);
      osc.stop(time + duration + 0.1);
    } catch (e) {}
  }

  function loopSequence() {
    if (!isPlaying || !audioCtx) return;
    const now = audioCtx.currentTime;
    const item = chords[audioStep % chords.length];
    item.pad.forEach((f, i) => playTone(f, now + i * 0.04, 3.2, 'sine', 0.03));
    item.mel.forEach((f, i) => playTone(f, now + 0.3 + i * 0.65, 1.8, 'triangle', 0.04));
    audioStep++;
    audioTimer = setTimeout(loopSequence, 2800);
  }

  function startMusic() {
    if (isPlaying) return;
    isPlaying = true;
    musicBtn.classList.add('playing');
    if (bgAudio && bgAudio.src) {
      bgAudio.play().catch(() => {
        initAudioSynth();
        loopSequence();
      });
    } else {
      initAudioSynth();
      loopSequence();
    }
  }

  function stopMusic() {
    isPlaying = false;
    musicBtn.classList.remove('playing');
    if (audioTimer) clearTimeout(audioTimer);
    if (bgAudio) bgAudio.pause();
  }

  musicBtn.addEventListener('click', () => {
    if (isPlaying) stopMusic();
    else startMusic();
  });

  // --- STAGE 1 -> STAGE 2 (Handwriting) ---
  btnOpen.addEventListener('click', () => {
    startMusic();
    goToStage(stage1, stage2, () => {
      runHandwritingAnimation();
    });
  });

  function runHandwritingAnimation() {
    const strokes = [
      { id: 'stroke-I', delay: 400 },
      { id: 'stroke-I-top', delay: 1200 },
      { id: 'stroke-r', delay: 1900 },
      { id: 'stroke-a', delay: 2800 },
      { id: 'stroke-m', delay: 3800 },
      { id: 'stroke-flourish', delay: 4800 },
      { id: 'stroke-dot', delay: 5800 },
    ];

    strokes.forEach(s => {
      setTimeout(() => {
        const el = document.getElementById(s.id);
        if (el) el.classList.add('drawn');
      }, s.delay);
    });

    setTimeout(() => {
      const reveal = document.getElementById('stage-2-reveal');
      if (reveal) reveal.classList.add('visible');
    }, 6200);
  }

  // --- STAGE 2 -> STAGE 3 ---
  btnStart.addEventListener('click', () => {
    goToStage(stage2, stage3);
  });

  // --- STAGE 3 -> STAGE 4 ---
  btnToProposal.addEventListener('click', () => {
    goToStage(stage3, stage4);
  });

  // --- STAGE 4: PLAYFUL ESCAPING BUTTON LOGIC ---
  const playfulMsgs = [
    'Sochne do 🙈',
    'Chochlo... ek baar please 🥺',
    'Arre rukooo 😭',
    'Iram please 😂',
    'Itna bhaag kyun rahi ho? 😭',
    'Pakad ke dikhao 😜',
    'Okay okay 😭\nMain samajh gaya...\ntumhe manana padega.'
  ];
  let dodgeCount = 0;
  let surrendered = false;

  function dodgePlayfulButton() {
    if (surrendered) return;
    dodgeCount++;
    if (dodgeCount >= 6) {
      surrendered = true;
      btnPlayful.style.transform = 'translate(0px, 0px)';
      btnPlayful.innerText = playfulMsgs[6];
      return;
    }

    const rangeX = window.innerWidth > 640 ? 120 : 60;
    const rangeY = 60;
    const signX = Math.random() > 0.5 ? 1 : -1;
    const signY = Math.random() > 0.5 ? 1 : -1;
    const offsetX = signX * (40 + Math.random() * rangeX);
    const offsetY = signY * (20 + Math.random() * rangeY);

    btnPlayful.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    btnPlayful.innerText = playfulMsgs[Math.min(dodgeCount, playfulMsgs.length - 2)];
  }

  btnPlayful.addEventListener('mouseenter', dodgePlayfulButton);
  btnPlayful.addEventListener('touchstart', (e) => {
    if (!surrendered) {
      e.preventDefault();
      dodgePlayfulButton();
    }
  });

  // --- STAGE 4 -> STAGE 5 (YES CELEBRATION) ---
  btnYes.addEventListener('click', () => {
    setBurstMode(true);
    goToStage(stage4, stage5);
  });

  // --- MEMORY MODAL ---
  btnMemoryOpen.addEventListener('click', () => {
    memoryModal.classList.remove('hidden');
  });

  btnModalClose.addEventListener('click', () => {
    memoryModal.classList.add('hidden');
  });

  // --- PETALS CANVAS ---
  const canvas = document.getElementById('petals-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let burstMode = false;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.setBurstMode = function(val) {
      burstMode = val;
      const targetCount = burstMode ? 75 : 30;
      while (petals.length < targetCount) {
        petals.push(createPetal(false));
      }
    };

    const colors = [
      'rgba(252, 213, 220, 0.75)',
      'rgba(255, 228, 233, 0.85)',
      'rgba(248, 187, 208, 0.65)',
      'rgba(255, 240, 243, 0.90)'
    ];

    function createPetal(randomY = true) {
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : -20,
        size: 8 + Math.random() * 12,
        speedY: 0.6 + Math.random() * 1.1,
        speedX: (Math.random() - 0.5) * 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        tilt: Math.random() * Math.PI,
        tiltSpeed: 0.015 + Math.random() * 0.02,
        opacity: 0.3 + Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    }

    const petals = [];
    for (let i = 0; i < 30; i++) petals.push(createPetal(true));

    function renderPetals() {
      ctx.clearRect(0, 0, width, height);
      petals.forEach((p, idx) => {
        p.tilt += p.tiltSpeed;
        p.rotation += p.rotationSpeed;
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.tilt) * 0.6;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(Math.cos(p.tilt), 1);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.size * 0.8, -p.size * 1.2, -p.size * 0.8, -p.size * 2, 0, -p.size * 2.2);
        ctx.bezierCurveTo(p.size * 0.8, -p.size * 2, p.size * 0.8, -p.size * 1.2, 0, 0);
        ctx.fill();
        ctx.restore();

        if (p.y > height + 30 || p.x < -30 || p.x > width + 30) {
          petals[idx] = createPetal(false);
        }
      });
      requestAnimationFrame(renderPetals);
    }
    renderPetals();
  }
});
