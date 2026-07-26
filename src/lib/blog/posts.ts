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
  closingThought: string;
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
    title: "Have You Ever Replayed the Same Moment a Hundred Times?",
    eyebrow: "Reflections",
    description:
      "On overthinking, the search for certainty, and learning to notice your thoughts without being trapped by them.",
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
    title: "I Didn’t Want To… But I Said Yes Anyway.",
    eyebrow: "Reflections",
    description:
      "On the fear of saying no, the cost of always saying yes, and learning that healthy boundaries are an act of self-respect.",
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
];

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}
