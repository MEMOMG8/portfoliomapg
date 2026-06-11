export type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  metrics: string[];
  github: string;
  image?: string;
  paper?: string;
};

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  bullets: string[];
};

export type SkillGroup = {
  category: string;
  description: string;
  skills: string[];
};

export type Cert = {
  name: string;
  issuer: string;
  date: string;
  status?: "in-progress";
};

export const projects: Project[] = [
  {
    id: "cloud-metrics",
    title: "Cloud Metrics Dashboard",
    description:
      "Monitoring serverless infrastructure without manual console checks required a self-contained observability layer. A REST API built on Lambda + API Gateway pulls live CloudWatch metrics and serves them to an S3-hosted frontend — auto-refreshing every 30 seconds with zero idle compute. A single deploy.sh handles the full environment setup from scratch.",
    stack: ["AWS Lambda", "S3", "API Gateway", "CloudWatch", "Python"],
    metrics: [
      "30-second auto-refresh cycle",
      "Serverless — zero idle compute cost",
      "Single-command deploy via deploy.sh",
    ],
    github: "https://github.com/MEMOMG8",
    image: "/images/cloudmetricsone.png",
  },
  {
    id: "rag-assistant",
    title: "National Parks RAG Assistant",
    description:
      "Generic LLMs hallucinate on domain-specific queries. Scraped 25 National Park Service pages into a ChromaDB vector store, then built a retrieval pipeline with sentence-transformers that grounds every LLaMA 3.3 70B response in verified source text. Zero hallucinations — every answer cites the exact passage that produced it.",
    stack: ["Python", "ChromaDB", "sentence-transformers", "Groq LLaMA 3.3 70B", "Gradio"],
    metrics: [
      "25 NPS pages indexed",
      "Zero hallucination rate",
      "Source attribution on every response",
    ],
    github: "https://github.com/MEMOMG8",
    image: "/images/rag-national-parks.jpg",
  },
  {
    id: "scivis",
    title: "IEEE SciVis 2025 Visualization App",
    description:
      "Exploring 324,632 aluminum alloy compositions across 70 material properties in raw CSV form was computationally intractable. Applied PCA for dimensionality reduction and Parquet encoding to compress the dataset 48.7% (182MB → 93MB), then built 15 linked interactive panels — lasso biplots, parallel coordinates — for real-time cross-dimensional exploration.",
    stack: ["Python", "PCA", "Pandas", "Plotly", "Heroku"],
    metrics: [
      "324,632 compositions × 70 properties",
      "48.7% compression (182MB → 93MB Parquet)",
      "15 linked interactive panels",
      "Submitted to IEEE SciVis Contest 2025",
    ],
    github: "https://github.com/MEMOMG8",
    image: "/images/scivis.png",
    paper: "/scivis-paper.docx",
  },
  {
    id: "anylang",
    title: "AnyLang Multilingual Chat",
    description:
      "Real-time multilingual messaging demanded sub-100ms delivery with end-to-end security. WebSocket connections via Socket.IO eliminate polling overhead; JWT tokens and AES-256 encryption secure every session from auth through delivery. The 3-column UI — rooms, chat, members — scales cleanly from mobile to desktop.",
    stack: ["Next.js", "React", "Node.js", "Socket.IO", "MongoDB", "JWT"],
    metrics: [
      "WebSocket real-time delivery",
      "JWT auth + AES-256 encryption",
      "Responsive 3-column layout",
    ],
    github: "https://github.com/MEMOMG8",
  },
];

export const experience: ExperienceItem[] = [
  {
    role: "IT Support Technician",
    org: "Classroom Technology Services — Texas Tech University",
    period: "Aug 2025 – Present",
    bullets: [
      "Resolve 20+ tickets per week across hardware, software, and AV systems",
      "Maintain 98% uptime across 35+ Windows and macOS classroom environments",
      "Track and document incidents via ServiceNow",
    ],
  },
  {
    role: "Research Software Engineer",
    org: "IDVL — Interactive Data Visualization Lab, TTU",
    period: "May 2025 – Jan 2026",
    bullets: [
      "Processed 324,632 aluminum alloy compositions spanning 70 material properties",
      "Reduced dataset 48.7% (182MB → 93MB) via PCA + Parquet encoding",
      "Built 15 linked interactive panels for IEEE SciVis Contest 2025",
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    category: "Cloud & Infrastructure",
    description:
      "Comfortable building and deploying serverless architectures on AWS — Lambda, S3, API Gateway, and CloudWatch for production monitoring. I use boto3 and the AWS CLI for scripted infrastructure management and repeatable deploys.",
    skills: ["AWS Lambda", "S3", "API Gateway", "CloudWatch", "boto3", "AWS CLI"],
  },
  {
    category: "Languages",
    description:
      "Python is my primary language for backend services, data pipelines, and AI tooling. Java and C from systems and data structures coursework. SQL for relational queries across academic and side projects.",
    skills: ["Python", "Java", "C", "SQL"],
  },
  {
    category: "Frameworks",
    description:
      "FastAPI for lightweight REST APIs, Streamlit for rapid ML demos and internal dashboards. On the frontend, React and Next.js handle everything from real-time chat UIs to static sites.",
    skills: ["FastAPI", "React", "Next.js", "Streamlit"],
  },
  {
    category: "Databases",
    description:
      "MongoDB for document storage in the AnyLang chat app, PostgreSQL in academic projects, and ChromaDB as the vector store powering semantic search in the National Parks RAG pipeline.",
    skills: ["MongoDB", "PostgreSQL", "ChromaDB"],
  },
  {
    category: "AI / ML",
    description:
      "I build end-to-end RAG pipelines — scraping, chunking, embedding, retrieving — and integrate LLM APIs for generation. My IEEE research applied PCA for dimensionality reduction across high-dimensional material property data.",
    skills: ["RAG", "Embeddings", "Semantic Search", "OpenAI API", "Claude API"],
  },
  {
    category: "Tools",
    description:
      "Git for version control on all projects. Linux for development environments and server administration. ServiceNow for IT ticketing and incident documentation in my current technician role.",
    skills: ["Git", "Linux", "ServiceNow"],
  },
];

export const certs: Cert[] = [
  {
    name: "AWS Cloud Quest: Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Jun 2026",
  },
  {
    name: "Cloud Computing Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "May 2026",
  },
  {
    name: "AI 201: Applications of AI Engineering",
    issuer: "CodePath",
    date: "Summer 2026",
    status: "in-progress",
  },
];
