import { Component, Accessor } from "solid-js";
import "./ChooseFile.scss";

export type ChooseFileProps = {
  updateSelectedMimeType: any;
  selectFile: any;
};

/**
 * ChooseFile component
 * @param props
 * @property props.updateSelectedMimeType - Choose mimetype selection event 
 * @property props.selectFile - Choose file event
 * @returns HTML elements
 */
export const ChooseFile: Component<ChooseFileProps> = (props) => {
  const commonAudioFiles: string[] = ["mp4", "mp3", "wav"];

  return (
    <div class="ChooseFile">
      <div class="file-choose">
        <input type="file" id="file" onChange={props.selectFile} />
        <span></span>
      </div>
      <div class="file-convert-type">
        <div>
          Convert to
          <br />
          <select onChange={props.updateSelectedMimeType}>
            {commonAudioFiles.map((type) => (
              <option value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
