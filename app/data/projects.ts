export interface ProjectData {
  slug: string;
  title: string;
  location: string;
  role: string;
  shortDescription: string;
  body: string;
  videoLinks: { url: string; label: string }[];
  pressLinks: { url: string; label: string }[];
  /** Static thumbnail used before Sanity is seeded. YouTube/Vimeo auto-thumbnails. */
  thumbnail?: string;
}

export const PROJECTS: ProjectData[] = [
  {
    slug: "open-your-eyes",
    title: "Open Your Eyes",
    location: "Nairobi, Kenya",
    role: "Director, Camera Operator, Editor, Project Manager, Sound Design, Color",
    shortDescription:
      "In Kibera, Kenya, basketball isn't just a game; it's a lifeline. The court becomes a place to dream, to escape, to learn, to find family, and to hold on to something greater than the grind of everyday life.",
    body: `In Kibera, Kenya, basketball isn't just a game; it's a lifeline. The court becomes a place to dream, to escape, to learn, to find family, and to hold on to something greater than the grind of everyday life. Through sweat and grit, young players discover that challenges don't make their dreams less possible but more meaningful.

Open Your Eyes began as a passion project and grew into a full scale feature documentary that shaped me both personally and creatively. With nothing other than passion driving the process, the film became a space to experiment, push boundaries, and build an art piece centered on a profound truth that's true for these guys and girls in Kenya, true for me, true for you.

That theme became just as real in the making of the film as it was for the players we followed. With an all star producer at my side, Tony Tei — the project was built through collaboration, perseverance, and the contributions of dozens of people who poured thousands of hours into bringing it to life. The result is a story that reflects resilience, creativity, and the power of community.

Note: The film is currently in festival circulation, so the full documentary cannot be publicly shared yet.`,
    thumbnail: "https://img.youtube.com/vi/zudyjGIrVZI/maxresdefault.jpg",
    videoLinks: [
      { url: "https://youtu.be/zudyjGIrVZI?si=W1VDCL9bh9G_icMV", label: "Trailer" },
    ],
    pressLinks: [
      {
        url: "https://culturecustodian.com/neil-sandozs-open-your-eyes-documentary-underscores-the-reparative-effect-of-grassroots-targeted-sports/",
        label: "Culture Custodian Article",
      },
    ],
  },
  {
    slug: "uchi-school-of-fish",
    title: "Uchi – School of Fish",
    location: "Remote - Houston & Austin, Texas",
    role: "Editor, Motion Design, Sound Design, Music Supervision",
    shortDescription:
      "Uchi needed a fresh editorial vision for a series of 14 branded videos highlighting their craft, flavors, and approach to sushi.",
    body: `Uchi needed a fresh editorial vision for a series of 14 branded videos highlighting their craft, flavors, and approach to sushi. I was brought in by the fine folks at Filmlab to elevate the campaign's style and clarity while shaping the material into a compelling experience. The client provided scripts, rough outlines, and a small set of graphics, and from there I explored visual rhythm and pace.

I expanded and refined the graphic elements, created custom bumpers with musical cues, and animated the provided assets. The result was a polished series that felt cohesive and true to Uchi's artistry.

We delivered a set of short, shareable videos that both Filmlab and Uchi were genuinely excited about. And to date, I have never worked on a project that made me this consistently hungry. See you at Uchi sometime?`,
    thumbnail: "https://vumbnail.com/1147821185.jpg",
    videoLinks: [
      { url: "https://vimeo.com/1147821185/98d0487a11", label: "School of Fish" },
      { url: "https://youtu.be/h1UfC4jy9V4", label: "Episode 2" },
      { url: "https://youtu.be/l9BEA1bDZjk", label: "Episode 3" },
      { url: "https://youtu.be/oD1GO5CfppE", label: "Episode 4" },
    ],
    pressLinks: [],
  },
  {
    slug: "the-golden-people",
    title: "The Golden People",
    location: "Aswan, Egypt",
    role: "Director, Camera Operator, Editor",
    shortDescription:
      "A personal film created while studying Arabic in an immersive environment, capturing the contrast between the desert and the Nile River.",
    body: `The Golden People was a personal film created while I was studying Arabic in an immersive environment in Aswan, Egypt. Living there, I became deeply aware of the contrast between the surrounding desert and the Nile River cutting through it. On both the east and west of the city lies harsh, unlivable land, yet along the Nile there is abundance, movement, and life. That tension became the foundation of the film.

I partnered with my friend Eslam Mohamed and set out with a simple goal: bring the camera along and pay attention. We documented everyday life and invited people to share what makes Aswan feel like home to them. There was no agenda beyond observing, listening, and honoring a specific place and moment in time.

I shot and edited the entire piece, allowing the film to take shape organically through rhythm, light, and human presence. With custom title animations by Evan Wright, the final film became a quiet portrait of place and people, capturing beauty that often goes unnoticed and preserving a fleeting season of life along the Nile.`,
    thumbnail: "https://img.youtube.com/vi/8V2VTcmkoP4/maxresdefault.jpg",
    videoLinks: [
      { url: "https://youtu.be/8V2VTcmkoP4?si=DKVlywdzsJi5x6O1", label: "Watch Film" },
    ],
    pressLinks: [],
  },
  {
    slug: "before-you-believe",
    title: "Before You Believe",
    location: "Remote - Houston, Texas",
    role: "Editor",
    shortDescription:
      "A cinematic commercial for City Church, a vibrant faith community in downtown Houston.",
    body: `City Church is a vibrant faith community in the heart of downtown Houston. My great friends at Filmlab thought this felt like a piece that would really fit my edit style. The church wanted a short, cinematic commercial that expressed who they are at their core: a creative and welcoming community of artists, parents, professionals, and thinkers. The goal was to make something that did not feel like a traditional church video, and with a combo of digital and 16mm footage — the tone of the piece was found quickly. The 16mm was such a delight to cut in!

I shaped the edit around the natural rhythm of the story, letting the imagery and pacing guide the flow. Music played a central role in capturing the emotional heart of the piece, and once we aligned on direction, the rest of the process moved quickly and smoothly. The film was completed with a custom logo animation that brought everything together.

The result is an artistic, cinematic portrait of a community that values authenticity, belonging, and beauty.`,
    thumbnail: "https://vumbnail.com/1136198575.jpg",
    videoLinks: [
      { url: "https://vimeo.com/1136198575", label: "Watch Film" },
    ],
    pressLinks: [],
  },
  {
    slug: "pan-african-academy",
    title: "The Pan-African Academy of Christian Surgeons",
    location: "Mandritsara, Madagascar",
    role: "Project Manager, Director, Camera Operator, Editor, Script Writing",
    shortDescription:
      "Two complementary films about surgical training and Good News Hospital in Madagascar.",
    body: `The PAACS team and Good News Hospital in Mandritsara, Madagascar reached out to create two distinct but complementary films. The first was a PAACS focused overview designed to explain the program itself, how it works, and why surgical training and discipleship are essential in a resource poor context. The second, titled We Have Good News to Share, centered on the hospital as a place, capturing its history, daily rhythms, and its deeper mission of combining medical excellence with Gospel witness.

I led both projects from concept through delivery, documenting day to day hospital life, directing interviews, and shaping each story with a clear editorial focus. The PAACS film emphasized structure, training, and long term impact, while the hospital film leaned into atmosphere, human connection, and purpose. Together, the two pieces offered both clarity and heart, giving viewers a full picture of the work happening in Mandritsara.

The finished videos were crafted to support fundraising, recruitment, and storytelling efforts, helping donors and potential trainees understand not only what PAACS and Good News Hospital do, but why their presence matters. The result is a paired set of films that work together to communicate vision, credibility, and hope.`,
    thumbnail: "https://img.youtube.com/vi/NFXt4Od6x8o/maxresdefault.jpg",
    videoLinks: [
      { url: "https://www.youtube.com/watch?v=NFXt4Od6x8o", label: "PAACS Overview" },
      { url: "https://www.youtube.com/watch?v=H0iI4f7QoPY", label: "We Have Good News to Share" },
    ],
    pressLinks: [],
  },
  {
    slug: "the-fork-in-the-road",
    title: "The Fork in the Road",
    location: "Addis Ababa & Soddo, Ethiopia",
    role: "Director, Camera Operator, Editor, Project Manager, Communications Coordinator, Script Writing, Custom Music Coordination",
    shortDescription:
      "A vision casting film for SIM Ethiopia that tells a story about choosing the untrodden path.",
    body: `SIM Ethiopia approached me to create a vision casting film that would communicate a significant shift in organizational priorities. Rather than relying on facts, data, or strategy language, the challenge was to express this change in a way that felt human, memorable, and invitational. The solution was to tell a story.

Working with the team I lead, we developed and pitched a narrative built around a real and symbolic moment from SIM's history. Over a century ago, missionaries stood at a fork in the road and chose one path that led to unexpected fruit. The film reflects on that decision while inviting viewers to consider the untrodden road that leads. The story unfolds like a conversation with a grandfather, sharing wisdom, history, and an invitation to take the next step.

I led the project from concept through delivery, shaping the script, directing and shooting on location, communicating with our Ethiopian production partners, and crafting the edit to support both inspiration and clarity. One of my favorite parts was working with an Ethiopian musician named Kibraeb Tassew to create a custom score using musical elements gathered in the field, grounding the film in place and culture. The final piece served as both a compelling vision statement and a clear call to action, and the SIM Ethiopia team felt the story captured the heart of where they believe God is leading them next.`,
    thumbnail: "https://img.youtube.com/vi/-exgXL3CnAo/maxresdefault.jpg",
    videoLinks: [
      { url: "https://youtu.be/-exgXL3CnAo?si=9Hs4we5wWMKr7AuP", label: "Watch Film" },
    ],
    pressLinks: [],
  },
  {
    slug: "wellsky-brand-promo",
    title: "WellSky Brand Promo",
    location: "Remote - Houston, TX",
    role: "Editor, Animator, Music Coordinator",
    shortDescription:
      "A promotional film for WellSky, built primarily from stock assets, transformed into a unified and engaging story.",
    body: `WellSky is a technology company working at the forefront of intelligent, coordinated care across the global health and community care continuum. Filmlab, a long term creative partner, brought me in to help edit a short promotional film that clearly and confidently communicated WellSky's mission, impact, and vision.

The project presented a creative challenge due to limited original footage, requiring the story to be built primarily from stock assets. I embraced this constraint by carefully curating and shaping visually diverse material into a cohesive narrative that supported the script and brand message. Through pacing, rhythm, and thoughtful transitions, the edit transformed unrelated visuals into a unified and engaging story.

I was given wide creative freedom to explore structure, tone, and visual flow, as well as to incorporate custom animation and music direction. The final piece delivered a polished, modern brand film that WellSky was excited to share, and the process reinforced the value of trust and collaboration between creative partners.`,
    thumbnail: "https://vumbnail.com/385106794.jpg",
    videoLinks: [
      { url: "https://vimeo.com/385106794/a4bf200b87", label: "Watch Film" },
    ],
    pressLinks: [],
  },
];
