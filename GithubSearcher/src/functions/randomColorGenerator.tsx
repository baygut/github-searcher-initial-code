function generateRandomColor(): string {
    const maxLightSum = 300; // Adjust this value to control lightness avoidance
  
    let red, green, blue;
    do {
      red = Math.floor(Math.random() * 256);
      green = Math.floor(Math.random() * 256);
      blue = Math.floor(Math.random() * 256);
    } while (red + green + blue > maxLightSum);
  
    return `rgb(${red}, ${green}, ${blue})`;
  }
  
  export default generateRandomColor;