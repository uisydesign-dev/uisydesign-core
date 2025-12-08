"use client";

import React, { useRef, useState, useEffect } from "react";

export default function ZoomedOutComponent({
  Component,
}: {
  Component: React.JSXElementConstructor<any>; // a React component
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.style.transform = `scale(${zoom})`;
    containerRef.current.style.transformOrigin = "0 0";
  }, [zoom]);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setZoom((z) => z + 0.1)}>Zoom In</button>
        <button onClick={() => setZoom((z) => Math.max(z - 0.1, 0.1))}>Zoom Out</button>
      </div>

      <div ref={containerRef} className="border w-full">
        <Component />
      </div>
    </div>
  );
}
