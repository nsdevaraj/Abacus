export interface EnglishProblemContent {
  question: string;
  answer: string;
  hint?: string;
  options?: string[];
}

export const READING_CONTENT: EnglishProblemContent[] = [
  {
    question: "The quick brown fox jumps over the lazy dog. \n\nWhich animal is lazy?",
    answer: "dog",
    hint: "It's the animal that didn't jump."
  },
  {
    question: "The quick brown fox jumps over the lazy dog. \n\nWhat color is the fox?",
    answer: "brown",
    hint: "It's the color mentioned first."
  },
  {
    question: "Sarah went to the store to buy apples. She bought five red apples. \n\nWhat did Sarah buy?",
    answer: "apples",
    hint: "It's a type of fruit."
  },
  {
    question: "Sarah went to the store to buy apples. She bought five red apples. \n\nHow many apples did she buy?",
    answer: "five",
    hint: "It's a number."
  },
  {
    question: "The sun rises in the east and sets in the west. \n\nWhere does the sun rise?",
    answer: "east",
    hint: "Opposite of west."
  }
];

export const GRAMMAR_CONTENT: EnglishProblemContent[] = [
  {
    question: "Identify the noun: 'The huge elephant trumpet.'",
    answer: "elephant",
    hint: "A person, place, or thing."
  },
  {
    question: "Identify the verb: 'She runs fast.'",
    answer: "runs",
    hint: "Action word."
  },
  {
    question: "Select the correct word: '___ are my friends.' (They/Them)",
    answer: "They",
    hint: "Subject pronoun."
  },
  {
    question: "Select the correct word: 'This is ___ book.' (me/my)",
    answer: "my",
    hint: "Possessive pronoun."
  },
  {
    question: "Identify the adjective: 'The blue sky.'",
    answer: "blue",
    hint: "Describing word."
  }
];

export const VOCAB_CONTENT: EnglishProblemContent[] = [
  {
    question: "What is a synonym for 'happy'? (glad/sad)",
    answer: "glad",
    hint: "Means the same thing."
  },
  {
    question: "What is an antonym for 'hot'? (cold/warm)",
    answer: "cold",
    hint: "Means the opposite."
  },
  {
    question: "Spell the word for a baby cat.",
    answer: "kitten",
    hint: "Starts with k."
  },
  {
    question: "Spell the word for a baby dog.",
    answer: "puppy",
    hint: "Starts with p."
  },
  {
    question: "What means 'very big'? (tiny/huge)",
    answer: "huge",
    hint: "Not small."
  }
];

export const WRITING_CONTENT: EnglishProblemContent[] = [
  {
    question: "Fix the punctuation: 'its a nice day'",
    answer: "It's a nice day.",
    hint: "Capitalize first letter, add apostrophe, end with period."
  },
  {
    question: "Write the plural of 'cat'.",
    answer: "cats",
    hint: "Add s."
  },
  {
    question: "Write the plural of 'box'.",
    answer: "boxes",
    hint: "Add es."
  },
  {
    question: "Combine the sentences: 'I like tea. I like coffee.' using 'and'.",
    answer: "I like tea and coffee.",
    hint: "Use 'and' to join."
  },
  {
    question: "Correct the spelling: 'recieve'",
    answer: "receive",
    hint: "i before e except after c."
  }
];
