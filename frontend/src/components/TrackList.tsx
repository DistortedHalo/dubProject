import { Pause, Play, RefreshCw } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Track } from "../types";

function detectSourceType(url: string): Track["sourceType"] {
  const lowered = url.toLowerCase();
  if (lowered.includes("soundcloud.com")) return "soundcloud";
  if (lowered.includes("spotify.com")) return "spotify";
  if (lowered.includes("youtube.com") || lowered.includes("youtu.be")) return "youtube";
  const audioLike = /\.(mp3|wav|ogg|m4a|aac)(\?|#|$)/i.test(lowered) || lowered.includes("/uploads/");
  return audioLike ? "audio" : "embed";
}

function toEmbedUrl(url: string, sourceType: Track["sourceType"]) {
  if (sourceType === "soundcloud") {
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&visual=false`;
  }
  if (sourceType === "spotify") {
    if (url.includes("/embed/")) return url;
    return url.replace("open.spotify.com/", "open.spotify.com/embed/");
  }
  if (sourceType === "youtube") {
    try {
      const parsed = new URL(url);
      let videoId = "";
      if (parsed.hostname.includes("youtu.be")) {
        videoId = parsed.pathname.replace("/", "");
      } else {
        videoId = parsed.searchParams.get("v") || "";
      }
      if (!videoId) return url;
      return `https://www.youtube.com/embed/${videoId}`;
    } catch {
      return url;
    }
  }
  return url;
}

function WaveformCanvas({
  audioUrl,
  active,
  progress,
  onSeek,
}: {
  audioUrl: string;
  active: boolean;
  progress: number;
  onSeek: (nextProgress: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const amplitudesRef = useRef<number[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function draw() {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const cssWidth = canvas.clientWidth || 900;
      const cssHeight = canvas.clientHeight || 58;
      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const fillBase = () => {
        ctx.clearRect(0, 0, cssWidth, cssHeight);
        ctx.fillStyle = "rgba(255,255,255,0.03)";
        ctx.fillRect(0, 0, cssWidth, cssHeight);
      };

      const renderBars = () => {
        fillBase();
        const amps = amplitudesRef.current;
        if (!amps.length) return;

        const max = Math.max(...amps, 0.0001);
        const barWidth = cssWidth / amps.length;
        const progressX = Math.max(0, Math.min(cssWidth, cssWidth * progress));

        amps.forEach((amp, i) => {
          const norm = amp / max;
          const h = Math.max(3, norm * (cssHeight - 6));
          const x = i * barWidth;
          const y = (cssHeight - h) / 2;
          const barCenter = x + barWidth * 0.5;
          ctx.fillStyle = barCenter <= progressX
            ? "rgba(255,255,255,0.98)"
            : active
              ? "rgba(255,255,255,0.58)"
              : "rgba(255,255,255,0.34)";
          ctx.fillRect(x + 0.8, y, Math.max(1.2, barWidth - 1.6), h);
        });

        ctx.fillStyle = "rgba(123,63,182,0.9)";
        ctx.fillRect(Math.max(0, progressX - 1), 0, 2, cssHeight);
      };

      fillBase();

      try {
        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioCtx();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer.slice(0));
        const left = audioBuffer.getChannelData(0);
        const right = audioBuffer.numberOfChannels > 1 ? audioBuffer.getChannelData(1) : left;

        const data = new Float32Array(left.length);
        for (let i = 0; i < left.length; i++) {
          data[i] = (left[i] + right[i]) * 0.5;
        }

        const samples = 160;
        const blockSize = Math.max(1, Math.floor(data.length / samples));
        const amps: number[] = [];

        for (let i = 0; i < samples; i++) {
          const start = i * blockSize;
          const end = Math.min(start + blockSize, data.length);
          let sumSquares = 0;
          let peak = 0;

          for (let j = start; j < end; j++) {
            const v = data[j];
            const abs = Math.abs(v);
            sumSquares += v * v;
            if (abs > peak) peak = abs;
          }

          const length = Math.max(1, end - start);
          const rms = Math.sqrt(sumSquares / length);
          amps.push(rms * 0.8 + peak * 0.2);
        }

        amplitudesRef.current = amps;
        if (cancelled) return;
        renderBars();
        audioContext.close();
      } catch {
        amplitudesRef.current = Array.from({ length: 110 }, (_, index) => 0.2 + Math.abs(Math.sin(index * 0.18)) * 0.8);
        if (!cancelled) renderBars();
      }
    }

    draw();
    return () => {
      cancelled = true;
    };
  }, [audioUrl]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx || amplitudesRef.current.length === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const cssWidth = canvas.clientWidth || 900;
    const cssHeight = canvas.clientHeight || 58;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssWidth, cssHeight);
    ctx.fillStyle = "rgba(255,255,255,0.03)";
    ctx.fillRect(0, 0, cssWidth, cssHeight);

    const amps = amplitudesRef.current;
    const max = Math.max(...amps, 0.0001);
    const barWidth = cssWidth / amps.length;
    const progressX = Math.max(0, Math.min(cssWidth, cssWidth * progress));

    amps.forEach((amp, i) => {
      const norm = amp / max;
      const h = Math.max(3, norm * (cssHeight - 6));
      const x = i * barWidth;
      const y = (cssHeight - h) / 2;
      const barCenter = x + barWidth * 0.5;
      ctx.fillStyle = barCenter <= progressX
        ? "rgba(255,255,255,0.98)"
        : active
          ? "rgba(255,255,255,0.58)"
          : "rgba(255,255,255,0.34)";
      ctx.fillRect(x + 0.8, y, Math.max(1.2, barWidth - 1.6), h);
    });

    ctx.fillStyle = "rgba(123,63,182,0.9)";
    ctx.fillRect(Math.max(0, progressX - 1), 0, 2, cssHeight);
  }, [progress, active]);

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const nextProgress = (event.clientX - rect.left) / rect.width;
    onSeek(Math.max(0, Math.min(1, nextProgress)));
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      className="h-[58px] w-full cursor-pointer border border-white/8 bg-white/[0.02]"
      title="Click waveform to jump through the song"
    />
  );
}

