export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-grow flex items-center justify-center py-20 bg-gray-50">
      {children}
    </div>
  );
}