import type { SVGProps } from "react";

/* Consistent 24px stroke icon set (Lucide-style). One place, no dependency. */

function Base({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      width={24}
      height={24}
      {...props}
    >
      {children}
    </svg>
  );
}

export const IconLayout = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </Base>
);

export const IconCode = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
  </Base>
);

export const IconCart = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <circle cx="9" cy="20" r="1.5" />
    <circle cx="18" cy="20" r="1.5" />
    <path d="M2 3h3l2.7 12.3a1 1 0 0 0 1 .7h8.9a1 1 0 0 0 1-.8L21 7H6" />
  </Base>
);

export const IconSearch = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </Base>
);

export const IconMapPin = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </Base>
);

export const IconSparkles = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
  </Base>
);

export const IconBot = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <rect x="4" y="8" width="16" height="12" rx="2" />
    <path d="M12 4v4M8 4h.01" />
    <path d="M9 13v1M15 13v1" />
  </Base>
);

export const IconWorkflow = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <path d="M10 6.5h4a2 2 0 0 1 2 2V14" />
  </Base>
);

export const IconServer = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <rect x="3" y="4" width="18" height="7" rx="2" />
    <rect x="3" y="13" width="18" height="7" rx="2" />
    <path d="M7 7.5h.01M7 16.5h.01" />
  </Base>
);

export const IconGauge = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M12 14l4-4" />
    <path d="M3.3 15.5a9 9 0 1 1 17.4 0" />
  </Base>
);

export const IconTrendingUp = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="m3 17 6-6 4 4 8-8" />
    <path d="M15 7h6v6" />
  </Base>
);

export const IconTarget = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" />
  </Base>
);

export const IconShield = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
  </Base>
);

export const IconUsers = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
    <path d="M16 5a3.5 3.5 0 0 1 0 7M17.5 14.5a6.5 6.5 0 0 1 4 5.5" />
  </Base>
);

export const IconCheck = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="m4 12.5 5 5L20 6.5" />
  </Base>
);

export const IconArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M4 12h16m-6-6 6 6-6 6" />
  </Base>
);

export const IconMail = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Base>
);

export const IconPhone = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </Base>
);

export const IconMenu = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Base>
);

export const IconX = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const IconClock = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </Base>
);

export const IconBuilding = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M16 10h.01M8 10h.01M8 14h.01M12 14h.01M16 14h.01" />
  </Base>
);

export const IconHeart = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </Base>
);
