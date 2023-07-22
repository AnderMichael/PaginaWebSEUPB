export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="bg-green-400">Layout Forum (Opcional)</h1>
      {children}
    </div>
  );
}