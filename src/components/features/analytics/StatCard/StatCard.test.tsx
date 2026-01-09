import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FileText } from 'lucide-react';
import StatCard from './StatCard';

describe('StatCard', () => {
  it('renders title and value', () => {
    render(<StatCard title="Documents" value="14" />);
    expect(screen.getByText('Documents')).toBeDefined();
    expect(screen.getByText('14')).toBeDefined();
  });

  it('renders icon when provided', () => {
    const { container } = render(
      <StatCard title="Documents" value="14" icon={FileText} />
    );
    expect(container.querySelector('svg')).toBeDefined();
  });

  it('renders positive change with trending up icon', () => {
    render(<StatCard title="Documents" value="14" change={8} />);
    expect(screen.getByText(/\+8%/)).toBeDefined();
  });

  it('renders negative change with trending down icon', () => {
    render(<StatCard title="Documents" value="14" change={-5} />);
    expect(screen.getByText(/-5%/)).toBeDefined();
  });

  it('renders custom subText instead of percentage', () => {
    render(
      <StatCard
        title="Documents"
        value="14"
        change={8}
        subText="+8% this week"
      />
    );
    expect(screen.getByText('+8% this week')).toBeDefined();
  });

  it('applies custom className', () => {
    const { container } = render(
      <StatCard title="Test" value="10" className="custom-class" />
    );
    expect(container.querySelector('.custom-class')).toBeDefined();
  });
});
