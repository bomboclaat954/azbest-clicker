document.addEventListener("DOMContentLoaded", () => {
	let intervalId: number;
	let score: number = 0;
	let level: number = 1;
	const audio: HTMLAudioElement = document.getElementById(
		"backgroundAudio"
	) as HTMLAudioElement;
	const scoreDisplay: HTMLElement = document.getElementById(
		"scoreDisplay"
	) as HTMLElement;

	const createAzbest = (): void => {
		audio.play();
		const text: HTMLButtonElement = document.createElement("button");
		text.textContent = "azbest";
		text.classList.add("text");
		const startX: number = Math.random() * window.innerWidth;
		const startY: number = Math.random() * window.innerHeight;
		text.style.left = `${startX}px`;
		text.style.top = `${startY}px`;
		document.body.appendChild(text);

		text.addEventListener("click", () => {
			score += 1;
			scoreDisplay.textContent = `Score: ${score}`;
			text.remove();
			updateLevel();
		});

		const moveUp = (): void => {
			const currentTop: number = parseFloat(text.style.top);
			text.style.top = `${currentTop - 1}px`;
			if (currentTop < -text.clientHeight) {
				text.remove();
			} else {
				requestAnimationFrame(moveUp);
			}
		};
		moveUp();
	};

	const updateLevel = (): void => {
		if (score % 10 === 0 && score !== 0) {
			level++;
			document.body.style.backgroundColor = getRandomColorRGBA();
		}
	};

	const getRandomColorRGBA = (): string => {
		const r: number = Math.floor(Math.random() * 256);
		const g: number = Math.floor(Math.random() * 256);
		const b: number = Math.floor(Math.random() * 256);
		const a: string = (0.5).toFixed(2);
		return `rgba(${r}, ${g}, ${b}, ${a})`;
	};

	const startAnimation = (): void => {
		intervalId = window.setInterval(createAzbest, 500);
	};

	const resetAnimation = (): void => {
		audio.currentTime = 0;
		document.querySelectorAll(".text").forEach((text) => text.remove());
		clearInterval(intervalId);
		score = 0;
		scoreDisplay.textContent = `Score: ${score}`;
		startAnimation();
	};

	const mute = (): void => {
		const muteButton: HTMLButtonElement = document.getElementById(
			"muteButton"
		) as HTMLButtonElement;
		if (audio.muted == false) {
			muteButton.textContent = "Unmute";
			audio.muted = true;
		} else if (audio.muted == true) {
			muteButton.textContent = "Mute";
			audio.muted = false;
		}
	};

	document
		.getElementById("resetButton")
		?.addEventListener("click", resetAnimation);
	document.getElementById("muteButton")?.addEventListener("click", mute);
	startAnimation();
});
