import { useEffect } from "react";
import { LOADER_CONFIG } from "@/config/loader";
import { BootVideo } from "@/components/loaders/BootVideo";
import { LoadingOverlay } from "@/components/loaders/LoadingOverlay";
import { MiniLoader } from "@/components/loaders/MiniLoader";
import { useLoader } from "@/components/loaders/LoaderProvider";

export function GlobalLoader() {
  const {
    isAppReady,
    isInitialBoot,
    isLoaderVisible,
    progress,
    status,
    completeBootVideo,
    reportLoadingProgress,
  } = useLoader();

  useEffect(() => {
    if (!isInitialBoot) return;
    reportLoadingProgress("boot-video", 0);
  }, [isInitialBoot, reportLoadingProgress]);

  if (!isLoaderVisible) return null;

  if (!isInitialBoot) {
    return <MiniLoader />;
  }

  return (
    <div
      className={`global-loader ${isAppReady ? "global-loader--fading" : ""}`}
      style={{ transitionDuration: `${LOADER_CONFIG.revealDurationMs}ms` }}
    >
      <BootVideo
        active={isInitialBoot && !isAppReady}
        onProgress={(nextProgress) =>
          reportLoadingProgress("boot-video", nextProgress)
        }
        onComplete={completeBootVideo}
      />
      <LoadingOverlay progress={progress} status={status} />
    </div>
  );
}