export function TrackList() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeEmbedId, setActiveEmbedId] = useState<string | null>(null);
  const [progressById, setProgressById] = useState<Record<string, number>>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);

  async function loadTracks() {
  try {
    setLoading(true);

    const API_BASE = "https://dubproject-production.up.railway.app";

    const res = await fetch(`${API_BASE}/api/tracks`);

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to load tracks: ${res.status} ${text}`);
    }

    const data = await res.json();

    const normalized: Track[] = data.map((track: Track) => {
      const sourceType = track.sourceType || detectSourceType(track.audioUrl);
      return {
        ...track,
        sourceType,
        waveformSource: sourceType === "audio" ? track.audioUrl : undefined,
      };
    });

    setTracks(normalized);
  } catch (error) {
    console.error("Failed to load tracks", error);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    loadTracks();
  }, []);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setActiveId(null);
  };

  const bindAudioEvents = (audio: HTMLAudioElement, trackId: string) => {
    audio.ontimeupdate = () => {
      const nextProgress = audio.duration ? audio.currentTime / audio.duration : 0;
      setProgressById((current) => ({ ...current, [trackId]: nextProgress }));
    };
    audio.onended = () => {
      setActiveId(null);
      setProgressById((current) => ({ ...current, [trackId]: 1 }));
    };
  };

  const toggleTrack = async (track: Track) => {
    if (track.sourceType !== "audio") {
      stopAudio();
      setActiveEmbedId((current) => (current === track.id ? null : track.id));
      return;
    }

    setActiveEmbedId(null);

    if (!audioRef.current) {
      const nextAudio = new Audio(track.audioUrl);
      audioRef.current = nextAudio;
      bindAudioEvents(nextAudio, track.id);
      await nextAudio.play();
      setActiveId(track.id);
      return;
    }

    if (activeId === track.id) {
      if (audioRef.current.paused) {
        await audioRef.current.play();
        setActiveId(track.id);
      } else {
        audioRef.current.pause();
        setActiveId(null);
      }
      return;
    }

    audioRef.current.pause();
    const nextAudio = new Audio(track.audioUrl);
    audioRef.current = nextAudio;
    bindAudioEvents(nextAudio, track.id);
    await nextAudio.play();
    setActiveId(track.id);
  };

  const handleSeek = async (track: Track, nextProgress: number) => {
    if (track.sourceType !== "audio") return;

    setProgressById((current) => ({ ...current, [track.id]: nextProgress }));

    if (!audioRef.current || activeId !== track.id) {
      const nextAudio = new Audio(track.audioUrl);
      audioRef.current = nextAudio;
      bindAudioEvents(nextAudio, track.id);
      nextAudio.addEventListener(
        "loadedmetadata",
        async () => {
          nextAudio.currentTime = (nextAudio.duration || 0) * nextProgress;
          await nextAudio.play();
          setActiveId(track.id);
        },
        { once: true }
      );
      return;
    }

    const currentAudio = audioRef.current;
    if (currentAudio.duration) {
      currentAudio.currentTime = currentAudio.duration * nextProgress;
    } else {
      currentAudio.addEventListener(
        "loadedmetadata",
        () => {
          currentAudio.currentTime = currentAudio.duration * nextProgress;
        },
        { once: true }
      );
    }
  };

  return (
    <div className="border border-white/10 bg-white/[0.02]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 md:px-6">
        <div className="text-sm uppercase tracking-[0.22em] text-white/40">Backend powered tracks</div>
        <button
          type="button"
          onClick={loadTracks}
          className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="p-8 text-white/50">Loading tracks...</div>
      ) : (
        <div className="song-list-scroll">
          {tracks.map((track) => {
            const isPlaying = activeId === track.id || activeEmbedId === track.id;
            const isExternal = track.sourceType !== "audio";
            const title = track.trackName || track.code;
            const progress = progressById[track.id] ?? 0;

            return (
              <div key={track.id} className="border-b border-white/10 px-4 py-5 last:border-b-0 md:px-6">
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 md:grid-cols-[auto_1fr_auto_auto_auto]">
                  <button
                    type="button"
                    onClick={() => toggleTrack(track)}
                    className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-white/80 transition hover:bg-white hover:text-black"
                    aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>

                  <div>
                    <div className="font-mono text-lg uppercase tracking-tight text-white md:text-2xl">{title}</div>
                    <div className="mt-1 text-sm text-white/40">{track.artist}</div>
                  </div>

                  <div className="hidden text-sm text-white/35 md:block">{track.mood ?? ""}</div>
                  <div className="hidden text-sm text-white/35 md:block">{track.bpm ? `${track.bpm} BPM` : ""}</div>
                  <div className="text-sm text-white/30">{track.duration}</div>
                </div>

                <div className="mt-4">
                  {track.waveformSource ? (
                    <WaveformCanvas
                      audioUrl={track.waveformSource}
                      active={activeId === track.id}
                      progress={progress}
                      onSeek={(nextProgress) => handleSeek(track, nextProgress)}
                    />
                  ) : (
                    <div className="flex h-[58px] items-center justify-between border border-white/8 bg-white/[0.02] px-4 text-xs uppercase tracking-[0.2em] text-white/40">
                      <span>
                        {track.sourceType === "soundcloud" ? "SoundCloud" : track.sourceType === "spotify" ? "Spotify" : track.sourceType === "youtube" ? "YouTube" : "External"} source
                      </span>
                      <span>Waveform unavailable for embeds</span>
                    </div>
                  )}
                </div>

                {isExternal && activeEmbedId === track.id ? (
                  <div className="mt-4 overflow-hidden border border-white/10 bg-black">
                    <iframe
                      title={`${title} player`}
                      src={toEmbedUrl(track.audioUrl, track.sourceType)}
                      className="h-[166px] w-full"
                      allow="autoplay; encrypted-media; picture-in-picture"
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
