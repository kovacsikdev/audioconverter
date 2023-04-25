import { Component, Accessor, createSignal, createEffect } from "solid-js";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import "./ConvertAudio.scss";

export type ConvertAudioProps = {
  mimeType: string | Accessor<string>;
  file: File | undefined;
};

/**
 * ConvertAudio component
 * @param props
 * @property {string} props.mimeType - The audio file type. Example: mp3
 * @property {File} props.file - The audio file itself
 * @returns HTML elements
 */
export const ConvertAudio: Component<ConvertAudioProps> = (props) => {
  const [progressBar, setProgressBar] = createSignal(0);

  const ffmpeg = createFFmpeg({ log: false });
  const transcode = async () => {
    const mimeType = props.mimeType;
    const audioFile = props.file;

    if (audioFile) {
      const { name } = audioFile;
      setProgressBar(0.1);

      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
      }

      ffmpeg.setProgress(({ ratio }) => {
        /*
         * ratio is a float number between 0 to 1.
         */
        setProgressBar(ratio);
      });

      ffmpeg.FS("writeFile", name, await fetchFile(audioFile))

      await ffmpeg.run("-i", name, `output.${mimeType}`);
      const data = ffmpeg.FS("readFile", `output.${mimeType}`);

      // Assign to preview track
      const audio: any = document.getElementById("track");
      audio.src = URL.createObjectURL(
        new Blob([data.buffer], { type: `audio/${mimeType}` })
      );
    }
  };

  const calculateProgressWidth = () => {
    return progressBar() * 100;
  };

  return (
    <div class="ConvertAudio">
      <div class="file-convert-button">
        <button
          onClick={transcode}
          disabled={!props.file}
        >{`Convert to ${props.mimeType}`}</button>
      </div>
      {progressBar() < 1 && progressBar() > 0 && (
        <div class="file-progress">
          <div style={{ width: `${calculateProgressWidth()}%` }}></div>
        </div>
      )}
      <div
        class="preview"
        style={{ display: `${progressBar() >= 1 ? "block" : "none"}` }}
      >
        <div>Preview (right click to save audio)</div>
        <audio id="track" controls></audio>
      </div>
    </div>
  );
};
