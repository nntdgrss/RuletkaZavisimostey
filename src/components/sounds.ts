const spinning = new Audio("/sounds/cs_go_oc.mp3");
const win = new Audio("/sounds/cs_go_win.mp3");

// Эффекты будут загружены заранее для мгновенного воспроизведения
spinning.load();
win.load();

// Настраиваем громкость
spinning.volume = 0.3;
win.volume = 0.5;

export const sounds = {
  playSpinning: () => {
    spinning.currentTime = 0;
    return spinning.play();
  },
  playWin: () => {
    win.currentTime = 0;
    return win.play();
  },
  stopSpinning: () => {
    spinning.pause();
    spinning.currentTime = 0;
  },
};
