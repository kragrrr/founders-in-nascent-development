## **Core Identification Prompts**

### **Scale-Up Veteran Detection Prompt**

```
Analyze this person's LinkedIn profile and identify indicators of founder readiness:

CAREER TRAJECTORY SIGNALS:
- 3-5+ years at high-growth companies (Series A-C)
- Progressive responsibility increases
- Cross-functional experience (product, engineering, ops, sales)
- Mentions of "wearing multiple hats" or "0-to-1" initiatives

FOUNDER READINESS INDICATORS:
- Stock options vesting timeline approaching
- Side projects or consulting mentioned
- Speaking at conferences or writing about industry problems
- University/bootcamp mentoring activities
- Open source contributions or technical blog posts

OUTPUT FORMAT:
Name: [Full Name]
LinkedIn: [Profile URL]
City: [Current Location]
Founder Readiness Score: [1-10]
Key Signals: [List top 3 indicators]
Suggested Tags: [e.g., "scale-up alum", "fintech veteran", "B2B SaaS"]
```


### **Academic-to-Industry Transition Prompt**

```
Examine this researcher's profile for commercialization potential:

RESEARCH INDICATORS:
- PhD timeline (final year or recently completed)
- Research areas: AI/ML, biotech, cleantech, quantum, robotics
- Patent applications or IP mentions
- Industry collaboration projects
- Startup accelerator participation

ENTREPRENEURIAL SIGNALS:
- Hackathon participation or wins
- Industry conference presentations
- LinkedIn posts about "real-world applications"
- Consulting or advisory roles
- GitHub repositories with commercial potential

OUTPUT CLASSIFICATION:
Research Focus: [Core technology area]
Commercialization Stage: [Early/Developing/Ready]
Industry Connections: [Existing network strength]
IP Potential: [Patent/Proprietary tech indicators]
Tags: ["PhD researcher", "deeptech", specific field]
```


### **Migrant Entrepreneur Discovery Prompt**

```
Identify migrant entrepreneurs operating under the radar:

BACKGROUND INDICATORS:
- Recent immigration to Australia (1-5 years)
- Previous international business experience
- Cultural or language-specific business connections
- Import/export activities
- Community leadership roles

BUSINESS SIGNALS:
- Operating businesses not in startup databases
- Strong social media presence in native language
- Industry awards or recognition in specific communities
- Cross-border partnerships or supply chains
- Real estate or traditional business investments

STEALTH INDICATORS:
- Limited English-language online presence
- Business operations through family/community networks
- Focus on specific cultural markets
- Under-utilized in mainstream startup ecosystem

Tags: ["migrant founder", "community builder", specific region/culture]
```


## **Platform-Specific Search Prompts**

### **LinkedIn Advanced Search Prompt**

```
Use these search strategies to find hidden founder talent:

BOOLEAN SEARCH STRINGS:
"Scale-up" AND ("options vesting" OR "equity") AND Australia
"Side project" AND ("weekend" OR "evenings") AND (Sydney OR Melbourne OR Brisbane)
"PhD" AND ("final year" OR "thesis defense") AND ("AI" OR "biotech" OR "quantum")
"Hackathon winner" AND Australia AND -"currently hiring"
"Migrant" AND "entrepreneur" AND ("small business" OR "import")

PROFILE ANALYSIS CHECKLIST:
□ Recent job transitions with equity upside
□ Skill progression indicating T-shaped expertise
□ Side project mentions in experience/about sections
□ Conference speaking or thought leadership
□ Cross-functional experience at growth companies
□ International background with Australian relocation
□ Technical skills + business acumen combination
```


### **GitHub Repository Mining Prompt**

```
Analyze GitHub profiles for founder potential:

CODE QUALITY INDICATORS:
- Consistent commit history over 2+ years
- Projects with commercial viability
- Clean documentation and README files
- Contributors and community engagement
- Issue resolution responsiveness

FOUNDER SIGNALS:
- Personal projects outside of employment
- Web applications with user-facing functionality
- API integrations suggesting market understanding
- Deployment and DevOps setup indicating shipping mindset
- Open source contributions to business-relevant projects

AUSTRALIAN CONNECTION:
- Location set to Australian cities
- Commits during Australian business hours
- Repository names or descriptions mentioning AU market
- Collaboration with other Australian developers

OUTPUT: GitHub username, project portfolio strength, commercial potential score
```


