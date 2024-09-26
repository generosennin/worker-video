let offscreenCanvas:OffscreenCanvas|undefined
let context:OffscreenCanvasRenderingContext2D|null
let width = 0
let height = 0
self.addEventListener('message', async(event) => {
    if(event.data.type === 'init'){
        offscreenCanvas = event.data.canvas;
        if(!offscreenCanvas){
            console.error('canvas not found')
            return
        }
        context = offscreenCanvas.getContext('2d')
        width = event.data.width
        height = event.data.height
    }
    else if(event.data.type === 'video'){
        const videoFrame = event.data.frame as VideoFrame
        context?.drawImage(videoFrame, 0, 0, 480, 320)
        videoFrame.close()
    }

})
export default{}