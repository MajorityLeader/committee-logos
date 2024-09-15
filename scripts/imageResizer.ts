// Import necessary modules
import { ensureDir } from "https://deno.land/std@0.113.0/fs/mod.ts";
import sharp from "npm:sharp";

// Define directories
const inputDir = "../images/original";
const outputDirs = {
  "350x425": "../images/350x425",
  "200x200": "../images/200x200",
  "100x100": "../images/100x100",
  "40x40": "../images/40x40",
};

// Define sizes
const sizes = [
  { width: 350, height: 425, folder: "350x425" },
  { width: 200, height: 200, folder: "200x200" },
  { width: 100, height: 100, folder: "100x100" },
  { width: 40, height: 40, folder: "40x40" },
];

// Ensure all output directories exist
for (const dir of Object.values(outputDirs)) {
  await ensureDir(dir);
}

// Function to resize image and save it to the specified folder
async function resizeImage(filePath: string, fileName: string) {
  const buffer = await Deno.readFile(filePath);
  for (const size of sizes) {
    const outputPath = `${outputDirs[size.folder]}/${fileName}`;
    await sharp(buffer)
      .resize(size.width, size.height)
      .toFile(outputPath);
    console.log(`Resized and saved to ${outputPath}`);
  }
}

// Iterate through the files in the input directory
for await (const dirEntry of Deno.readDir(inputDir)) {
  if (dirEntry.isFile && dirEntry.name.endsWith(".jpg")) {
    const filePath = `${inputDir}/${dirEntry.name}`;
    console.log(`Processing ${filePath}`);
    await resizeImage(filePath, dirEntry.name);
  }
}