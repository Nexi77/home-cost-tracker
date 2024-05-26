export const getRandomColor = ()  => {
    // Generate random RGB values
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    
    // Convert RGB values to hexadecimal format
    const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
    
    return color;
  }
  