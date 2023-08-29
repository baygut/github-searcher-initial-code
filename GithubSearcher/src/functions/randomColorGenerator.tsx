function generateRandomColors(count: number): string[] {
    const maxLightSum = 300; // Adjust this value to control lightness avoidance
    
    const colors: string[] = [];
    
    for (let i = 0; i < count; i++) {
      let red, green, blue;
      do {
        red = Math.floor(Math.random() * 256);
        green = Math.floor(Math.random() * 256);
        blue = Math.floor(Math.random() * 256);
      } while (red + green + blue > maxLightSum);
    
      colors.push(`rgb(${red}, ${green}, ${blue})`);
    }
    
    return colors;
  }
  
  export default generateRandomColors;