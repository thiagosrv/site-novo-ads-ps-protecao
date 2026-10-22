// Micro-sons do formulário, sintetizados no navegador (Web Audio): sem arquivo para baixar e
// sem atraso. Só tocam depois de um clique do visitante (avançar etapa / enviar), que é quando o
// navegador libera o áudio. Qualquer falha é ignorada: o som nunca pode atrapalhar o formulário.

let ctx: AudioContext | null = null;

function audioContext(): AudioContext | null {
  try {
    if (typeof window === "undefined") return null;
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx ??= new Ctor();
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(c: AudioContext, freq: number, start: number, duration: number, volume: number) {
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  // Ataque rápido e queda suave, para soar como um "plim" e não como um bipe seco.
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain).connect(c.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

function play(notes: Array<[freq: number, offset: number, duration: number]>, volume: number) {
  const c = audioContext();
  if (!c) return;
  try {
    const now = c.currentTime;
    for (const [freq, offset, duration] of notes) tone(c, freq, now + offset, duration, volume);
  } catch {
    // sem som, o formulário segue normalmente
  }
}

/** Etapa validada: dois toques curtos subindo (Mi5 → Sol5). */
export function playStepSound() {
  play(
    [
      [659.25, 0, 0.16],
      [783.99, 0.09, 0.22],
    ],
    0.09
  );
}

/** Pedido enviado: arpejo maior (Dó5 → Mi5 → Sol5 → Dó6), com ar de conquista. */
export function playSuccessSound() {
  play(
    [
      [523.25, 0, 0.18],
      [659.25, 0.08, 0.18],
      [783.99, 0.16, 0.2],
      [1046.5, 0.25, 0.4],
    ],
    0.1
  );
}
