export const courses = [
    {
        id: 'ai-empowerment-mastery',
        slug: 'ai-empowerment-mastery',
        title: 'AI Empowerment Mastery',
        tagline: 'From Tools to Workflows and Profitable Ventures',
        duration: '8 Weeks • Comprehensive',
        heroImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop',
        audience: [
            'Beginners to Intermediate AI Users',
            'Professionals & Freelancers',
            'Entrepreneurs seeking growth'
        ],
        skills: [
            'Workflow Automation',
            'Monetization Strategy',
            'Advanced Prompt Engineering'
        ],
        tools: {
            llms: ['ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Grok'],
            automation: ['Make.com', 'Zapier'],
            media: ['Midjourney', 'Manus', 'Notation AI'],
            engineering: ['Google AI Studio', 'Hugging Face']
        },
        structure: [
            { title: 'Weeks 1-3', focus: 'Mastering AI Tools', outcomes: ['Master 15+ AI tools', 'Prompt engineering', 'Custom Integrations'] },
            { title: 'Weeks 4-6', focus: 'AI Workflows', outcomes: ['Data Analysis pipeline', 'Marketing automation', 'Content generation system'] },
            { title: 'Weeks 7-8', focus: 'Monetization Mastery', outcomes: ['Sales pitch development', 'Business launch strategy', 'Revenue models'] }
        ],
        curriculum: [
            {
                week: 1,
                title: "Foundation & The Art of Prompting",
                focus: "Mastering the Language of LLMs",
                days: [
                    { day: "Day 1", topic: "The AI Landscape & LLM Architecture", description: "Understanding functionality vs. magic." },
                    { day: "Day 2", topic: "Zero-Shot vs. Few-Shot Prompting", description: "Techniques to get instant results." },
                    { day: "Day 3", topic: "Chain-of-Thought Reasoning", description: "Forcing complex logic extraction." },
                    { day: "Day 4", topic: "The Perfect Context Window", description: "Managing token limits effectively." },
                    { day: "Day 5", topic: "Hands-on Workshop: Prompt Library", description: "Building your personal asset kit." }
                ]
            },
            {
                week: 2,
                title: "Visual Intelligence & Media",
                focus: "Generative Art & Design Workflows",
                days: [
                    { day: "Day 1", topic: "Midjourney Deep Dive", description: "Parameters, aspect ratios, and chaos." },
                    { day: "Day 2", topic: "Consistency in Characters", description: "Using seed values and reference images." },
                    { day: "Day 3", topic: "AI for UI/UX Design", description: "Generating layouts and assets." },
                    { day: "Day 4", topic: "Video Gen: Runway & Pika", description: "Animating static concepts." },
                    { day: "Day 5", topic: "Project: Brand Identity Pack", description: "Full visual suite creation." }
                ]
            },
            {
                week: 3,
                title: "No-Code Automation Systems",
                focus: "Replacing Manual Work with Make.com",
                days: [
                    { day: "Day 1", topic: "Intro to Webhooks & APIs", description: "How the internet talks." },
                    { day: "Day 2", topic: "Building your first Make Scenario", description: "Email to Slack notification." },
                    { day: "Day 3", topic: "Data Parsing & Filtering", description: "Handling complex JSON outputs." },
                    { day: "Day 4", topic: "Integrating AI into Automations", description: "Auto-drafting replies with GPT-4." },
                    { day: "Day 5", topic: "Challenge: The Social Auto-Poster", description: "RSS -> Summary -> LinkedIn." }
                ]
            },
            {
                week: 4,
                title: "Advanced n8n Workflows",
                focus: "Enterprise-Grade Logic & Self-Hosting",
                days: [
                    { day: "Day 1", topic: "n8n architecture & Local Setup", description: "Running your own instance." },
                    { day: "Day 2", topic: "Complex Routing & Merge nodes", description: "Handling conditional logic." },
                    { day: "Day 3", topic: "Database Integrations (Postgres)", description: "Storing state and memory." },
                    { day: "Day 4", topic: "Error Handling & Retries", description: "Building bulletproof flows." },
                    { day: "Day 5", topic: "Project: Lead Enrichment Bot", description: "Scraping & qualifying leads." }
                ]
            },
            {
                week: 5,
                title: "Building Custom AI Agents",
                focus: "Autonomous Workers & Tool Use",
                days: [
                    { day: "Day 1", topic: "Agent Theory: Observation/Action", description: "How agents think." },
                    { day: "Day 2", topic: "Building with Assistants API", description: "Knowledge retrieval basics." },
                    { day: "Day 3", topic: "Function Calling Deep Dive", description: "Connecting LLMs to code." },
                    { day: "Day 4", topic: "Multi-Agent Orchestration", description: "Manager vs. Worker agents." },
                    { day: "Day 5", topic: "Project: The Research Agent", description: "Auto-browsing & report generation." }
                ]
            },
            {
                week: 6,
                title: "AI-Powered Coding",
                focus: "Software Development for Non-Coders",
                days: [
                    { day: "Day 1", topic: "Cursor IDE Mastery", description: "Coding at the speed of thought." },
                    { day: "Day 2", topic: "V0.dev & Frontend Generation", description: "React components in seconds." },
                    { day: "Day 3", topic: "Backend Logic with Replit Agent", description: "Setting up servers & DBs." },
                    { day: "Day 4", topic: "Debugging & Refactoring", description: "Using AI to fix AI code." },
                    { day: "Day 5", topic: "Project: SaaS MVP Build", description: "Launch a functional web app." }
                ]
            },
            {
                week: 7,
                title: "Productization & Strategy",
                focus: "Packaging Skills into Products",
                days: [
                    { day: "Day 1", topic: "Identifying AI Opportunities", description: "Where is the value?" },
                    { day: "Day 2", topic: "Service-as-a-Software (SaaS)", description: "Productized service models." },
                    { day: "Day 3", topic: "Pricing & Positioning", description: "Selling speed vs. outcomes." },
                    { day: "Day 4", topic: "The 'Agency' Model", description: "Scaling with AI employees." },
                    { day: "Day 5", topic: "Workshop: The Pitch Deck", description: "Crafting your offer." }
                ]
            },
            {
                week: 8,
                title: "Launch & Monetization",
                focus: "Go-to-Market & Scale",
                days: [
                    { day: "Day 1", topic: "Viral Content Strategy", description: "Marketing your AI tools." },
                    { day: "Day 2", topic: "Distribution Channels", description: "Twitter, LinkedIn, ProductHunt." },
                    { day: "Day 3", topic: "Sales Automation", description: "Inbound funnel setup." },
                    { day: "Day 4", topic: "Legal & Ethics in AI Business", description: "Staying compliant." },
                    { day: "Day 5", topic: "Graduation: Demo Day", description: "Showcasing your empire." }
                ]
            }
        ],
        projects: [
            { title: 'Personal Productivity Dashboard', description: 'Build a centralized dashboard in Notion AI automating daily tasks.' },
            { title: 'Automated Content Engine', description: 'Create an end-to-end pipeline from ideation to social distribution.' },
            { title: 'AI Business Launch', description: 'Develop and pitch a monetizable AI service or product.' }
        ],
        outcomes: [
            'Mastery of 15+ AI Tools',
            'Portfolio of 10+ Automated Workflows',
            'Actionable Monetization Strategy'
        ],
        format: {
            type: '8-Week Cohort',
            access: 'Lifetime Community Access',
            certification: 'AI Empowerment Certificate'
        },
        ethics: 'Focus on verifying outputs, maintaining data ownership, and transparent AI pricing.'
    },
    {
        id: 'ai-engineering-accelerator',
        slug: 'ai-engineering-accelerator',
        title: 'AI Engineering Accelerator',
        tagline: '14-Day Intensive Bootcamp to Build and Deploy Production-Ready AI Systems',
        duration: '14 Days • Intensive Coding',
        heroImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2670&auto=format&fit=crop',
        audience: [
            'Intermediate Developers',
            'Python Programmers',
            'Aspiring AI Engineers'
        ],
        skills: [
            'Production RAG Pipelines',
            'Multi-Agent Systems',
            'LLM Deployment & Monitoring'
        ],
        tools: {
            llms: ['OpenAI', 'Anthropic', 'Groq', 'Ollama'],
            automation: ['n8n'],
            media: [],
            engineering: ['LangChain', 'LlamaIndex', 'LangGraph', 'Vercel', 'Pinecone', 'LangSmith']
        },
        structure: [
            { title: 'Weeks 1-2', focus: 'RAG & Vector Search', outcomes: ['Hybrid Search', 'Pinecone/Weaviate', 'Advanced Retrieval'] },
            { title: 'Weeks 3-5', focus: 'Agents & Orchestration', outcomes: ['LangGraph', 'Multi-Agent Swarms', 'Tool Calling'] },
            { title: 'Weeks 6-8', focus: 'Production & scale', outcomes: ['LLMOps', 'Fine-tuning', 'SaaS Deployment'] }
        ],
        curriculum: [
            {
                week: 1,
                title: "LLM Physics & Prompt Engineering",
                focus: "Understanding the Ghost in the Machine",
                days: [
                    { day: "Day 1", topic: "Transformers & Token Economics", description: "Attention mechanisms, context windows, and cost optimization." },
                    { day: "Day 2", topic: "Advanced Prompting Patterns", description: "CoT, Tree of Thoughts, and System Prompts." },
                    { day: "Day 3", topic: "Structured Outputs (JSON Mode)", description: "Taming LLMs to speak code, not poetry." },
                    { day: "Day 4", topic: "Function Calling & Tools", description: "giving LLMs hands to interact with APIs." },
                    { day: "Day 5", topic: "Build: The CLI Assistant", description: "Create a terminal-based AI helper." }
                ]
            },
            {
                week: 2,
                title: "RAG Foundations & Vector DBs",
                focus: "Giving Models Long-Term Memory",
                days: [
                    { day: "Day 1", topic: "Vector Embeddings 101", description: "High-dimensional spaces and cosine similarity." },
                    { day: "Day 2", topic: "Pinecone & Weaviate Setup", description: "Production-grade vector infrastructure." },
                    { day: "Day 3", topic: "Chunking Strategies", description: "Semantic vs. Fixed-size windowing techniques." },
                    { day: "Day 4", topic: "Retrieval Pipelines", description: "Building the context injection loop." },
                    { day: "Day 5", topic: "Build: Chat-with-PDF Engine", description: "Full stack document QA system." }
                ]
            },
            {
                week: 3,
                title: "Advanced RAG Architectures",
                focus: "Solving Hallucinations & Retrieval Failures",
                days: [
                    { day: "Day 1", topic: "Hybrid Search (Keyword + Vector)", description: "Best of both worlds retrieval." },
                    { day: "Day 2", topic: "Re-ranking Algorithms (Cohere)", description: "Sorting results for maximum relevance." },
                    { day: "Day 3", topic: "GraphRAG & Knowledge Graphs", description: "Structuring data for complex reasoning." },
                    { day: "Day 4", topic: "Context Compression", description: "Squeezing more info into the prompt." },
                    { day: "Day 5", topic: "Build: The Legal Research Bot", description: "High-accuracy citation engine." }
                ]
            },
            {
                week: 4,
                title: "Agentic Workflows (LangChain)",
                focus: "Reasoning and Action Loops",
                days: [
                    { day: "Day 1", topic: "ReAct Pattern Implementation", description: "Reason + Act loops from scratch." },
                    { day: "Day 2", topic: "LangChain Deep Dive", description: "Chains, Memory, and Callbacks." },
                    { day: "Day 3", topic: "Building Custom Tools", description: "Connecting agents to Slack, Gmail, and SQL." },
                    { day: "Day 4", topic: "Router Chains", description: "Dynamically selecting the right prompt." },
                    { day: "Day 5", topic: "Build: Automated Analyst", description: "Agent that queries DBs and writes reports." }
                ]
            },
            {
                week: 5,
                title: "Multi-Agent Systems",
                focus: "Orchestrating AI Teams",
                days: [
                    { day: "Day 1", topic: "LangGraph State Machines", description: "Cyclic graphs for complex behaviors." },
                    { day: "Day 2", topic: "Hierarchical Teams", description: "Manager-Worker agent architectures." },
                    { day: "Day 3", topic: "Reflection & Critique Loops", description: "Agents that review their own code." },
                    { day: "Day 4", topic: "Human-in-the-Loop", description: "Approval steps for sensitive actions." },
                    { day: "Day 5", topic: "Build: Dev Shop Simulation", description: "PM, Dev, and QA agents building apps." }
                ]
            },
            {
                week: 6,
                title: "LLMOps & Evaluation",
                focus: "Moving from Notebook to Production",
                days: [
                    { day: "Day 1", topic: "Eval Frameworks (RAGAS)", description: "Measuring faithfulness and relevancy." },
                    { day: "Day 2", topic: "Tracing with LangSmith", description: "Debugging complex agent chains." },
                    { day: "Day 3", topic: "Caching & Cost Control", description: "Semantic caching to save $$$." },
                    { day: "Day 4", topic: "Security & Guardrails", description: "Preventing jailbreaks and injections." },
                    { day: "Day 5", topic: "Workshop: Red Teaming", description: "Trying to break your own agents." }
                ]
            },
            {
                week: 7,
                title: "Fine-Tuning & Small Models",
                focus: "Owning Your Weights",
                days: [
                    { day: "Day 1", topic: "When to Fine-Tune?", description: "Context injection vs. Weight updates." },
                    { day: "Day 2", topic: "Data Prep & Formatting", description: "Creating high-quality instruction datasets." },
                    { day: "Day 3", topic: "LoRA & PEFT", description: "Efficient fine-tuning on consumer GPUs." },
                    { day: "Day 4", topic: "Ollama & Local Inference", description: "Running Llama 3 on your laptop." },
                    { day: "Day 5", topic: "Build: The Specialist Model", description: "Fine-tune a model for medical/legal code." }
                ]
            },
            {
                week: 8,
                title: "SaaS Deployment & Launch",
                focus: "Shipping to the World",
                days: [
                    { day: "Day 1", topic: "Backend Architecture (FastAPI)", description: "Serving async AI endpoints." },
                    { day: "Day 2", topic: "Streaming Responses", description: "Vercel AI SDK & Edge usage." },
                    { day: "Day 3", topic: "Auth & Rate Limiting", description: "Protecting your API." },
                    { day: "Day 4", topic: "Monetization Strategies", description: "Subscriptions vs. Usage-based pricing." },
                    { day: "Day 5", topic: "Demo Day", description: "Live launch of your AI SaaS." }
                ]
            }
        ],
        projects: [
            { title: 'Atlas: Second Brain RAG', description: 'Personal knowledge base with multi-modal ingestion and query engine.' },
            { title: 'Orion: Multi-Agent Workforce', description: 'Team of autonomous agents handling planning, coding, and review.' },
            { title: 'Production SaaS Deployment', description: 'Full-stack AI app with observability and security guardrails.' }
        ],
        outcomes: [
            '8+ Fully Deployed AI Applications',
            'Production Engineering Mastery',
            'Job-Ready GitHub Portfolio'
        ],
        format: {
            type: '14-Day Live Bootcamp',
            access: 'Code Repos & Recordings',
            certification: 'AI Engineering Certificate'
        },
        ethics: 'Best practices for reproducible code, fair AI, and preventing prompt injection.'
    },
    {
        id: 'ai-revolution-intensive',
        slug: 'ai-revolution-intensive',
        title: 'AI Revolution Intensive',
        tagline: '100 Hours to Master Generative AI and Build Your Future',
        duration: '100 Hours • Immersive',
        heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2532&auto=format&fit=crop',
        audience: [
            'Beginners to Intermediate Learners',
            'Content Creators',
            'Automation Enthusiasts'
        ],
        skills: [
            'Neural Network Fundamentals',
            'Diffusion Model Architecture',
            'Media Manipulation'
        ],
        tools: {
            llms: ['Hugging Face Transformers', 'GPT-4'],
            automation: ['LangChain', 'Make.com'],
            media: ['Stable Diffusion', 'MidJourney', 'Runway ML', 'ElevenLabs'],
            engineering: ['TensorFlow/Keras', 'PyTorch', 'Google Colab']
        },
        structure: [
            { title: 'Module 1', focus: 'GenAI Fundamentals', outcomes: ['Neural networks', 'LLM architecture', 'Tokenization'] },
            { title: 'Module 2', focus: 'Diffusion Models', outcomes: ['DDPM & Stable Diffusion', 'Math behind diffusion'] },
            { title: 'Module 3', focus: 'Media Manipulation', outcomes: ['Advanced prompting', 'Video/Audio generation'] },
            { title: 'Module 4', focus: 'Custom GPTs & Agents', outcomes: ['Fine-tuning', 'Agentic workflows'] },
            { title: 'Module 5', focus: 'No-Code Automations', outcomes: ['Visual workflows', 'Complex system orchestration'] }
        ],
        projects: [
            { title: 'Neural Network Classifier', description: 'Build and train a basic network to classify data.' },
            { title: 'Custom Diffusion Process', description: 'Implement noise addition/removal for image generation.' },
            { title: 'AI Media Portfolio', description: 'Integrated project using generated images, video, and audio.' }
        ],
        outcomes: [
            'Deep Technical Understanding',
            'Deployable Generalist Projects',
            'AI Generalist Roadmap'
        ],
        format: {
            type: '100-Hour Extensive Program',
            access: 'Workbooks & Community',
            certification: 'GenAI Master Certificate'
        },
        ethics: 'Addressing bias in training data, copyright issues, and deepfake prevention.'
    },
    {
        id: 'ai-mastermind',
        slug: 'ai-mastermind',
        title: 'AI Mastermind',
        tagline: '2-Day Intensive to Build AI Apps, Stunning Visuals, and Automated Workflows',
        duration: '2 Days • Weekend Intensive',
        heroImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop',
        audience: [
            'Creators & Marketers',
            'Entrepreneurs',
            'Non-Coding Professionals'
        ],
        skills: [
            'Prompt Engineering',
            'Diffusion Visuals',
            'No-Code Agents'
        ],
        tools: {
            llms: ['ChatGPT', 'Claude 3.5', 'Grok'],
            automation: ['Make.com', 'Zapier', 'n8n'],
            media: ['Midjourney V7', 'Runway Gen-4', 'Kling AI', 'ElevenLabs'],
            engineering: ['OpenAI AgentKit (No-Code)']
        },
        structure: [
            { title: 'Day 1', focus: 'Foundations & Media Mastery', outcomes: ['Prompting mastery', 'Video/Image generation pipeline'] },
            { title: 'Day 2', focus: 'Agents & Automations', outcomes: ['Custom GPTs', 'End-to-end workflows', 'Capstone project'] }
        ],
        projects: [
            { title: 'Professional Media Portfolio', description: 'Create stunning, consistent character series and cinematic video clips.' },
            { title: 'Custom Business Agent', description: 'Build a bot that mimics your style and handles tasks.' },
            { title: 'Automated Operations Workflow', description: 'Connect email, CRM, and AI for seamless business ops.' }
        ],
        outcomes: [
            'Mini AI Project Portfolio',
            'Custom Agents that act like you',
            'Automated Workflows saving hours'
        ],
        format: {
            type: '2-Day Live Mastermind',
            access: 'Templates & Recordings',
            certification: 'AI Implementation Certificate'
        },
        ethics: 'Privacy in custom data, attributing AI content, and avoiding deepfakes.'
    },
    {
        id: 'genai-engineering-mastermind',
        slug: 'genai-engineering-mastermind',
        title: 'GenAI Engineering Mastermind',
        tagline: '2-Day Intensive to Master LLM APIs, Prompt Engineering, and Multi-Agent Systems',
        duration: '2 Days • Engineer Focused',
        heroImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop',
        audience: [
            'Software Engineers',
            'Developers',
            'AI Builders'
        ],
        skills: [
            'Advanced API Integration',
            'Agentic Architectures',
            'Multi-Agent Orchestration'
        ],
        tools: {
            llms: ['OpenAI Responses API', 'Anthropic Claude', 'Groq'],
            automation: [],
            media: [],
            engineering: ['LangChain', 'LangGraph', 'CrewAI', 'LangSmith', 'OpenAI AgentKit']
        },
        structure: [
            { title: 'Day 1', focus: 'LLM Foundations & Prompts', outcomes: ['Deep dive into architecture', 'Advanced prompt engineering', 'Streaming API integration'] },
            { title: 'Day 2', focus: 'Agentic Workflows', outcomes: ['Reasoning loops', 'Multi-agent collaboration', 'Production scaling'] }
        ],
        projects: [
            { title: 'Self-Improving Agent', description: 'Build an agent with reflection loops and tool use.' },
            { title: 'Multi-Agent MVP (Orion Lite)', description: 'Orchestrate a planner, executor, and reviewer agent team.' },
            { title: 'Production Chatbot', description: 'Deploy a robust bot with specialized tool calling capabilities.' }
        ],
        outcomes: [
            'Production-Ready GenAI MVP',
            'Mastery of Agentic Frameworks',
            'Repo with Reusable Patterns'
        ],
        format: {
            type: '2-Day Technical Intensive',
            access: 'Code Repositories',
            certification: 'GenAI Engineering Badge'
        },
        ethics: 'Guardrails for safety, bias mitigation, and secure API key management.'
    },
    {
        id: 'ai-builder-bootcamp',
        slug: 'ai-builder-bootcamp',
        title: 'AI Builder Bootcamp',
        tagline: '7 Days to Create, Automate, and Launch Your Own AI Projects',
        duration: '7 Days • Build & Launch',
        heroImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop',
        audience: [
            'Beginners',
            'Makers & Entrepreneurs',
            'No-Code Enthusiasts'
        ],
        skills: [
            'Rapid Prototyping',
            'Voice Agents',
            'No-Code Product Launch'
        ],
        tools: {
            llms: ['Ollama', 'Bolt.new'],
            automation: ['Make.com', 'Zapier'],
            media: ['ElevenLabs', 'VAPI', 'MidJourney', 'Runway', 'D-ID'],
            engineering: ['Softr', 'Bubble', 'AutoGPT', 'CrewAI']
        },
        structure: [
            { title: 'Days 1-2', focus: 'Playground & Voice Agents', outcomes: ['Local LLM setup', 'Voice assistant creation'] },
            { title: 'Days 3-4', focus: 'Clones & Media Gen', outcomes: ['Personal AI clone', 'AI video/audio assets'] },
            { title: 'Days 5-6', focus: 'Automations & Agents', outcomes: ['Complex workflows', 'Autonomous research agents'] },
            { title: 'Day 7', focus: 'Vibe Coding & Launch', outcomes: ['No-code MVP build', 'Product launch'] }
        ],
        projects: [
            { title: 'Personal Voice Assistant', description: 'Create an AI that handles calls and queries with your voice.' },
            { title: 'Autonomous Research Agent', description: 'Deploy an agent to gather insights and report back.' },
            { title: 'Launched AI MVP', description: 'Build and ship a functional product using no-code tools.' }
        ],
        outcomes: [
            'Portfolio of Deployable AI Tools',
            'Live MVP Launch',
            '0-1 Builder Mindset'
        ],
        format: {
            type: '7-Day Live Bootcamp',
            access: 'Notion Workspace',
            certification: 'AI Builder Certificate'
        },
        ethics: 'Ensure voice cloning consent and avoid misleading deepfakes.'
    },
    {
        id: 'n8n-workflow-automation',
        slug: 'n8n-workflow-automation',
        title: 'n8n Workflow Automation',
        tagline: 'Master Visual Automation to Build Complex AI Agents and Workflows',
        duration: '2 Days • Hands-on',
        heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
        audience: [
            'Automation Engineers',
            'Operations Managers',
            'Technical Founders'
        ],
        skills: [
            'Advanced Webhooks',
            'JSON Data Manipulation',
            'API Integrations'
        ],
        tools: {
            llms: ['OpenAI', 'Anthropic'],
            automation: ['n8n', 'Postman'],
            media: [],
            engineering: ['JavaScript', 'PostgreSQL']
        },
        structure: [
            { title: 'Day 1', focus: 'n8n Fundamentals', outcomes: ['Understanding Nodes', 'Data flow mastery', 'Error handling'] },
            { title: 'Day 2', focus: 'AI Agents in n8n', outcomes: ['LangChain integration', 'Memory management', 'Autonomous routers'] }
        ],
        projects: [
            { title: 'Social Media Auto-Pilot', description: 'Monitor trends, generate content, and post automatically.' },
            { title: 'CRM Enrichment Bot', description: 'Enrich leads from email using Clearbit and AI analysis.' },
            { title: 'Customer Support Agent', description: 'Ticket classification and auto-response system.' }
        ],
        outcomes: [
            'Full n8n Proficiency',
            '3 Production Workflows',
            'Self-Hosting Knowledge'
        ],
        format: {
            type: 'Weekend Deep Dive',
            access: 'Workflow Templates',
            certification: 'Automation Architect Badge'
        },
        ethics: 'Responsible rate-limiting and data privacy in automations.'
    },
    {
        id: 'ai-powered-development-bootcamp',
        slug: 'ai-powered-development-bootcamp',
        title: 'AI-Powered Development',
        tagline: '10x Your Coding Speed with Cursor, Copilot, and LLM-Driven Workflows',
        duration: '1 Week • Intensive',
        heroImage: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2706&auto=format&fit=crop',
        audience: [
            'Software Developers',
            'Full Stack Engineers',
            'CTOs'
        ],
        skills: [
            'Context-Aware Prompting',
            'Codebase Indexing',
            'Refactoring with AI'
        ],
        tools: {
            llms: ['Claude 3.5 Sonnet', 'GPT-4o'],
            automation: ['GitHub Actions'],
            media: [],
            engineering: ['Cursor', 'GitHub Copilot', 'V0.dev', 'Bolt.new']
        },
        structure: [
            { title: 'Days 1-2', focus: 'IDE Superpowers', outcomes: ['Cursor mastery', 'Copilot keybindings', 'Context management'] },
            { title: 'Days 3-4', focus: 'The "Vibe Coding" Stack', outcomes: ['Generating full apps', 'Iterative refinement', 'Debugging with AI'] },
            { title: 'Day 5', focus: 'Security & Optimization', outcomes: ['Code quality checks', 'Leaking prevention', 'Unit test generation'] }
        ],
        projects: [
            { title: 'Legacy Code Refactor', description: 'Modernize an old codebase using AI agents.' },
            { title: 'Full Stack App in 24h', description: 'Build a Trello clone from scratch using V0 and Cursor.' },
            { title: 'Automated Test Suite', description: 'Generate comprehensive coverage for a complex API.' }
        ],
        outcomes: [
            'Ship Features 5x Faster',
            'Mastery of AI IDEs',
            'Cleaner, Better Code'
        ],
        format: {
            type: '1-Week Bootcamp',
            access: 'Prompt Library',
            certification: 'AI Developer Certification'
        },
        ethics: 'Understanding IP implications of AI-generated code.'
    },
    {
        id: 'microsoft-365-copilot-bootcamp',
        slug: 'microsoft-365-copilot-bootcamp',
        title: 'Microsoft 365 Copilot Mastery',
        tagline: 'Transform Your Office Workflow with Integrated AI Assistance',
        duration: '1 Week • Corporate Focus',
        heroImage: 'https://images.unsplash.com/photo-1633419461186-7d40a23933a7?q=80&w=2532&auto=format&fit=crop',
        audience: [
            'Business Professionals',
            'Executive Assistants',
            'Project Managers'
        ],
        skills: [
            'Document Synthesis',
            'Data Analysis in Excel',
            'Presentation Generation'
        ],
        tools: {
            llms: ['GPT-4 (via Copilot)'],
            automation: ['Power Automate'],
            media: ['DALL-E 3 (via Designer)'],
            engineering: ['M365 Copilot', 'Word', 'Excel', 'PowerPoint', 'Teams']
        },
        structure: [
            { title: 'Days 1-2', focus: 'Documents & Data', outcomes: ['Drafting in Word', 'Analyzing pivots in Excel'] },
            { title: 'Days 3-4', focus: 'Meetings & Comms', outcomes: ['Teams meeting summaries', 'Email triage in Outlook'] },
            { title: 'Day 5', focus: 'Synthesis & Strategy', outcomes: ['Cross-app intelligence', 'Strategic briefing generation'] }
        ],
        projects: [
            { title: 'Automated Board Report', description: 'Compile data from Excel and updates from Email into a Word doc.' },
            { title: 'Instant Slide Deck', description: 'Turn a whitepaper into a 10-slide PowerPoint presentation.' },
            { title: 'Smart Meeting Assistant', description: 'Set up automated summaries and action items for all calls.' }
        ],
        outcomes: [
            'Save 10+ Hours/Week',
            'Data-Driven Decision Making',
            'Effortless Documentation'
        ],
        format: {
            type: '1-Week Workshop',
            access: 'Cheat Sheets',
            certification: 'Copilot Productivity Expert'
        },
        ethics: 'Data privacy within the corporate tenant.'
    }
];
