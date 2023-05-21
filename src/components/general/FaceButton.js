import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"
import * as faceapi from "face-api.js"
import { modelsUrl, facesUrl, faceLabels } from "src/config"
import { nullFn } from "src/utils"
import { Button } from "comp"


const FaceAI = ({ onDetect = nullFn }) => {
	const videoRef = useRef();
	const canvasRef = useRef();
	const videoHeight = 120;
	const videoWidth = 160;

	const [dataReady, setDataReady] = useState(false)
	const [labeledData, setLabeledData] = useState(null)
	const [captureVideo, setCaptureVideo] = useState(false);
	const [intervalId, setIntervalId] = useState(null)


	const startVideo = () => {
		setCaptureVideo(true);
		navigator.mediaDevices
			.getUserMedia({ video: { width: 360 } })
			.then(stream => {
				let video = videoRef.current;
				video.srcObject = stream;
				video.play();
			})
			.catch(err => {
				console.error("error:", err);
			});
	}

	useEffect(() => {
		loadModelsAndFaces()
			.then(faces => {
				console.log("data ready")
				setDataReady(true)
				setLabeledData(faces)
			})
		}, [videoRef])

	const handleOnPlay = () => {
		console.log(videoRef.current)
		setIntervalId(setInterval(async () => {
			if(canvasRef && canvasRef.current) {
				canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
				const displaySize = {
					width: videoWidth,
					height: videoHeight
				}

				faceapi.matchDimensions(canvasRef.current, displaySize);

				const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
						.withFaceLandmarks().withFaceDescriptors()
				const resizedDetections = faceapi.resizeResults(detections, displaySize)

				const faceMatcher = new faceapi.FaceMatcher(labeledData, 0.6)
				const results = resizedDetections.map(fd => {
					return faceMatcher.findBestMatch(fd.descriptor)
				})

				results.forEach((bestMatch) => {
					handleDetect(bestMatch._label)
				})
			}
		}, 500))
	}

	const closeWebcam = () => {
		videoRef.current.pause()
		videoRef.current.srcObject.getTracks()[0].stop();
		setCaptureVideo(false)
		clearInterval(intervalId)
	}

	const handleDetect = label => {
		onDetect(label)
	}

	return (
		<Container>
			{dataReady == false ? "Loading..." :
					captureVideo ? <Button onClick={closeWebcam} size="small" width="100px">Stop</Button> :
					<Button onClick={startVideo} size="small" width="200px">Face Recognition</Button>
			}
			<div style={{ display: 'none', }}>
				<video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleOnPlay} style={{ borderRadius: '10px' }} />
				<canvas ref={canvasRef} />
			</div>
		</Container>
	)
}

const loadModelsAndFaces = () => {
		return Promise.all([
			faceapi.nets.tinyFaceDetector.loadFromUri(modelsUrl),
			faceapi.nets.faceLandmark68Net.loadFromUri(modelsUrl),
			faceapi.nets.ssdMobilenetv1.loadFromUri(modelsUrl),
			faceapi.nets.faceRecognitionNet.loadFromUri(modelsUrl),
			faceapi.nets.faceExpressionNet.loadFromUri(modelsUrl),
		])
			.then(() => {
				return Promise.all(
					faceLabels.map(async label => {
						const img = await faceapi.fetchImage(`${facesUrl+label}.png`)
						const fullFaceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
						if(!fullFaceDescription) {
							throw "no facce detectedi"
						}

						const faceDescriptors = [fullFaceDescription.descriptor]
						return new faceapi.LabeledFaceDescriptors(label, faceDescriptors)
					}))
			})
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
`


export default FaceAI


