import type { ReactNode } from "react";

export type ServiceIconName =
  | "book"
  | "clipboard"
  | "community"
  | "conversation"
  | "location"
  | "rights"
  | "participation"
  | "institution"
  | "megaphone"
  | "lock"
  | "alert"
  | "info"
  | "check"
  | "logout";

const icons: Record<ServiceIconName, ReactNode> = {
  book: <><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22V5.5Z"/><path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22V5.5Z"/></>,
  clipboard: <><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M8.5 9h7M8.5 13h7M8.5 17h4"/></>,
  community: <><circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2.5 20c.4-4 2.2-6 5.5-6s5.1 2 5.5 6M13.5 15.2c1-.8 2.1-1.2 3.5-1.2 2.8 0 4.2 1.8 4.5 5"/></>,
  conversation: <><path d="M4 4h16v12H9l-5 4V4Z"/><path d="M8 9h8M8 12h5"/></>,
  location: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  rights: <><path d="M12 3v18M7 21h10M4 6h16M6 6l-3 7h6L6 6ZM18 6l-3 7h6l-3-7Z"/><path d="M3 13c.4 2 1.4 3 3 3s2.6-1 3-3M15 13c.4 2 1.4 3 3 3s2.6-1 3-3"/></>,
  participation: <><path d="M4 21V10h4v11M10 21V4h4v17M16 21v-8h4v8M2 21h20"/></>,
  institution: <><path d="m3 9 9-6 9 6H3ZM5 10v8M9 10v8M15 10v8M19 10v8M3 18h18M2 22h20"/></>,
  megaphone: <><path d="m4 14 13-6v10L4 12v2Z"/><path d="M4 10v6M8 15l1 5h4l-2-4M19 10c1 1 1 5 0 6"/></>,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></>,
  alert: <><path d="M12 3 2.5 20h19L12 3Z"/><path d="M12 9v5M12 17.5v.1"/></>,
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.1"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  logout: <><path d="M10 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5M14 8l4 4-4 4M8 12h10"/></>,
};

export function ServiceIcon({ name, className = "h-7 w-7" }: { name: ServiceIconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}
