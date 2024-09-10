document.addEventListener("DOMContentLoaded", () => {
	let intervalId;
	let score = 0;
	let level = 1;
	const audio = document.getElementById("backgroundAudio");
	const createAzbest = () => {
		audio.play();
		const text = document.createElement("button");
		text.textContent = "azbest";
		text.classList.add("text");
		const startX = Math.random() * window.innerWidth;
		const startY = Math.random() * window.innerHeight;
		text.style.left = `${startX}px`;
		text.style.top = `${startY}px`;
		document.body.appendChild(text);

		text.addEventListener("click", () => {
			score += 1;
			scoreDisplay.textContent = `Score: ${score}`;
			text.remove();
			updateLevel();
		});

		const moveUp = () => {
			const currentTop = parseFloat(text.style.top);
			text.style.top = `${currentTop - 1}px`;
			if (currentTop < -text.clientHeight) {
				text.remove();
			} else {
				requestAnimationFrame(moveUp);
			}
		};
		moveUp();
	};

	const updateLevel = () => {
		if (score % 10 === 0 && score !== 0) {
			level++;
			document.body.style.backgroundColor = getRandomColorRGBA();
		}
	};

	const getRandomColorRGBA = () => {
		const r = Math.floor(Math.random() * 256);
		const g = Math.floor(Math.random() * 256);
		const b = Math.floor(Math.random() * 256);
		const a = (0.5).toFixed(2);
		return `rgba(${r}, ${g}, ${b}, ${a})`;
	};

	const startAnimation = () => {
		intervalId = setInterval(createAzbest, 500);
	};

	const resetAnimation = () => {
		audio.currentTime = 0;
		document.querySelectorAll(".text").forEach((text) => text.remove());
		clearInterval(intervalId);
		score = 0;
		scoreDisplay.textContent = `Score: ${score}`;
		startAnimation();
	};

	const mute = () => {
		if (audio.muted == false) {
			document.getElementById("muteButton").textContent = "Unmute";
			audio.muted = true;
		} else if (audio.muted == true) {
			document.getElementById("muteButton").textContent = "Mute";
			audio.muted = false;
		}
	};

	document
		.getElementById("resetButton")
		.addEventListener("click", resetAnimation);
	document.getElementById("muteButton").addEventListener("click", mute);
	startAnimation();
});
