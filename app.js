(() => {
  'use strict';

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
  if (![1,2,3].includes(rounds)) rounds = 2;

  let sequence = [];
  let stepIndex = 0;
  let remaining = 0;
  let timerId = null;
  let paused = false;
  let audioContext = null;
  let selectedVoice = null;
  let wakeLock = null;
  let deferredInstallPrompt = null;
  let lastAnnouncedSecond = null;

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
    els.duration.textContent = `≈ ${min}:${String(sec).padStart(2,'0')}`;
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
      els.detail.innerHTML = `<strong>${routine.name}</strong><p>30 s de trabajo · 10 s de descanso. Intensidad alta, siempre con técnica limpia.</p><div class="exercise-preview">${chips}</div>`;
      els.roundPicker.hidden = false;
      updateRoundButtons();
      updateDuration();
    } else {
      const total = routine.blocks.reduce((sum, block) => sum + block[0], 0);
      els.detail.innerHTML = `<strong>${routine.name}</strong><p>${Math.round(total/60)} minutos guiados. La voz anuncia cada cambio de intensidad y la pantalla muestra lo que toca.</p>`;
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

  function phaseVisual(step) {
    if (step.type === 'work') return '🔥';
    if (step.type === 'rest') return '💨';
    if (step.type === 'bike') return '🚲';
    return '⚡';
  }

  function nextDescription() {
    const next = sequence[stepIndex + 1];
    if (!next) return 'Último bloque';
    if (next.type === 'work') return `Después: ${next.name}`;
    if (next.type === 'rest') return next.cue;
    if (next.type === 'bike') return `Después: ${next.name}`;
    return '';
  }

  function renderStep() {
    stopTimer();
    if (stepIndex >= sequence.length) {
      finishWorkout();
      return;
    }

    const step = sequence[stepIndex];
    remaining = step.duration;
    paused = false;
    lastAnnouncedSecond = null;
    els.pause.textContent = 'PAUSA';
    els.playerRoutine.textContent = currentRoutine().name;
    els.stage.dataset.phase = step.type;
    els.phase.textContent = step.type === 'work' ? 'TRABAJO' : step.type === 'rest' ? 'DESCANSO' : step.type === 'bike' ? 'BICI' : 'PREPÁRATE';
    els.exercise.textContent = step.type === 'rest' ? step.cue.replace('Siguiente: ', '') : step.name;
    els.visual.textContent = phaseVisual(step);
    els.timer.textContent = formatTime(remaining);
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

    announceStep(step);

    timerId = setInterval(() => {
      if (paused) return;
      remaining = Math.max(0, remaining - 1);
      els.timer.textContent = formatTime(remaining);

      if ((step.type === 'prep' || step.type === 'rest') && remaining >= 1 && remaining <= 3) {
        announceCountdown(remaining);
      }

      if (step.type === 'bike' && remaining >= 1 && remaining <= 3) {
        beep(remaining === 1 ? 980 : 700, 0.06, 0.08);
      }

      if (remaining === 0) {
        stopTimer();
        beep(step.type === 'work' ? 1120 : 980, 0.15, 0.14);
        stepIndex += 1;
        setTimeout(renderStep, 130);
      }
    }, 1000);
  }

  async function requestWakeLock() {
    try {
      if ('wakeLock' in navigator) wakeLock = await navigator.wakeLock.request('screen');
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
    stepIndex = 0;
    els.library.hidden = true;
    els.complete.hidden = true;
    els.player.hidden = false;
    renderStep();
  }

  function finishWorkout() {
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
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    els.player.hidden = true;
    els.complete.hidden = true;
    els.library.hidden = false;
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
  els.pause.addEventListener('click', () => {
    paused = !paused;
    els.pause.textContent = paused ? 'SEGUIR' : 'PAUSA';
    if ('speechSynthesis' in window) {
      if (paused) window.speechSynthesis.pause();
      else window.speechSynthesis.resume();
    }
  });
  els.skip.addEventListener('click', () => {
    stopTimer();
    beep(1050, 0.1, 0.1);
    stepIndex += 1;
    renderStep();
  });
  els.quit.addEventListener('click', quitWorkout);
  els.back.addEventListener('click', () => {
    els.complete.hidden = true;
    els.library.hidden = false;
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
    if (document.visibilityState === 'visible' && !els.player.hidden && !paused) requestWakeLock();
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(() => {}));
  }

  renderLibrary();
})();
