export default function TwKbd({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <kbd className="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 font-semibold">
      {children}
    </kbd>
  );
}
