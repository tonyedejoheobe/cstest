import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronRight } from 'lucide-react';
export function Breadcrumbs({ items }) {
    return (_jsxs("nav", { className: "flex items-center gap-2 text-sm mb-6", children: [_jsx("a", { href: "#", className: "text-[#FF7A59] hover:underline font-semibold", children: "Home" }), items.map((item, index) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(ChevronRight, { className: "w-4 h-4 text-gray-400" }), item.href ? (_jsx("a", { href: item.href, className: "text-[#FF7A59] hover:underline font-semibold", children: item.label })) : (_jsx("span", { className: item.active ? 'text-gray-900 font-semibold' : 'text-gray-500', children: item.label }))] }, index)))] }));
}
//# sourceMappingURL=Breadcrumbs.js.map