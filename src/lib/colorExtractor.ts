/**
 * Extracts the dominant color from an image using canvas analysis
 * @param dataUrl - Data URL of the image (base64)
 * @returns Promise with the color in hexadecimal format or null if it fails
 */
export async function extractDominantColor(dataUrl: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      try {
        const size = 40; // Size of the analysis canvas
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }

        // Draws the resized image on the canvas
        ctx.drawImage(img, 0, 0, size, size);

        // Gets pixel data
        const imageData = ctx.getImageData(0, 0, size, size);
        const data = imageData.data;

        let r = 0, g = 0, b = 0, n = 0;

        // Analyzes each pixel
        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3];

          // Ignores transparent pixels
          if (alpha < 128) continue;

          const rr = data[i];
          const gg = data[i + 1];
          const bb = data[i + 2];

          // Ignores very bright pixels (almost white)
          if (rr > 235 && gg > 235 && bb > 235) continue;

          // Ignores very dark pixels (almost black)
          if (rr < 20 && gg < 20 && bb < 20) continue;

          // Accumulates RGB values
          r += rr;
          g += gg;
          b += bb;
          n++;
        }

        // If no valid pixels found, returns null
        if (n === 0) {
          resolve(null);
          return;
        }

        // Calculates the average and converts to hexadecimal
        const toHex = (v: number) => Math.round(v / n).toString(16).padStart(2, '0');
        const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();

        resolve(hexColor);
      } catch (error) {
        console.error('Erro ao extrair cor:', error);
        resolve(null);
      }
    };

    img.onerror = () => {
      console.error('Erro ao carregar imagem para extração de cor');
      resolve(null);
    };

    img.src = dataUrl;
  });
}
