import type { TaskKey } from "./site-config";
import type { SitePost } from "./site-connector";

const taskSeeds: Record<TaskKey, string> = {
  listing: "listing",
  classified: "classified",
  article: "article",
  image: "image",
  profile: "profile",
  social: "social",
  pdf: "pdf",
  org: "org",
  sbm: "sbm",
  comment: "comment",
};

const taskTitles: Record<TaskKey, string[]> = {
  listing: [
    "River North Espresso Bar",
    "Flatiron Web Studio",
    "Peak Trail Outfitters",
    "Denver Mobile Auto Detail",
    "Front Range HVAC Service",
  ],
  classified: [
    "2021 Subaru Outback — low miles",
    "Loft sublet near Union Station",
    "Part-time barista (mornings)",
    "Canon RF 24-70mm f/2.8",
    "Two-bedroom Capitol Hill",
  ],
  article: [
    "How Colorado’s housing code changes affect renters",
    "Inside the Front Range used-car market in 2026",
    "What local buyers actually click on in classified photos",
    "From newsroom to marketplace: keeping listings trustworthy",
    "Weekend gear: what sells fastest on Lode News",
  ],
  image: [
    "Storm over the Continental Divide",
    "RiNo murals after dark",
    "Farmers’ market winter produce",
    "High school track finals",
    "Red Rocks load-out",
  ],
  profile: [
    "Elena Voss — investigative",
    "Marcus Chen — sports desk",
    "Sofia Alvarez — photo editor",
    "James Whitaker — opinion",
    "Anya Petrov — data visuals",
  ],
  social: [
    "Tip line: transportation projects",
    "Correction: city council vote tally",
    "Reader photos: spring runoff",
    "Event: candidate forum tonight",
    "Weather alert: foothills snow",
  ],
  pdf: [
    "2026 voter guide (PDF)",
    "Small business permit checklist",
    "Annual transparency report",
    "School district boundary map",
    "Wildfire preparedness packet",
  ],
  org: [
    "Colorado Press Association",
    "Denver Institute of Technology",
    "Front Range Food Bank",
    "Mile High Arts Alliance",
    "Rocky Mountain Audubon",
  ],
  sbm: [
    "CDOT traffic & roadwork map",
    "Secretary of state business search",
    "EPA indoor air quality basics",
    "Denver B-cycle station map",
    "National Weather Service Boulder",
  ],
  comment: [
    "Re: Housing story follow-up",
    "Re: Candidate spending piece",
    "Re: Classifieds pricing question",
    "Re: Photo credit",
    "Re: Correction request",
  ],
};

const taskCategories: Record<TaskKey, string[]> = {
  listing: ["Food & drink", "Professional services", "Retail", "Automotive", "Home services"],
  classified: ["Vehicles", "Housing", "Jobs", "Electronics", "Real estate"],
  article: ["Politics", "Housing", "Business", "Behind the scenes", "Lifestyle"],
  image: ["News", "Sports", "Weather", "Culture", "Photo essay"],
  profile: ["Newsroom", "Editorial", "Visuals", "Opinion", "Data"],
  social: ["Tips", "Corrections", "Community", "Events", "Alerts"],
  pdf: ["Elections", "Business", "Annual reports", "Education", "Outdoors"],
  org: ["Industry", "Education", "Nonprofit", "Arts", "Environment"],
  sbm: ["Government", "Transit", "Reference", "Maps", "Weather"],
  comment: ["Feedback", "Corrections", "Classifieds", "Rights", "General"],
};

const summaryByTask: Record<TaskKey, string> = {
  listing: "Verified listing with hours, contact, and photos reviewed by our team.",
  classified: "Active Lode News classified with price and seller contact on file.",
  article: "Reporting and analysis from the Lode News newsroom.",
  image: "Assignment or reader-submitted photography published with credit.",
  profile: "Newsroom staff or contributor profile.",
  social: "Short newsroom or community update tied to coverage.",
  pdf: "Official document or guide published as a download.",
  org: "Partner organization referenced in Lode News coverage.",
  sbm: "Curated external resource saved by editors for reference.",
  comment: "Reader comment or staff reply on an open thread.",
};

const randomFrom = (items: string[], index: number) =>
  items[index % items.length];

const buildImage = (task: TaskKey, index: number) =>
  `https://picsum.photos/seed/${taskSeeds[task]}-${index}/1200/800`;

export const getMockPostsForTask = (task: TaskKey): SitePost[] => {
  return Array.from({ length: 5 }).map((_, index) => {
    const title = taskTitles[task][index];
    const category = randomFrom(taskCategories[task], index);
    const slug = `${title}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    return {
      id: `${task}-mock-${index + 1}`,
      title,
      slug,
      summary: summaryByTask[task],
      content: {
        type: task,
        category,
        location: index % 2 === 0 ? "Denver, CO" : "Boulder, CO",
        description: summaryByTask[task],
        website: "https://lodenews.com",
        phone: "(303) 892-4400",
      },
      media: [{ url: buildImage(task, index), type: "IMAGE" }],
      tags: [task, category],
      authorName: "Lode News",
      publishedAt: new Date().toISOString(),
    };
  });
};
