import "./ValueLoading.css"


function ValueLoading({ width, height, borderRadius }) {
	return (
		<div
			className="value-loading"
			style={{
				width: width,
				height: height,
				borderRadius: borderRadius
			}}
		></div>
	)
}

export default ValueLoading;