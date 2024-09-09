import { walk } from "https://deno.land/std@0.177.0/fs/mod.ts";
import { Image } from "https://deno.land/x/imagescript@1.2.15/mod.ts";

async function convertPngToJpg(directory: string) {
  for await (const entry of walk(directory, { exts: [".png"] })) {
    if (entry.isFile) {
      const pngPath = entry.path;
      const jpgPath = pngPath.replace(/\.png$/, ".jpg");

      try {
        // Read the PNG file
        const pngData = await Deno.readFile(pngPath);

        // Decode the PNG image
        const image = await Image.decode(pngData);

        // Encode the image as JPEG
        const jpgData = await image.encodeJPEG(90);

        // Write the JPEG file
        await Deno.writeFile(jpgPath, jpgData);

        console.log(`Converted: ${pngPath} -> ${jpgPath}`);

        // Optionally, remove the original PNG file
        // await Deno.remove(pngPath);
      } catch (error) {
        console.error(`Error converting ${pngPath}: ${error.message}`);
      }
    }
  }
}

// Usage
const directory = "./images"; // Replace with your directory path
convertPngToJpg(directory);