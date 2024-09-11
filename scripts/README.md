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

```