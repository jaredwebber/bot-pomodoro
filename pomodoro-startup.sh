#!/bin/sh

osascript -e 'tell app "Terminal"
    do script "cd Github/bot-pomodoro && /opt/homebrew/bin/node bot-pomodoro-simple.js"
end tell'
