import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { SearchInput } from '../../components/common/SearchInput';
import { FiSearch } from 'react-icons/fi';
import './Overview.css';

export default function Overview() {
  const { user } = useAuth();
  const userName = user?.name.trim().split(/\s+/)[0] || 'User';
  const [searchValue, setSearchValue] = useState('');

  return (
    <div>
      <h2 className="overview__heading">
        Overview
        <InformationButton tooltip="More information" ariaLabel="Information" />
      </h2>
      <p className="overview__subheading">
        Welcome back, {userName}. Here's what's happening in the global payment
        landscape today.
      </p>

      {/* Example usage of SearchInput */}
      <div style={{ maxWidth: 400, margin: '2rem 0' }}>
        <SearchInput
          size="sm"
          value={searchValue}
          onChange={setSearchValue}
          onSubmit={() => alert(`Search submitted: ${searchValue}`)}
          placeholder="Search dashboards, reports, and data..."
          leadingSlot={<FiSearch size={18} color="#64748b" />}
          ariaLabel="Overview search input"
        />
      </div>
    </div>
  );
}
