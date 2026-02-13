/**
 * One-time migration script: seeds Sanity with data from the original SITE_DATA.
 *
 * Usage:
 *   1. Set SANITY_PROJECT_ID, SANITY_DATASET, and SANITY_TOKEN in .env
 *   2. Run: node scripts/seed-sanity.mjs
 *
 * SANITY_TOKEN must be a write-enabled token from https://www.sanity.io/manage
 */

import "dotenv/config";
import { createClient } from "@sanity/client";

const { SANITY_PROJECT_ID, SANITY_DATASET = "production", SANITY_TOKEN } = process.env;

if (!SANITY_PROJECT_ID || SANITY_PROJECT_ID === "your_project_id_here") {
  console.error("Set SANITY_PROJECT_ID in .env before running this script.");
  process.exit(1);
}
if (!SANITY_TOKEN) {
  console.error(
    "Set SANITY_TOKEN in .env (needs write access). Get one from https://www.sanity.io/manage"
  );
  process.exit(1);
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  token: SANITY_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ---------------------------------------------------------------------------
// Original SITE_DATA (copied from the static data.js)
// ---------------------------------------------------------------------------
const SITE_DATA = {
  site: {
    name: "John Salako",
    headline:
      "Dual Ph.D. Candidate \u2022 Data Scientist \u2022 ML Engineer \u2022 Geospatial AI",
    location: "Arlington, VA (open to US-wide roles)",
    email: "your.email@example.com",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/john-salako/" },
      { label: "GitHub", href: "https://github.com/TheGospeler" },
      {
        label: "Google Scholar",
        href: "https://scholar.google.com/citations?user=YYreyqgAAAAJ&hl=en",
      },
      { label: "CV (PDF)", href: "downloads/John_Salako_resume.pdf" },
    ],
    skills: [
      "Time Series Analysis",
      "Deep Learning",
      "Geospatial ML",
      "Remote Sensing",
      "Time Series Forecasting",
      "Cloud + MLOps",
      "Python",
      "Visualization",
    ],
  },
  work: [
    {
      role: "Research Assistant",
      org: "Michigan State University",
      time: "2021 \u2013 Present",
      where: "East Lansing, MI",
      bullets: [
        "Regional-scale precision agriculture analysis using satellite imagery and large geospatial datasets.",
        "Field-scale yield stability mapping and edge-of-field conservation/buffer-zone analytics.",
        "Machine learning modeling for yield prediction and spatiotemporal inference.",
      ],
      tags: ["Geospatial AI", "Remote sensing", "Python", "Parallel computing"],
    },
    {
      role: "Cloud Computing Fellow",
      org: "Michigan State University",
      time: "2022 \u2013 2023",
      where: "East Lansing, MI",
      bullets: [
        "Built cloud-deployed ML workflows; optimized runtime using Azure Web App Services.",
        "Presented work at the MSU Cloud Computing Fellows Symposium.",
      ],
      tags: ["Azure", "MLOps", "Web apps"],
    },
    {
      role: "Software Developer (Python) Trainee",
      org: "New Horizons",
      time: "2020 \u2013 2021",
      where: "Lagos, Nigeria",
      bullets: [
        "Developed Python applications and data workflows; strengthened software engineering fundamentals.",
      ],
      tags: ["Python", "Software engineering"],
    },
    {
      role: "Geoscience & Reservoir Intern",
      org: "TotalEnergies",
      time: "May 2017 \u2013 Nov 2017",
      where: "Nigeria (Offshore / Subsurface team)",
      bullets: [
        "Worked with seismic and well logs for reservoir interpretation and volumetric estimation.",
      ],
      tags: ["Seismic", "Reservoir characterization"],
    },
  ],
  education: [
    {
      degree:
        "Dual Ph.D., Computational Mathematics, Science & Engineering + Earth & Environmental Sciences",
      school: "Michigan State University",
      time: "Expected 2026",
      details: [
        "Spatiotemporal yield prediction using integrated remote sensing and AI frameworks.",
      ],
    },
    {
      degree: "M.Sc., Geological Sciences",
      school: "Michigan State University",
      time: "2023",
      details: [
        "Assessing roots distribution of tart cherry tree using ground penetrating radar (GPR) and Artificial Intelligence (AI).",
      ],
    },
    {
      degree: "B.Sc., Marine Science & Technology",
      school: "Federal University of Technology, Akure (FUTA)",
      time: "2018",
      details: [
        "Volumetric estimation of reservoirs in 'EJSA' field, offshore Niger Delta, using 3-D seismic data and well logs.",
      ],
    },
  ],
  awards: [
    {
      title: "First Place, Ph.D. Poster Presentation Competition",
      issuer: "Precision Agriculture Systems, ASA National Conference",
      year: "2024",
      details: "Poster competition award for precision agriculture research.",
    },
    {
      title: "MSU Cloud Computing Fellow",
      issuer: "Michigan State University",
      year: "2022",
      details:
        "Selected as a fellow in the MSU Cloud Computing Fellowship program.",
    },
    {
      title: "EES Alumni Fellowship",
      issuer: "Earth & Environmental Sciences, MSU",
      year: "2021",
      details: "Graduate fellowship support.",
    },
    {
      title: "EES Alumni Computational Equipment Award",
      issuer: "Earth & Environmental Sciences, MSU",
      year: "2021",
      details: "Award supporting research computing resources.",
    },
    {
      title: "First Place, Third-Year University Categorical Award",
      issuer: "National Association of Marine Geosciences Students",
      year: "2016",
      details: "Recognition during undergraduate studies.",
    },
  ],
  currentProjects: [
    {
      title:
        "Regional-scale field mapping (U.S. Midwest) from large-scale satellite imagery analysis",
      desc: "Field segmentation, crop masking, smoothing, and high-throughput analytics across multiple states.",
      tags: ["Remote Sensing", "GIS", "Parallel Computing"],
    },
    {
      title: "Field-level yield prediction using AI + monitor data as ground truth",
      desc: "Multi-year yield/NDVI stacks; multi-output and spatiotemporal ML models with uncertainty.",
      tags: ["ML", "Time Series", "Gaussian Processes"],
    },
    {
      title:
        "Optimizing Power Consumption Forecasts (one-step-ahead + enhanced lag selection)",
      desc: "Forecasting research focused on lag selection and robust evaluation across models.",
      tags: ["Forecasting", "Feature Engineering", "ML"],
    },
    {
      title: "Multitrack music separation app \ud83d\udca1",
      desc: "Split audio into vocals/instruments; deploy as a usable web experience.",
      tags: ["Signal Processing", "Deep Learning", "Web App"],
    },
    {
      title: "Music transcription to letter + tonic solfa \ud83d\udca1",
      desc: "Automatic transcription pipeline from audio to symbolic representation.",
      tags: ["DSP", "ML"],
    },
  ],
  projects: [
    {
      title: "Hybrid Parallelization of ADMM for LASSO",
      year: "2024",
      desc: "Parallel computing implementation of ADMM for LASSO.",
      links: [
        {
          label: "GitHub Repo",
          href: "https://github.com/TheGospeler/Parallel-Computing-of-ADMM-Algorithm-for-LASSO",
        },
        { label: "Report", href: "downloads/ADMM_LASSO_Report.pdf" },
        { label: "Poster", href: "downloads/ADMM_LASSO_Poster.jpg" },
      ],
      tags: ["Parallel Computing", "Optimization", "Python", "C++"],
    },
    {
      title:
        "Evaluating the Impact of Image Resolution on Yield Stability Map",
      year: "2024",
      desc: "The spatial resolution of various satellite sources was used to assess how spatial resolution impacts the construction of the yield stability map by comparing the results with yield monitor data.",
      links: [{ label: "Poster", href: "downloads/ASA_Poster.pdf" }],
      tags: ["Remote Sensing", "Precision Agriculture", "Python"],
    },
    {
      title:
        "Classification of Spatiotemporal Field Data for Biodiversity Estimation",
      year: "2024",
      desc: "High-Resolution land cover classification for crops, forest, grass, NPS, and water class around agricultural fields in the US Midwest.",
      links: [{ label: "Poster", href: "downloads/AGU Poster.pdf" }],
      tags: ["LSTM", "Remote Sensing", "Python"],
    },
    {
      title:
        "Assessing Root Distribution of Tart Cherry Trees Using GPR + AI",
      year: "2023",
      desc: "Ground-penetrating radar (GPR)\u2013based root architecture analysis paired with ML modeling.",
      links: [
        {
          label: "GitHub Repo",
          href: "https://github.com/TheGospeler/Root-Distribution-Analysis-and-Computation",
        },
        { label: "Animation", href: "downloads/GPR_Root_Animation.gif" },
      ],
      tags: ["GPR", "ML", "3D Imaging", "Root Reconstruction", "Agroecology"],
    },
    {
      title: "Azure Web Application: Optimizing ML Web App Runtime",
      year: "2023",
      desc: "Azure Web App Services deployment and runtime optimization; presentation deck available.",
      links: [
        {
          label: "GitHub Repo",
          href: "https://github.com/TheGospeler/Azure_Web",
        },
        { label: "Slide", href: "downloads/cloud_computing.pdf" },
      ],
      tags: ["Azure", "Web apps", "Optimization", "MLOps"],
    },
    {
      title:
        "Predictive Model for Determining Experimental Site Response to N Fertilizer Addition",
      year: "2023",
      desc: "Explored how dimensionality reduction impacts predictive performance.",
      links: [
        {
          label: "GitHub Repo",
          href: "https://github.com/TheGospeler/Dimensionality-Reduction-and-Prediction-Accuracy",
        },
        {
          label: "Slide",
          href: "downloads/Dimensionality_Reduction_Report.pdf",
        },
      ],
      tags: ["ML", "PCA", "Model Evaluation"],
    },
    {
      title: "Root Variability Simulator Software",
      year: "2022",
      desc: "Simulation of root variability: The simulator attempts to reconstruct the structure of the roots.",
      links: [
        {
          label: "Github Repo",
          href: "https://github.com/TheGospeler/root_variability_simulator",
        },
        { label: "Animation", href: "downloads/Root_Animation.gif" },
      ],
      tags: ["Simulation", "Python", "ERT", "Inversion"],
    },
  ],
  publications: [
    {
      type: "Scholarly",
      items: [
        {
          title:
            "Assessing tree root distributions using ground-penetrating radar and machine learning algorithms",
          venue: "Journal: Agrosystems, Geosciences, and Environment",
          year: "2025",
          links: [
            {
              label: "Article",
              href: "downloads/Agrosystems_Geosci_Env_2025_Salako.pdf",
            },
          ],
        },
        {
          title:
            "Optimizing Power Consumption Forecasts: A One-Step-Ahead Approach with Enhanced Lag Selection",
          venue: "Journal: Applied Energy (Under Review)",
          year: "2026",
          links: [
            {
              label: "Preprint",
              href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5709585",
            },
          ],
        },
      ],
    },
    {
      type: "Media",
      items: [
        {
          title:
            "Ground-penetrating radar and artificial intelligence: a new frontier for studying plant root architecture",
          venue: "Cherry Times (Author: Andrea Giovannini)",
          year: "2025",
          links: [
            {
              label: "Open",
              href: "https://cherrytimes.it/en/news/fruit-tree-roots-georadar-artificial-intelligence-michigan",
            },
          ],
        },
        {
          title:
            "Basso Lab's John Salako Featured in Good Fruit Grower for Cherry Root Mapping Research",
          venue: "Bruno Basso's Lab News",
          year: "2025",
          links: [
            {
              label: "Open",
              href: "https://basso.ees.msu.edu/news/john-salako-featured-in-good-fruit-grower.html",
            },
          ],
        },
        {
          title:
            "Tart cherry roots and canopies: New tools map tart cherry orchards",
          venue: "Good Fruit Grower (Journalist: Matt Milkovich, TJ Mullinax)",
          year: "2022",
          links: [
            {
              label: "Open",
              href: "https://goodfruit.com/tart-cherry-roots-and-canopies/",
            },
          ],
        },
        {
          title: "Culmination of the 2022 Cloud Computing Fellowship",
          venue:
            "MSU ICER Institute for Cyber-Enabled Research (Author: Kylie McClung)",
          year: "2022",
          links: [
            {
              label: "Open",
              href: "https://icer.msu.edu/news/culmination-of-the-2022-cloud-computing-fellowship",
            },
          ],
        },
        {
          title: "Introducing the 2022 MSU Cloud Computing Fellows",
          venue: "MSU ICER Institute for Cyber-Enabled Research",
          year: "2022",
          links: [
            {
              label: "Open",
              href: "https://icer.msu.edu/news/introducing-the-2022-msu-cloud-computing-fellows",
            },
          ],
        },
      ],
    },
  ],
  webapps: [
    {
      title: "Machine Learning Time Series Practice App",
      desc: "Interactive practice environment for time-series modeling and evaluation.",
      href: "https://thegospeler-powermlweb-powerml-g0or2v.streamlit.app/",
    },
    {
      title: "Data Science Practice App",
      desc: "Hands-on exercises for data wrangling, modeling, and visualization.",
      href: "https://thegospeler-webapps-powerds-ml-m24fel.streamlit.app/",
    },
    {
      title: "Africa Air Monitoring Dashboard",
      desc: "Monitoring dashboard / analytics experience for emissions-related data.",
      href: "https://africa-air-monitoring.streamlit.app/",
    },
  ],
};

