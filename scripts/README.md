# Scripts to handle Congressional Images

## Setup
```bash
# install deno
curl -fsSL https://deno.land/install.sh | sh
```

## Scripts
```bash
# convert png files to jpg if there is no corresponding jpg file
# need network access to use imported packages
deno run --allow-net --allow-read --allow-write pngToJpg.tsd

# iterate through original .jpg images
# create images of with ratios of 350x425, 200x200, 100x100, 40x40 (Width x Height)
# places images in corresponding files
deno run --allow-read --allow-env --allow-ffi --allow-write imageResizer.ts 
```