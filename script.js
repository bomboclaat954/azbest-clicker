document.addEventListener("DOMContentLoaded", function () {
    var _a, _b;
    var intervalId;
    var papajEnabled = false;
    var score = 0;
    var muteButton = document.getElementById("muteButton");
    var audio = document.getElementById("backgroundAudio");
    var barka = document.getElementById("barka");
    var scoreDisplay = document.getElementById("scoreDisplay");
    barka.pause();
    var createAzbest = function () {
        audio.play();
        var azbest = document.createElement("button");
        azbest.textContent = "azbest";
        azbest.classList.add("azbest");
        var startX = Math.random() * window.innerWidth;
        var startY = Math.random() * window.innerHeight;
        azbest.style.left = "".concat(startX, "px");
        azbest.style.top = "".concat(startY, "px");
        document.body.appendChild(azbest);
        azbest.addEventListener("click", function () {
            if (papajEnabled == false) {
                score += 1;
                scoreDisplay.textContent = "Score: ".concat(score);
                azbest.remove();
                changeColor();
            }
            else {
                azbest.remove();
            }
        });
        var moveUp = function () {
            var currentTop = parseFloat(azbest.style.top);
            azbest.style.top = "".concat(currentTop - 1, "px");
            if (currentTop < -azbest.clientHeight) {
                azbest.remove();
            }
            else {
                requestAnimationFrame(moveUp);
            }
        };
        moveUp();
    };
    var changeColor = function () {
        if (score % 10 === 0 && score !== 0) {
            if (papajEnabled == false) {
                spawnPapaj();
                document.body.style.backgroundColor = getRandomColorRGBA();
            }
        }
    };
    var getRandomColorRGBA = function () {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        var a = (0.5).toFixed(2);
        return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")");
    };
    var startAnimation = function () {
        intervalId = window.setInterval(createAzbest, 500);
    };
    var resetAnimation = function () {
        audio.currentTime = 0;
        document.querySelectorAll(".azbest").forEach(function (azbest) { return azbest.remove(); });
        clearInterval(intervalId);
        score = 0;
        scoreDisplay.textContent = "Score: ".concat(score);
        startAnimation();
    };
    var mute = function () {
        if (audio.muted == false) {
            muteButton.textContent = "Unmute";
            audio.muted = true;
        }
        else if (audio.muted == true) {
            muteButton.textContent = "Mute";
            audio.muted = false;
        }
    };
    var img = document.createElement("img");
    img.src = "papaj.jpeg";
    img.width = 100;
    img.height = 100;
    img.style.position = "absolute";
    img.style.display = "none";
    document.body.appendChild(img);
    function setRandomPosition() {
        var maxX = window.innerWidth - img.width;
        var maxY = window.innerHeight - img.height;
        var randomX = Math.floor(Math.random() * maxX);
        var randomY = Math.floor(Math.random() * maxY);
        img.style.left = "".concat(randomX, "px");
        img.style.top = "".concat(randomY, "px");
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
        console.log("PAPAJ MODE ENABLED!!!");
        audio.muted = true;
        muteButton.style.display = "none";
        resetAnimation();
        barka.currentTime = 0;
        barka.muted = false;
        score = 2137;
        scoreDisplay.textContent = "Score: ".concat(score);
        barka.play();
    }
    var srcBtn = document.getElementById("source");
    srcBtn.addEventListener("click", function () {
        window.location.href = "https://github.com/bomboclaat954/azbest-clicker";
    });
    img.addEventListener("click", onPapajClick);
    (_a = document
        .getElementById("resetButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", resetAnimation);
    (_b = document.getElementById("muteButton")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", mute);
    startAnimation();
});
