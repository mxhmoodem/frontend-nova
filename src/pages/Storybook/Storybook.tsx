import { useState } from 'react';
import { Button } from '../../components/common/Button/Button';
import { SearchInput } from '../../components/common/SearchInput';
import { AIQuerySearch } from '../../components/common/AIQuerySearch';
import { LookupSearch } from '../../components/common/LookupSearch';
import { ChatMessage } from '../../components/common/ChatMessage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Sparkles,
  RotateCcw,
  Paperclip,
  Save,
  Trash2,
  Search,
} from 'lucide-react';
import './Storybook.css';

// Create a query client for LookupSearch
const queryClient = new QueryClient();

export default function Storybook() {
  const [searchValue, setSearchValue] = useState('');

  // Mock fetch function for LookupSearch
  const fetchMockResults = async (query: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock data
    const mockData = [
      { id: '1', label: `Document: ${query} - Result 1` },
      { id: '2', label: `Document: ${query} - Result 2` },
      { id: '3', label: `Document: ${query} - Result 3` },
      { id: '4', label: `File: ${query} - Analysis` },
      { id: '5', label: `Report: ${query} - Summary` },
    ];

    return mockData.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleLookupSelect = (result: { id: string; label: string }) => {
    console.log('Selected:', result);
    alert(`Selected: ${result.label}`);
  };

  const handleAIAsk = (question: string) => {
    console.log('AI Query submitted:', question);
    alert(`AI Query: ${question}`);
  };

  const handleSearchSubmit = () => {
    console.log('Search submitted:', searchValue);
    alert(`Search: ${searchValue}`);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="storybook-container">
        <h2 className="storybook__heading">Component Library</h2>
        <p className="storybook__subheading">
          Explore and test common UI components
        </p>

        <section className="storybook__section">
          <h3>Button Component</h3>
          <div className="storybook__demo-grid">
            <div className="storybook__demo-item">
              <h4>Just Text</h4>
              <div className="storybook__demo-row">
                <Button text="Ask AI" variant="primary" />
                <Button text="Reset" variant="secondary" />
                <Button text="Delete" variant="danger" />
              </div>
            </div>

            <div className="storybook__demo-item">
              <h4>Icon and Text</h4>
              <div className="storybook__demo-row">
                <Button
                  text="Ask AI"
                  icon={<Sparkles size={16} />}
                  variant="primary"
                />
                <Button
                  text="Reset"
                  icon={<RotateCcw size={16} />}
                  variant="secondary"
                />
                <Button
                  text="Save Changes"
                  icon={<Save size={16} />}
                  variant="primary"
                />
              </div>
            </div>

            <div className="storybook__demo-item">
              <h4>Just Icon</h4>
              <div className="storybook__demo-row">
                <Button
                  icon={<Paperclip size={16} />}
                  variant="secondary"
                  aria-label="Attach file"
                  tooltip="Attach file"
                />
                <Button
                  icon={<Sparkles size={16} />}
                  variant="primary"
                  aria-label="AI Action"
                  tooltip="AI Action"
                />
                <Button
                  icon={<RotateCcw size={16} />}
                  variant="ghost"
                  aria-label="Reset"
                  tooltip="Reset"
                />
                <Button
                  icon={<Trash2 size={16} />}
                  variant="danger"
                  aria-label="Delete"
                  tooltip="Delete"
                />
              </div>
            </div>

            <div className="storybook__demo-item">
              <h4>Loading State</h4>
              <div className="storybook__demo-row">
                <Button text="Saving..." isLoading variant="primary" />
                <Button
                  icon={<RotateCcw size={16} />}
                  isLoading
                  variant="secondary"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="storybook__section">
          <h3>Search Components</h3>

          <div className="storybook__demo-item storybook__search-demo-item">
            <h4>Base SearchInput</h4>
            <p className="storybook__description">
              Basic search input with optional submit action
            </p>
            <div className="storybook__demo-column">
              <SearchInput
                value={searchValue}
                onChange={setSearchValue}
                onSubmit={handleSearchSubmit}
                placeholder="Search documents..."
                leadingSlot={<Search size={18} />}
              />
              <SearchInput
                value="Loading state"
                onChange={() => {}}
                loading={true}
                placeholder="Loading..."
              />
            </div>
          </div>

          <div className="storybook__demo-item storybook__search-demo-item">
            <h4>Lookup Search</h4>
            <p className="storybook__description">
              Search with live results from remote API (type 3+ characters)
            </p>
            <div className="storybook__demo-column">
              <LookupSearch
                fetchResults={fetchMockResults}
                onSelect={handleLookupSelect}
                placeholder="Search documents..."
                minQueryLength={3}
                leadingSlot={<Search size={18} />}
              />
            </div>
          </div>

          <div className="storybook__demo-item storybook__search-demo-item">
            <h4>AI Query Search</h4>
            <p className="storybook__description">
              AI-styled search with conversational interface
            </p>
            <div className="storybook__demo-column">
              <AIQuerySearch
                onAsk={handleAIAsk}
                placeholder="Ask AI anything..."
              />
            </div>
          </div>
        </section>

        <section className="storybook__section">
          <h3>Chat Message Component</h3>
          <p className="storybook__description">
            Message bubbles for AI conversations. AI messages appear on the
            left, user messages on the right.
          </p>

          <div className="storybook__demo-item">
            <div className="storybook__chat-container">
              <ChatMessage
                role="ai"
                content="Hello Jane. I've analyzed the latest regulatory updates from the EPC and UK Peacock. What would you like to explore today?"
                timestamp="10:30 AM"
              />
              <ChatMessage
                role="user"
                content="Can you summarize the key changes in the EPC regulations?"
                userInitals="Jane Smith"
                timestamp="10:31 AM"
              />
              <ChatMessage
                role="ai"
                content="Certainly! The European Payments Council has introduced three major updates this quarter: 1) Enhanced security requirements for instant payments, 2) New data sharing protocols for cross-border transactions, and 3) Updated guidelines for digital wallet integration."
                timestamp="10:31 AM"
              />
              <ChatMessage
                role="user"
                content="What are the implications for our compliance team?"
                userInitals="Jane Smith"
                timestamp="10:32 AM"
              />
              <ChatMessage
                role="ai"
                content="Your compliance team should focus on three key areas: First, reviewing and updating your instant payment security protocols by Q2. Second, implementing the new data sharing framework for cross-border operations. Third, ensuring your digital wallet solutions meet the new integration standards."
                timestamp="10:32 AM"
              />
            </div>
          </div>
        </section>
      </div>
    </QueryClientProvider>
  );
}
