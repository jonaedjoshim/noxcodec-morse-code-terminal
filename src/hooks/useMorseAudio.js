import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_WPM = 15;
const MIN_WPM = 5;
const MAX_WPM = 30;
const TONE_FREQUENCY = 600;
const MAX_SYMBOLS = 1500;

export function useMorseAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSignalActive, setIsSignalActive] = useState(false);
  const [speed, setSpeed] = useState(DEFAULT_WPM);
  const [error, setError] = useState("");

  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const timersRef = useRef([]);
  const playbackIdRef = useRef(0);

  const stop = useCallback(() => {
    playbackIdRef.current += 1;

    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    oscillatorsRef.current.forEach((oscillator) => {
      try {
        oscillator.stop();
      } catch {
        // Oscillator may already have stopped.
      }
    });

    oscillatorsRef.current = [];

    const context = audioContextRef.current;
    audioContextRef.current = null;

    if (context && context.state !== "closed") {
      context.close().catch(() => {});
    }

    setIsPlaying(false);
    setIsSignalActive(false);
  }, []);

  const play = useCallback(
    async (morse) => {
      if (!morse?.trim()) {
        setError("No Morse signal available.");
        return;
      }

      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

      if (!AudioContextClass) {
        setError("Web Audio API is not supported by this browser.");
        return;
      }

      stop();
      setError("");

      const playbackId = playbackIdRef.current;

      const normalizedMorse = morse
        .replace(/[·•]/g, ".")
        .replace(/[—–−]/g, "-")
        .trim();

      const tokens = normalizedMorse.split(/\s+/).filter(Boolean);

      const symbolCount = [...normalizedMorse].filter(
        (char) => char === "." || char === "-",
      ).length;

      if (symbolCount === 0) {
        setError("Enter valid Morse dots and dashes.");
        return;
      }

      if (symbolCount > MAX_SYMBOLS) {
        setError("Signal too long. Maximum 1500 Morse symbols.");
        return;
      }

      if (tokens.some((token) => token !== "/" && !/^[.-]+$/.test(token))) {
        setError("Invalid Morse signal. Use dots, dashes, and /.");
        return;
      }

      let context;

      try {
        context = new AudioContextClass();
        audioContextRef.current = context;

        await context.resume();

        if (playbackId !== playbackIdRef.current) {
          if (context.state !== "closed") {
            await context.close().catch(() => {});
          }
          return;
        }

        const unit = 1.2 / speed;
        const startTime = context.currentTime + 0.08;

        let position = 0;

        const scheduleSignal = (duration) => {
          const signalStart = startTime + position;
          const signalEnd = signalStart + duration;

          const oscillator = context.createOscillator();
          const gain = context.createGain();

          oscillator.type = "sine";
          oscillator.frequency.value = TONE_FREQUENCY;

          gain.gain.setValueAtTime(0, signalStart);
          gain.gain.linearRampToValueAtTime(0.18, signalStart + 0.005);

          gain.gain.setValueAtTime(
            0.18,
            Math.max(signalStart + 0.005, signalEnd - 0.005),
          );

          gain.gain.linearRampToValueAtTime(0, signalEnd);

          oscillator.connect(gain);
          gain.connect(context.destination);

          oscillator.start(signalStart);
          oscillator.stop(signalEnd + 0.01);

          oscillatorsRef.current.push(oscillator);

          const onTimer = setTimeout(
            () => {
              if (playbackId === playbackIdRef.current) {
                setIsSignalActive(true);
              }
            },
            Math.max(0, (signalStart - context.currentTime) * 1000),
          );

          const offTimer = setTimeout(
            () => {
              if (playbackId === playbackIdRef.current) {
                setIsSignalActive(false);
              }
            },
            Math.max(0, (signalEnd - context.currentTime) * 1000),
          );

          timersRef.current.push(onTimer, offTimer);

          position += duration;
        };

        tokens.forEach((token, tokenIndex) => {
          if (token === "/") return;

          [...token].forEach((symbol, symbolIndex) => {
            const duration = symbol === "." ? unit : unit * 3;

            scheduleSignal(duration);

            if (symbolIndex < token.length - 1) {
              position += unit;
            }
          });

          const nextToken = tokens[tokenIndex + 1];

          if (nextToken === "/") {
            position += unit * 7;
          } else if (nextToken) {
            position += unit * 3;
          }
        });

        setIsPlaying(true);

        const endTimer = setTimeout(
          () => {
            if (playbackId === playbackIdRef.current) {
              stop();
            }
          },
          (position + 0.2) * 1000,
        );

        timersRef.current.push(endTimer);
      } catch (err) {
        console.error("[NOXCODEC] Audio playback error:", err);

        if (playbackId === playbackIdRef.current) {
          stop();
          setError("Unable to play Morse audio.");
        } else if (context && context.state !== "closed") {
          context.close().catch(() => {});
        }
      }
    },
    [speed, stop],
  );

  useEffect(() => {
    return () => {
      playbackIdRef.current += 1;

      timersRef.current.forEach(clearTimeout);

      oscillatorsRef.current.forEach((oscillator) => {
        try {
          oscillator.stop();
        } catch {
          // Already stopped.
        }
      });

      const context = audioContextRef.current;

      if (context && context.state !== "closed") {
        context.close().catch(() => {});
      }
    };
  }, []);

  const changeSpeed = useCallback(
    (value) => {
      const nextSpeed = Number(value);

      if (
        !Number.isFinite(nextSpeed) ||
        nextSpeed < MIN_WPM ||
        nextSpeed > MAX_WPM
      ) {
        return;
      }

      if (isPlaying) {
        stop();
      }

      setSpeed(nextSpeed);
    },
    [isPlaying, stop],
  );

  return {
    isPlaying,
    isSignalActive,
    speed,
    error,
    play,
    stop,
    changeSpeed,
  };
}
