export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type BlogSection = {
  heading?: string;
  blocks: BlogBlock[];
};

export type BlogPost = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  excerptLines: string[];
  sections: BlogSection[];
};

const posts: BlogPost[] = [
  {
    slug: "self-validation",
    title: "Have You Ever Waited for Someone Else to Decide How You Should Feel?",
    eyebrow: "Reflections",
    description:
      "On validation, the approval trap, and learning to offer yourself the kindness you freely give others.",
    excerptLines: [
      "You finish a presentation at work.",
      "You don’t immediately ask yourself, “Did I do my best?”",
      "Instead, you wonder:",
      "“Did they like it?”",
      "You post a picture online.",
    ],
    sections: [
      {
        blocks: [
          { type: "paragraph", text: "You finish a presentation at work." },
          {
            type: "paragraph",
            text: "You don’t immediately ask yourself, “Did I do my best?”",
          },
          { type: "paragraph", text: "Instead, you wonder:" },
          { type: "paragraph", text: "“Did they like it?”" },
          { type: "paragraph", text: "You post a picture online." },
          {
            type: "paragraph",
            text: "Without realizing it, you check your phone a few times over the next hour.",
          },
          { type: "paragraph", text: "Not because you need to." },
          {
            type: "paragraph",
            text: "Because you’re hoping for a sign that you matter.",
          },
          {
            type: "paragraph",
            text: "Or maybe you’ve spent days replaying a conversation because someone responded a little differently than usual.",
          },
          { type: "paragraph", text: "“Are they upset with me?”" },
          { type: "paragraph", text: "“Did I do something wrong?”" },
          { type: "paragraph", text: "“Should I message them again?”" },
          { type: "paragraph", text: "Most of us have done this." },
          {
            type: "paragraph",
            text: "And if you have, you’re not needy or weak.",
          },
          { type: "paragraph", text: "You’re human." },
          {
            type: "paragraph",
            text: "The desire to be accepted is woven into all of us.",
          },
          {
            type: "paragraph",
            text: "The problem begins when our sense of worth depends entirely on what other people think.",
          },
        ],
      },
      {
        heading: "Why Validation Feels So Good",
        blocks: [
          {
            type: "paragraph",
            text: "Imagine a child who proudly shows a drawing to a parent.",
          },
          {
            type: "paragraph",
            text: "The child isn’t asking whether the drawing belongs in an art gallery.",
          },
          { type: "paragraph", text: "They’re simply asking:" },
          { type: "paragraph", text: "“Do you see me?”" },
          {
            type: "paragraph",
            text: "That longing doesn’t disappear when we become adults.",
          },
          { type: "paragraph", text: "It simply changes shape." },
          { type: "paragraph", text: "We want our efforts noticed." },
          { type: "paragraph", text: "Our feelings understood." },
          { type: "paragraph", text: "Our presence appreciated." },
          { type: "paragraph", text: "Validation isn’t the enemy." },
          { type: "paragraph", text: "It’s a natural human need." },
          {
            type: "paragraph",
            text: "The trouble starts when we expect other people to provide what only we can build within ourselves.",
          },
        ],
      },
      {
        heading: "The Quiet Shift That Happens Over Time",
        blocks: [
          {
            type: "paragraph",
            text: "For many of us, approval slowly becomes a habit.",
          },
          {
            type: "paragraph",
            text: "Maybe you were praised only when you performed well.",
          },
          {
            type: "paragraph",
            text: "Maybe mistakes were met with criticism instead of curiosity.",
          },
          {
            type: "paragraph",
            text: "Maybe keeping everyone happy felt safer than disappointing someone.",
          },
          {
            type: "paragraph",
            text: "Without realizing it, your mind learned a simple equation:",
          },
          {
            type: "paragraph",
            text: "If people approve of me, I’m okay.",
          },
          { type: "paragraph", text: "If they don’t…" },
          { type: "paragraph", text: "Maybe I’m not enough." },
          {
            type: "paragraph",
            text: "Over time, this belief quietly influences almost everything.",
          },
          { type: "paragraph", text: "You hesitate to share your opinion." },
          {
            type: "paragraph",
            text: "You apologize when you’ve done nothing wrong.",
          },
          { type: "paragraph", text: "You struggle to say no." },
          {
            type: "paragraph",
            text: "You change yourself to fit into rooms that were never meant for you.",
          },
        ],
      },
      {
        heading: "The Approval Trap",
        blocks: [
          {
            type: "paragraph",
            text: "Here’s something worth noticing.",
          },
          { type: "paragraph", text: "Validation is temporary." },
          { type: "paragraph", text: "One compliment feels wonderful." },
          {
            type: "paragraph",
            text: "Until the next moment of doubt arrives.",
          },
          { type: "paragraph", text: "Then we look for another compliment." },
          { type: "paragraph", text: "Another message." },
          { type: "paragraph", text: "Another sign." },
          {
            type: "paragraph",
            text: "Another reminder that we’re doing okay.",
          },
          {
            type: "paragraph",
            text: "It’s a little like trying to fill a bucket with a hole in the bottom.",
          },
          {
            type: "paragraph",
            text: "No matter how much approval you pour in, it never feels like enough because the real leak isn’t outside you—it’s in the belief that your worth must be confirmed by someone else.",
          },
        ],
      },
      {
        heading: "A Different Question to Ask",
        blocks: [
          {
            type: "paragraph",
            text: "The next time you catch yourself wondering:",
          },
          { type: "paragraph", text: "“What do they think about me?”" },
          { type: "paragraph", text: "Try asking instead:" },
          {
            type: "paragraph",
            text: "“What do I think about the way I handled this?”",
          },
          {
            type: "paragraph",
            text: "That question changes the direction of your attention.",
          },
          {
            type: "paragraph",
            text: "Instead of constantly looking outward, you begin building trust inward.",
          },
          { type: "paragraph", text: "At first, it feels unfamiliar." },
          {
            type: "paragraph",
            text: "But over time, it becomes freeing.",
          },
          {
            type: "paragraph",
            text: "Because confidence isn’t the absence of doubt.",
          },
          {
            type: "paragraph",
            text: "It’s the willingness to stand by your values even when not everyone applauds.",
          },
        ],
      },
      {
        heading: "Building Self-Validation",
        blocks: [
          {
            type: "paragraph",
            text: "Self-validation isn’t pretending you don’t care about others.",
          },
          {
            type: "paragraph",
            text: "It means acknowledging your own experience without waiting for permission.",
          },
          { type: "paragraph", text: "It sounds like:" },
          {
            type: "list",
            items: [
              "“I’m disappointed, and that’s okay.”",
              "“I’m proud of the effort I made.”",
              "“I made a mistake, but it doesn’t define me.”",
              "“Not everyone has to understand my choices for them to be right for me.”",
            ],
          },
          {
            type: "paragraph",
            text: "These are quiet acts of self-respect.",
          },
          {
            type: "paragraph",
            text: "And they become stronger every time you practice them.",
          },
        ],
      },
      {
        heading: "One Small Step You Can Try Today",
        blocks: [
          {
            type: "paragraph",
            text: "At the end of today, before thinking about anyone else’s opinion, ask yourself these three questions:",
          },
          {
            type: "list",
            items: [
              "What am I proud of today?",
              "Where did I stay true to myself?",
              "What would I appreciate if a friend had done what I did today?",
            ],
          },
          { type: "paragraph", text: "Then write your answers down." },
          {
            type: "paragraph",
            text: "You may be surprised by how rarely you’ve offered yourself the same kindness you freely give others.",
          },
        ],
      },
      {
        heading: "Take a Moment",
        blocks: [
          {
            type: "paragraph",
            text: "Spend a few minutes reflecting.",
          },
          {
            type: "list",
            items: [
              "When do you seek approval the most?",
              "Whose opinion has the strongest influence on your self-worth?",
              "If no one could judge your next decision, what would you choose?",
            ],
          },
          {
            type: "paragraph",
            text: "These questions aren’t about finding perfect answers.",
          },
          {
            type: "paragraph",
            text: "They’re about discovering where your confidence has been quietly waiting to grow.",
          },
        ],
      },
      {
        heading: "A Thought to Carry With You",
        blocks: [
          {
            type: "paragraph",
            text: "Being appreciated feels wonderful.",
          },
          {
            type: "paragraph",
            text: "But your worth cannot be measured by applause.",
          },
          {
            type: "paragraph",
            text: "Some of the most meaningful decisions you’ll ever make may not be understood by everyone around you.",
          },
          { type: "paragraph", text: "And that’s okay." },
          {
            type: "paragraph",
            text: "Your life isn’t meant to be lived according to someone else’s scorecard.",
          },
        ],
      },
      {
        heading: "Before You Leave…",
        blocks: [
          {
            type: "paragraph",
            text: "Here’s something I hope you’ll remember the next time you find yourself searching for approval:",
          },
          {
            type: "paragraph",
            text: "You don’t have to earn your value.",
          },
          { type: "paragraph", text: "You already have it." },
          {
            type: "paragraph",
            text: "The opinions of others may shape your perspective, but they should never become the foundation of your identity.",
          },
          {
            type: "paragraph",
            text: "Until our next conversation, try offering yourself the same understanding you’ve been hoping to receive from everyone else.",
          },
        ],
      },
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}
