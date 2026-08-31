type BrandMarkProps = {
  size?: number
  className?: string
}

function BrandMark({ size = 34, className }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 44 44"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="16" cy="25" r="12" fill="#D97543" opacity="0.9" />
      <circle cx="27" cy="19" r="11" fill="#0d0c1c" />
      <circle cx="27" cy="19" r="10" fill="#101e26" />
      <circle
        cx="27"
        cy="19"
        r="10.5"
        fill="none"
        stroke="#7DD3D8"
        strokeWidth="1"
        opacity="0.75"
      />
    </svg>
  )
}

export { BrandMark }
