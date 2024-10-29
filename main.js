const startButton = document.querySelector("#start-button");

const appData = {
  appState: false,
  goCount: null,
  minDuration: null,
  maxDuration: null,
  randomSec: null,
  intervalFlag: null,
  intervalCount: null,
  audio: new Audio("./goo-audio-1.mp3"),
};

appData.audio.playbackRate = 1.5;

function generateRandomSec() {
  let newSec =
    (Math.floor(
      Math.random() * (appData.maxDuration - appData.minDuration + 1)
    ) +
      appData.minDuration) *
    1000;
  const oldSec = appData.randomSec;

  while (oldSec == newSec) {
    newSec =
      (Math.floor(
        Math.random() * (appData.maxDuration - appData.minDuration + 1)
      ) +
        appData.minDuration) *
      1000;
  }

  appData.randomSec = newSec;
}

function randomGo(startFlag) {
  if (startFlag) {
    appData.appState = true;
    appData.goCount = Number(document.querySelector("#control-1 input").value);
    appData.minDuration = Number(
      document.querySelector("#control-2 input").value
    );
    appData.maxDuration = Number(
      document.querySelector("#control-3 input").value
    );
    generateRandomSec();

    const randomInterval = () => {
      appData.intervalCount += 1;

      appData.intervalFlag = setInterval(() => {
        console.log(appData.randomSec, appData.intervalCount, appData.appState);
        appData.audio.play();
        clearInterval(appData.intervalFlag);

        if (appData.appState && appData.intervalCount < appData.goCount) {
          generateRandomSec();
          randomInterval();
        } else {
          appData.appState = false;
          startButton.classList.add("bg-[#387478]");
          startButton.classList.remove("bg-[#243642]");
          startButton.textContent = "start";
        }
      }, appData.randomSec);
    };

    randomInterval();
  } else {
    appData.appState = false;
    clearInterval(appData.intervalFlag);
  }
}

startButton.addEventListener("click", (event) => {
  if (startButton.textContent.replace(/\s+/g, "") == "start") {
    startButton.classList.remove("bg-[#387478]");
    startButton.classList.add("bg-[#243642]");
    startButton.textContent = "stop";
    randomGo(true);
  } else {
    startButton.classList.add("bg-[#387478]");
    startButton.classList.remove("bg-[#243642]");
    startButton.textContent = "start";
    randomGo(false);
  }
});

// ******************* range component code *************************

function range() {
  const rangeElements = Array.from(document.querySelectorAll(".control-elm"));

  rangeElements.forEach((range) => {
    const label = range.querySelector("label > span");
    const input = range.querySelector("input");

    input.addEventListener("input", (event) => {
      label.textContent = event.target.value;
    });
  });
}
range();