// ---------------------------------------------------------------------------
// Seed helpers
// ---------------------------------------------------------------------------
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 96);
}

async function seed() {
  const tx = client.transaction();

  // 1. Site settings (singleton)
  tx.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    ...SITE_DATA.site,
    links: SITE_DATA.site.links.map((l, i) => ({
      _key: `link-${i}`,
      ...l,
    })),
  });

  // 2. Work experience
  SITE_DATA.work.forEach((w, i) => {
    tx.createOrReplace({
      _id: `work-${slugify(w.role + "-" + w.org)}`,
      _type: "workExperience",
      ...w,
      order: i,
    });
  });

  // 3. Education
  SITE_DATA.education.forEach((e, i) => {
    tx.createOrReplace({
      _id: `edu-${slugify(e.degree)}`,
      _type: "education",
      ...e,
      order: i,
    });
  });

  // 4. Awards
  SITE_DATA.awards.forEach((a, i) => {
    tx.createOrReplace({
      _id: `award-${slugify(a.title)}`,
      _type: "award",
      ...a,
      order: i,
    });
  });

  // 5. Current projects
  SITE_DATA.currentProjects.forEach((p, i) => {
    tx.createOrReplace({
      _id: `curproj-${slugify(p.title)}`,
      _type: "currentProject",
      ...p,
      order: i,
    });
  });

  // 6. Past projects
  SITE_DATA.projects.forEach((p, i) => {
    tx.createOrReplace({
      _id: `pastproj-${slugify(p.title)}`,
      _type: "pastProject",
      ...p,
      links: (p.links || []).map((l, j) => ({
        _key: `link-${j}`,
        ...l,
      })),
      order: i,
    });
  });

  // 7. Publications
  SITE_DATA.publications.forEach((pub, i) => {
    tx.createOrReplace({
      _id: `pub-${slugify(pub.type)}`,
      _type: "publication",
      pubType: pub.type,
      items: (pub.items || []).map((it, j) => ({
        _key: `item-${j}`,
        ...it,
        links: (it.links || []).map((l, k) => ({
          _key: `link-${k}`,
          ...l,
        })),
      })),
      order: i,
    });
  });

  // 8. Web apps
  SITE_DATA.webapps.forEach((w, i) => {
    tx.createOrReplace({
      _id: `webapp-${slugify(w.title)}`,
      _type: "webapp",
      ...w,
      order: i,
    });
  });

  console.log("Committing transaction...");
  const result = await tx.commit();
  console.log(`Done! Created/replaced ${result.results.length} documents.`);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
