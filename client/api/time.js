const msToHMS = (miliseconds) => {
  let seconds = parseInt((miliseconds / 1000) % 60);
  let minutes = parseInt((miliseconds / (1000 * 60)) % 60);
  let hours = parseInt((miliseconds / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
};
export { msToHMS };
