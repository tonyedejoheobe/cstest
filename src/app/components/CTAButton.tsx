interface CTAButtonProps {
  text: string;
  onClick?: () => void;
}

export function CTAButton({ text, onClick }: CTAButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[#FF7A59] hover:bg-[#ff6844] text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-md transition-colors duration-200 text-sm md:text-base w-full md:w-auto max-w-md"
    >
      {text}
    </button>
  );
}