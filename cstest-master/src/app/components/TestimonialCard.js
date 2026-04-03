import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Star } from 'lucide-react';
export function TestimonialCard({ quote, author, title, rating }) {
    return (_jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow", children: [_jsx("div", { className: "flex gap-1 mb-4", children: Array.from({ length: 5 }).map((_, i) => (_jsx(Star, { className: `w-4 h-4 ${i < rating ? 'fill-[#FF7A59] text-[#FF7A59]' : 'text-gray-300'}` }, i))) }), _jsxs("p", { className: "text-gray-700 italic mb-4", children: ["\"", quote, "\""] }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-gray-900", children: author }), _jsx("p", { className: "text-sm text-gray-600", children: title })] })] }));
}
//# sourceMappingURL=TestimonialCard.js.map