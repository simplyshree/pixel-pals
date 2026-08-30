# Pixel Pals

Build a polished, playful web game called “DoodlePop” — a tiny, satisfying pixel-drawing game people can open when they are bored, play instantly without logging in, and share with friends.

The experience should feel:

cute

quirky

slightly chaotic

cozy

aesthetic

extremely simple

satisfying on both desktop and mobile

highly shareable

Think: pixel art + satisfying fidget toy + daily drawing challenge + internet personality.

CORE IDEA

When the website opens, the user should immediately see a small pixel canvas and a funny drawing prompt such as:

“Draw a suspicious frog 🐸”
“Make the world’s tiniest café ☕”
“Draw what Monday feels like”
“Design an alien’s favorite snack 👽”
“Draw a cat with a secret”
“Make a cursed strawberry”
“Design a tiny room you would live in”
“Draw something that should NOT have legs”

The player has about 30–60 seconds to create a tiny pixel drawing.

No account.
No tutorial wall.
No complicated menus.

The user should be able to start drawing within 2 seconds of opening the site.

PIXEL CANVAS

Create a satisfying pixel-art drawing canvas.

Default canvas:
16 × 16 pixels.

Allow optional:
16 × 16
24 × 24
32 × 32

Keep the pixel grid visible but subtle.

Interaction:

click/tap and drag to paint

eraser

undo

redo

clear canvas

fill bucket if easy to implement

color picker

8–12 cute preset colors

random palette button

Painting pixels should feel VERY satisfying.

Add tiny interactions such as:

subtle pixel “pop” animation when a square is painted

very light haptic-style visual feedback

tiny satisfying sound toggle

particles/confetti ONLY when a drawing is completed

smooth buttons

cute micro-animations

Do not make animations excessive.

MAIN GAME MODES

Create these modes:

1. Daily Doodle

Everyone gets the same daily prompt.

Example:

“Today’s doodle:
Draw a frog who pays taxes.”

Timer:
60 seconds.

At the end show:

“YOUR MASTERPIECE ✨”

Allow users to download/share their result.

Also display:

“Come back tomorrow for another weird prompt.”

2. Quick Doodle

Generate a random funny prompt.

Buttons:

🎲 New Prompt
⏱ Start Drawing

Example prompt categories:

Animals
Food
Internet culture
Objects
Emotions
Tiny worlds
Cursed things
Cute things
Random combinations

Prompt generator examples:

“Draw a sleepy toaster.”

“Draw a frog who just discovered capitalism.”

“Design a tiny house for a strawberry.”

“Draw your last brain cell.”

“Draw an emotionally unavailable cactus.”

“Design a suspicious sandwich.”

“Draw a duck with an important job.”

The writing should feel playful and internet-native.

3. Draw This!

Show a tiny pixel-art reference for 5 seconds.

Then hide it.

The player tries to recreate it from memory.

Example objects:

🍓 strawberry
🐸 frog
🌷 flower
🍄 mushroom
🐱 cat
👾 alien
⭐ star
🍒 cherries
🦆 duck

At the end show the original beside the player's drawing.

Give them a funny score such as:

96% — PIXEL WIZARD

78% — suspiciously talented

52% — recognizable enough

31% — abstract artist

12% — beautiful disaster

The scoring does not need to be scientifically accurate initially. A simple pixel similarity calculation is enough.

4. Mystery Pixel

The game gives the player a limited palette and a prompt.

Example:

“You have:
🟣 purple
🟡 yellow
⚫ black

Draw a cat.”

This makes the game more challenging and creates funny results.

5. One-Minute Chaos

Give increasingly strange drawing prompts every round.

Round 1:
“Draw a fish.”

Round 2:
“Give the fish shoes.”

Round 3:
“Give the fish a job.”

Round 4:
“The fish is now wanted by the government.”

Keep everything on the same canvas so the drawing becomes increasingly ridiculous.

VIRAL / SHARE FEATURE

Sharing should be one of the biggest parts of the product.

After completing a drawing, generate a beautiful share card.

Example:

DOODLEPOP

“Draw a suspicious frog.”

[PIXEL DRAWING]

made in 47 seconds

Can you do better?

doodlepop

Add buttons:

Share Challenge
Copy Challenge Link
Download Image
Play Again

The challenge link should preserve the prompt so a friend can attempt the SAME drawing.

Example URL behavior:

/challenge/suspicious-frog

When someone opens the link:

“Shreeya challenged you 👀

Draw a suspicious frog.

You have 60 seconds.”

Then they play immediately.

Afterward show the two drawings side by side:

“WHO DID IT BETTER?”

Player A
vs
Player B

Do NOT require authentication for this basic challenge flow.

REACTION SYSTEM

After completing a drawing, randomly give the player a funny reaction.

Examples:

“museum immediately.”

“why is it looking at me.”

“this belongs on a fridge.”

“questionable. beautiful. perfect.”

“Picasso is typing…”

“you cooked.”

“the pixels have spoken.”

“10/10 would frame.”

“technically art.”

“deeply concerning.”

Make reactions fun enough that people want to screenshot them.

STREAK

Add a very lightweight daily streak.

Example:

🔥 4 day doodle streak

Do not pressure the user.

Use fun milestone messages:

3 days:
“okayyy artist 👀”

