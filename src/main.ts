import Worker from "./worker?worker"
const HEIGHT = 320
const WIDTH = 480
const main = async() => {
    const worker = new Worker()
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    canvas.width = WIDTH
    canvas.height = HEIGHT
    const offscreenCanvas = canvas.transferControlToOffscreen()
    worker.postMessage({type: 'init', canvas: offscreenCanvas, width: WIDTH, height: HEIGHT}, [offscreenCanvas])

    const mediaStrem = await navigator.mediaDevices.getUserMedia({video: {width: 480, height: 320}})
    const videoTrack = mediaStrem.getVideoTracks()[0]
    const processor = new MediaStreamTrackProcessor({track: videoTrack})
    const reader = processor.readable.getReader()
    while(true){
        const result:ReadableStreamReadResult<VideoFrame> = await reader.read()
        if(result.value){
            worker?.postMessage({type: 'video', frame: result.value}, [result.value])
            result.value.close()
        }
        
    }

}
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('#start')
    startButton?.addEventListener('click', () => {
        main()
    })
})
