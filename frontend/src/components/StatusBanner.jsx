const variants = {
  summary: {
    wrapper: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    icon: (
      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
      </svg>
    ),
  },
  empty: {
    wrapper: 'bg-yellow-800/10 border-yellow-700/20 text-yellow-600',
    icon: (
      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
      </svg>
    ),
  },
  error: {
    wrapper: 'bg-red-500/10 border-red-500/20 text-red-400',
    icon: (
      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
      </svg>
    ),
  },
}

export default function StatusBanner({ variant, message }) {
  const v = variants[variant]
  return (
    <div
      className={`flex items-start gap-3 px-4 py-3.5 rounded-xl my-5 text-sm leading-relaxed border ${v.wrapper}`}
      role={variant === 'error' ? 'alert' : 'status'}
      aria-atomic="true"
    >
      {v.icon}
      <span className="text-stone-200/80">{message}</span>
    </div>
  )
}
