import os
import subprocess
import json

sizes = [16, 32, 48, 72, 96, 128, 144, 256, 512,  1024, 1240]

if __name__ == '__main__':
    basePath = os.path.dirname(os.path.abspath(__file__))

    for size in sizes:
        subprocess.call(f'inkscape -z -e public/img/icons/{size}-{size}.png -w {size} -h {size} public/img/icon.svg')

    with open('public/manifest.json') as f:
        j = json.load(f)
    j['icons'] = [{'src': f'img/icons/{size}-{size}.png', 'sizes': f'{size}x{size}'} for size in sizes]
    with open('public/manifest.webmanifest', 'w') as f:
        json.dump(j, f, separators=(',', ':'))
