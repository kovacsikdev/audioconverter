import { Component, createSignal } from "solid-js";
import { ConvertAudio } from "./components/ConvertAudio";
import { ChooseFile } from "./components/ChooseFile";
import "./App.scss";

const App: Component = () => {
  const [mimeType, setMimeType] = createSignal<string>("mp4");
  const [audioFile, setAudioFile] = createSignal<File>();

  const updateSelectedMimeType = (event: any) => {
    event.stopPropagation();
    event.preventDefault();

    const selectedMimeType = event.target.value;
    setMimeType(selectedMimeType);
  };

  const selectFile = (event: any) => {
    event.stopPropagation();
    event.preventDefault();

    const file = event.target.files[0];
    setAudioFile(file);
  };

  return (
    <div class="app">
      <div class="title">
        <h2>Simple audio converter</h2>
        <p>Minimal audio converter app done client side. No server required.</p>
        <ol>
          <li>Select an audio file to convert such as a .webm or .wav</li>
          <li>Choose a format to convert to</li>
          <li>Click on the convert button</li>
          <li>Once completed, a preview of the audio file appears</li>
          <li>Use this preview to download your audio file</li>
        </ol>
        <div class="credit">
          Audio conversion made possible by{" "}
          <a target="_blank" href="https://ffmpegwasm.netlify.app/">
            FFMPEG.WASM
          </a>
        </div>
      </div>
      <ChooseFile
        selectFile={selectFile}
        updateSelectedMimeType={updateSelectedMimeType}
      />
      <ConvertAudio mimeType={mimeType()} file={audioFile()} />
    </div>
  );
};

export default App;
