export default function Icon({ name, fill = 0, size = 24, className = '', style = {} }) {
  return (
    <span
      className={`material-symbols-outlined ${fill ? 'icon-fill' : ''} ${className}`}
      style={{ fontSize: size, ...style }}
    >
      {name}
    </span>
  )
}
