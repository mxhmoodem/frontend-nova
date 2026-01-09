interface HeaderProps {
  title?: string;
}

export default function Header({ title = 'Dashboard' }: HeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-card px-6 flex items-center">
      <h1 className="text-lg font-semibold">{title}</h1>
    </header>
  );
}