## **Data Extraction \& Classification Prompts**

### **Diversity Data Collection Prompt**

```
Ethically gather diversity information using public signals:

GENDER IDENTIFICATION:
- Pronouns in bio/about sections
- Public speaking photos and videos
- Professional awards mentioning gender diversity
- Participation in women-in-tech or similar groups

ETHNICITY INDICATORS:
- Cultural organization memberships
- Language skills listed
- International education background
- Cultural event speaking/sponsorship
- Diversity award recognition

ADDITIONAL DIMENSIONS:
- LGBTQI+: Pride event participation, ally badges, pronouns
- Neurodivergent: Public advocacy, accessibility focus in projects
- Age: Graduation years, early career vs. experienced professional
- Migrant status: Visa mentions, international experience timing

NOTE: Only collect publicly available information, respect privacy
```


### **Startup Stealth Mode Detection Prompt**

```
Identify founders working on undisclosed projects:

STEALTH INDICATORS:
- Vague job titles ("Founder", "Building something new")
- Recent departure from established companies
- Increased conference attendance without clear affiliation
- Angel investor meetings (calendar/location data)
- Domain registrations under personal name
- Hiring posts for "stealth startup"

ACTIVITY PATTERNS:
- Decreased social media posting about current work
- Increased networking with VCs/accelerators
- Technical blog posts about specific problem domains
- Hiring enquiries for early-stage roles
- Co-working space memberships

VALIDATION SIGNALS:
- Accelerator program applications/attendance
- Pitch competition participation
- Industry expert consultation requests
- Legal entity registrations (ASIC searches)
```


## **Quality Scoring \& Filtering Prompts**

### **Founder Potential Scoring Matrix**

```
Rate each candidate on these dimensions (1-10 scale):

EXECUTION CAPABILITY:
- Technical skills depth
- Previous shipping experience
- Cross-functional competency
- Team leadership history

MARKET INSIGHT:
- Industry expertise
- Problem identification ability
- Customer development experience
- Market timing awareness

NETWORK STRENGTH:
- Professional connections quality
- Community involvement
- Mentor relationships
- Investor access potential

MOTIVATION SIGNALS:
- Side project commitment
- Learning trajectory
- Risk tolerance indicators
- Persistence evidence

COMPOSITE SCORE: [Sum/4] with notes on strongest dimensions
PRIORITY LEVEL: [High/Medium/Low] for outreach
```


### **Database Entry Standardization Prompt**

```
Structure each founder profile consistently:

REQUIRED FIELDS:
Name: [First Last]
LinkedIn: [Clean URL]
City: [Sydney/Melbourne/Brisbane/Perth/Adelaide/Other AU]
Current Company: [If employed]
Startup Name: [If applicable, "N/A" if stealth]

TAGS (Select all applicable):
□ scale-up-alum □ PhD-researcher □ migrant-founder
□ side-project-builder □ hackathon-winner □ community-leader
□ fintech □ deeptech □ SaaS □ e-commerce □ biotech

DIVERSITY (Based on public information only):
Gender: [M/F/Non-binary/Unknown]
Ethnicity: [If publicly available]
Optional: [LGBTQI+/Neurodivergent/Age-range/Migrant-status]

CONFIDENCE SCORE: [1-10] based on data quality and founder potential
LAST UPDATED: [Date]
SOURCE: [LinkedIn/GitHub/Conference/Referral/Other]
```


## **Outreach \& Engagement Prompts**

### **Community Mapping Prompt**

```
Identify and map relevant founder communities:

ONLINE COMMUNITIES:
- Slack workspaces (Startmate, Product Hunt, specific industries)
- Discord servers (developer, designer, entrepreneur focused)
- Facebook groups (local entrepreneur, industry-specific)
- Reddit communities (r/entrepreneur, city-specific)
- Telegram channels (crypto, specific industries)

OFFLINE COMMUNITIES:
- Meetup groups (technical, entrepreneurial, cultural)
- University alumni networks
- Professional associations
- Co-working spaces and member directories
- Conference attendee lists

ENGAGEMENT STRATEGY:
- Value-first approach with industry insights
- Community contribution before extraction
- Respect for privacy and consent
- Clear value proposition for participation
```


