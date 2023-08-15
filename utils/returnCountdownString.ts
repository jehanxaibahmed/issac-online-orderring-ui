export function returnCountdownString(
  distance: number,
  returnDays = false /*typescript is infers type for default parameters*/
) {
  if (distance < 0) {
    // If the count down is over return expired
    return "Expired";
  }
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  if (!returnDays && days > 0) {
    return undefined;
  }
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return `${
    returnDays //if returnDats is true (currently checkout) add days to the countdown
      ? `${days <= 9 ? "0" + days : days}:`
      : ""
  }${hours <= 9 ? "0" + hours : hours}:${
    minutes <= 9 ? "0" + minutes : minutes
  }:${seconds <= 9 ? "0" + seconds : seconds}`;
}
