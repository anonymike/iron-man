import { useEffect, useRef } from "react";
import { LOADER_CONFIG } from "@/config/loader";

type Props = {
  active: boolean;
  onProgress: (progress: number) => void;
  onComplete: () => void;
};

export function BootVideo({ active, onProgress, onComplete }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const completedRef = useRef(false);

  const finishVideo = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onProgress(1);
    onComplete();
  };

  useEffect(() => {
    if (!active) return;
    const video = videoRef.current;
    if (!video) return;
    completedRef.current = false;
    video.currentTime = 0;
    const completionFallback = window.setTimeout(
      finishVideo,
      LOADER_CONFIG.videoDurationMs + LOADER_CONFIG.videoCompletionGraceMs,
    );
    void video.play().catch(() => {
      // Muted autoplay is supported by modern browsers; if it is blocked,
      // the visible overlay remains in place rather than skipping boot.
    });
    return () => window.clearTimeout(completionFallback);
  }, [active]);

  if (!active) return null;

  return (
    <video
      ref={videoRef}
      className="global-loader__video"
      src={LOADER_CONFIG.videoPath}
      autoPlay
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      onTimeUpdate={(event) => {
        const video = event.currentTarget;
        if (video.duration > 0) {
          const progress = video.currentTime / video.duration;
          onProgress(progress);
          if (progress >= 0.985) finishVideo();
        }
      }}
      onLoadedMetadata={(event) => {
        const video = event.currentTarget;
        if (video.duration > 0) onProgress(0);
      }}
      onEnded={finishVideo}
      onError={finishVideo}
    />
  );
}