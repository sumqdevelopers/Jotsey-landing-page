const BAR_HEIGHTS = [
  18, 36, 24, 50, 32, 58, 40, 68, 45, 55, 30, 65, 42, 56, 25, 49, 60, 37, 48,
  28, 42, 54, 33, 61,
]

export default function AudioWave() {
  return (
    <div
      className="flex h-14 items-center gap-[3px]"
      role="img"
      aria-label="Live audio waveform"
    >
      {BAR_HEIGHTS.map((height, index) => (
        <span
          className="wave-bar block w-[3px] rounded-full bg-accent-cyan"
          key={index}
          style={{ height: `${height}%`, animationDelay: `${index * 45}ms` }}
        />
      ))}
    </div>
  )
}
