export function ErynLogo() {
  return (
    <div className="relative h-16 w-16">
      {/* Blue circle background */}
      <svg viewBox="0 0 64 64" className="absolute h-full w-full">
        <circle cx="32" cy="32" r="30" fill="#182654" />
      </svg>

      {/* Teal overlay shape */}
      <svg viewBox="0 0 64 64" className="absolute h-full w-full">
        <path
          d="M8 32C8 18.7452 18.7452 8 32 8C45.2548 8 56 18.7452 56 32C56 45.2548 45.2548 56 32 56C18.7452 56 8 45.2548 8 32Z"
          fill="#31E2EF"
        />
      </svg>

      {/* White overlay with cutout for the logo */}
      <svg viewBox="0 0 64 64" className="absolute h-full w-full">
        <path
          d="M32 62C48.5685 62 62 48.5685 62 32C62 15.4315 48.5685 2 32 2C15.4315 2 2 15.4315 2 32C2 48.5685 15.4315 62 32 62Z"
          fill="white"
          fillRule="evenodd"
          clipRule="evenodd"
        />
        <path
          d="M32 58C46.3594 58 58 46.3594 58 32C58 17.6406 46.3594 6 32 6C17.6406 6 6 17.6406 6 32C6 46.3594 17.6406 58 32 58Z"
          fill="#EAF2F6"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>

      {/* Small detail element */}
      <svg viewBox="0 0 64 64" className="absolute h-full w-full">
        <rect x="42" y="24" width="4" height="10" fill="#D9D9D9" />
      </svg>
    </div>
  )
}
