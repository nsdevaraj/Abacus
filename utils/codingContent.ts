// Scratch block-based coding curriculum.
// Each level corresponds to a group of Scratch block categories.
// Each level has stages; each stage has "stories" the learner must build
// in Scratch (https://scratch.mit.edu/). Every story lists the required
// block names and progressive hints to guide the learner.

export interface CodingStory {
  title: string;            // Short story / mission name
  scenario: string;         // What the project should do
  category: string;         // Primary Scratch block category
  blocks: string[];         // Suggested Scratch block names
  hints: string[];          // Progressive hints (revealed one at a time)
  url?: string;             // Scratch editor URL (may be a tutorial)
}

export interface CodingStage {
  name: string;
  description: string;
  stories: CodingStory[];
}

export interface CodingLevel {
  title: string;
  summary: string;          // Shown as the "concepts" line
  tagline: string;          // Short subtitle
  stages: CodingStage[];
}

const SCRATCH_EDITOR = "https://scratch.mit.edu/projects/editor/";
const SCRATCH_GETTING_STARTED =
  "https://scratch.mit.edu/projects/editor/?tutorial=getStarted";

export const CODING_LEVELS: CodingLevel[] = [
  // ---------------------------------------------------------------
  {
    title: "First Steps",
    tagline: "Meet Scratch Cat",
    summary: "Motion + Looks blocks: make a sprite move, turn and talk.",
    stages: [
      {
        name: "Hello, Cat!",
        description: "Get comfortable with the editor and the blue Motion blocks.",
        stories: [
          {
            title: "Wave Hello",
            scenario:
              "Make Scratch Cat say 'Hello!' when the green flag is clicked, then take 10 steps to the right.",
            category: "Motion / Events / Looks",
            blocks: ["when ⚑ clicked", "say Hello! for 2 seconds", "move 10 steps"],
            hints: [
              "Drag a 'when green flag clicked' from the Events category to start the script.",
              "Snap a 'say Hello! for 2 seconds' Looks block underneath it.",
              "Finish with a 'move 10 steps' Motion block. Click the green flag to test.",
            ],
            url: SCRATCH_GETTING_STARTED,
          },
          {
            title: "Across the Stage",
            scenario:
              "When the flag is clicked, the cat walks from the left edge to the right edge using small steps.",
            category: "Motion / Control",
            blocks: ["when ⚑ clicked", "go to x: -200 y: 0", "repeat 40", "move 10 steps"],
            hints: [
              "First send the cat to the left edge with 'go to x: -200 y: 0'.",
              "Wrap the walking inside a 'repeat 40' loop from the Control category.",
              "Inside the loop, put a 'move 10 steps' block so 40 × 10 = 400 pixels travelled.",
            ],
            url: SCRATCH_EDITOR,
          },
          {
            title: "Spin Around",
            scenario:
              "Make the cat spin a full circle when the spacebar is pressed.",
            category: "Motion / Events",
            blocks: ["when space key pressed", "repeat 36", "turn ↻ 10 degrees"],
            hints: [
              "Use 'when space key pressed' from Events as the hat block.",
              "A full circle is 360°. 'repeat 36' with 'turn ↻ 10 degrees' inside makes one rotation.",
              "Add a tiny 'wait 0.02 seconds' inside the loop so the spin is visible.",
            ],
          },
        ],
      },
      {
        name: "Costume Party",
        description: "Use Looks blocks to change costumes, size and effects.",
        stories: [
          {
            title: "Change Outfit",
            scenario:
              "Each time the cat is clicked, switch to the next costume so it looks like it's walking.",
            category: "Looks / Events",
            blocks: ["when this sprite clicked", "next costume"],
            hints: [
              "Use 'when this sprite clicked' as the trigger.",
              "Add a 'next costume' Looks block — the cat already has two costumes.",
              "Click the cat a few times to see it switch outfits.",
            ],
          },
          {
            title: "Grow and Shrink",
            scenario:
              "When the up-arrow is pressed the sprite grows, when down-arrow is pressed it shrinks.",
            category: "Looks / Events",
            blocks: ["when up arrow pressed", "change size by 10", "change size by -10"],
            hints: [
              "Create two separate scripts — one for the up arrow, one for the down arrow.",
              "Use 'change size by 10' for growing and 'change size by -10' for shrinking.",
              "Try 'set size to 100 %' to reset the sprite if it gets too big or small.",
            ],
          },
          {
            title: "Color Magic",
            scenario:
              "Make the sprite slowly cycle through every color while you watch.",
            category: "Looks / Control",
            blocks: ["when ⚑ clicked", "forever", "change color effect by 5", "wait 0.1 seconds"],
            hints: [
              "Wrap everything in a 'forever' loop so it never stops.",
              "Inside use 'change color effect by 5'.",
              "Add 'wait 0.1 seconds' so the colors change at a smooth speed.",
            ],
          },
        ],
      },
      {
        name: "Glide Adventure",
        description: "Smooth movement with glide and bouncing.",
        stories: [
          {
            title: "Smooth Slide",
            scenario:
              "Cat glides to four corners of the stage one after another in a square path.",
            category: "Motion",
            blocks: ["glide 1 secs to x: -200 y: 150", "glide 1 secs to x: 200 y: 150", "glide 1 secs to x: 200 y: -150", "glide 1 secs to x: -200 y: -150"],
            hints: [
              "Use four 'glide 1 secs to x: __ y: __' blocks in sequence.",
              "The four corners are roughly (-200, 150), (200, 150), (200, -150), (-200, -150).",
              "Wrap the four glides in a 'forever' loop to make the cat circle the stage.",
            ],
          },
          {
            title: "Bouncing Ball",
            scenario:
              "A ball moves continuously and bounces off the edges of the stage.",
            category: "Motion / Control",
            blocks: ["when ⚑ clicked", "forever", "move 10 steps", "if on edge, bounce"],
            hints: [
              "Pick a Ball sprite from the sprite library.",
              "Inside a 'forever' loop add 'move 10 steps' and 'if on edge, bounce'.",
              "Use 'set rotation style left-right' so the ball doesn't flip upside down.",
            ],
          },
          {
            title: "Mouse Follower",
            scenario:
              "A sprite always points toward the mouse pointer and slowly walks toward it.",
            category: "Motion",
            blocks: ["forever", "point towards mouse-pointer", "move 2 steps"],
            hints: [
              "Inside a 'forever' loop use 'point towards mouse-pointer'.",
              "Then add 'move 2 steps' so it slowly creeps toward you.",
              "Move your mouse around — the sprite should follow.",
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------
  {
    title: "Tell a Story",
    tagline: "Sound, Looks & Events",
    summary: "Sound + Events blocks: dialogue, backdrops and audio.",
    stages: [
      {
        name: "Talk to Me",
        description: "Use 'say' and 'think' Looks blocks for dialogue.",
        stories: [
          {
            title: "Two Friends",
            scenario:
              "Two sprites greet each other with a short conversation.",
            category: "Looks / Events / Control",
            blocks: ["when ⚑ clicked", "say Hi! for 2 seconds", "broadcast hello", "when I receive hello"],
            hints: [
              "Sprite A says 'Hi!' for 2 seconds, then broadcasts a message called 'hello'.",
              "Sprite B listens with 'when I receive hello' and says 'Hello back!'.",
              "Use broadcasts so each sprite waits its turn to talk.",
            ],
          },
          {
            title: "Thinking Bubble",
            scenario:
              "When the sprite is clicked it thinks 'Hmm…' then says the answer.",
            category: "Looks / Events",
            blocks: ["when this sprite clicked", "think Hmm... for 2 seconds", "say I know it! for 2 seconds"],
            hints: [
              "Use 'think' for the dotted bubble and 'say' for the speech bubble.",
              "Chain them so 'think' runs before 'say'.",
              "Try changing the seconds to control the pacing.",
            ],
          },
          {
            title: "Story Sequence",
            scenario:
              "Create a 3-sentence story that auto-plays when the flag is clicked.",
            category: "Looks / Events",
            blocks: ["when ⚑ clicked", "say ... for 3 seconds"],
            hints: [
              "Use three 'say ... for 3 seconds' blocks in a row.",
              "Write a beginning, middle and end sentence for the story.",
              "End with 'say The End for 2 seconds' as a finale.",
            ],
          },
        ],
      },
      {
        name: "Sound Studio",
        description: "Play and record sounds, change tempo and volume.",
        stories: [
          {
            title: "Drum Solo",
            scenario:
              "When the spacebar is pressed, play a short drum pattern.",
            category: "Sound",
            blocks: ["when space key pressed", "play sound Pop until done", "play sound Drum until done"],
            hints: [
              "Add the Music extension if you want real drum blocks.",
              "Use 'play sound … until done' so sounds play one after another.",
              "Try copying the script and changing the order for a different beat.",
            ],
          },
          {
            title: "Meow on Click",
            scenario:
              "Make the cat meow every time it is clicked, and grow a little while doing it.",
            category: "Sound / Looks / Events",
            blocks: ["when this sprite clicked", "start sound Meow", "change size by 10"],
            hints: [
              "Use 'start sound Meow' so the click feels instant.",
              "Add 'change size by 10' before the sound to make it bounce.",
              "Add 'wait 0.2 seconds' then 'change size by -10' to return to normal.",
            ],
          },
          {
            title: "Volume Knob",
            scenario:
              "Use the up/down arrows to make the music louder or quieter.",
            category: "Sound / Events",
            blocks: ["when up arrow pressed", "change volume by 10", "change volume by -10"],
            hints: [
              "Two separate event scripts — one per arrow key.",
              "Use 'change volume by 10' and 'change volume by -10'.",
              "Play a looping sound in the background to hear the difference.",
            ],
          },
        ],
      },
      {
        name: "Scene Change",
        description: "Switch backdrops to move between scenes.",
        stories: [
          {
            title: "Day to Night",
            scenario:
              "Click the sun sprite to switch from a day backdrop to a night backdrop.",
            category: "Events / Looks (Stage)",
            blocks: ["when this sprite clicked", "switch backdrop to night"],
            hints: [
              "Add two backdrops to the Stage: 'day' and 'night'.",
              "On the sun sprite use 'when this sprite clicked' + 'switch backdrop to night'.",
              "Add a second sprite to switch it back to 'day'.",
            ],
          },
          {
            title: "Three-Act Play",
            scenario:
              "Auto-cycle through three backdrops with sprites entering and exiting.",
            category: "Events / Looks",
            blocks: ["when ⚑ clicked", "switch backdrop to act1", "wait 3 seconds", "next backdrop"],
            hints: [
              "Use 'switch backdrop to act1' at the start.",
              "Add 'wait 3 seconds' then 'next backdrop' twice to go through act2 and act3.",
              "Use 'when backdrop switches to act2' on each sprite to show or hide them.",
            ],
          },
          {
            title: "Fireworks Finale",
            scenario:
              "On 'finale' the backdrop turns dark and several firework sprites appear in random spots with sounds.",
            category: "Events / Motion / Sound",
            blocks: ["broadcast finale", "when I receive finale", "go to random position", "play sound Pop", "show"],
            hints: [
              "Broadcast 'finale' when the spacebar is pressed.",
              "Each firework sprite listens with 'when I receive finale' and runs 'go to random position', then 'show', then 'play sound Pop'.",
              "Use a 'repeat 5' loop on each firework so they keep popping for the whole show.",
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------
  {
    title: "Make it Move",
    tagline: "Control, Loops & Sensing",
    summary: "Control + Sensing blocks: loops, conditions and keyboard play.",
    stages: [
      {
        name: "Loop Land",
        description: "Use repeat and forever loops to build patterns.",
        stories: [
          {
            title: "Square Walk",
            scenario:
              "Draw a square path by walking forward and turning 90° four times.",
            category: "Control / Motion",
            blocks: ["repeat 4", "move 100 steps", "turn ↻ 90 degrees"],
            hints: [
              "A square has 4 equal sides, so 'repeat 4' is perfect.",
              "Inside the loop: move forward, then turn 90°.",
              "Try 'repeat 3' and 'turn 120°' instead — what shape do you get?",
            ],
          },
          {
            title: "Zig-Zag Path",
            scenario:
              "Make the sprite walk in a zig-zag down the stage.",
            category: "Control / Motion",
            blocks: ["repeat 10", "move 30 steps", "change y by -20", "turn ↻ 30 degrees", "turn ↺ 30 degrees"],
            hints: [
              "Inside 'repeat 10' alternate turning right and left by 30°.",
              "Add 'change y by -20' each iteration so the sprite drifts downward.",
              "Try changing the angle for a wider or tighter zig-zag.",
            ],
          },
          {
            title: "Forever Dance",
            scenario:
              "Loop a small dance forever: step, hop, twirl, repeat.",
            category: "Control / Motion / Looks",
            blocks: ["forever", "move 20 steps", "change y by 30", "wait 0.2 seconds", "change y by -30", "turn ↻ 45 degrees", "next costume"],
            hints: [
              "Inside a 'forever' loop chain a series of motion blocks.",
              "Use 'change y by 30' then a short wait then 'change y by -30' for a hop.",
              "Add 'next costume' so the dance also changes costume on every beat.",
            ],
          },
        ],
      },
      {
        name: "Choose Your Path",
        description: "Make decisions using if / else blocks.",
        stories: [
          {
            title: "Edge Detector",
            scenario:
              "If the sprite is touching the edge, bounce; otherwise keep moving.",
            category: "Control / Sensing / Motion",
            blocks: ["forever", "move 5 steps", "if <touching edge?> then", "turn ↻ 180 degrees"],
            hints: [
              "Use the 'touching edge?' boolean from Sensing as the condition.",
              "Inside the if block, 'turn 180°' to reverse direction.",
              "This is the manual version of 'if on edge, bounce' — same idea.",
            ],
          },
          {
            title: "Color Cop",
            scenario:
              "If a sprite touches a red painted area, say 'Stop!'; otherwise say 'Go!'.",
            category: "Control / Sensing",
            blocks: ["forever", "if <touching color red> then", "say Stop! for 1 seconds", "else", "say Go! for 1 seconds"],
            hints: [
              "Paint a red rectangle on the backdrop.",
              "Use 'touching color (red)?' as the condition in an if/else.",
              "Test by dragging the sprite onto and off the red area.",
            ],
          },
          {
            title: "Key Quiz",
            scenario:
              "Ask 'Press Y or N'. If Y is pressed, say 'Yay!'; if N, say 'Nope'.",
            category: "Control / Sensing / Events",
            blocks: ["forever", "if <key y pressed?> then", "say Yay! for 1 seconds", "if <key n pressed?> then", "say Nope for 1 seconds"],
            hints: [
              "Use 'key (y) pressed?' from Sensing inside an if block.",
              "Repeat the pattern for the N key in a second if.",
              "Wrap both ifs in a 'forever' loop so the quiz keeps checking.",
            ],
          },
        ],
      },
      {
        name: "Arcade Controls",
        description: "Build keyboard-controlled characters.",
        stories: [
          {
            title: "Arrow Walker",
            scenario:
              "Move the sprite with the four arrow keys.",
            category: "Events / Motion",
            blocks: ["when right arrow pressed", "change x by 10", "when left arrow pressed", "change x by -10", "when up arrow pressed", "change y by 10", "when down arrow pressed", "change y by -10"],
            hints: [
              "Make a separate script for each arrow key.",
              "Use 'change x by 10' for right and '-10' for left.",
              "Use 'change y by 10' for up and '-10' for down.",
            ],
          },
          {
            title: "Jumper",
            scenario:
              "When space is pressed, the sprite jumps up and falls back down.",
            category: "Motion / Events / Control",
            blocks: ["when space key pressed", "repeat 10", "change y by 10", "repeat 10", "change y by -10"],
            hints: [
              "First loop raises the sprite by 100 pixels in small steps.",
              "Second loop drops it back down.",
              "Add a 'wait 0.02 seconds' inside each loop for a smoother jump.",
            ],
          },
          {
            title: "Catch the Apple",
            scenario:
              "Move a basket with arrow keys to catch apples falling from the top.",
            category: "Sensing / Motion / Control",
            blocks: ["when ⚑ clicked", "forever", "go to x: pick random -200 to 200 y: 180", "glide 2 secs to x: x y: -150", "if <touching basket?> then"],
            hints: [
              "Basket sprite: use arrow-key scripts to move left/right (only x).",
              "Apple sprite: in a forever loop, start at top with random x and glide down.",
              "When the apple touches the basket, hide it briefly and start again.",
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------
  {
    title: "Play with Logic",
    tagline: "Operators & Variables",
    summary: "Operators + Variables: math, comparisons and keeping score.",
    stages: [
      {
        name: "Math Wizard",
        description: "Use Operator blocks for calculations and randomness.",
        stories: [
          {
            title: "Random Compliment",
            scenario:
              "On click, the sprite says a random number between 1 and 100.",
            category: "Operators / Looks",
            blocks: ["when this sprite clicked", "say (pick random 1 to 100) for 2 seconds"],
            hints: [
              "Drag 'pick random 1 to 100' from Operators.",
              "Drop it into the input slot of a 'say ___ for 2 seconds' block.",
              "Click the sprite a few times — a new number each time!",
            ],
          },
          {
            title: "Even or Odd",
            scenario:
              "Ask the user for a number and tell them if it's even or odd.",
            category: "Operators / Sensing / Looks",
            blocks: ["ask Pick a number and wait", "if <(answer mod 2) = 0> then", "say Even! for 2 seconds", "else", "say Odd! for 2 seconds"],
            hints: [
              "Use 'ask … and wait' — the user's reply lives in the 'answer' block.",
              "The condition is '(answer) mod 2 = 0' using Operator blocks.",
              "Use if/else to say 'Even!' or 'Odd!'.",
            ],
          },
          {
            title: "Calculator",
            scenario:
              "Ask for two numbers and say their sum.",
            category: "Operators / Sensing / Variables",
            blocks: ["ask First number? and wait", "set num1 to answer", "ask Second number? and wait", "set num2 to answer", "say (num1 + num2)"],
            hints: [
              "Create two variables: num1 and num2.",
              "Store the first answer in num1, then ask again and store the second in num2.",
              "Use the '+' Operator block with the two variables inside a 'say' block.",
            ],
          },
        ],
      },
      {
        name: "Score Keeper",
        description: "Create variables to track points, lives or time.",
        stories: [
          {
            title: "Click Counter",
            scenario:
              "Each click on the sprite adds 1 to a Score variable shown on stage.",
            category: "Variables / Events",
            blocks: ["when this sprite clicked", "change Score by 1"],
            hints: [
              "Create a variable called 'Score' (For all sprites).",
              "Use 'when this sprite clicked' → 'change Score by 1'.",
              "Tick the Score variable's checkbox so it shows on the stage.",
            ],
          },
          {
            title: "Lives Left",
            scenario:
              "Start with 3 lives. When the sprite touches a spike, lose a life. Game over at 0.",
            category: "Variables / Sensing / Control",
            blocks: ["set Lives to 3", "forever", "if <touching spike?> then", "change Lives by -1", "wait 1 seconds", "if <Lives = 0> then", "stop all"],
            hints: [
              "Initialize 'Lives' to 3 at the start.",
              "In a forever loop, watch for 'touching spike?' and 'change Lives by -1'.",
              "Use an 'if Lives = 0 then stop all' check to end the game.",
            ],
          },
          {
            title: "Speed Manager",
            scenario:
              "A variable 'speed' increases when you press the up arrow and decreases when you press down.",
            category: "Variables / Events / Motion",
            blocks: ["when ⚑ clicked", "set speed to 5", "forever", "move (speed) steps", "if on edge, bounce", "when up arrow pressed", "change speed by 1", "when down arrow pressed", "change speed by -1"],
            hints: [
              "Create a variable called 'speed' and set it to 5 at the start.",
              "Inside a 'forever' loop, move the sprite by '(speed) steps'.",
              "Two arrow-key scripts: change speed by +1 / -1.",
            ],
          },
        ],
      },
      {
        name: "Joined Words",
        description: "Use string operators to build sentences.",
        stories: [
          {
            title: "Polite Greeter",
            scenario:
              "Ask for the user's name and say 'Hello, NAME!'.",
            category: "Operators / Sensing / Looks",
            blocks: ["ask What's your name? and wait", "say (join Hello, answer)"],
            hints: [
              "Use 'ask … and wait' to capture the name in 'answer'.",
              "Use the 'join' Operator to glue 'Hello, ' and 'answer' together.",
              "Wrap the 'join' inside a 'say' block.",
            ],
          },
          {
            title: "Word Length",
            scenario:
              "Ask for a word and tell the user how many letters it has.",
            category: "Operators / Sensing",
            blocks: ["ask Type a word and wait", "say (join Length is (length of answer))"],
            hints: [
              "Use 'length of (answer)' from Operators.",
              "Join 'Length is ' with that number using two 'join' blocks.",
              "Try entering different words and watch the count change.",
            ],
          },
          {
            title: "Secret Code",
            scenario:
              "Ask for a password. If it equals 'open sesame', say 'Welcome'; otherwise 'Access denied'.",
            category: "Operators / Sensing / Control",
            blocks: ["ask Password? and wait", "if <answer = open sesame> then", "say Welcome for 2 seconds", "else", "say Access denied for 2 seconds"],
            hints: [
              "Use the '=' Operator with 'answer' and the secret word.",
              "Wrap it in an if/else block.",
              "Make sure the spelling matches exactly — Scratch is case-sensitive here.",
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------
  {
    title: "Build Games",
    tagline: "My Blocks & full projects",
    summary: "My Blocks (custom blocks) + clones for bigger projects.",
    stages: [
      {
        name: "Custom Blocks",
        description: "Define reusable blocks under 'My Blocks'.",
        stories: [
          {
            title: "Draw a Square",
            scenario:
              "Create a custom block 'square (size)' that draws a square of that size.",
            category: "My Blocks / Pen / Motion",
            blocks: ["define square size", "pen down", "repeat 4", "move (size) steps", "turn ↻ 90 degrees", "pen up"],
            hints: [
              "Add the Pen extension.",
              "Create a block 'square' with a number input 'size' under 'My Blocks'.",
              "Inside the definition: pen down, repeat 4 (move size, turn 90), pen up.",
            ],
          },
          {
            title: "Polygon Maker",
            scenario:
              "Create a custom block 'polygon (sides) (size)' that draws any regular polygon.",
            category: "My Blocks / Pen / Operators",
            blocks: ["define polygon sides size", "repeat (sides)", "move (size) steps", "turn ↻ (360 / sides) degrees"],
            hints: [
              "Define 'polygon' with two inputs: sides and size.",
              "Inside, 'repeat (sides)' with 'move size' and 'turn (360 / sides) degrees'.",
              "Call polygon 5 50, polygon 6 50, polygon 8 50 to see different shapes.",
            ],
          },
          {
            title: "Greeter Block",
            scenario:
              "Create a custom block 'greet (name)' that makes the sprite say 'Hi, NAME!'.",
            category: "My Blocks / Looks",
            blocks: ["define greet name", "say (join Hi,  name) for 2 seconds"],
            hints: [
              "Create a 'greet' block with one string input called 'name'.",
              "Inside, use 'say (join Hi,  name) for 2 seconds'.",
              "Call 'greet Alice', then 'greet Bob' — both work from the same block.",
            ],
          },
        ],
      },
      {
        name: "Clone Army",
        description: "Use clones to create many identical sprites at once.",
        stories: [
          {
            title: "Star Sky",
            scenario:
              "When the flag is clicked, create 30 star clones in random positions.",
            category: "Control / Motion / Looks",
            blocks: ["when ⚑ clicked", "hide", "repeat 30", "create clone of myself", "when I start as a clone", "go to random position", "show"],
            hints: [
              "Hide the original star, then 'repeat 30 → create clone of myself'.",
              "In a 'when I start as a clone' script: 'go to random position' then 'show'.",
              "Each clone is independent — they all appear at different spots.",
            ],
          },
          {
            title: "Falling Rain",
            scenario:
              "Raindrops continuously spawn at the top and fall to the bottom.",
            category: "Control / Motion",
            blocks: ["forever", "wait 0.2 seconds", "create clone of myself", "when I start as a clone", "go to x: pick random -200 to 200 y: 180", "glide 2 secs to x: x y: -180", "delete this clone"],
            hints: [
              "Main script: forever, wait, create clone.",
              "Clone script: start at random x at top, glide down to the bottom.",
              "End each clone with 'delete this clone' to keep the project fast.",
            ],
          },
          {
            title: "Asteroid Field",
            scenario:
              "Asteroids spawn from the right and slide left. Game ends if one touches your ship.",
            category: "Control / Sensing / Motion / Variables",
            blocks: ["forever", "create clone of myself", "wait 1 seconds", "when I start as a clone", "go to x: 240 y: pick random -150 to 150", "glide pick random 1 to 3 secs to x: -240 y: y", "if <touching Ship?> then", "stop all"],
            hints: [
              "Asteroid sprite spawns clones every 1 second from x=240.",
              "Each clone glides left to x=-240 with a random speed.",
              "If the clone is 'touching Ship?', use 'stop all' to end the game.",
            ],
          },
        ],
      },
      {
        name: "Mini Game",
        description: "Combine everything into a small playable game.",
        stories: [
          {
            title: "Maze Runner",
            scenario:
              "Move a sprite with arrow keys through a maze drawn on the backdrop. Win when it reaches the goal.",
            category: "Sensing / Events / Motion / Control",
            blocks: ["when right arrow pressed", "change x by 5", "if <touching color black?> then", "change x by -5", "if <touching color green?> then", "say You win! for 2 seconds", "stop all"],
            hints: [
              "Paint maze walls in black on the backdrop and a green goal area.",
              "For each direction, move then check 'touching color black?' and undo if true.",
              "When the sprite touches green, say 'You win!' and stop all.",
            ],
          },
          {
            title: "Pong",
            scenario:
              "A paddle on the bottom bounces a ball back up. Lose a life if the ball reaches the bottom.",
            category: "Sensing / Motion / Variables",
            blocks: ["forever", "move 10 steps", "if on edge, bounce", "if <touching Paddle?> then", "turn ↻ 180 degrees", "if <y position < -170> then", "change Lives by -1"],
            hints: [
              "Paddle sprite follows the mouse on the x axis only.",
              "Ball moves continuously and bounces on edges and the paddle.",
              "If the ball's y is below -170, lose a life.",
            ],
          },
          {
            title: "Quiz Show",
            scenario:
              "Ask three multiple-choice questions and keep a score variable.",
            category: "Sensing / Variables / Operators",
            blocks: ["set Score to 0", "ask Q1: 2+2? and wait", "if <answer = 4> then", "change Score by 1", "say (join Final score:  Score) for 3 seconds"],
            hints: [
              "Reset Score to 0 at the start.",
              "Ask each question with 'ask … and wait' and compare 'answer' to the correct value.",
              "At the end, 'say (join Final score: , Score) for 3 seconds'.",
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------
  {
    title: "Creative Lab",
    tagline: "Scratch Extensions",
    summary: "Pen, Music, Translate, Text-to-Speech, Video Sensing.",
    stages: [
      {
        name: "Pen & Music",
        description: "Draw shapes and play melodies with extensions.",
        stories: [
          {
            title: "Rainbow Spiral",
            scenario:
              "Draw a colourful spiral using the Pen extension.",
            category: "Pen / Motion / Control / Operators",
            blocks: ["pen down", "repeat 200", "move (i) steps", "turn ↻ 15 degrees", "change pen color by 2"],
            hints: [
              "Add the Pen extension from the bottom-left button.",
              "Use 'pen down' then a 'repeat 200' loop with move + turn.",
              "Increase a variable 'i' each step so the spiral grows outwards.",
            ],
          },
          {
            title: "Piano Keys",
            scenario:
              "Pressing keys 1–8 plays a different note using the Music extension.",
            category: "Music / Events",
            blocks: ["when 1 key pressed", "play note 60 for 0.5 beats", "when 2 key pressed", "play note 62 for 0.5 beats"],
            hints: [
              "Add the Music extension.",
              "For each number key, add a script with 'play note __ for 0.5 beats'.",
              "Notes 60–72 give a one-octave scale.",
            ],
          },
          {
            title: "Drum Beat",
            scenario:
              "Loop a four-beat drum pattern forever.",
            category: "Music / Control",
            blocks: ["forever", "play drum 1 for 0.25 beats", "play drum 3 for 0.25 beats", "play drum 1 for 0.25 beats", "play drum 4 for 0.25 beats"],
            hints: [
              "Add the Music extension.",
              "Inside a 'forever' loop, play four drums in a row.",
              "Try changing the drum numbers (1–18) for different patterns.",
            ],
          },
        ],
      },
      {
        name: "Translator & Voice",
        description: "Use Translate and Text-to-Speech extensions.",
        stories: [
          {
            title: "Mini Translator",
            scenario:
              "Ask the user for an English word and say its Spanish translation aloud.",
            category: "Translate / Text-to-Speech / Sensing",
            blocks: ["ask Type a word and wait", "set lang to Spanish", "speak (translate answer to Spanish)"],
            hints: [
              "Add both the Translate and Text-to-Speech extensions.",
              "Use 'translate (answer) to (Spanish)' inside a 'speak' block.",
              "Try different languages by changing the second argument.",
            ],
          },
          {
            title: "Storyteller Bot",
            scenario:
              "When the flag is clicked, the sprite reads a 3-line story aloud.",
            category: "Text-to-Speech / Control",
            blocks: ["when ⚑ clicked", "speak Once upon a time...", "speak A brave kid learned to code.", "speak The end."],
            hints: [
              "Add the Text-to-Speech extension.",
              "Use three 'speak' blocks back to back.",
              "Try the 'set voice to' block to switch between kitten, giant, etc.",
            ],
          },
          {
            title: "Chatty Cat",
            scenario:
              "Ask 'How are you?' and use Text-to-Speech to read back the user's reply.",
            category: "Sensing / Text-to-Speech",
            blocks: ["ask How are you? and wait", "speak (join You said , answer)"],
            hints: [
              "Capture the reply with 'ask … and wait'.",
              "Use 'join' to build 'You said …' and feed it to 'speak'.",
              "This is your first conversational bot — congratulations!",
            ],
          },
        ],
      },
      {
        name: "Video Sensing",
        description: "Use the camera with the Video Sensing extension.",
        stories: [
          {
            title: "Wave to Move",
            scenario:
              "Make the sprite move whenever motion is detected on the camera.",
            category: "Video Sensing / Control / Motion",
            blocks: ["when ⚑ clicked", "turn video on", "forever", "if <(video motion) > 30> then", "move 10 steps"],
            hints: [
              "Add the Video Sensing extension.",
              "Use 'turn video on' once at the start.",
              "Inside a 'forever' loop, check 'video motion > 30' and move the sprite.",
            ],
          },
          {
            title: "Catch the Fish",
            scenario:
              "Fish swim across the screen — touch them with your hand (camera) to collect them.",
            category: "Video Sensing / Sensing / Variables",
            blocks: ["set Score to 0", "when video motion > sprite", "change Score by 1", "hide", "wait 1 seconds", "show"],
            hints: [
              "Each fish has 'when video motion > sprite' → score up + hide.",
              "Add a small wait, then 'show' and 'go to random position' to respawn.",
              "Display the Score variable on stage to track your catches.",
            ],
          },
          {
            title: "Camera Mirror",
            scenario:
              "Show the camera feed and overlay a sprite that follows your motion.",
            category: "Video Sensing / Motion",
            blocks: ["turn video on", "set video transparency to 30", "forever", "point in direction (video direction on sprite)", "move (video motion on sprite / 5) steps"],
            hints: [
              "Lower the video transparency so you can see yourself.",
              "Use 'video direction on sprite' to point and 'video motion on sprite' to move.",
              "Divide the motion value so the sprite doesn't shoot off too fast.",
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------
  {
    title: "Animation Studio",
    tagline: "Frames, costumes & timing",
    summary: "Bring sprites to life with costume animation and timing.",
    stages: [
      {
        name: "Walk Cycle",
        description: "Use 'next costume' inside a loop to create animation.",
        stories: [
          {
            title: "Walking Cat",
            scenario: "Make the cat walk across the stage with a proper walk-cycle animation.",
            category: "Looks / Motion / Control",
            blocks: ["when ⚑ clicked", "forever", "next costume", "move 5 steps", "wait 0.1 seconds", "if on edge, bounce"],
            hints: [
              "Inside a 'forever' loop: 'next costume', 'move 5 steps', 'wait 0.1 seconds'.",
              "Add 'if on edge, bounce' so it turns around at the edges.",
              "Try 'set rotation style left-right' so the cat flips without going upside-down.",
            ],
          },
          {
            title: "Flapping Bird",
            scenario: "A bird flaps its wings while gliding around the stage.",
            category: "Looks / Motion",
            blocks: ["forever", "switch costume to wing-up", "wait 0.15 seconds", "switch costume to wing-down", "move 4 steps"],
            hints: [
              "Pick a bird sprite with two wing costumes.",
              "Alternate 'switch costume to wing-up' / 'wing-down' with short waits.",
              "Combine with 'move' to make it glide forward while flapping.",
            ],
          },
          {
            title: "Spinning Coin",
            scenario: "A coin spins in place by cycling through 4 costumes.",
            category: "Looks / Control",
            blocks: ["forever", "next costume", "wait 0.05 seconds"],
            hints: [
              "Paint or import 4 costumes showing the coin at 0°, 45°, 90°, 135°.",
              "Loop 'next costume' with a tiny wait — the coin appears to spin.",
              "Place several coin clones around the stage for a treasure scene.",
            ],
          },
        ],
      },
      {
        name: "Smooth Motion",
        description: "Combine glide and easing for cinematic moves.",
        stories: [
          {
            title: "Camera Pan",
            scenario: "Move three sprites in formation gliding across the stage.",
            category: "Motion / Events",
            blocks: ["broadcast pan", "when I receive pan", "glide 3 secs to x: 200 y: 0"],
            hints: [
              "Each sprite listens for 'when I receive pan'.",
              "Each one glides 3 seconds to a different x offset.",
              "Use 'broadcast pan' on the green flag to start them all together.",
            ],
          },
          {
            title: "Bouncing Logo",
            scenario: "A logo bounces around like the classic DVD screensaver.",
            category: "Motion / Control",
            blocks: ["forever", "move 5 steps", "if on edge, bounce", "change color effect by 5"],
            hints: [
              "Inside 'forever': move + 'if on edge, bounce'.",
              "Add 'change color effect by 5' for the rainbow effect.",
              "Set rotation style to 'don't rotate' so the logo stays upright.",
            ],
          },
          {
            title: "Pendulum",
            scenario: "A pendulum swings back and forth using glide.",
            category: "Motion / Control",
            blocks: ["forever", "glide 1 secs to x: -100 y: -50", "glide 1 secs to x: 100 y: -50"],
            hints: [
              "Inside a forever loop, glide left then glide right.",
              "Adjust the seconds for a faster or slower swing.",
              "Add a 'point in direction' before each glide for swinging tilt.",
            ],
          },
        ],
      },
      {
        name: "Effects Lab",
        description: "Combine Looks effects for visual flair.",
        stories: [
          {
            title: "Ghostly Fade",
            scenario: "A ghost fades in and out continuously.",
            category: "Looks / Control",
            blocks: ["forever", "repeat 25", "change ghost effect by 4", "repeat 25", "change ghost effect by -4"],
            hints: [
              "Use two repeat loops: one fading out, one fading back in.",
              "'change ghost effect by 4' makes the sprite more transparent.",
              "Reset with 'clear graphic effects' at the start.",
            ],
          },
          {
            title: "Disco Lights",
            scenario: "The stage cycles through colors like a disco floor.",
            category: "Looks / Sound / Control",
            blocks: ["forever", "change color effect by 25", "wait 0.2 seconds", "play sound Pop"],
            hints: [
              "On the Stage, use 'change color effect by 25' in a forever loop.",
              "Add 'wait 0.2 seconds' for the right tempo.",
              "Play a pop sound on each beat for a club feel.",
            ],
          },
          {
            title: "Mirror Image",
            scenario: "Click a sprite and a mirrored copy appears on the other side.",
            category: "Looks / Motion / Events",
            blocks: ["when this sprite clicked", "create clone of myself", "when I start as a clone", "set x to (-1 * x position)"],
            hints: [
              "Use a clone — set its x to '-1 * x position' to mirror it.",
              "Use 'set rotation style left-right' and 'point in direction -90' to flip the costume.",
              "Try also flipping the clone's y for a 4-way mirror.",
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------
  {
    title: "Sensing Smart",
    tagline: "Inputs, timers & detection",
    summary: "Sensing blocks: mouse, keys, timer and distance.",
    stages: [
      {
        name: "Mouse & Keyboard",
        description: "React to the user's mouse and keys.",
        stories: [
          {
            title: "Mouse Trail",
            scenario: "The sprite follows the mouse with a slight delay.",
            category: "Sensing / Motion",
            blocks: ["forever", "glide 0.2 secs to mouse-pointer"],
            hints: [
              "Use 'glide 0.2 secs to mouse-pointer' inside a forever loop.",
              "Smaller glide times feel snappier, larger feel laggier.",
              "Add 'change pen color by 2' + pen down for a colorful trail.",
            ],
          },
          {
            title: "Click Anywhere",
            scenario: "When the mouse is clicked, the sprite teleports there and says 'Hi'.",
            category: "Sensing / Motion / Looks",
            blocks: ["forever", "if <mouse down?> then", "go to mouse-pointer", "say Hi for 1 seconds"],
            hints: [
              "Wrap an if inside a forever loop.",
              "Condition: 'mouse down?' from Sensing.",
              "Inside: 'go to mouse-pointer' then 'say Hi for 1 seconds'.",
            ],
          },
          {
            title: "Two-Player Race",
            scenario: "Player 1 uses W/D keys, Player 2 uses arrow keys. First to the right edge wins.",
            category: "Events / Sensing / Motion / Control",
            blocks: ["when d key pressed", "change x by 10", "when right arrow pressed", "change x by 10", "if <x position > 220> then", "say I win! for 2 seconds", "stop all"],
            hints: [
              "Two separate sprites with their own scripts.",
              "Use 'change x by 10' on key presses.",
              "First sprite to reach x > 220 says 'I win!' and stops everything.",
            ],
          },
        ],
      },
      {
        name: "Timing",
        description: "Use the timer and waits to control pacing.",
        stories: [
          {
            title: "Stopwatch",
            scenario: "Show the elapsed time. Press space to stop the clock.",
            category: "Sensing / Variables / Control",
            blocks: ["reset timer", "forever", "set Time to timer", "if <key space pressed?> then", "stop all"],
            hints: [
              "Reset the timer at the start.",
              "In a forever loop, 'set Time to (timer)' — show that variable on stage.",
              "If space is pressed, 'stop all' to freeze the clock.",
            ],
          },
          {
            title: "Reaction Test",
            scenario: "After a random wait, a sprite appears. Click it as fast as you can — show the reaction time.",
            category: "Sensing / Control / Variables",
            blocks: ["wait pick random 2 to 5 seconds", "reset timer", "show", "when this sprite clicked", "say (join Reaction:  timer)", "hide"],
            hints: [
              "First, wait a random number of seconds, then 'reset timer' + 'show'.",
              "When the sprite is clicked, 'say' the timer value.",
              "Hide afterward and run again for repeated tests.",
            ],
          },
          {
            title: "Time Trial",
            scenario: "Move from start to goal — show how long you took.",
            category: "Sensing / Variables / Events",
            blocks: ["when ⚑ clicked", "reset timer", "forever", "if <touching Goal?> then", "set FinalTime to timer", "stop all"],
            hints: [
              "Reset the timer when the flag is clicked.",
              "In a forever loop, check 'touching Goal?'.",
              "When touched, save 'set FinalTime to (timer)' and 'stop all'.",
            ],
          },
        ],
      },
      {
        name: "Distance & Detection",
        description: "Measure distance between sprites and detect collisions.",
        stories: [
          {
            title: "Heat Seeker",
            scenario: "A heat-seeking missile follows the player; says 'GOT YOU' on contact.",
            category: "Sensing / Motion / Control",
            blocks: ["forever", "point towards Player", "move 3 steps", "if <touching Player?> then", "say GOT YOU for 2 seconds", "stop all"],
            hints: [
              "Inside forever: 'point towards Player' then 'move 3 steps'.",
              "Check 'touching Player?' each loop.",
              "On contact, say the message and stop the game.",
            ],
          },
          {
            title: "Treasure Hunt",
            scenario: "The sprite says 'hot' or 'cold' based on distance to a hidden treasure.",
            category: "Sensing / Operators / Looks",
            blocks: ["forever", "if <(distance to Treasure) < 50> then", "say Hot! for 1 seconds", "else", "say Cold for 1 seconds"],
            hints: [
              "Use 'distance to Treasure' from Sensing.",
              "Compare it with 50 using the '<' operator.",
              "Switch between 'Hot!' and 'Cold' messages.",
            ],
          },
          {
            title: "Proximity Alarm",
            scenario: "When two sprites get close, both flash red and the alarm plays.",
            category: "Sensing / Looks / Sound",
            blocks: ["forever", "if <(distance to Other) < 80> then", "change color effect by 25", "start sound Alarm"],
            hints: [
              "Each sprite checks 'distance to Other' in a forever loop.",
              "If close, 'change color effect' and play a short sound.",
              "Use 'clear graphic effects' when far apart again.",
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------
  {
    title: "Data & Lists",
    tagline: "Variables, lists & loops",
    summary: "Store and process data with lists and repeat-until loops.",
    stages: [
      {
        name: "Lists Basics",
        description: "Add and read items from a list.",
        stories: [
          {
            title: "Shopping List",
            scenario: "Ask the user for 5 items and add them to a list, then say the whole list.",
            category: "Variables (lists) / Sensing",
            blocks: ["repeat 5", "ask Item? and wait", "add answer to Cart", "say Cart for 3 seconds"],
            hints: [
              "Create a list called 'Cart'.",
              "Use 'repeat 5' with 'ask Item? and wait' → 'add answer to Cart'.",
              "Finish with 'say (Cart)' to display the whole list.",
            ],
          },
          {
            title: "Pick a Winner",
            scenario: "From a list of names, pick a random winner and announce it.",
            category: "Variables (lists) / Operators / Looks",
            blocks: ["say (item (pick random 1 to (length of Names)) of Names) for 3 seconds"],
            hints: [
              "Make a list 'Names' with several entries.",
              "Use 'pick random 1 to (length of Names)' as the index.",
              "Wrap it in 'item ___ of Names' inside a 'say' block.",
            ],
          },
          {
            title: "To-Do Tracker",
            scenario: "Ask the user to type tasks until they type 'done', then count them.",
            category: "Variables (lists) / Control / Sensing",
            blocks: ["repeat until <answer = done>", "ask Next task and wait", "add answer to Tasks", "say (join You have  (length of Tasks))"],
            hints: [
              "Use 'repeat until' with the condition 'answer = done'.",
              "Each iteration: ask for a task and add it to 'Tasks'.",
              "Finish by saying the length of the list.",
            ],
          },
        ],
      },
      {
        name: "Searching",
        description: "Walk through a list to find an item.",
        stories: [
          {
            title: "Name Finder",
            scenario: "Ask the user for a name and say whether it's in the Names list.",
            category: "Variables (lists) / Operators / Control",
            blocks: ["ask Name? and wait", "if <Names contains answer> then", "say Found! for 2 seconds", "else", "say Missing for 2 seconds"],
            hints: [
              "Use the 'list contains item' boolean from Variables.",
              "Wrap it in an if/else.",
              "Show a positive and negative message accordingly.",
            ],
          },
          {
            title: "High Score Board",
            scenario: "Keep a list of top 5 scores. New scores are inserted in order.",
            category: "Variables (lists) / Operators / Control",
            blocks: ["set i to 1", "repeat until <(item i of Scores) < newScore>", "change i by 1", "insert newScore at i of Scores", "delete 6 of Scores"],
            hints: [
              "Walk down the list until you find a smaller score.",
              "Use 'insert ___ at i of Scores'.",
              "After insertion, delete the 6th item to keep only the top 5.",
            ],
          },
          {
            title: "Anagram Checker",
            scenario: "Ask for two words and say whether they have the same letters.",
            category: "Operators / Sensing / Looks",
            blocks: ["ask Word 1? and wait", "set w1 to answer", "ask Word 2? and wait", "if <(length of w1) = (length of answer)> then", "say Same length"],
            hints: [
              "This is a stretch goal — start by comparing lengths.",
              "Use 'letter (i) of (word)' inside a loop to build sorted versions.",
              "Two strings are anagrams if their sorted letters match.",
            ],
          },
        ],
      },
      {
        name: "Iteration",
        description: "Process every item in a list.",
        stories: [
          {
            title: "Sum the Numbers",
            scenario: "Sum every number in a list and say the total.",
            category: "Variables (lists) / Operators / Control",
            blocks: ["set Total to 0", "set i to 1", "repeat (length of Nums)", "change Total by (item i of Nums)", "change i by 1", "say Total"],
            hints: [
              "Start Total = 0 and i = 1.",
              "Loop length-of-list times: 'change Total by (item i of Nums)' then 'change i by 1'.",
              "Finish with 'say Total'.",
            ],
          },
          {
            title: "Read Each",
            scenario: "Have the cat say every item from a list, one second each.",
            category: "Variables (lists) / Control",
            blocks: ["set i to 1", "repeat (length of List)", "say (item i of List) for 1 seconds", "change i by 1"],
            hints: [
              "Use the same pattern: i starts at 1.",
              "Inside the repeat: 'say (item i of List)' then 'change i by 1'.",
              "Try removing the wait — what happens? (Items flicker by fast.)",
            ],
          },
          {
            title: "Average Score",
            scenario: "Calculate the average of all numbers in a list.",
            category: "Variables (lists) / Operators",
            blocks: ["set Sum to 0", "repeat (length of Nums)", "change Sum by (item i of Nums)", "say (Sum / (length of Nums))"],
            hints: [
              "Sum every item using the loop from 'Sum the Numbers'.",
              "Divide Sum by 'length of Nums' to get the average.",
              "Display it with 'say'.",
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------
  {
    title: "Audio Magic",
    tagline: "Music & sound design",
    summary: "Build melodies, beats and dynamic soundtracks.",
    stages: [
      {
        name: "Note by Note",
        description: "Compose melodies with the Music extension.",
        stories: [
          {
            title: "Twinkle Twinkle",
            scenario: "Play the first line of 'Twinkle Twinkle Little Star'.",
            category: "Music / Events",
            blocks: ["when ⚑ clicked", "play note 60 for 0.5 beats", "play note 60 for 0.5 beats", "play note 67 for 0.5 beats", "play note 67 for 0.5 beats", "play note 69 for 0.5 beats", "play note 69 for 0.5 beats", "play note 67 for 1 beats"],
            hints: [
              "Add the Music extension.",
              "Notes: C C G G A A G (60, 60, 67, 67, 69, 69, 67).",
              "Use 0.5-beat notes; finish on a 1-beat note for the long ending.",
            ],
          },
          {
            title: "Custom Tune",
            scenario: "Create a custom block 'song' that plays a 5-note melody.",
            category: "My Blocks / Music",
            blocks: ["define song", "play note 60 for 0.25 beats", "play note 62 for 0.25 beats", "play note 64 for 0.25 beats", "play note 65 for 0.25 beats", "play note 67 for 0.5 beats"],
            hints: [
              "Define 'song' under My Blocks.",
              "Add 5 'play note' blocks inside the definition.",
              "Call 'song' from the green-flag script.",
            ],
          },
          {
            title: "Tempo Master",
            scenario: "Use the up/down arrows to speed up or slow down the song.",
            category: "Music / Events",
            blocks: ["when up arrow pressed", "change tempo by 20", "when down arrow pressed", "change tempo by -20"],
            hints: [
              "The 'tempo' is a built-in Music variable measured in BPM.",
              "Two scripts: up arrow adds 20, down arrow subtracts 20.",
              "Display 'tempo' on the stage to see it change live.",
            ],
          },
        ],
      },
      {
        name: "Beat Machine",
        description: "Layer drums for a beat.",
        stories: [
          {
            title: "Four on the Floor",
            scenario: "Play a steady kick-drum beat at 120 BPM.",
            category: "Music / Control",
            blocks: ["set tempo to 120", "forever", "play drum 1 for 0.5 beats"],
            hints: [
              "Set tempo to 120 at the start.",
              "Inside a forever loop, 'play drum 1 for 0.5 beats'.",
              "Try playing drum 2 (snare) every other beat for a kick+snare pattern.",
            ],
          },
          {
            title: "Drum & Bass",
            scenario: "Two sprites: one plays a drum pattern, the other plays a bassline.",
            category: "Music / Events",
            blocks: ["broadcast start", "when I receive start", "forever", "play drum 1 for 0.25 beats", "play note 36 for 0.25 beats"],
            hints: [
              "On flag, 'broadcast start' so both sprites begin together.",
              "Drum sprite loops drum hits; bass sprite loops low notes (36).",
              "Synchronize tempo with 'set tempo to ___' at the start of each sprite.",
            ],
          },
          {
            title: "Make a Song",
            scenario: "Combine drums, bass, and melody into a short song that plays on flag click.",
            category: "Music / My Blocks / Events",
            blocks: ["when ⚑ clicked", "set tempo to 100", "repeat 4", "drums", "bass", "melody"],
            hints: [
              "Create 'drums', 'bass', 'melody' custom blocks.",
              "Use 'repeat 4' to play 4 measures.",
              "Inside each custom block, sequence the appropriate notes/drums.",
            ],
          },
        ],
      },
      {
        name: "Sound Design",
        description: "Record/use sounds and effects.",
        stories: [
          {
            title: "Echo Effect",
            scenario: "Play the same sound at three different volumes for an echo.",
            category: "Sound / Control",
            blocks: ["set volume to 100", "start sound Pop", "wait 0.3 seconds", "set volume to 60", "start sound Pop", "wait 0.3 seconds", "set volume to 30", "start sound Pop"],
            hints: [
              "Use 'start sound' so the next sound can overlap.",
              "Lower the volume between plays for a fading echo.",
              "Try changing the wait length to widen or tighten the echo.",
            ],
          },
          {
            title: "Pitch Bender",
            scenario: "Hold the right arrow to raise the pitch, left to lower it.",
            category: "Sound / Events",
            blocks: ["when right arrow pressed", "change pitch effect by 25", "when left arrow pressed", "change pitch effect by -25", "when ⚑ clicked", "forever", "play sound Meow until done"],
            hints: [
              "Loop 'play sound Meow until done' in the background.",
              "Two arrow-key scripts: 'change pitch effect by ±25'.",
              "Reset with 'clear sound effects' to start fresh.",
            ],
          },
          {
            title: "Beat Box",
            scenario: "Press keys 1–4 to trigger different drum samples.",
            category: "Sound / Events",
            blocks: ["when 1 key pressed", "start sound Drum-Kick", "when 2 key pressed", "start sound Drum-Snare", "when 3 key pressed", "start sound Hi-Hat", "when 4 key pressed", "start sound Clap"],
            hints: [
              "Each key gets its own event hat.",
              "Use 'start sound' so beats can overlap.",
              "Record yourself jamming, then save the project!",
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------
  {
    title: "Art with Code",
    tagline: "Pen, geometry & fractals",
    summary: "Draw shapes, spirals, and fractals using the Pen extension.",
    stages: [
      {
        name: "Lines & Shapes",
        description: "Basic pen drawing with primitive shapes.",
        stories: [
          {
            title: "Star Burst",
            scenario: "Draw a 5-point star using the Pen extension.",
            category: "Pen / Motion / Control",
            blocks: ["pen down", "repeat 5", "move 100 steps", "turn ↻ 144 degrees", "pen up"],
            hints: [
              "Add the Pen extension.",
              "Use 'repeat 5' with 'move 100 steps' and 'turn 144°'.",
              "144° is 360°/2.5 — that's the magic angle for a 5-point star.",
            ],
          },
          {
            title: "Circle Pack",
            scenario: "Draw a circle by repeating tiny moves and turns.",
            category: "Pen / Motion / Control",
            blocks: ["pen down", "repeat 360", "move 1 steps", "turn ↻ 1 degrees", "pen up"],
            hints: [
              "Drawing a circle = 360 small moves + 1° turns.",
              "Move 1 step then turn 1 degree, 360 times.",
              "Change move-size for a larger circle (try 2 steps).",
            ],
          },
          {
            title: "Triangle Stamp",
            scenario: "Draw 6 triangles around a central point.",
            category: "Pen / Motion / Control",
            blocks: ["repeat 6", "repeat 3", "move 80 steps", "turn ↻ 120 degrees", "turn ↻ 60 degrees"],
            hints: [
              "Outer loop runs 6 times — one per triangle.",
              "Inner loop draws the triangle (3 sides, 120° each).",
              "After each triangle, turn 60° to spread them around the center.",
            ],
          },
        ],
      },
      {
        name: "Spirals & Patterns",
        description: "Build complex patterns from simple rules.",
        stories: [
          {
            title: "Square Spiral",
            scenario: "Draw a spiral by increasing the side length each step.",
            category: "Pen / Variables / Control",
            blocks: ["set side to 5", "repeat 50", "move (side) steps", "turn ↻ 90 degrees", "change side by 3"],
            hints: [
              "Start with 'side = 5'.",
              "Each repeat: move (side), turn 90°, then 'change side by 3'.",
              "Try 91° instead of 90° for a curvy spiral.",
            ],
          },
          {
            title: "Rainbow Spiral",
            scenario: "Like Square Spiral but each line is a different color.",
            category: "Pen / Variables / Control",
            blocks: ["set side to 5", "repeat 80", "change pen color by 3", "move (side) steps", "turn ↻ 91 degrees", "change side by 2"],
            hints: [
              "Start with 'change pen color by 3' inside the loop.",
              "Use 91° for a slightly twisted spiral.",
              "Increase 'side' so the lines get longer each turn.",
            ],
          },
          {
            title: "Mandala",
            scenario: "Draw a symmetrical flower-like pattern.",
            category: "Pen / Motion / Control",
            blocks: ["repeat 36", "repeat 36", "move 2 steps", "turn ↻ 10 degrees", "turn ↻ 10 degrees"],
            hints: [
              "Outer loop spins the design 36 times around the center.",
              "Inner loop draws a small circle each time.",
              "Add color changes for a magical look.",
            ],
          },
        ],
      },
      {
        name: "Fractals",
        description: "Recursion-style patterns using custom blocks.",
        stories: [
          {
            title: "Tree Branches",
            scenario: "Create a custom 'branch' block that draws a tree.",
            category: "My Blocks / Pen / Operators",
            blocks: ["define branch length depth", "if <depth = 0> then", "stop this script", "move (length) steps", "turn ↻ 25", "branch (length * 0.7) (depth - 1)", "turn ↺ 50", "branch (length * 0.7) (depth - 1)"],
            hints: [
              "Define 'branch' with two inputs: length and depth.",
              "Base case: if depth = 0, stop.",
              "Otherwise draw, then recursively call 'branch' for the two sub-branches.",
            ],
          },
          {
            title: "Koch Snowflake",
            scenario: "Draw a snowflake fractal using a recursive side block.",
            category: "My Blocks / Pen / Operators",
            blocks: ["define side length depth", "if <depth = 0> then", "move (length) steps", "stop this script", "side (length / 3) (depth - 1)", "turn ↺ 60", "side (length / 3) (depth - 1)"],
            hints: [
              "Each side has 4 sub-sides at 60° angles.",
              "Recursive call: 'side (length/3) (depth-1)'.",
              "Call side 3 times with 120° between for the full snowflake.",
            ],
          },
          {
            title: "Sierpinski Triangle",
            scenario: "Plot the Sierpinski Triangle using the chaos game algorithm.",
            category: "Pen / Operators / Variables",
            blocks: ["repeat 5000", "set p to pick random 1 to 3", "go to ((x + corner_x[p]) / 2) , ((y + corner_y[p]) / 2)", "pen down"],
            hints: [
              "Pick 3 corner points (top, bottom-left, bottom-right).",
              "Each step: pick a random corner, move halfway toward it, stamp a dot.",
              "After thousands of iterations, the Sierpinski pattern appears.",
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------
  {
    title: "Story Engine",
    tagline: "Cutscenes & branching dialogue",
    summary: "Build interactive stories with choices and dialogue.",
    stages: [
      {
        name: "Cutscene",
        description: "Sequence scenes with broadcasts.",
        stories: [
          {
            title: "Opening Scene",
            scenario: "When the flag is clicked, show a title, then fade to the first scene.",
            category: "Looks / Events / Control",
            blocks: ["when ⚑ clicked", "switch backdrop to title", "wait 2 seconds", "switch backdrop to scene1", "broadcast start"],
            hints: [
              "Switch to the title backdrop first.",
              "Wait, then switch to 'scene1' and broadcast 'start'.",
              "Sprites listen with 'when I receive start' to enter the scene.",
            ],
          },
          {
            title: "Two Characters Meet",
            scenario: "Two sprites enter from opposite sides, meet in the middle, and exchange greetings.",
            category: "Events / Motion / Looks",
            blocks: ["when I receive start", "glide 2 secs to x: 0 y: 0", "say Hello! for 2 seconds", "broadcast reply"],
            hints: [
              "Each sprite glides to the center.",
              "Sprite A says 'Hello!' then broadcasts 'reply'.",
              "Sprite B's 'when I receive reply' says 'Hi back!'.",
            ],
          },
          {
            title: "Scene Transition",
            scenario: "After the dialogue, fade to black and switch to a new backdrop.",
            category: "Looks / Events",
            blocks: ["repeat 25", "change brightness effect by -4", "switch backdrop to scene2", "repeat 25", "change brightness effect by 4"],
            hints: [
              "Fade out by lowering 'brightness effect'.",
              "Switch backdrop while dark.",
              "Fade back in with 'change brightness effect by 4'.",
            ],
          },
        ],
      },
      {
        name: "Choices",
        description: "Branch the story based on the user's choice.",
        stories: [
          {
            title: "Pick a Path",
            scenario: "Ask 'Forest or Castle?' and show a different scene for each answer.",
            category: "Sensing / Control / Looks",
            blocks: ["ask Forest or Castle? and wait", "if <answer = Forest> then", "switch backdrop to forest", "else", "switch backdrop to castle"],
            hints: [
              "Ask the user with 'ask … and wait'.",
              "Use if/else to switch backdrops.",
              "Lowercase compare with the 'join' operator if you want flexibility.",
            ],
          },
          {
            title: "Three Doors",
            scenario: "Show three doors. Click one to reveal what's behind.",
            category: "Events / Looks",
            blocks: ["when this sprite clicked", "broadcast door1", "when I receive door1", "switch backdrop to room1"],
            hints: [
              "Each door is its own sprite with a click handler that broadcasts.",
              "Stage listens with 'when I receive door1', 'door2', 'door3' and switches backdrops.",
              "Add 'play sound Open' when entering for extra feel.",
            ],
          },
          {
            title: "Multiple Endings",
            scenario: "Based on a variable 'Karma', show one of three endings.",
            category: "Variables / Control / Events",
            blocks: ["if <Karma > 5> then", "switch backdrop to happyEnding", "else", "if <Karma < -5> then", "switch backdrop to badEnding", "else", "switch backdrop to neutralEnding"],
            hints: [
              "Track a Karma variable throughout your story.",
              "At the end, use nested if/else to choose the ending.",
              "Try 'broadcast credits' to roll credits after the ending screen.",
            ],
          },
        ],
      },
      {
        name: "Dialogue Trees",
        description: "Branch dialogues with multiple responses.",
        stories: [
          {
            title: "Friendly NPC",
            scenario: "Talk to a villager. Choose 'Quest' or 'Bye' — they react differently.",
            category: "Sensing / Control",
            blocks: ["ask Quest or Bye? and wait", "if <answer = Quest> then", "say Find the lost cat for 3 seconds", "else", "say Safe travels for 2 seconds"],
            hints: [
              "Ask the player to type a keyword.",
              "Branch with if/else.",
              "Add a third option for 'help' that explains the controls.",
            ],
          },
          {
            title: "Romance Path",
            scenario: "After 3 conversations, a friend variable affects the ending.",
            category: "Variables / Control",
            blocks: ["change Friendship by 1", "if <Friendship >= 3> then", "say Best friends! for 3 seconds", "else", "say See you around for 2 seconds"],
            hints: [
              "Increment 'Friendship' each time the player picks a friendly option.",
              "Compare with >= to a threshold.",
              "Show different dialogue when the threshold is crossed.",
            ],
          },
          {
            title: "Mystery Interrogation",
            scenario: "A detective sprite cycles through 4 suspects, asking each one a question.",
            category: "Events / Sensing / Variables / Control",
            blocks: ["set suspect to 1", "repeat 4", "broadcast interrogate", "ask Lie or Truth? and wait", "if <answer = Truth> then", "change Trust by 1", "change suspect by 1"],
            hints: [
              "Loop over 4 suspects with a variable index.",
              "Broadcast 'interrogate' so the right suspect responds.",
              "Track a Trust variable to determine the case outcome.",
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------
  {
    title: "Physics Playground",
    tagline: "Gravity, jumps & collisions",
    summary: "Simulate motion: gravity, jumping, friction and collisions.",
    stages: [
      {
        name: "Gravity",
        description: "Make objects fall and bounce.",
        stories: [
          {
            title: "Falling Apple",
            scenario: "The apple accelerates downward and stops at the floor.",
            category: "Variables / Motion / Control / Sensing",
            blocks: ["set vy to 0", "forever", "change vy by -1", "change y by vy", "if <y position < -150> then", "set vy to 0", "set y to -150"],
            hints: [
              "Create 'vy' (velocity y) starting at 0.",
              "Each frame: subtract 1 from vy (gravity), then 'change y by vy'.",
              "When the apple hits the floor, zero out vy and clamp y.",
            ],
          },
          {
            title: "Bouncing Ball",
            scenario: "A ball falls and bounces with a little energy loss each bounce.",
            category: "Variables / Motion / Control",
            blocks: ["forever", "change vy by -1", "change y by vy", "if <y position < -150> then", "set vy to (vy * -0.8)"],
            hints: [
              "Same gravity + position update as Falling Apple.",
              "When hitting the floor, reverse vy and multiply by 0.8 (energy loss).",
              "After enough bounces it settles on the floor.",
            ],
          },
          {
            title: "Pendulum Swing",
            scenario: "Simulate a swinging pendulum using angle and angular velocity.",
            category: "Variables / Motion / Operators / Control",
            blocks: ["set angle to 30", "set vAngle to 0", "forever", "change vAngle by (- angle / 10)", "change angle by vAngle"],
            hints: [
              "Treat 'angle' like position and 'vAngle' like velocity.",
              "Acceleration toward equilibrium = -angle / 10.",
              "Multiply vAngle by 0.99 each step for friction.",
            ],
          },
        ],
      },
      {
        name: "Jumping",
        description: "Build a platformer jump.",
        stories: [
          {
            title: "Jump on Space",
            scenario: "Press space to jump; gravity pulls the sprite back down.",
            category: "Events / Variables / Motion",
            blocks: ["when space key pressed", "if <onGround = 1> then", "set vy to 15", "forever", "change vy by -1", "change y by vy"],
            hints: [
              "Use 'vy' for vertical velocity.",
              "On space, only jump if 'onGround = 1' (a ground check).",
              "Inside a forever loop, apply gravity each tick.",
            ],
          },
          {
            title: "Double Jump",
            scenario: "Allow the sprite to jump twice before landing.",
            category: "Variables / Events / Control",
            blocks: ["when space key pressed", "if <jumps < 2> then", "set vy to 15", "change jumps by 1"],
            hints: [
              "Track a 'jumps' variable.",
              "Reset 'jumps' to 0 when the sprite lands.",
              "Allow another jump only when 'jumps < 2'.",
            ],
          },
          {
            title: "Platform Hopper",
            scenario: "The sprite can stand on multiple platforms.",
            category: "Sensing / Variables / Motion / Control",
            blocks: ["forever", "if <touching Platform?> then", "set vy to 0", "set onGround to 1", "else", "change vy by -1", "set onGround to 0"],
            hints: [
              "Detect platforms with 'touching Platform?'.",
              "On contact, zero gravity and set onGround = 1.",
              "Otherwise, apply gravity and clear onGround.",
            ],
          },
        ],
      },
      {
        name: "Collisions",
        description: "React when sprites touch.",
        stories: [
          {
            title: "Brick Breaker",
            scenario: "A ball bounces off bricks. Each brick disappears on contact.",
            category: "Sensing / Variables / Motion / Control",
            blocks: ["forever", "if <touching Brick?> then", "set vy to (vy * -1)", "broadcast hit"],
            hints: [
              "Ball: reverse vy on brick contact and broadcast 'hit'.",
              "Brick: 'when I receive hit' + 'if touching Ball?' then 'hide'.",
              "Track Score with each broken brick.",
            ],
          },
          {
            title: "Push-Box Puzzle",
            scenario: "The player can push a box across the stage.",
            category: "Events / Sensing / Motion",
            blocks: ["when right arrow pressed", "if <touching Box?> then", "broadcast pushRight", "change x by 10", "when I receive pushRight", "change x by 10"],
            hints: [
              "Player moves with arrow keys.",
              "If touching the Box, broadcast 'pushRight'.",
              "Box listens and changes x by the same amount.",
            ],
          },
          {
            title: "Top-Down Bumper",
            scenario: "Two sprites that bump off each other when they collide.",
            category: "Sensing / Variables / Motion",
            blocks: ["forever", "if <touching Other?> then", "set vx to (vx * -1)", "set vy to (vy * -1)"],
            hints: [
              "Each sprite has its own vx, vy.",
              "On collision, flip both velocities.",
              "Move slightly apart afterward to avoid getting stuck.",
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------
  {
    title: "AI & Bots",
    tagline: "Chatbots, speech & translate",
    summary: "Use Text-to-Speech and Translate to make smart-feeling bots.",
    stages: [
      {
        name: "Chatbots",
        description: "Hold a back-and-forth conversation.",
        stories: [
          {
            title: "Echo Bot",
            scenario: "Whatever the user types, the bot reads it aloud.",
            category: "Sensing / Text-to-Speech",
            blocks: ["forever", "ask Say something and wait", "speak answer"],
            hints: [
              "Add the Text-to-Speech extension.",
              "Inside a forever loop, ask and speak the answer.",
              "Press the stop button when finished — it's an infinite loop.",
            ],
          },
          {
            title: "Mood Mirror",
            scenario: "Ask 'How are you?' and respond differently based on positive vs negative words.",
            category: "Sensing / Operators / TTS / Control",
            blocks: ["ask How are you? and wait", "if <answer contains happy> then", "speak Glad to hear that!", "if <answer contains sad> then", "speak I'm here for you"],
            hints: [
              "Use 'answer contains __' from Operators.",
              "Branch with multiple ifs for different feelings.",
              "Add an else for neutral replies.",
            ],
          },
          {
            title: "Knowledge Bot",
            scenario: "The bot answers 3 trivia questions correctly using a list-based memory.",
            category: "Variables (lists) / Operators / TTS / Control",
            blocks: ["ask What's the capital of France? and wait", "if <answer = Paris> then", "speak Correct!", "else", "speak Nope, it's Paris"],
            hints: [
              "Hardcode 3 Q&A pairs as if/else blocks.",
              "Use 'lowercase' on the answer for fuzzy matching.",
              "For bonus: store Qs/As in two lists and loop through them.",
            ],
          },
        ],
      },
      {
        name: "Translate",
        description: "Use the Translate extension for language tasks.",
        stories: [
          {
            title: "World Greeter",
            scenario: "Cycle through 'Hello' in 5 languages on flag click.",
            category: "Translate / TTS / Control",
            blocks: ["repeat 5", "speak (translate Hello to (item i of Langs))"],
            hints: [
              "Store 5 language codes in a list 'Langs' (es, fr, ja, hi, sw).",
              "Loop through them with index i, translating and speaking each one.",
              "Use 'set voice to' to change voices for variety.",
            ],
          },
          {
            title: "Travel Phrasebook",
            scenario: "User picks a language; the bot says 'where is the bathroom?' translated.",
            category: "Translate / Sensing / TTS",
            blocks: ["ask Language code? and wait", "speak (translate Where is the bathroom? to answer)"],
            hints: [
              "Translate any English phrase to the language code the user types.",
              "Pair with TTS for an audio phrasebook.",
              "Add error handling: if 'answer' is empty, default to 'es'.",
            ],
          },
          {
            title: "Story in 2 Languages",
            scenario: "Tell a 3-sentence story in English, then again translated.",
            category: "Translate / TTS / Control",
            blocks: ["set story to Once upon a time...", "speak story", "speak (translate story to French)"],
            hints: [
              "Set 'story' to your sentence using a variable.",
              "Speak it first in English.",
              "Speak the translated version after a pause.",
            ],
          },
        ],
      },
      {
        name: "Game AI",
        description: "Sprites with simple intelligence.",
        stories: [
          {
            title: "Chaser",
            scenario: "An enemy chases the player; jumps to a new spot when the player escapes.",
            category: "Sensing / Motion / Control",
            blocks: ["forever", "point towards Player", "move 2 steps", "if <(distance to Player) > 300> then", "go to random position"],
            hints: [
              "Always point and move toward the player.",
              "If the distance is too big, teleport to a new spot.",
              "Vary movement speed for harder enemies.",
            ],
          },
          {
            title: "Patrol",
            scenario: "A guard walks back and forth between two points.",
            category: "Motion / Control",
            blocks: ["forever", "glide 2 secs to x: -100 y: 0", "glide 2 secs to x: 100 y: 0"],
            hints: [
              "Two glides in a forever loop create a patrol.",
              "Add 'switch costume' to make the guard turn.",
              "If the guard sees the player ('distance < 80'), broadcast 'alarm'.",
            ],
          },
          {
            title: "Smart Pong AI",
            scenario: "A computer paddle tracks the ball's y position.",
            category: "Variables / Motion / Control",
            blocks: ["forever", "set y to ([y position of Ball] * 0.9)"],
            hints: [
              "Use 'y position of Ball' to find the ball's vertical position.",
              "Multiply by 0.9 so the AI lags slightly (otherwise it never loses).",
              "Set the paddle's y to the result every frame.",
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------
  {
    title: "Multiplayer & Web",
    tagline: "Cloud variables & sharing",
    summary: "Cloud variables, simple leaderboards, and sharing projects.",
    stages: [
      {
        name: "Cloud Vars",
        description: "Use ☁ cloud variables (numbers only, signed-in users).",
        stories: [
          {
            title: "Shared Score",
            scenario: "A cloud variable 'Best' updates whenever a player beats the record.",
            category: "Variables (cloud) / Operators",
            blocks: ["if <Score > ☁ Best> then", "set ☁ Best to Score"],
            hints: [
              "Make a cloud variable '☁ Best' (only available signed in on Scratch.mit.edu).",
              "Compare local Score to ☁ Best and update when better.",
              "Show ☁ Best on stage so everyone can see the world record.",
            ],
          },
          {
            title: "Visitor Counter",
            scenario: "Each time someone runs the project, increment a cloud counter.",
            category: "Variables (cloud) / Events",
            blocks: ["when ⚑ clicked", "change ☁ Visits by 1"],
            hints: [
              "Make '☁ Visits' as a cloud variable.",
              "On flag click, increment by 1.",
              "Display it as a big number on the stage.",
            ],
          },
          {
            title: "Top 10 Board",
            scenario: "Maintain a top-10 leaderboard using 10 cloud variables.",
            category: "Variables (cloud) / Operators",
            blocks: ["if <Score > ☁ Score10> then", "set ☁ Score10 to Score"],
            hints: [
              "Create ☁ Score1 through ☁ Score10.",
              "Insert the new score in the right position, shifting others down.",
              "Cloud variables only store numbers — encode names as digit codes if needed.",
            ],
          },
        ],
      },
      {
        name: "Share & Remix",
        description: "Prepare projects for sharing on the Scratch community.",
        stories: [
          {
            title: "Add Instructions",
            scenario: "Add a Notes & Credits section explaining how to play.",
            category: "Project setup",
            blocks: ["Project Notes", "Instructions", "Credits"],
            hints: [
              "On Scratch.mit.edu, edit the Notes & Credits sections of the project.",
              "Explain controls and goal in 2–3 sentences.",
              "Credit any sprites/sounds you didn't make.",
            ],
          },
          {
            title: "Custom Thumbnail",
            scenario: "Pose your sprites and set a great cover screenshot.",
            category: "Project setup",
            blocks: ["Backdrop", "Sprites", "Snapshot"],
            hints: [
              "Pose the sprites in an attractive composition.",
              "Click the camera icon next to the green flag to set the thumbnail.",
              "A clear thumbnail boosts engagement on Scratch.",
            ],
          },
          {
            title: "Remix Challenge",
            scenario: "Find an existing project on Scratch and remix it with your own twist.",
            category: "Community",
            blocks: ["Remix"],
            hints: [
              "Browse https://scratch.mit.edu/explore for inspiration.",
              "Click 'Remix' to fork the project under your account.",
              "Change at least 3 things: sprites, backdrop, or scripts.",
            ],
          },
        ],
      },
      {
        name: "Polish & Publish",
        description: "Finish your portfolio.",
        stories: [
          {
            title: "Title Screen",
            scenario: "Add a polished title screen with a Play button.",
            category: "Looks / Events",
            blocks: ["when ⚑ clicked", "switch backdrop to title", "when this sprite clicked", "broadcast play", "switch backdrop to level1"],
            hints: [
              "Start on a title backdrop with logo and a Play sprite.",
              "Clicking Play broadcasts 'play' and switches to level1.",
              "Hide the Play button after clicking.",
            ],
          },
          {
            title: "Game Over Screen",
            scenario: "Show a Game Over screen with the score and a Retry button.",
            category: "Events / Looks / Variables",
            blocks: ["broadcast gameover", "when I receive gameover", "switch backdrop to gameover", "say (join Score:  Score)"],
            hints: [
              "Broadcast 'gameover' when the player loses.",
              "Stage switches backdrop and a sprite shows the final score.",
              "A Retry button broadcasts 'restart' to reset variables.",
            ],
          },
          {
            title: "Capstone Project",
            scenario: "Build a complete game combining everything you've learned: sprites, sounds, variables, levels, and a polished UI.",
            category: "All categories",
            blocks: ["sprites", "events", "control", "sensing", "operators", "variables", "looks", "sound", "motion", "my blocks"],
            hints: [
              "Outline 3 levels of increasing difficulty.",
              "Reuse custom blocks ('My Blocks') for repeating logic.",
              "Test on a friend — refine controls based on their feedback.",
            ],
          },
        ],
      },
    ],
  },
];

// Flat list of stories with their levelIndex/stageIndex/storyIndex/globalIndex,
// used by the syllabus builder to map a quest "index" → story.
export interface CodingStoryEntry extends CodingStory {
  levelIndex: number;
  stageIndex: number;
  storyIndexInStage: number;
}

export const flattenCodingLevel = (levelIndex: number): CodingStoryEntry[] => {
  const level = CODING_LEVELS[levelIndex];
  const out: CodingStoryEntry[] = [];
  level.stages.forEach((stage, stageIndex) => {
    stage.stories.forEach((story, storyIndexInStage) => {
      out.push({ ...story, levelIndex, stageIndex, storyIndexInStage });
    });
  });
  return out;
};
