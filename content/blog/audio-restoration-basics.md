---
title: "Rescuing Bad Audio: A Restoration Primer"
date: "2026-04-22"
excerpt: "Hiss, hum, clipping, and room noise — a field guide to what's fixable, what's not, and how I approach restoration jobs."
category: "Audio Production"
readTime: "7 min read"
---

Clients often send me audio assuming it's unusable — an old interview tape,
a webinar recorded on a laptop mic, a voicemail someone wants preserved. Most
of it is more salvageable than people think.

## The four usual suspects

**Hiss** — broadband noise from old tape or cheap preamps. Spectral
de-noising handles this well as long as you don't push it so hard that it
eats the high end of the voice.

**Hum** — 50/60Hz electrical interference and its harmonics. A narrow notch
filter at the fundamental frequency (and its multiples) removes this cleanly
without touching the rest of the spectrum.

**Clipping** — when a signal was recorded too hot and the peaks are flattened.
This is the hardest to recover; declipping tools can approximate the missing
waveform, but there's a ceiling to how much is truly recoverable.

**Room noise** — HVAC rumble, traffic, echo. This is where the ear matters
more than the tool. Aggressive noise reduction can leave audio sounding
"underwater" if you don't balance it against dialogue intelligibility.

## My process

1. Diagnose before touching anything — I listen on reference monitors, not
   laptop speakers, to hear what's actually wrong
2. Fix problems in the order that won't compound errors (de-hum before
   de-noise, de-noise before compression)
3. Never over-process — audio that sounds "clean" but robotic has failed the
   job as much as audio that's still noisy

Good restoration is invisible. If someone notices the processing, it wasn't
done well enough.