7 days:
“certified pixel person”

14 days:
“you live here now.”

30 days:
“touch grass. then draw it.”

Store streak locally initially so users do not need an account.

RANDOM PALETTE

Include beautifully designed preset palettes with quirky names.

Examples:

Strawberry Milk
Matcha Day
Internet 2004
Midnight Snack
Bubblegum
Forest Goblin
Blueberry Yogurt
Arcade Carpet
Sunset Soda
Lavender Dream

Each palette should contain approximately 5–8 colors.

Selecting a palette should visually update the drawing toolbar.

UI DESIGN

The UI should be clean and spacious but playful.

Avoid looking like:

a corporate SaaS dashboard

a children's educational game

a complicated Photoshop clone

It should feel like a small indie internet game someone finds and immediately sends to their group chat.

Design direction:

Soft cream/off-white background.

Rounded cards.

Pixel-style accent elements.

Small doodles around the interface.

Chunky playful typography for headings.

Clean sans-serif font for normal text.

Pastel palette with occasional bright accent colors.

Use tiny stickers like:

⭐
🍓
🐸
🌷
🍄
✨
👾
♥

Use them sparingly.

Buttons should feel tactile and slightly chunky.

Examples:

[ START DOODLING ✏️ ]

[ 🎲 GIVE ME SOMETHING WEIRD ]

[ SEND THIS TO A FRIEND 👀 ]

LANDING SCREEN

Keep the landing page extremely simple.

Top:

DoodlePop ✦

Tiny text:

“draw something silly.”

Hero section:

“Bored?”

[ GIVE ME SOMETHING TO DRAW ]

Below:

TODAY'S DOODLE

“Draw a frog with a suspicious amount of money.”

[ Play ]

Tiny streak indicator.

Then:

“or cause chaos”

Quick Doodle
Draw This
Mystery Pixel
One-Minute Chaos

Do not fill the homepage with marketing copy.

The GAME should be the product.

COMPLETION SCREEN

When the timer ends:

Brief confetti animation.

Large:

✨ ART HAS HAPPENED ✨

Show the drawing prominently.

Then:

“Draw a duck with an important job.”

Finished in 42 seconds.

Random reaction:

“museum immediately.”

Buttons:

Challenge a Friend
Download
New Doodle

Secondary:

♡ save to gallery

MY GALLERY

Create a simple local gallery called:

“tiny museum”

Show previous doodles in a grid.

Each drawing looks like a tiny framed pixel artwork.

On hover/tap show:

Prompt
Date
Time taken

Allow:
download
delete
replay prompt

Save these locally in the browser initially.

No backend should be necessary for the MVP.

SECRET FUN DETAILS

Add small easter eggs.

Examples:

If someone clears their canvas 5 times:

“perfectionist detected.”

If they finish in under 10 seconds:

“speedrun???”

If their drawing uses only one color:

“minimalism.”

If they paint every pixel:

“you really said MAXIMALISM.”

If they haven't drawn for several seconds:

“the canvas believes in you.”

These messages should appear subtly and occasionally.

MOBILE EXPERIENCE

Mobile is extremely important.

The game should be effortless to play with one thumb/finger.

Canvas should scale properly.

No accidental page scrolling while drawing on the canvas.

Large touch targets.

Toolbar should be compact.

On mobile:

canvas
palette
small controls
prompt

should fit comfortably without feeling crowded.

TECHNICAL REQUIREMENTS

Build this as a responsive web app.

Prefer React + TypeScript.

Keep components clean and reusable.

The pixel canvas should use a simple grid or canvas implementation that works smoothly on mobile.

Persist locally:

current streak

previous drawings

settings

sound preference

using local storage.

Do not require authentication for MVP.

Structure the application so Supabase could be added later for:

accounts

public galleries

likes

global daily challenges

challenge links

multiplayer doodles

But DO NOT make backend infrastructure unnecessarily complicated for the first version.

IMPORTANT UX RULE

A first-time user must be able to:

open website →
see funny prompt →
start drawing →
finish →
share

in less than 60 seconds.

Never interrupt that flow with:

login
onboarding
popups
tutorials
email collection
subscription screens

The feeling should be:

“I'll play this for 20 seconds.”

Then:

“wait this is actually fun.”

Then:

“I'm sending this to someone.”

PRODUCT PERSONALITY

Microcopy should have personality.

Instead of:

“Clear Canvas”

write:

“start over :(”

Instead of:

“Generate New Prompt”

write:

“give me another”

Instead of:

“Submit”

write:

“i'm done ✨”

Instead of:

“Share”

write:

“send this masterpiece”

Instead of:

“Gallery”

write:

“tiny museum”

But keep usability obvious.

MVP PRIORITY

Build the first functional version around ONLY these essential features:

Random funny drawing prompt

Pixel drawing canvas

Cute color palettes

Undo + eraser + clear

60-second optional timer

Completion screen

Random funny reaction

Downloadable share card

Share/replay same prompt

Local “tiny museum” gallery

Make ALL of these features actually functional before adding more complexity.

The final experience should feel highly polished, fast, charming, satisfying, and slightly addictive.

The goal is not to build a professional drawing program.

The goal is to build the internet's cutest 60-second boredom game.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cc49e43e-3ec7-487e-9f1d-70afd95cbfae).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
