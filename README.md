# Discord Voice Channel Notifications

## Overview
Receive notifications when a user joins a channel by subscribing. Users can subscribe to a voice channel and receive notifications when users enter. Users can also whitelist channels to only receive notifications for specific users that join a channel.

## Installation

Clone this repository: `git clone https://github.com/ansonfoong/discordjs-voice-notifications.git`

Run `npm install`

Create a `.env` file in the root directory.
```
BOT_TOKEN=TOKEN GOES HERE
```

And then to run in dev mode: `npm run dev`

Data is stored in a SQLITE database. 