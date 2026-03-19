

function LoadingCircle({ width = "40px", height = "40px" }) {
	return (
		<div className="loading-circle-container">
			<svg width={width} height={height} viewBox="0 0 50 50">
				<circle
					cx="25"
					cy="25"
					r="20"
					fill="none"
					stroke="#333"
					strokeWidth="4"
				/>
				<circle
					cx="25"
					cy="25"
					r="20"
					fill="none"
					stroke="#6C63FF"
					strokeWidth="4"
					strokeLinecap="round"
					strokeDasharray="31.4 94.2"
					strokeDashoffset="0"
					transform="rotate(-90 25 25)"
				>
					<animateTransform
						attributeName="transform"
						type="rotate"
						from="0 25 25"
						to="360 25 25"
						dur="1s"
						repeatCount="indefinite"
					/>
				</circle>
			</svg>
		</div>
	);
}

export default LoadingCircle;