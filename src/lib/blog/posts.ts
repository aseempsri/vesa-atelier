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
  subtitle: string;
  eyebrow: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  keywords?: string[];
  excerptLines: string[];
  closingThought: string;
  sections: BlogSection[];
};

const posts: BlogPost[] = [
  {
    slug: "self-validation",
    title: "The Hidden Reason We Keep Seeking Validation",
    subtitle: "Have You Ever Waited for Someone Else to Decide How You Should Feel?",
    eyebrow: "Reflections",
    description:
      "On validation, the approval trap, and learning to offer yourself the kindness you freely give others.",
    publishedAt: "2026-07-20",
    keywords: [
      "self validation",
      "seeking approval",
      "self worth",
      "emotional wellness",
    ],
    excerptLines: [
      "You finish a presentation at work.",
      "You don’t immediately ask yourself, “Did I do my best?”",
      "Instead, you wonder:",
    ],
    closingThought: "You already have it.",
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
  {
    slug: "overthinking",
    title: "Why Do We Overthink Everything?",
    subtitle: "Have You Ever Replayed the Same Moment a Hundred Times?",
    eyebrow: "Reflections",
    description:
      "On overthinking, the search for certainty, and learning to notice your thoughts without being trapped by them.",
    publishedAt: "2026-07-22",
    keywords: ["overthinking", "anxiety", "self trust", "mental clarity"],
    excerptLines: [
      "A conversation ends, but it doesn’t really end.",
      "On your way home, you’re replaying every word you said.",
      "“Did I say too much?”",
    ],
    closingThought: "You don’t have to solve your entire life tonight.",
    sections: [
      {
        blocks: [
          {
            type: "paragraph",
            text: "A conversation ends, but it doesn’t really end.",
          },
          {
            type: "paragraph",
            text: "On your way home, you’re replaying every word you said.",
          },
          { type: "paragraph", text: "“Did I say too much?”" },
          { type: "paragraph", text: "“Maybe I should have stayed quiet.”" },
          { type: "paragraph", text: "“Why did I react like that?”" },
          {
            type: "paragraph",
            text: "Hours later, your body is sitting on the couch, but your mind is still in that conversation.",
          },
          {
            type: "paragraph",
            text: "Or perhaps you’re lying in bed, exhausted after a long day, yet your thoughts refuse to rest. Instead of sleeping, you’re imagining future problems that haven’t happened, revisiting old mistakes that can’t be changed, or trying to predict every possible outcome of tomorrow.",
          },
          {
            type: "paragraph",
            text: "If this sounds familiar, you’re not alone.",
          },
          {
            type: "paragraph",
            text: "Overthinking is one of the most common experiences people have, yet many of us mistake it for a personal flaw.",
          },
          { type: "paragraph", text: "It isn’t." },
          {
            type: "paragraph",
            text: "The first thing I want you to know is this:",
          },
          {
            type: "paragraph",
            text: "Overthinking is not a sign that you’re weak. More often than not, it’s a sign that your mind is trying very hard to keep you safe.",
          },
          {
            type: "paragraph",
            text: "Understanding that changes everything.",
          },
        ],
      },
      {
        heading: "What Is Overthinking, Really?",
        blocks: [
          {
            type: "paragraph",
            text: "Many people believe overthinking means “thinking too much.”",
          },
          { type: "paragraph", text: "Not quite." },
          {
            type: "paragraph",
            text: "Thinking helps us solve problems.",
          },
          {
            type: "paragraph",
            text: "Overthinking keeps us trapped inside them.",
          },
          {
            type: "paragraph",
            text: "Healthy thinking leads to decisions.",
          },
          {
            type: "paragraph",
            text: "Overthinking keeps asking the same question in different ways, hoping the answer will suddenly feel certain.",
          },
          {
            type: "paragraph",
            text: "It’s like walking in circles, believing you’re moving forward.",
          },
        ],
      },
      {
        heading: "Why Does Our Mind Do This?",
        blocks: [
          {
            type: "paragraph",
            text: "Our brains are designed to protect us.",
          },
          {
            type: "paragraph",
            text: "Thousands of years ago, constantly scanning for danger helped humans survive.",
          },
          {
            type: "paragraph",
            text: "Today, most of us aren’t worrying about wild animals or finding shelter.",
          },
          {
            type: "paragraph",
            text: "Instead, our brains look for emotional dangers.",
          },
          {
            type: "list",
            items: [
              "What if they reject me?",
              "What if I fail?",
              "What if I embarrass myself?",
              "What if I make the wrong decision?",
              "What if something goes wrong?",
            ],
          },
          {
            type: "paragraph",
            text: "Your brain doesn’t always know the difference between a real threat and an imagined one.",
          },
          { type: "paragraph", text: "So it starts preparing." },
          {
            type: "paragraph",
            text: "Preparing often looks like thinking.",
          },
          {
            type: "paragraph",
            text: "Then thinking becomes overthinking.",
          },
        ],
      },
      {
        heading: "The Hidden Belief Behind Overthinking",
        blocks: [
          {
            type: "paragraph",
            text: "Many of us secretly believe:",
          },
          {
            type: "paragraph",
            text: "“If I think about it long enough, I’ll eventually feel completely certain.”",
          },
          {
            type: "paragraph",
            text: "But life rarely offers complete certainty.",
          },
          {
            type: "paragraph",
            text: "The more certainty we demand, the more our minds keep searching for it.",
          },
          {
            type: "paragraph",
            text: "Ironically, the search itself creates more anxiety.",
          },
          {
            type: "paragraph",
            text: "It’s like trying to smooth ripples in water with your hands.",
          },
          {
            type: "paragraph",
            text: "The harder you try, the more disturbed the surface becomes.",
          },
        ],
      },
      {
        heading: "When Overthinking Becomes a Habit",
        blocks: [
          {
            type: "paragraph",
            text: "Overthinking rarely begins overnight.",
          },
          {
            type: "paragraph",
            text: "It quietly grows through experiences.",
          },
          {
            type: "paragraph",
            text: "Maybe you were criticized often.",
          },
          {
            type: "paragraph",
            text: "Maybe you were afraid of making mistakes.",
          },
          {
            type: "paragraph",
            text: "Maybe you learned that getting everything “right” kept you safe.",
          },
          {
            type: "paragraph",
            text: "Over time, your mind starts believing:",
          },
          {
            type: "paragraph",
            text: "“If I analyze everything carefully enough, nothing bad will happen.”",
          },
          {
            type: "paragraph",
            text: "Unfortunately, life doesn’t work that way.",
          },
          {
            type: "paragraph",
            text: "No amount of thinking can remove uncertainty completely.",
          },
        ],
      },
      {
        heading: "The Cost of Living Inside Your Head",
        blocks: [
          {
            type: "paragraph",
            text: "Overthinking doesn’t just affect your thoughts.",
          },
          { type: "paragraph", text: "It steals your energy." },
          { type: "paragraph", text: "It delays decisions." },
          {
            type: "paragraph",
            text: "It makes simple choices feel overwhelming.",
          },
          {
            type: "paragraph",
            text: "It creates stress before anything has actually happened.",
          },
          {
            type: "paragraph",
            text: "Sometimes it even convinces us that not making a decision feels safer than making the wrong one.",
          },
          {
            type: "paragraph",
            text: "Meanwhile, life continues moving.",
          },
        ],
      },
      {
        heading: "A Different Way to Look at It",
        blocks: [
          {
            type: "paragraph",
            text: "Imagine your thoughts as passengers in a train station.",
          },
          { type: "paragraph", text: "Some are helpful." },
          { type: "paragraph", text: "Some are loud." },
          { type: "paragraph", text: "Some are frightened." },
          {
            type: "paragraph",
            text: "Some are completely unrealistic.",
          },
          {
            type: "paragraph",
            text: "You don’t have to invite every passenger onto your train.",
          },
          {
            type: "paragraph",
            text: "Just because a thought appears doesn’t mean it deserves your attention.",
          },
          {
            type: "paragraph",
            text: "One of the most powerful skills we can learn is to notice a thought without automatically believing it.",
          },
          {
            type: "paragraph",
            text: "There’s a quiet difference between saying:",
          },
          {
            type: "paragraph",
            text: "“Something terrible is going to happen.”",
          },
          { type: "paragraph", text: "and" },
          {
            type: "paragraph",
            text: "“I’m noticing that my mind is imagining something terrible.”",
          },
          {
            type: "paragraph",
            text: "That small shift creates space.",
          },
          {
            type: "paragraph",
            text: "And in that space, we often find calm.",
          },
        ],
      },
      {
        heading: "One Small Step You Can Try Today",
        blocks: [
          {
            type: "paragraph",
            text: "The next time you catch yourself spiraling, pause and ask yourself these three questions:",
          },
          {
            type: "list",
            items: [
              "Is this a real problem or an imagined possibility?",
              "Is there anything I can do about it right now?",
              "If not, what would be the kindest thing I can do for myself in this moment?",
            ],
          },
          {
            type: "paragraph",
            text: "Sometimes the answer isn’t “think harder.”",
          },
          {
            type: "paragraph",
            text: "Sometimes the answer is to rest.",
          },
          { type: "paragraph", text: "To take a walk." },
          {
            type: "paragraph",
            text: "To write your thoughts down.",
          },
          { type: "paragraph", text: "To call a friend." },
          {
            type: "paragraph",
            text: "Or simply to remind yourself that not every question needs an immediate answer.",
          },
        ],
      },
      {
        heading: "Take a Moment",
        blocks: [
          {
            type: "paragraph",
            text: "Before you leave, spend a minute reflecting.",
          },
          {
            type: "list",
            items: [
              "What situations trigger your overthinking most often?",
              "Are you trying to solve a problem, or are you trying to eliminate uncertainty?",
              "What would change if you trusted yourself a little more than your worries?",
            ],
          },
          {
            type: "paragraph",
            text: "There are no perfect answers.",
          },
          { type: "paragraph", text: "Only honest ones." },
        ],
      },
      {
        heading: "A Thought to Carry With You",
        blocks: [
          {
            type: "paragraph",
            text: "Your mind is not your enemy.",
          },
          {
            type: "paragraph",
            text: "It’s doing its best with the experiences it has gathered over the years.",
          },
          {
            type: "paragraph",
            text: "Instead of fighting your thoughts, try becoming curious about them.",
          },
          {
            type: "paragraph",
            text: "Curiosity creates understanding.",
          },
          {
            type: "paragraph",
            text: "Understanding creates compassion.",
          },
          {
            type: "paragraph",
            text: "And compassion creates the space where real change begins.",
          },
        ],
      },
      {
        heading: "Before You Leave…",
        blocks: [
          {
            type: "paragraph",
            text: "If this conversation stayed with you, I hope you’ll carry one simple reminder into the rest of your day:",
          },
          {
            type: "paragraph",
            text: "You don’t have to solve your entire life tonight.",
          },
          {
            type: "paragraph",
            text: "Sometimes, the bravest thing you can do is stop searching for perfect certainty and trust that you’ll handle tomorrow when it arrives.",
          },
          {
            type: "paragraph",
            text: "Until our next conversation, be gentle with your mind.",
          },
          {
            type: "paragraph",
            text: "It’s been trying to protect you all along.",
          },
        ],
      },
    ],
  },
  {
    slug: "saying-no",
    title: "Why Is It So Hard to Say No?",
    subtitle: "I Didn’t Want To… But I Said Yes Anyway.",
    eyebrow: "Reflections",
    description:
      "On the fear of saying no, the cost of always saying yes, and learning that healthy boundaries are an act of self-respect.",
    publishedAt: "2026-07-24",
    keywords: ["boundaries", "saying no", "people pleasing", "self respect"],
    excerptLines: [
      "We’ve all been there.",
      "A colleague asks you to take on one more task.",
      "A friend wants a favor when your week is already overflowing.",
    ],
    closingThought: "Saying no isn’t selfish. It’s an act of self-respect.",
    sections: [
      {
        blocks: [
          { type: "paragraph", text: "We’ve all been there." },
          {
            type: "paragraph",
            text: "A colleague asks you to take on one more task.",
          },
          {
            type: "paragraph",
            text: "A friend wants a favor when your week is already overflowing.",
          },
          {
            type: "paragraph",
            text: "A family member makes a request that leaves you feeling uncomfortable.",
          },
          {
            type: "paragraph",
            text: "In that brief moment, you know what you want to say.",
          },
          { type: "paragraph", text: "“No.”" },
          {
            type: "paragraph",
            text: "But instead, almost automatically, you hear yourself say:",
          },
          { type: "paragraph", text: "“Sure.”" },
          { type: "paragraph", text: "“No problem.”" },
          { type: "paragraph", text: "“I’ll manage.”" },
          {
            type: "paragraph",
            text: "Then, on the way home, a different conversation begins.",
          },
          { type: "paragraph", text: "“Why did I agree to that?”" },
          { type: "paragraph", text: "“I don’t even have time.”" },
          { type: "paragraph", text: "“I wish I had just been honest.”" },
          {
            type: "paragraph",
            text: "The guilt of saying no never arrived.",
          },
          {
            type: "paragraph",
            text: "Instead, you carried the weight of saying yes.",
          },
          {
            type: "paragraph",
            text: "If this sounds familiar, you’re not alone.",
          },
          {
            type: "paragraph",
            text: "Many of us don’t struggle with saying no because we’re kind.",
          },
          {
            type: "paragraph",
            text: "We struggle because somewhere along the way, we began believing that protecting our own needs meant disappointing someone else.",
          },
        ],
      },
      {
        heading: "Where Does This Fear Come From?",
        blocks: [
          {
            type: "paragraph",
            text: "As children, many of us learned that being “good” meant being helpful.",
          },
          { type: "paragraph", text: "We were praised for sharing." },
          { type: "paragraph", text: "For being polite." },
          {
            type: "paragraph",
            text: "For not making life difficult for others.",
          },
          {
            type: "paragraph",
            text: "These are beautiful qualities.",
          },
          {
            type: "paragraph",
            text: "But sometimes, without realizing it, we also learned something else.",
          },
          {
            type: "paragraph",
            text: "That our worth depended on how useful we were.",
          },
          {
            type: "paragraph",
            text: "That keeping others happy was more important than listening to ourselves.",
          },
          {
            type: "paragraph",
            text: "Over time, this belief quietly followed us into adulthood.",
          },
          {
            type: "paragraph",
            text: "Now, every “no” feels less like a decision and more like a risk.",
          },
          { type: "paragraph", text: "A risk of being judged." },
          { type: "paragraph", text: "A risk of being rejected." },
          {
            type: "paragraph",
            text: "A risk of no longer being liked.",
          },
        ],
      },
      {
        heading: "The Story We Tell Ourselves",
        blocks: [
          {
            type: "paragraph",
            text: "When someone asks for something, our mind often fills in the blanks before they’ve even responded.",
          },
          {
            type: "paragraph",
            text: "“If I say no, they’ll think I’m selfish.”",
          },
          {
            type: "paragraph",
            text: "“If I don’t help, they’ll stop asking me.”",
          },
          {
            type: "paragraph",
            text: "“If I disappoint them, I’ll damage the relationship.”",
          },
          {
            type: "paragraph",
            text: "Notice something interesting.",
          },
          { type: "paragraph", text: "These are stories." },
          { type: "paragraph", text: "Not facts." },
          {
            type: "paragraph",
            text: "Most of the time, we aren’t reacting to the other person’s response.",
          },
          {
            type: "paragraph",
            text: "We’re reacting to the one we’ve imagined.",
          },
          {
            type: "paragraph",
            text: "And imagined fears can feel just as powerful as real ones.",
          },
        ],
      },
      {
        heading: "The Cost of Always Saying Yes",
        blocks: [
          {
            type: "paragraph",
            text: "At first, saying yes feels easier.",
          },
          { type: "paragraph", text: "It avoids conflict." },
          { type: "paragraph", text: "It keeps everyone happy." },
          {
            type: "paragraph",
            text: "It allows us to move on.",
          },
          {
            type: "paragraph",
            text: "But every unnecessary yes has a hidden cost.",
          },
          {
            type: "paragraph",
            text: "It takes time from your priorities.",
          },
          { type: "paragraph", text: "It drains your energy." },
          {
            type: "paragraph",
            text: "It creates quiet resentment.",
          },
          {
            type: "paragraph",
            text: "And perhaps most importantly, it teaches others that your boundaries are flexible—even when they’re not.",
          },
          {
            type: "paragraph",
            text: "Eventually, you may begin to feel invisible.",
          },
          {
            type: "paragraph",
            text: "Not because people don’t care about you.",
          },
          {
            type: "paragraph",
            text: "But because you’ve become so practiced at putting yourself last that others assume you’re always available.",
          },
        ],
      },
      {
        heading: "What Healthy Boundaries Really Mean",
        blocks: [
          {
            type: "paragraph",
            text: "Many people think boundaries push people away.",
          },
          {
            type: "paragraph",
            text: "In reality, healthy boundaries help relationships last.",
          },
          {
            type: "paragraph",
            text: "Imagine a house without walls.",
          },
          { type: "paragraph", text: "Anyone could walk in." },
          {
            type: "paragraph",
            text: "Nothing would feel protected.",
          },
          {
            type: "paragraph",
            text: "Walls don’t make a house less welcoming.",
          },
          { type: "paragraph", text: "They make it safe." },
          {
            type: "paragraph",
            text: "Boundaries work the same way.",
          },
          {
            type: "paragraph",
            text: "They’re not built to keep love out.",
          },
          {
            type: "paragraph",
            text: "They’re built to protect what matters.",
          },
          {
            type: "paragraph",
            text: "Saying no isn’t rejecting someone.",
          },
          {
            type: "paragraph",
            text: "It’s being honest about what you’re able to give.",
          },
          {
            type: "paragraph",
            text: "And honesty is far kinder than saying yes while secretly feeling exhausted or resentful.",
          },
        ],
      },
      {
        heading: "A Different Way to Think About No",
        blocks: [
          {
            type: "paragraph",
            text: "What if saying no wasn’t about choosing yourself over someone else?",
          },
          {
            type: "paragraph",
            text: "What if it was about choosing honesty with someone else?",
          },
          {
            type: "paragraph",
            text: "A thoughtful no is often more respectful than a reluctant yes.",
          },
          {
            type: "paragraph",
            text: "Because when you say yes out of guilt, you’re giving something you don’t truly have.",
          },
          { type: "paragraph", text: "Your time." },
          { type: "paragraph", text: "Your energy." },
          { type: "paragraph", text: "Your attention." },
          { type: "paragraph", text: "Your peace." },
          {
            type: "paragraph",
            text: "The healthiest relationships don’t require constant sacrifice.",
          },
          {
            type: "paragraph",
            text: "They allow room for both people to have needs.",
          },
        ],
      },
      {
        heading: "One Small Step You Can Try Today",
        blocks: [
          {
            type: "paragraph",
            text: "The next time someone asks you for something, don’t answer immediately.",
          },
          { type: "paragraph", text: "Instead, try saying:" },
          {
            type: "paragraph",
            text: "“Can I think about it and get back to you?”",
          },
          {
            type: "paragraph",
            text: "This simple sentence gives you something many people never allow themselves:",
          },
          { type: "paragraph", text: "A pause." },
          {
            type: "paragraph",
            text: "In that pause, ask yourself:",
          },
          {
            type: "list",
            items: [
              "Do I genuinely want to do this?",
              "Do I have the time and energy?",
              "Am I saying yes because I want to—or because I’m afraid of disappointing someone?",
            ],
          },
          {
            type: "paragraph",
            text: "Your answer deserves honesty.",
          },
        ],
      },
      {
        heading: "Take a Moment",
        blocks: [
          {
            type: "paragraph",
            text: "Spend a few quiet minutes reflecting.",
          },
          {
            type: "list",
            items: [
              "When was the last time you said yes when you wanted to say no?",
              "What were you afraid would happen if you refused?",
              "If you trusted that people could handle your honesty, how might your answer have changed?",
            ],
          },
          {
            type: "paragraph",
            text: "Remember, these questions aren’t meant to judge you.",
          },
          {
            type: "paragraph",
            text: "They’re here to help you notice patterns with kindness.",
          },
        ],
      },
      {
        heading: "A Thought to Carry With You",
        blocks: [
          {
            type: "paragraph",
            text: "Every time you say yes to something that isn’t right for you, you’re saying no to something that might be.",
          },
          { type: "paragraph", text: "Your rest." },
          { type: "paragraph", text: "Your priorities." },
          { type: "paragraph", text: "Your family." },
          { type: "paragraph", text: "Your peace of mind." },
          { type: "paragraph", text: "Your dreams." },
          {
            type: "paragraph",
            text: "Boundaries aren’t about becoming less generous.",
          },
          {
            type: "paragraph",
            text: "They’re about becoming intentional with the generosity you already have.",
          },
        ],
      },
      {
        heading: "Before You Leave…",
        blocks: [
          {
            type: "paragraph",
            text: "The next time the word “no” catches in your throat, remember this:",
          },
          {
            type: "paragraph",
            text: "People who truly care about you may not always like your boundaries, but they can learn to respect them.",
          },
          {
            type: "paragraph",
            text: "And if saying no protects your well-being, it isn’t selfish.",
          },
          {
            type: "paragraph",
            text: "It’s an act of self-respect.",
          },
          {
            type: "paragraph",
            text: "Until our next conversation, may you find the courage to honor your own needs with the same kindness you so freely offer to everyone else.",
          },
        ],
      },
    ],
  },
  {
    slug: "comparison",
    title: "Why Do We Compare Ourselves to Others?",
    subtitle: "Have You Ever Felt Like Everyone Else Is Ahead?",
    eyebrow: "Reflections",
    description:
      "On comparison, the illusion of highlight reels, and learning to measure growth against who you were yesterday.",
    publishedAt: "2026-07-26",
    keywords: [
      "comparison",
      "social media",
      "self worth",
      "personal growth",
    ],
    excerptLines: [
      "It usually begins with something small.",
      "You’re scrolling through your phone while waiting for your coffee.",
      "A former classmate announces a promotion.",
    ],
    closingThought: "You are not behind. You are becoming.",
    sections: [
      {
        blocks: [
          {
            type: "paragraph",
            text: "It usually begins with something small.",
          },
          {
            type: "paragraph",
            text: "You’re scrolling through your phone while waiting for your coffee.",
          },
          {
            type: "paragraph",
            text: "A former classmate announces a promotion.",
          },
          {
            type: "paragraph",
            text: "A friend shares photos from their dream vacation.",
          },
          {
            type: "paragraph",
            text: "Someone you know has started a successful business.",
          },
          {
            type: "paragraph",
            text: "Another friend posts about buying their first home.",
          },
          {
            type: "paragraph",
            text: "You smile. You genuinely feel happy for them.",
          },
          {
            type: "paragraph",
            text: "But then, almost without warning, another thought quietly slips in.",
          },
          {
            type: "paragraph",
            text: "“What am I doing with my life?”",
          },
          {
            type: "paragraph",
            text: "Suddenly, your own achievements don’t seem as meaningful.",
          },
          {
            type: "paragraph",
            text: "The goals you’ve been working toward feel smaller.",
          },
          {
            type: "paragraph",
            text: "The progress you’ve made feels invisible.",
          },
          {
            type: "paragraph",
            text: "And before you know it, someone else’s story has become the measuring stick for your own.",
          },
          {
            type: "paragraph",
            text: "If you’ve ever felt this way, I want you to know something important.",
          },
          { type: "paragraph", text: "You’re not failing." },
          {
            type: "paragraph",
            text: "You’re experiencing something deeply human.",
          },
        ],
      },
      {
        heading: "Why Do We Compare Ourselves?",
        blocks: [
          {
            type: "paragraph",
            text: "Comparison is part of being human.",
          },
          {
            type: "paragraph",
            text: "Long before social media existed, people naturally looked to those around them to understand where they stood.",
          },
          {
            type: "paragraph",
            text: "Psychologists call this Social Comparison Theory, introduced by Leon Festinger in 1954. The idea is simple: when we don’t have an objective way to measure ourselves, we often compare ourselves with others to evaluate our progress.",
          },
          {
            type: "paragraph",
            text: "In moderation, comparison can even be helpful.",
          },
          { type: "paragraph", text: "It can inspire us." },
          { type: "paragraph", text: "Teach us." },
          { type: "paragraph", text: "Motivate us." },
          {
            type: "paragraph",
            text: "The problem isn’t comparison itself.",
          },
          {
            type: "paragraph",
            text: "The problem begins when comparison becomes the way we decide whether we’re enough.",
          },
        ],
      },
      {
        heading: "The Illusion We See Online",
        blocks: [
          {
            type: "paragraph",
            text: "Think about your favorite movie.",
          },
          {
            type: "paragraph",
            text: "Imagine watching only the best five minutes.",
          },
          { type: "paragraph", text: "The exciting scenes." },
          { type: "paragraph", text: "The victories." },
          { type: "paragraph", text: "The happy ending." },
          {
            type: "paragraph",
            text: "It would look like a perfect story.",
          },
          {
            type: "paragraph",
            text: "But you would miss everything that made those moments meaningful.",
          },
          { type: "paragraph", text: "The struggles." },
          { type: "paragraph", text: "The setbacks." },
          { type: "paragraph", text: "The uncertainty." },
          {
            type: "paragraph",
            text: "Social media works in much the same way.",
          },
          {
            type: "paragraph",
            text: "Most people don’t post their sleepless nights, difficult conversations, financial worries, or moments of self-doubt.",
          },
          { type: "paragraph", text: "They share the milestones." },
          { type: "paragraph", text: "The celebrations." },
          { type: "paragraph", text: "The highlights." },
          {
            type: "paragraph",
            text: "Then we compare those highlights to our ordinary Tuesday afternoon.",
          },
          {
            type: "paragraph",
            text: "It’s an unfair comparison from the very beginning.",
          },
        ],
      },
      {
        heading: "When Comparison Stops Inspiring and Starts Hurting",
        blocks: [
          {
            type: "paragraph",
            text: "There’s a healthy kind of comparison.",
          },
          {
            type: "paragraph",
            text: "You see someone achieve something and think,",
          },
          {
            type: "paragraph",
            text: "“If they can do it, maybe I can too.”",
          },
          { type: "paragraph", text: "That’s inspiration." },
          {
            type: "paragraph",
            text: "Then there’s another kind.",
          },
          {
            type: "paragraph",
            text: "“They’re doing better than me… maybe I’ll never be enough.”",
          },
          {
            type: "paragraph",
            text: "That’s comparison turning into self-judgment.",
          },
          {
            type: "paragraph",
            text: "Notice the difference?",
          },
          {
            type: "paragraph",
            text: "One encourages growth.",
          },
          {
            type: "paragraph",
            text: "The other quietly steals it.",
          },
        ],
      },
      {
        heading: "You’re Measuring Different Journeys",
        blocks: [
          {
            type: "paragraph",
            text: "One of the biggest mistakes we make is assuming everyone starts from the same place.",
          },
          {
            type: "paragraph",
            text: "But every person’s life is shaped by different circumstances.",
          },
          {
            type: "paragraph",
            text: "Different opportunities.",
          },
          {
            type: "paragraph",
            text: "Different responsibilities.",
          },
          {
            type: "paragraph",
            text: "Different struggles.",
          },
          {
            type: "paragraph",
            text: "Different timelines.",
          },
          {
            type: "paragraph",
            text: "Imagine two people climbing different mountains.",
          },
          {
            type: "paragraph",
            text: "One mountain is steep and rocky.",
          },
          {
            type: "paragraph",
            text: "The other has a gentler path.",
          },
          {
            type: "paragraph",
            text: "Would it make sense to compare how quickly they’re climbing?",
          },
          { type: "paragraph", text: "Of course not." },
          {
            type: "paragraph",
            text: "Yet that’s exactly what we often do with our lives.",
          },
          {
            type: "paragraph",
            text: "We compare our beginning to someone else’s middle.",
          },
          {
            type: "paragraph",
            text: "Our behind-the-scenes to someone else’s polished result.",
          },
          {
            type: "paragraph",
            text: "Our chapter three to someone else’s chapter fifteen.",
          },
        ],
      },
      {
        heading: "The Question That Changes Everything",
        blocks: [
          {
            type: "paragraph",
            text: "The next time comparison creeps in, pause and ask yourself:",
          },
          {
            type: "paragraph",
            text: "“Am I comparing lives… or just moments?”",
          },
          {
            type: "paragraph",
            text: "Because a moment never tells the whole story.",
          },
          {
            type: "paragraph",
            text: "One photograph can’t capture years of effort.",
          },
          {
            type: "paragraph",
            text: "One achievement doesn’t define an entire life.",
          },
          {
            type: "paragraph",
            text: "And one setback certainly doesn’t define yours.",
          },
        ],
      },
      {
        heading: "Measuring Growth the Right Way",
        blocks: [
          {
            type: "paragraph",
            text: "Instead of comparing yourself with someone else, compare yourself with who you were yesterday.",
          },
          {
            type: "paragraph",
            text: "Have you become kinder?",
          },
          { type: "paragraph", text: "More patient?" },
          {
            type: "paragraph",
            text: "More emotionally aware?",
          },
          {
            type: "paragraph",
            text: "More willing to try again after failing?",
          },
          {
            type: "paragraph",
            text: "These victories may never go viral.",
          },
          {
            type: "paragraph",
            text: "But they are the ones that quietly change your life.",
          },
          {
            type: "paragraph",
            text: "Progress isn’t always loud.",
          },
          {
            type: "paragraph",
            text: "Sometimes it’s simply choosing not to give up.",
          },
        ],
      },
      {
        heading: "One Small Step You Can Try Today",
        blocks: [
          {
            type: "paragraph",
            text: "Today, write down three things you’ve accomplished in the past year.",
          },
          {
            type: "paragraph",
            text: "Not things that impressed other people.",
          },
          {
            type: "paragraph",
            text: "Things that made you grow.",
          },
          {
            type: "paragraph",
            text: "Maybe you learned to manage your emotions better.",
          },
          {
            type: "paragraph",
            text: "Maybe you finally stood up for yourself.",
          },
          {
            type: "paragraph",
            text: "Maybe you began healing from something that once felt impossible.",
          },
          {
            type: "paragraph",
            text: "Those achievements deserve to be celebrated too.",
          },
        ],
      },
      {
        heading: "Take a Moment",
        blocks: [
          {
            type: "paragraph",
            text: "Before you move on, sit with these questions:",
          },
          {
            type: "list",
            items: [
              "Whose life do you compare yourself to most often?",
              "What do you think they have that you don’t?",
              "Is it possible you’re only seeing one chapter of their story?",
              "What is one area where you’ve grown that deserves more recognition?",
            ],
          },
          {
            type: "paragraph",
            text: "Be honest with yourself.",
          },
          {
            type: "paragraph",
            text: "Growth begins with awareness.",
          },
        ],
      },
      {
        heading: "A Thought to Carry With You",
        blocks: [
          {
            type: "paragraph",
            text: "There will always be someone ahead of you.",
          },
          {
            type: "paragraph",
            text: "And there will always be someone looking at your journey, hoping to reach where you are.",
          },
          {
            type: "paragraph",
            text: "Life was never meant to be a race against other people.",
          },
          {
            type: "paragraph",
            text: "It’s an invitation to become more fully yourself.",
          },
        ],
      },
      {
        heading: "Before You Leave…",
        blocks: [
          {
            type: "paragraph",
            text: "If you remember only one thing from this conversation, let it be this:",
          },
          {
            type: "paragraph",
            text: "Someone else’s success is not evidence of your failure.",
          },
          {
            type: "paragraph",
            text: "There is room for more than one person to grow.",
          },
          {
            type: "paragraph",
            text: "More than one person to succeed.",
          },
          {
            type: "paragraph",
            text: "More than one person to shine.",
          },
          {
            type: "paragraph",
            text: "Walk your path with patience.",
          },
          { type: "paragraph", text: "Trust your timing." },
          {
            type: "paragraph",
            text: "And whenever comparison begins to whisper that you’re behind, gently remind yourself:",
          },
          {
            type: "paragraph",
            text: "You are not behind. You are becoming.",
          },
          {
            type: "paragraph",
            text: "Until our next conversation, be kind to yourself. Growth isn’t always visible—but that doesn’t mean it isn’t happening.",
          },
        ],
      },
    ],
  },
  {
    slug: "inner-critic",
    title: "Understanding Your Inner Critic",
    subtitle: "Have You Ever Been Your Own Worst Critic?",
    eyebrow: "Reflections",
    description:
      "On the inner critic, self-compassion, and learning to respond to fear with curiosity instead of judgment.",
    publishedAt: "2026-07-27",
    keywords: [
      "inner critic",
      "self compassion",
      "self talk",
      "emotional healing",
    ],
    excerptLines: [
      "Imagine you’ve just finished something you’ve worked hard on.",
      "Maybe it was a presentation.",
      "An interview.",
    ],
    closingThought: "I'm worthy of kindness—even from myself.",
    sections: [
      {
        blocks: [
          {
            type: "paragraph",
            text: "Imagine you’ve just finished something you’ve worked hard on.",
          },
          { type: "paragraph", text: "Maybe it was a presentation." },
          { type: "paragraph", text: "An interview." },
          { type: "paragraph", text: "A creative project." },
          {
            type: "paragraph",
            text: "Or simply trying something new.",
          },
          {
            type: "paragraph",
            text: "Before anyone else has a chance to say a word, your mind begins its own review.",
          },
          {
            type: "paragraph",
            text: "“You could have done better.”",
          },
          { type: "paragraph", text: "“That wasn’t good enough.”" },
          {
            type: "paragraph",
            text: "“You should’ve known the answer.”",
          },
          {
            type: "paragraph",
            text: "“Why do you always make mistakes?”",
          },
          { type: "paragraph", text: "Sound familiar?" },
          {
            type: "paragraph",
            text: "What’s interesting is that these thoughts often arrive so quickly that we don’t even notice them.",
          },
          {
            type: "paragraph",
            text: "We simply accept them as facts.",
          },
          {
            type: "paragraph",
            text: "But here’s something worth asking:",
          },
          {
            type: "paragraph",
            text: "What if that voice isn’t telling you the truth?",
          },
        ],
      },
      {
        heading: "Meet Your Inner Critic",
        blocks: [
          { type: "paragraph", text: "We all have an inner voice." },
          { type: "paragraph", text: "Sometimes it encourages us." },
          {
            type: "paragraph",
            text: "Sometimes it reminds us to be careful.",
          },
          {
            type: "paragraph",
            text: "And sometimes it becomes our harshest judge.",
          },
          {
            type: "paragraph",
            text: "This is what psychologists often call the inner critic.",
          },
          {
            type: "paragraph",
            text: "It isn’t a separate part of you.",
          },
          {
            type: "paragraph",
            text: "It’s a pattern of thinking that has developed over years of experiences, beliefs, and expectations.",
          },
          {
            type: "paragraph",
            text: "The inner critic usually has good intentions.",
          },
          { type: "paragraph", text: "It wants to protect you." },
          { type: "paragraph", text: "From embarrassment." },
          { type: "paragraph", text: "From rejection." },
          { type: "paragraph", text: "From failure." },
          {
            type: "paragraph",
            text: "Its logic is simple:",
          },
          {
            type: "paragraph",
            text: "“If I criticize myself first, maybe no one else will.”",
          },
          {
            type: "paragraph",
            text: "But while its intention may be protection, its method often causes pain.",
          },
        ],
      },
      {
        heading: "Where Does This Voice Come From?",
        blocks: [
          {
            type: "paragraph",
            text: "The inner critic doesn’t appear overnight.",
          },
          { type: "paragraph", text: "It grows quietly." },
          {
            type: "paragraph",
            text: "Sometimes it begins with repeated criticism during childhood.",
          },
          {
            type: "paragraph",
            text: "Sometimes it develops after a painful failure.",
          },
          {
            type: "paragraph",
            text: "Sometimes it comes from unrealistic expectations placed on us by society, school, work, or even ourselves.",
          },
          {
            type: "paragraph",
            text: "Over time, those external voices slowly become internal ones.",
          },
          {
            type: "paragraph",
            text: "Eventually, you no longer need someone else to criticize you.",
          },
          {
            type: "paragraph",
            text: "Your own mind has learned how to do it automatically.",
          },
        ],
      },
      {
        heading: "The Problem With Believing Every Thought",
        blocks: [
          {
            type: "paragraph",
            text: "Imagine wearing glasses with scratched lenses.",
          },
          {
            type: "paragraph",
            text: "Everything you see would appear distorted.",
          },
          {
            type: "paragraph",
            text: "Not because the world is broken.",
          },
          { type: "paragraph", text: "But because the lens is." },
          {
            type: "paragraph",
            text: "Your inner critic works in a similar way.",
          },
          {
            type: "paragraph",
            text: "It filters experiences through fear.",
          },
          {
            type: "paragraph",
            text: "One mistake becomes:",
          },
          { type: "paragraph", text: "“I’m a failure.”" },
          {
            type: "paragraph",
            text: "One rejection becomes:",
          },
          { type: "paragraph", text: "“Nobody likes me.”" },
          {
            type: "paragraph",
            text: "One difficult day becomes:",
          },
          {
            type: "paragraph",
            text: "“I’ll never get this right.”",
          },
          {
            type: "paragraph",
            text: "Notice how quickly it jumps from a single event to a conclusion about your entire identity.",
          },
          { type: "paragraph", text: "That’s not reality." },
          {
            type: "paragraph",
            text: "That’s fear wearing the disguise of certainty.",
          },
        ],
      },
      {
        heading: "The Voice You’d Never Use With Someone You Love",
        blocks: [
          {
            type: "paragraph",
            text: "Here’s a simple exercise.",
          },
          {
            type: "paragraph",
            text: "Imagine your closest friend came to you after making a mistake.",
          },
          { type: "paragraph", text: "Would you say," },
          { type: "paragraph", text: "“You’re hopeless.”" },
          { type: "paragraph", text: "“You’ll never succeed.”" },
          {
            type: "paragraph",
            text: "“Why do you always ruin everything?”",
          },
          { type: "paragraph", text: "Probably not." },
          {
            type: "paragraph",
            text: "You’d offer understanding.",
          },
          { type: "paragraph", text: "Perspective." },
          { type: "paragraph", text: "Encouragement." },
          {
            type: "paragraph",
            text: "So why is your own heart deserving of less kindness than someone else’s?",
          },
          {
            type: "paragraph",
            text: "Self-compassion isn’t lowering your standards.",
          },
          {
            type: "paragraph",
            text: "It’s changing the way you speak to yourself while you continue to grow.",
          },
        ],
      },
      {
        heading: "You Don’t Have to Fight Your Inner Critic",
        blocks: [
          {
            type: "paragraph",
            text: "Many people believe they need to silence that voice.",
          },
          {
            type: "paragraph",
            text: "But the more we fight our thoughts, the louder they often become.",
          },
          {
            type: "paragraph",
            text: "Instead, try listening with curiosity.",
          },
          {
            type: "paragraph",
            text: "The next time your inner critic says,",
          },
          {
            type: "paragraph",
            text: "“You’re not good enough.”",
          },
          { type: "paragraph", text: "Pause." },
          {
            type: "paragraph",
            text: "Ask yourself:",
          },
          {
            type: "paragraph",
            text: "“What is this part of me afraid of?”",
          },
          {
            type: "paragraph",
            text: "Often, underneath criticism lies something much softer.",
          },
          { type: "paragraph", text: "A fear of rejection." },
          {
            type: "paragraph",
            text: "A fear of disappointing others.",
          },
          { type: "paragraph", text: "A fear of not belonging." },
          {
            type: "paragraph",
            text: "When we understand the fear, we no longer have to battle the voice.",
          },
          {
            type: "paragraph",
            text: "We can respond to it with compassion instead.",
          },
        ],
      },
      {
        heading: "One Small Step You Can Try Today",
        blocks: [
          {
            type: "paragraph",
            text: "Take a piece of paper and draw two columns.",
          },
          {
            type: "paragraph",
            text: "In the first column, write down one critical thought you’ve had about yourself today.",
          },
          {
            type: "paragraph",
            text: "In the second column, rewrite it as if you were speaking to someone you deeply care about.",
          },
          { type: "paragraph", text: "For example:" },
          {
            type: "paragraph",
            text: "Inner Critic: “I always mess things up.”",
          },
          {
            type: "paragraph",
            text: "Compassionate Voice: “You made a mistake today, but one mistake doesn’t define who you are. What can you learn from it?”",
          },
          {
            type: "paragraph",
            text: "Notice how different those two voices feel.",
          },
          {
            type: "paragraph",
            text: "Both acknowledge reality.",
          },
          {
            type: "paragraph",
            text: "Only one creates room for growth.",
          },
        ],
      },
      {
        heading: "Take a Moment",
        blocks: [
          {
            type: "paragraph",
            text: "Before you leave, reflect on these questions:",
          },
          {
            type: "list",
            items: [
              "What sentence does your inner critic repeat most often?",
              "When do you notice it becoming the loudest?",
              "Whose voice does it remind you of?",
              "What would change if you responded with curiosity instead of criticism?",
            ],
          },
          {
            type: "paragraph",
            text: "There are no perfect answers.",
          },
          { type: "paragraph", text: "Only honest ones." },
          {
            type: "paragraph",
            text: "And honesty is where healing begins.",
          },
        ],
      },
      {
        heading: "A Thought to Carry With You",
        blocks: [
          {
            type: "paragraph",
            text: "Your inner critic may have been trying to protect you for years.",
          },
          {
            type: "paragraph",
            text: "But protection isn’t supposed to become a prison.",
          },
          {
            type: "paragraph",
            text: "You deserve a voice inside your own mind that challenges you with kindness—not fear.",
          },
          {
            type: "paragraph",
            text: "Growth doesn’t come from constantly proving you’re enough.",
          },
          {
            type: "paragraph",
            text: "It comes from believing you’re worthy of growing, even while you’re still learning.",
          },
        ],
      },
      {
        heading: "Before You Leave…",
        blocks: [
          {
            type: "paragraph",
            text: "The next time your inner critic speaks, don’t ask,",
          },
          {
            type: "paragraph",
            text: "“Why am I like this?”",
          },
          {
            type: "paragraph",
            text: "Instead, gently ask,",
          },
          {
            type: "paragraph",
            text: "“What part of me is asking for understanding right now?”",
          },
          {
            type: "paragraph",
            text: "Sometimes the greatest transformation doesn’t happen because the critical voice disappears.",
          },
          {
            type: "paragraph",
            text: "It happens because another voice finally becomes stronger.",
          },
          {
            type: "paragraph",
            text: "The one that says,",
          },
          {
            type: "paragraph",
            text: "“I’m learning. I’m growing. And I’m worthy of kindness—even from myself.”",
          },
          {
            type: "paragraph",
            text: "Until our next conversation, speak to yourself with the same patience you would offer someone you love. Your mind is listening.",
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
