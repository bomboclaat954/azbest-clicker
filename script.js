document.addEventListener("DOMContentLoaded", function () {
    var _a, _b;
    var intervalId;
    var score = 0;
    var level = 1;
    var audio = document.getElementById("backgroundAudio");
    var scoreDisplay = document.getElementById("scoreDisplay");
    var createAzbest = function () {
        audio.play();
        var text = document.createElement("button");
        text.textContent = "azbest";
        text.classList.add("text");
        var startX = Math.random() * window.innerWidth;
        var startY = Math.random() * window.innerHeight;
        text.style.left = "".concat(startX, "px");
        text.style.top = "".concat(startY, "px");
        document.body.appendChild(text);
        text.addEventListener("click", function () {
            score += 1;
            scoreDisplay.textContent = "Score: ".concat(score);
            text.remove();
            updateLevel();
        });
        var moveUp = function () {
            var currentTop = parseFloat(text.style.top);
            text.style.top = "".concat(currentTop - 1, "px");
            if (currentTop < -text.clientHeight) {
                text.remove();
            }
            else {
                requestAnimationFrame(moveUp);
            }
        };
        moveUp();
    };
    var updateLevel = function () {
        if (score % 10 === 0 && score !== 0) {
            level++;
            document.body.style.backgroundColor = getRandomColorRGBA();
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
        document.querySelectorAll(".text").forEach(function (text) { return text.remove(); });
        clearInterval(intervalId);
        score = 0;
        scoreDisplay.textContent = "Score: ".concat(score);
        startAnimation();
    };
    var mute = function () {
        var muteButton = document.getElementById("muteButton");
        if (audio.muted == false) {
            muteButton.textContent = "Unmute";
            audio.muted = true;
        }
        else if (audio.muted == true) {
            muteButton.textContent = "Mute";
            audio.muted = false;
        }
    };
    (_a = document
        .getElementById("resetButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", resetAnimation);
    (_b = document.getElementById("muteButton")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", mute);
    startAnimation();
});
