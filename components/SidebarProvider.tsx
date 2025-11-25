"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface SidebarContextType {
  expanded: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  expanded: true,
  toggle: () => {},
});

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState(true);

  // Load from localStorage once
  useEffect(() => {
    const stored = localStorage.getItem("expanded");
    if (stored !== null) setExpanded(JSON.parse(stored));
  }, []);

  const toggle = () => {
    setExpanded((prev) => {
      const newVal = !prev;
      localStorage.setItem("expanded", JSON.stringify(newVal));
      return newVal;
    });
  };

  return (
    <SidebarContext.Provider value={{ expanded, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
