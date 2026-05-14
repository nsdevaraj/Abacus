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
