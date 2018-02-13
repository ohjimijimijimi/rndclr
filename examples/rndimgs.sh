#!/usr/bin/env bash

COUNT=1
SIZE=1400x900
FOREGROUND=fff

SERVICE_PLACEKITTEN=http://placekitten.com
SERVICE_DUMMYIMAGE=https://dummyimage.com
SERVICE_PLACEHOLD=http://placehold.it
SERVICE_PLACECAGE=https://www.placecage.com
SERVICE_FILLMURRAY=http://www.fillmurray.com
SERVICE_STEVENSGALLERY=http://www.stevensegallery.com

function usage() {
cat <<< EOF
Usage: $0 [options]

Options:
    -c: Number of images to generate. [Default: ${COUNT}]
    -s: Size of the images. [Default: ${SIZE}]
    -f: Foreground color to use. [Default: ${FOREGROUND}]
    -h: Show this help
EOF;
}

while getopts ":hc:s:f:" opt
do
  case $opt in
    c) COUNT=${OPTARG};;
    s) SIZE=${OPTARG};;
    f) FOREGROUND=${FOREGROUND};;
    h) usage && exit 0;;
    *) usage && exit 1;;
  esac
done

shift $(($OPTIND - 1))

i=0
for COLOR in $(node ../index.js -c ${COUNT} | sed 's/#//g');
do
    curl --output $i.png "https://dummyimage.com/${SIZE}/${COLOR}/${FOREGROUND}&text=%23${COLOR}"
    (( i++ ))
done