// app/iframes/components/header/layout.tsx
export default function IframeLayout({ children }: { children: React.ReactNode }) {
    return (
      <html>
        <body className="m-0 p-0">{children}</body>
      </html>
    );
  }
  