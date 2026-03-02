export interface CodingProblemContent {
  title: string;
  concepts: string;
  projectId?: string; // Optional Scratch Project ID if known
  url?: string; // Optional URL
}

export const CODING_CONTENT: CodingProblemContent[] = [
  {
    title: "Hello World Project",
    concepts: "Scratch introduction with Commands",
    url: "https://scratch.mit.edu/projects/editor/?tutorial=getStarted"
  },
  {
    title: "Bouncing Ball, Racing Car and Flying Bird",
    concepts: "Understanding Motion and Looks Blocks",
    url: "https://scratch.mit.edu/projects/editor/"
  },
  {
    title: "Jumping, Gliding, Zig zag Pattern, Fireworks show, Changing Backdrops",
    concepts: "Understanding Sound, Events and Control Blocks",
    url: "https://scratch.mit.edu/projects/editor/"
  },
  {
    title: "Catching game, Manage your speed",
    concepts: "Understanding Sensing, Operators and Variable Blocks",
    url: "https://scratch.mit.edu/projects/editor/"
  },
  {
    title: "Maze game, Dancing PICO, Spring season",
    concepts: "Application of Motion and Control Blocks",
    url: "https://scratch.mit.edu/projects/editor/"
  },
  {
    title: "Invitation card and Welcome to my Birthday Party!",
    concepts: "Application of Motion, Costumes, Looks and Sounds",
    url: "https://scratch.mit.edu/projects/editor/"
  },
  {
    title: "Sharing is caring!",
    concepts: "Application of Events, Control, Motion and Sensing Blocks",
    url: "https://scratch.mit.edu/projects/editor/"
  },
  {
    title: "Walk through of Extensions, Draw different shapes",
    concepts: "Understanding Scratch extensions",
    url: "https://scratch.mit.edu/projects/editor/"
  },
  {
    title: "Translator, Music Player",
    concepts: "Application of Music and Translate extension",
    url: "https://scratch.mit.edu/projects/editor/"
  },
  {
    title: "Play with Pen",
    concepts: "Application of Pen extension",
    url: "https://scratch.mit.edu/projects/editor/"
  },
  {
    title: "AI Chat Bot",
    concepts: "Application of Text to Speech extension",
    url: "https://scratch.mit.edu/projects/editor/"
  },
  {
    title: "Collect Fishes",
    concepts: "Application of Video Sensing extension",
    url: "https://scratch.mit.edu/projects/editor/"
  }
];
