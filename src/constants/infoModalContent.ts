import type { InfoModalContent } from '../components/features/common/InfoModal/InfoModal.types';

export const infoModalContent: Record<string, InfoModalContent> = {
  overview: {
    whatFor:
      'The Overview Dashboard gives you a quick, high-level view of what is happening across the UK market, regulations, and your key payment metrics today.',
    whatItDoes: [
      'Brings together the latest UK market news, regulatory changes from the FCA/PSR, and key performance indicators.',
      'Shows a daily AI-generated summary so you can see the most important developments at a glance.',
      'Highlights anything that may need your attention, such as upcoming regulatory deadlines or unusual changes in payment activity.',
    ],
    whenToUse:
      'Use this screen at the start of your day or before important meetings to understand "what\'s changed" and where you should focus.',
    howToUse: [
      'Scan the Daily Briefing for a quick narrative summary.',
      'Check key metrics and alerts to see if there is anything urgent.',
      'Click into Market Pulse, Regulatory Radar, or Content Hub from the widgets if you need more detail.',
      'Use the assistant to ask follow-up questions about anything you see.',
    ],
    example:
      'I see that a new FCA consultation is highlighted. I click into the regulatory card to understand the new rule, then ask the assistant how this might affect our UK operations.',
    projectRelation:
      "This screen delivers the project's core promise: centralising fragmented data and using AI to turn it into clear, actionable insight for faster, better decisions.",
  },

  aiConsole: {
    whatFor:
      'The AI Console is where you can ask questions in plain language and get answers based on all the data and documents in the platform.',
    whatItDoes: [
      'Accepts natural language questions about markets, regulations, performance, and customer feedback.',
      'Uses the centralised data and vector database to find relevant information.',
      'Returns clear summaries, explanations, comparisons, and simple tables or charts.',
      'Maintains context over multiple questions in a conversation.',
    ],
    whenToUse:
      'Use this screen whenever you need to understand a topic quickly, explore a question, or prepare for a decision, report, or meeting.',
    howToUse: [
      'Type a question in plain English, such as "What are the main new payment rules in the United Kingdom next year?"',
      'Review the answer and the referenced documents or data points.',
      'Ask follow-up questions without repeating all the context.',
      'Save useful conversations or turn them into report drafts.',
    ],
    example:
      "I ask: 'How are online card payments trending in Spain, and are there any new rules that might affect them?' The assistant combines market data and regulatory documents to give me a concise answer with links to sources.",
    projectRelation:
      'The AI Console is the "assistant" part of the Global Payments Content Hub & AI Assistant. It turns the centralised data into real, usable insight for product, investment, and risk decisions.',
  },

  contentHub: {
    whatFor:
      'The Content Hub is the central library where all relevant UK payment documents and data sources are stored, searched, and explored.',
    whatItDoes: [
      'Ingests documents from many places: regulatory notices, market reports, internal emails, performance reports, and customer feedback.',
      'Stores them in a secure, searchable repository and vector database.',
      'Lets you filter and search by source, type, date, and tags.',
      'Provides AI-generated summaries and key points for each document.',
    ],
    whenToUse:
      'Use this screen when you need to find and understand specific documents, background material, or evidence to support a decision or a report.',
    howToUse: [
      'Use filters and the search bar to narrow down to the documents you need.',
      'Click a document to see its summary and key points in the preview panel.',
      'Ask the assistant questions like "What are the main themes across these reports?"',
    ],
    example:
      "I search for 'UK APP Fraud' and filter to 'regulatory documents'. I open a few key files and ask the assistant to summarise the differences between them in one paragraph.",
    projectRelation:
      'The Content Hub is the core of the "Noval IQ" vision: it centralises fragmented information so the assistant can turn it into reliable insight.',
  },

  marketPulse: {
    whatFor:
      'Market Pulse shows how payment and e-commerce markets are changing in the UK, across segments and time.',
    whatItDoes: [
      'Aggregates market and e-commerce trend data from multiple sources.',
      'Visualises trends such as transaction volumes, growth rates, and adoption of new payment methods.',
      'Surfaces the latest market news and changes in customer behaviour.',
    ],
    whenToUse:
      'Use this screen when you need to understand market dynamics before making product, pricing, or investment decisions.',
    howToUse: [
      'Select product type and time range using the filters.',
      'Review charts to see how volumes and growth are moving.',
      'Read recent news items for context.',
      'Ask the assistant to explain the trends or suggest possible opportunities or risks.',
    ],
    example:
      "I filter to 'UK – e-commerce – last 12 months' and see strong growth. I ask the assistant: 'What could be driving this increase, and what does it mean for our online card offering?'",
    projectRelation:
      'Market Pulse uses the centralised market and transaction data to provide insight into trends, helping teams move from static spreadsheets to live, AI-supported market intelligence.',
  },

  regulatoryRadar: {
    whatFor:
      'Regulatory Radar helps you track, understand, and act on changes in UK payment and financial regulation.',
    whatItDoes: [
      'Collects regulatory and scheme documents from bodies such as the FCA, PSR, and Bank of England.',
      'Organises changes by topic and effective date.',
      'Summarises the key points and likely impact using the AI assistant.',
      'Highlights upcoming deadlines and high-impact changes.',
    ],
    whenToUse:
      'Use this screen whenever you need to check what rules are changing, whether you are compliant, and what actions are needed.',
    howToUse: [
      'Filter by type of regulation or status (upcoming, active, past).',
      'Review the timeline of changes to see what is coming next.',
      'Open a regulation to read a short summary and key obligations.',
      'Use the assistant to ask, "What does this mean for our UK products?" or "What changes do we need in our onboarding process?"',
    ],
    example:
      "A new rule about APP fraud reimbursement appears in the timeline. I open it, read the summary, and ask the assistant: 'What system changes do we need to make before this takes effect next year?'",
    projectRelation:
      "Regulatory Radar turns long, complex regulatory documents into clear, actionable information, supporting the project's goal of faster regulatory insight and better compliance.",
  },
};
