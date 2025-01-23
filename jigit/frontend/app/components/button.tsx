export function Button({
  children,
  text,
  onClick,
  ...props
}: {
  text: string;
  children?: any;
  onClick?: any
}) {
  return (
    <button
      type="button"
      className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-transparent bg-black text-white hover:bg-black/80 focus:outline-none focus:bg-black disabled:opacity-50 disabled:pointer-events-none"
      {...props}
    >
      {text}
      {children}
    </button>
  );
}
