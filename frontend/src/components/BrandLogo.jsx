export default function BrandLogo({
  className = '',
  textClassName = '',
  iconClassName = '',
  stacked = false,
}) {
  return (
    <div className={`flex ${stacked ? 'flex-col items-center text-center' : 'items-center'} gap-4 ${className}`}>
      <svg
        viewBox="0 0 360 360"
        aria-hidden="true"
        className={`h-16 w-16 md:h-24 md:w-24 flex-none drop-shadow-[0_10px_24px_rgba(255,107,0,0.35)] ${iconClassName}`}
      >
        <path
          d="M56 40h242c26 0 40 16 35 42l-19 102H232v58h68l-20 86c-5 22-22 32-44 32H44c-27 0-40-16-35-42L37 78c5-24 22-38 19-38Z"
          fill="#ff6b1a"
        />
        <rect x="78" y="148" width="58" height="108" rx="2" fill="#fff" />
        <rect x="144" y="122" width="58" height="160" rx="2" fill="#fff" />
        <rect x="210" y="84" width="58" height="224" rx="2" fill="#fff" />
      </svg>

      <div
        className={`${
          stacked
            ? 'leading-[0.9]'
            : 'flex items-baseline gap-2 whitespace-nowrap leading-none'
        } ${textClassName}`}
      >
        <div className="font-headline text-3xl font-black uppercase tracking-tight text-black dark:text-white md:text-5xl">
          MOVE
        </div>
        <div className="font-headline text-3xl font-black uppercase tracking-tight text-primary-container md:text-5xl">
          M3ANA
        </div>
      </div>
    </div>
  )
}
