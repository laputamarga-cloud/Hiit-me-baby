(() => {
  'use strict';

  const VERSION = '0.3';

  const STRENGTH = [
    {
      name: 'Full Body A',
      subtitle: '6 ejercicios · cuerpo completo',
      exercises: [
        ['Flexiones', 'Todo lo que puedas con técnica limpia.'],
        ['Puente de glúteo', 'Sube fuerte y aprieta arriba.'],
        ['Remo con mancuernas', 'Codos atrás y espalda estable.'],
        ['Bicycle abs', 'Rápido, sin tirar del cuello.'],
        ['Press de hombros', 'Empuja arriba con control.'],
        ['Elevaciones de piernas', 'Core firme; lumbar pegada.']
      ]
    },
    {
      name: 'Full Body B',
      subtitle: '6 ejercicios · mancuernas + suelo',
      exercises: [
        ['Peso muerto rumano', 'Cadera atrás; espalda neutra.'],
        ['Flexiones inclinadas', 'Ritmo alto sin perder la línea.'],
        ['Dead bug', 'Alterna lados; lumbar estable.'],
        ['Remo inclinado', 'Aprieta la espalda al subir.'],
        ['Puente marchado', 'Cadera arriba y estable.'],
        ['Press de suelo', 'Empuja fuerte desde el suelo.']
      ]
    },
    {
      name: 'Upper Body',
      subtitle: '6 ejercicios · tren superior',
      exercises: [
        ['Flexiones', 'Ritmo alto y recorrido limpio.'],
        ['Remo con mancuernas', 'Tira hacia las costillas.'],
        ['Press de hombros', 'Cadencia viva.'],
        ['Curl de bíceps', 'Sin balancear el cuerpo.'],
        ['Tríceps con apoyo', 'Silla estable; empuja con brazos.'],
        ['Elevaciones laterales', 'Controla especialmente la bajada.']
      ]
    },
    {
      name: 'Core HIIT',
      subtitle: '6 ejercicios · abdomen + estabilidad',
      exercises: [
        ['Bicycle abs', 'Mantén el ritmo sin tirar del cuello.'],
        ['Plancha', 'Abdomen y glúteos activos.'],
        ['Dead bug', 'Controla cada extensión.'],
        ['Elevaciones de piernas', 'No arquees la lumbar.'],
        ['Plancha lateral derecha', 'Cadera arriba.'],
        ['Plancha lateral izquierda', 'Cadera arriba.']
      ]
    },
    {
      name: 'Glúteo + posterior',
      subtitle: '6 ejercicios · sin impacto',
      exercises: [
        ['Puente de glúteo', 'Sube y aprieta fuerte.'],
        ['Peso muerto rumano', 'Cadera atrás; espalda neutra.'],
        ['Patada de glúteo derecha', 'Empuja con el talón.'],
        ['Patada de glúteo izquierda', 'Empuja con el talón.'],
        ['Puente marchado', 'Que la pelvis no baile.'],
        ['Elevaciones de gemelo', 'Sube vivo; baja controlando.']
      ]
    },
    {
      name: 'Brazos + hombros',
      subtitle: '6 ejercicios · mancuernas de 3 kg',
      exercises: [
        ['Curl de bíceps', 'Ritmo vivo sin balanceo.'],
        ['Press de hombros', 'Empuja arriba.'],
        ['Patada de tríceps', 'Codos quietos.'],
        ['Elevaciones laterales', 'No subas por encima del hombro.'],
        ['Remo vertical', 'Sube hasta el pecho con control.'],
        ['Press de suelo', 'Empuja fuerte.']
      ]
    },
    {
      name: 'Push Power',
      subtitle: '6 ejercicios · pecho + hombro + tríceps',
      exercises: [
        ['Flexiones inclinadas', 'Busca ritmo y buena alineación.'],
        ['Press de suelo', 'Empuja con decisión.'],
        ['Flexiones', 'Las que salgan limpias.'],
        ['Tríceps con apoyo', 'Baja y empuja con control.'],
        ['Press de hombros', 'Cadencia viva.'],
        ['Shoulder taps', 'Cadera lo más quieta posible.']
      ]
    },
    {
      name: 'Exprés 6',
      subtitle: '6 ejercicios · para días con prisa',
      exercises: [
        ['Flexiones', 'Empieza fuerte.'],
        ['Peso muerto rumano', 'Cadencia viva.'],
        ['Bicycle abs', 'No pares.'],
        ['Remo con mancuernas', 'Tira fuerte.'],
        ['Puente de glúteo', 'Aprieta arriba.'],
        ['Press de hombros', 'Último empujón.']
      ]
    }
  ];

  const BIKE = [
    {
      name: 'BICI 12 · No negociable',
      subtitle: '12 min · para días sin ganas',
      blocks: [
        [180, 'Fácil', 'Calienta y mueve las piernas.'],
        [360, 'Medio', 'Ritmo cómodo pero constante.'],
        [60, 'Medio-duro', 'Aprieta un minuto.'],
        [120, 'Fácil', 'Suelta piernas y termina.']
      ]
    },
    {
      name: 'BICI 20 · Base',
      subtitle: '20 min · rodaje sencillo',
      blocks: [
        [300, 'Fácil', 'Calentamiento.'],
        [600, 'Medio', 'Ritmo estable y sostenible.'],
        [180, 'Medio-duro', 'Aprieta sin levantarte del sillín.'],
        [120, 'Fácil', 'Vuelta a la calma.']
      ]
    },
    {
      name: 'BICI 20 · Intervalos',
      subtitle: '20 min · cambios de ritmo',
      blocks: [
        [300, 'Fácil', 'Calentamiento.'],
        [60, 'Medio-duro', 'Intervalo 1 de 6.'], [60, 'Fácil', 'Recupera.'],
        [60, 'Medio-duro', 'Intervalo 2 de 6.'], [60, 'Fácil', 'Recupera.'],
        [60, 'Medio-duro', 'Intervalo 3 de 6.'], [60, 'Fácil', 'Recupera.'],
        [60, 'Medio-duro', 'Intervalo 4 de 6.'], [60, 'Fácil', 'Recupera.'],
        [60, 'Medio-duro', 'Intervalo 5 de 6.'], [60, 'Fácil', 'Recupera.'],
        [60, 'Medio-duro', 'Intervalo 6 de 6. Último.'], [60, 'Fácil', 'Recupera.'],
        [180, 'Fácil', 'Vuelta a la calma.']
      ]
    },
    {
      name: 'BICI 24 · Pirámide',
      subtitle: '24 min · sube y baja intensidad',
      blocks: [
        [300, 'Fácil', 'Calentamiento.'],
        [60, 'Medio', 'Sube ritmo.'],
        [60, 'Fácil', 'Recupera.'],
        [120, 'Medio', 'Dos minutos constantes.'],
        [60, 'Fácil', 'Recupera.'],
        [180, 'Medio-duro', 'Tres minutos de trabajo.'],
        [120, 'Fácil', 'Recuperación larga.'],
        [120, 'Medio-duro', 'Vuelve a apretar.'],
        [60, 'Fácil', 'Recupera.'],
        [60, 'Duro', 'Pico de la pirámide: un minuto fuerte.'],
        [300, 'Fácil', 'Cinco minutos para soltar piernas.']
      ]
    },
    {
      name: 'BICI 25 · Bloques',
      subtitle: '25 min · bloques variados',
      blocks: [
        [300, 'Fácil', 'Calentamiento.'],
        [300, 'Medio', 'Ritmo sostenido.'],
        [180, 'Fácil', 'Recupera.'],
        [300, 'Medio-duro', 'Bloque fuerte.'],
        [180, 'Fácil', 'Recupera.'],
        [180, 'Medio', 'Último trabajo.'],
        [60, 'Fácil', 'Termina suave.']
      ]
    },
    {
      name: 'BICI 30 · Fondo',
      subtitle: '30 min · resistencia sostenida',
      blocks: [
        [300, 'Fácil', 'Calentamiento.'],
        [1200, 'Medio cómodo', 'Ritmo sostenible.'],
        [180, 'Medio-duro', 'Último empujón.'],
        [120, 'Fácil', 'Vuelta a la calma.']
      ]
    }
  ];

  // Primera biblioteca visual: Full Body A completa.
  // Se incrustan como WebP ligeros para que la actualización siga siendo un solo archivo.
  const EXERCISE_IMAGES = {
    'bicycle-abs': 'data:image/webp;base64,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',
    'elevaciones-piernas': 'data:image/webp;base64,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',
    'flexiones': 'data:image/webp;base64,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',
    'press-hombros': 'data:image/webp;base64,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',
    'puente-gluteo': 'data:image/webp;base64,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',
    'remo-mancuernas': 'data:image/webp;base64,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',
  };

  const IMAGE_KEY = {
    'Flexiones': 'flexiones',
    'Puente de glúteo': 'puente-gluteo',
    'Remo con mancuernas': 'remo-mancuernas',
    'Bicycle abs': 'bicycle-abs',
    'Press de hombros': 'press-hombros',
    'Elevaciones de piernas': 'elevaciones-piernas'
  };

  const $ = (id) => document.getElementById(id);
  const els = {
    library: $('libraryScreen'), player: $('playerScreen'), complete: $('completeScreen'),
    strengthTab: $('strengthTab'), bikeTab: $('bikeTab'), list: $('routineList'), detail: $('routineDetail'),
    roundPicker: $('roundPicker'), duration: $('durationEstimate'), start: $('startBtn'),
    playerRoutine: $('playerRoutine'), playerRound: $('playerRound'), progressText: $('playerProgressText'),
    progress: $('progressBar'), stage: $('stage'), phase: $('phaseLabel'), exercise: $('exerciseName'),
    visual: $('visualCue'), timer: $('timerValue'), coach: $('coachCue'), next: $('nextCue'),
    pause: $('pauseBtn'), skip: $('skipBtn'), quit: $('quitBtn'), back: $('backBtn'),
    completeTitle: $('completeTitle'), completeSummary: $('completeSummary'),
    install: $('installBtn'), voiceNotice: $('voiceNotice')
  };

  let mode = 'strength';
  let selectedIndex = 0;
  let rounds = Number(localStorage.getItem('hmb-rounds')) || 2;
  if (![1, 2, 3].includes(rounds)) rounds = 2;

  let sequence = [];
  let timeline = [];
  let stepIndex = -1;
  let timerId = null;
  let paused = false;
  let workoutStartedAt = 0;
  let pauseStartedAt = 0;
  let pausedTotalMs = 0;
  let skipOffsetMs = 0;
  let audioContext = null;
  let selectedVoice = null;
  let wakeLock = null;
  let deferredInstallPrompt = null;
  let lastAnnouncedSecond = null;
  let workoutFinished = false;
  let pendingReload = false;

  const sets = () => mode === 'strength' ? STRENGTH : BIKE;
  const currentRoutine = () => sets()[selectedIndex];

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}:${String(s).padStart(2, '0')}` : String(s);
  }

  function strengthDurationSeconds(routine, count) {
    const n = routine.exercises.length * count;
    return 3 + (n * 30) + (Math.max(0, n - 1) * 10);
  }

  function updateDuration() {
    if (mode !== 'strength') return;
    const total = strengthDurationSeconds(currentRoutine(), rounds);
    const min = Math.floor(total / 60);
    const sec = total % 60;
    els.duration.textContent = `≈ ${min}:${String(sec).padStart(2, '0')}`;
  }

  function renderLibrary() {
    els.list.innerHTML = '';
    sets().forEach((routine, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `routine-card${index === selectedIndex ? ' selected' : ''}`;
      button.setAttribute('aria-pressed', index === selectedIndex ? 'true' : 'false');
      const title = document.createElement('strong');
      const sub = document.createElement('span');
      title.textContent = routine.name;
      sub.textContent = routine.subtitle;
      button.append(title, sub);
      button.addEventListener('click', () => { selectedIndex = index; renderLibrary(); });
      els.list.appendChild(button);
    });

    const routine = currentRoutine();
    if (mode === 'strength') {
      const chips = routine.exercises.map(([name]) => `<span class="exercise-chip">${name}</span>`).join('');
      const visualCount = routine.exercises.filter(([name]) => IMAGE_KEY[name]).length;
      const visualNote = visualCount === routine.exercises.length
        ? '<p class="visual-ready">✨ Esta rutina ya tiene guía visual completa.</p>'
        : '';
      els.detail.innerHTML = `<strong>${routine.name}</strong><p>30 s de trabajo · 10 s de descanso. Intensidad alta, siempre con técnica limpia.</p>${visualNote}<div class="exercise-preview">${chips}</div>`;
      els.roundPicker.hidden = false;
      updateRoundButtons();
      updateDuration();
    } else {
      const total = routine.blocks.reduce((sum, block) => sum + block[0], 0);
      els.detail.innerHTML = `<strong>${routine.name}</strong><p>${Math.round(total / 60)} minutos guiados. La voz anuncia cada cambio de intensidad y la pantalla muestra lo que toca.</p>`;
      els.roundPicker.hidden = true;
    }
  }

  function updateRoundButtons() {
    document.querySelectorAll('[data-rounds]').forEach((button) => {
      button.classList.toggle('active', Number(button.dataset.rounds) === rounds);
    });
  }

  function setMode(nextMode) {
    mode = nextMode;
    selectedIndex = 0;
    els.strengthTab.classList.toggle('active', mode === 'strength');
    els.bikeTab.classList.toggle('active', mode === 'bike');
    renderLibrary();
  }

  function buildStrengthSequence(routine) {
    const steps = [{ type: 'prep', duration: 3, name: routine.exercises[0][0], cue: 'Prepárate.' }];
    let ordinal = 0;
    const totalWork = routine.exercises.length * rounds;

    for (let round = 1; round <= rounds; round++) {
      routine.exercises.forEach(([name, cue], exerciseIndex) => {
        ordinal += 1;
        steps.push({ type: 'work', duration: 30, name, cue, round, ordinal, totalWork });
        if (ordinal < totalWork) {
          const nextExerciseIndex = (exerciseIndex + 1) % routine.exercises.length;
          const nextName = routine.exercises[nextExerciseIndex][0];
          steps.push({ type: 'rest', duration: 10, name: 'Descanso', cue: `Siguiente: ${nextName}`, nextName, round });
        }
      });
    }
    return steps;
  }

  function buildBikeSequence(routine) {
    return routine.blocks.map(([duration, intensity, cue], index) => ({
      type: 'bike', duration, name: intensity, cue, block: index + 1, totalBlocks: routine.blocks.length
    }));
  }

  function buildTimeline() {
    let cursor = 0;
    timeline = sequence.map((step) => {
      const startMs = cursor;
      cursor += step.duration * 1000;
      return { startMs, endMs: cursor };
    });
  }

  function stopTimer() {
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function ensureAudio() {
    try {
      if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
      if (audioContext.state === 'suspended') audioContext.resume();
    } catch (_) {}
  }

  function beep(frequency = 900, duration = 0.09, volume = 0.12) {
    try {
      ensureAudio();
      if (!audioContext) return;
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(volume, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration);
    } catch (_) {}
  }

  function pickVoice() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    selectedVoice = voices.find((v) => /^es[-_]/i.test(v.lang) && /Google|Microsoft/i.test(v.name))
      || voices.find((v) => /^es[-_]/i.test(v.lang))
      || null;
  }

  function speak(text, { interrupt = false, rate = 1 } = {}) {
    if (!('speechSynthesis' in window)) return false;
    try {
      pickVoice();
      if (interrupt) window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = rate;
      utterance.volume = 1;
      if (selectedVoice) utterance.voice = selectedVoice;
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (_) {
      return false;
    }
  }

  function announceCountdown(second) {
    if (lastAnnouncedSecond === second) return;
    lastAnnouncedSecond = second;
    beep(second === 1 ? 980 : 760, 0.08, 0.1);
    speak(String(second), { interrupt: true, rate: 1.08 });
  }

  function announceStep(step) {
    lastAnnouncedSecond = null;
    if (step.type === 'prep') {
      speak(`Prepárate. Primer ejercicio: ${step.name}.`, { interrupt: true, rate: 0.96 });
    } else if (step.type === 'rest') {
      speak(`Descanso. Siguiente: ${step.nextName}.`, { interrupt: true, rate: 0.98 });
    } else if (step.type === 'bike') {
      speak(`${step.name}. ${step.cue}`, { interrupt: true, rate: 0.96 });
    }
  }

  function imageForExercise(name) {
    const key = IMAGE_KEY[name];
    return key ? EXERCISE_IMAGES[key] : null;
  }

  function visualExerciseName(step) {
    if (step.type === 'rest') return step.nextName;
    if (step.type === 'work' || step.type === 'prep') return step.name;
    return null;
  }

  function renderVisual(step) {
    const visualName = visualExerciseName(step);
    const src = visualName ? imageForExercise(visualName) : null;
    if (src) {
      els.visual.classList.add('has-image');
      els.visual.innerHTML = `<img src="${src}" alt="" draggable="false">`;
      return;
    }
    els.visual.classList.remove('has-image');
    els.visual.textContent = step.type === 'work' ? '🔥' : step.type === 'rest' ? '💨' : step.type === 'bike' ? '🚲' : '⚡';
  }

  function nextDescription() {
    const next = sequence[stepIndex + 1];
    if (!next) return 'Último bloque';
    if (next.type === 'work') return `Después: ${next.name}`;
    if (next.type === 'rest') return next.cue;
    if (next.type === 'bike') return `Después: ${next.name}`;
    return '';
  }

  function renderStepUI({ announce = true, transition = false } = {}) {
    if (stepIndex < 0 || stepIndex >= sequence.length) return;
    const step = sequence[stepIndex];

    if (transition) beep(step.type === 'work' ? 1120 : 980, 0.15, 0.14);

    els.playerRoutine.textContent = currentRoutine().name;
    els.stage.dataset.phase = step.type;
    els.phase.textContent = step.type === 'work' ? 'TRABAJO' : step.type === 'rest' ? 'DESCANSO' : step.type === 'bike' ? 'BICI' : 'PREPÁRATE';
    els.exercise.textContent = step.type === 'rest' ? step.nextName : step.name;
    renderVisual(step);
    els.coach.textContent = step.type === 'work' ? `${step.cue} · A TOPE.` : step.cue;
    els.next.textContent = nextDescription();

    if (step.type === 'work') {
      els.playerRound.textContent = `Ronda ${step.round} de ${rounds}`;
      els.progressText.textContent = `${step.ordinal} / ${step.totalWork}`;
      els.progress.style.width = `${((step.ordinal - 1) / step.totalWork) * 100}%`;
    } else if (step.type === 'bike') {
      els.playerRound.textContent = `Bloque ${step.block} de ${step.totalBlocks}`;
      els.progressText.textContent = `${step.block} / ${step.totalBlocks}`;
      els.progress.style.width = `${((step.block - 1) / step.totalBlocks) * 100}%`;
    } else {
      els.playerRound.textContent = step.type === 'prep' ? 'Empieza en…' : 'Recupera';
    }

    if (announce) announceStep(step);
  }

  function activeElapsedMs(now = Date.now()) {
    const clockNow = paused ? pauseStartedAt : now;
    return Math.max(0, clockNow - workoutStartedAt - pausedTotalMs + skipOffsetMs);
  }

  function locateStep(elapsedMs) {
    for (let i = 0; i < timeline.length; i++) {
      if (elapsedMs < timeline[i].endMs) return i;
    }
    return -1;
  }

  function syncPlayback({ announceTransition = true } = {}) {
    if (workoutFinished || !sequence.length) return;

    const elapsed = activeElapsedMs();
    const located = locateStep(elapsed);
    if (located === -1) {
      finishWorkout();
      return;
    }

    if (located !== stepIndex) {
      const hadStep = stepIndex >= 0;
      stepIndex = located;
      lastAnnouncedSecond = null;
      renderStepUI({
        announce: announceTransition && document.visibilityState === 'visible',
        transition: hadStep && document.visibilityState === 'visible'
      });
    }

    const remainingMs = Math.max(0, timeline[stepIndex].endMs - elapsed);
    const remainingSeconds = Math.ceil(remainingMs / 1000);
    els.timer.textContent = formatTime(remainingSeconds);

    const step = sequence[stepIndex];
    if (!paused && document.visibilityState === 'visible') {
      if ((step.type === 'prep' || step.type === 'rest') && remainingSeconds >= 1 && remainingSeconds <= 3) {
        announceCountdown(remainingSeconds);
      }
      if (step.type === 'bike' && remainingSeconds >= 1 && remainingSeconds <= 3 && lastAnnouncedSecond !== remainingSeconds) {
        lastAnnouncedSecond = remainingSeconds;
        beep(remainingSeconds === 1 ? 980 : 700, 0.06, 0.08);
      }
    }
  }

  async function requestWakeLock() {
    try {
      if ('wakeLock' in navigator && (!wakeLock || wakeLock.released)) {
        wakeLock = await navigator.wakeLock.request('screen');
      }
    } catch (_) {}
  }

  function releaseWakeLock() {
    if (wakeLock) {
      wakeLock.release().catch(() => {});
      wakeLock = null;
    }
  }

  function startWorkout() {
    ensureAudio();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();
    }
    requestWakeLock();

    sequence = mode === 'strength' ? buildStrengthSequence(currentRoutine()) : buildBikeSequence(currentRoutine());
    buildTimeline();
    stepIndex = -1;
    workoutStartedAt = Date.now();
    pauseStartedAt = 0;
    pausedTotalMs = 0;
    skipOffsetMs = 0;
    paused = false;
    workoutFinished = false;
    lastAnnouncedSecond = null;

    els.library.hidden = true;
    els.complete.hidden = true;
    els.player.hidden = false;
    els.pause.textContent = 'PAUSA';

    syncPlayback({ announceTransition: true });
    timerId = setInterval(() => syncPlayback({ announceTransition: true }), 250);
  }

  function finishWorkout() {
    if (workoutFinished) return;
    workoutFinished = true;
    stopTimer();
    releaseWakeLock();
    els.progress.style.width = '100%';
    beep(1250, 0.18, 0.14);
    setTimeout(() => beep(1450, 0.2, 0.14), 190);
    speak('Entrenamiento terminado.', { interrupt: true, rate: 0.95 });
    els.player.hidden = true;
    els.complete.hidden = false;
    els.completeTitle.textContent = 'Hecho.';
    els.completeSummary.textContent = `Has terminado ${currentRoutine().name}${mode === 'strength' ? ` · ${rounds} ronda${rounds === 1 ? '' : 's'}` : ''}.`;
  }

  function quitWorkout() {
    stopTimer();
    releaseWakeLock();
    workoutFinished = true;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    els.player.hidden = true;
    els.complete.hidden = true;
    els.library.hidden = false;
    if (pendingReload) window.location.reload();
  }

  function togglePause() {
    if (!paused) {
      paused = true;
      pauseStartedAt = Date.now();
      els.pause.textContent = 'SEGUIR';
      if ('speechSynthesis' in window) window.speechSynthesis.pause();
      return;
    }

    pausedTotalMs += Date.now() - pauseStartedAt;
    pauseStartedAt = 0;
    paused = false;
    els.pause.textContent = 'PAUSA';
    if ('speechSynthesis' in window) window.speechSynthesis.resume();
    requestWakeLock();
    syncPlayback({ announceTransition: false });
  }

  function skipStep() {
    if (workoutFinished || stepIndex < 0) return;
    const elapsed = activeElapsedMs();
    const remaining = Math.max(0, timeline[stepIndex].endMs - elapsed);
    skipOffsetMs += remaining + 1;
    beep(1050, 0.1, 0.1);
    syncPlayback({ announceTransition: true });
  }

  els.strengthTab.addEventListener('click', () => setMode('strength'));
  els.bikeTab.addEventListener('click', () => setMode('bike'));

  document.querySelectorAll('[data-rounds]').forEach((button) => {
    button.addEventListener('click', () => {
      rounds = Number(button.dataset.rounds);
      localStorage.setItem('hmb-rounds', String(rounds));
      updateRoundButtons();
      updateDuration();
    });
  });

  els.start.addEventListener('click', startWorkout);
  els.pause.addEventListener('click', togglePause);
  els.skip.addEventListener('click', skipStep);
  els.quit.addEventListener('click', quitWorkout);
  els.back.addEventListener('click', () => {
    els.complete.hidden = true;
    els.library.hidden = false;
    if (pendingReload) window.location.reload();
  });

  if ('speechSynthesis' in window) {
    pickVoice();
    window.speechSynthesis.onvoiceschanged = pickVoice;
  } else {
    els.voiceNotice.hidden = false;
    els.voiceNotice.textContent = 'Este navegador no ofrece voz; los avisos sonoros seguirán funcionando.';
  }

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    els.install.hidden = false;
  });

  els.install.addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    els.install.hidden = true;
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && !els.player.hidden && !paused) {
      requestWakeLock();
      syncPlayback({ announceTransition: true });
    }
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('./service-worker.js', { updateViaCache: 'none' });
        registration.update().catch(() => {});
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (!els.player.hidden) {
            pendingReload = true;
            return;
          }
          window.location.reload();
        });
      } catch (_) {}
    });
  }

  // Precarga los WebP incrustados para que al arrancar el ejercicio no haya parpadeo.
  Object.values(EXERCISE_IMAGES).forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  renderLibrary();
})();
