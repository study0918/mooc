export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function shouldUseDarkForeground(hex) {
  const { red, green, blue } = hexToRGB(hex);

  return red * 0.299 + green * 0.587 + blue * 0.114 > 186;
}

export function hexToRGB(hex) {
  let r = 0,
    g = 0,
    b = 0;
  // handling 3 digit hex
  if (hex.length == 4) {
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];
    // handling 6 digit hex
  } else if (hex.length == 7) {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
  }

  return {
    red: +r,
    green: +g,
    blue: +b,
  };
}
