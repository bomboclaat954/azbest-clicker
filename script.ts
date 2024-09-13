document.addEventListener("DOMContentLoaded", () => {
	let intervalId: number;
	let papajEnabled: boolean = false;
	let score: number = 0;
	const muteButton: HTMLButtonElement = document.getElementById(
		"muteButton"
	) as HTMLButtonElement;
	const audio: HTMLAudioElement = document.getElementById(
		"backgroundAudio"
	) as HTMLAudioElement;
	const barka: HTMLAudioElement = document.getElementById(
		"barka"
	) as HTMLAudioElement;
	const scoreDisplay: HTMLElement = document.getElementById(
		"scoreDisplay"
	) as HTMLElement;
	const body: HTMLBodyElement = document.getElementById(
		"body"
	) as HTMLBodyElement;

	barka.pause();

	const createAzbest = (): void => {
		audio.play();
		const azbest: HTMLButtonElement = document.createElement("button");
		azbest.textContent = "azbest";
		azbest.classList.add("azbest");
		const startX: number = Math.random() * window.innerWidth;
		const startY: number = Math.random() * window.innerHeight;
		azbest.style.left = `${startX}px`;
		azbest.style.top = `${startY}px`;
		document.body.appendChild(azbest);

		azbest.addEventListener("click", () => {
			if (papajEnabled == false) {
				score += 1;
				scoreDisplay.textContent = `Score: ${score}`;
				azbest.remove();
				changeColor();
			} else {
				azbest.remove();
			}
		});

		const moveUp = (): void => {
			const currentTop: number = parseFloat(azbest.style.top);
			azbest.style.top = `${currentTop - 1}px`;
			if (currentTop < -azbest.clientHeight) {
				azbest.remove();
			} else {
				requestAnimationFrame(moveUp);
			}
		};
		moveUp();
	};

	const changeColor = (): void => {
		if (score % 10 === 0 && score !== 0) {
			document.body.style.backgroundColor = getRandomColorRGBA();
			if (papajEnabled == false) {
				spawnPapaj();
			}
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
		document.querySelectorAll(".azbest").forEach((azbest) => azbest.remove());
		clearInterval(intervalId);
		score = 0;
		scoreDisplay.textContent = `Score: ${score}`;
		startAnimation();
	};

	const mute = (): void => {
		if (audio.muted == false) {
			muteButton.textContent = "Unmute";
			audio.muted = true;
		} else if (audio.muted == true) {
			muteButton.textContent = "Mute";
			audio.muted = false;
		}
	};

	const img = document.createElement("img");
	img.src = "papaj.jpeg";
	img.width = 100;
	img.height = 100;
	img.style.position = "absolute";
	img.style.display = "none";
	document.body.appendChild(img);

	function setRandomPosition() {
		const maxX = window.innerWidth - img.width;
		const maxY = window.innerHeight - img.height;
		const randomX = Math.floor(Math.random() * maxX);
		const randomY = Math.floor(Math.random() * maxY);
		img.style.left = `${randomX}px`;
		img.style.top = `${randomY}px`;
	}

	function showPapaj() {
		img.style.display = "block";
		setRandomPosition();
	}

	function hidePapaj() {
		img.style.display = "none";
	}

	function spawnPapaj() {
		showPapaj();
		setTimeout(hidePapaj, 1000);
	}

	function onPapajClick() {
		papajEnabled = true;
		audio.muted = true;
		muteButton.style.display = "none";
		resetAnimation();
		barka.currentTime = 0;
		barka.muted = false;
		score = 2137;
		scoreDisplay.textContent = `Score: ${score}`;
		barka.play();
	}

	img.addEventListener("click", onPapajClick);

	document
		.getElementById("resetButton")
		?.addEventListener("click", resetAnimation);
	document.getElementById("muteButton")?.addEventListener("click", mute);
	startAnimation();
});
