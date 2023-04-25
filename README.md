## Audio Converter

This app was created because I was tired of relying on online audio converters.  Some would be behind a pay wall, only do 30 seconds worth, or require advertisements to work properly.

This is a simple app made in one day using [SolidJS](https://solidjs.com) and [FFMPEG.WASM](https://ffmpegwasm.netlify.app/)

## Run this project locally

### Clone the repo
```bash
$ git clone git@github.com:kovacsikdev/audioconverter.git
```

### Install dependencies
```bash
$ yarn install
```

### Run the app locally
```bash
$ yarn start
```
Local server will be hosted locally here
```
http://localhost:3000/audioconverter/
```

## CI
This project uses Github Actions as the continuous integration / development process. Whenever new changes are made and pushed to the main branch, a Github Action is automatically kicked off. This is to automatically push the changes to the Github Pages branch

You can see the steps being made in the yml file in
```
.github/workflows/main.yml
```
