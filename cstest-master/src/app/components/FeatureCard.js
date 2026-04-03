import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ReactNode } from 'react';
export function FeatureCard({ icon, title, description, iconBgColor }) {
    return (_jsxs("div", { className: "flex items-start gap-3 w-full", children: [_jsx("div", { className: `${iconBgColor} rounded-full p-3 flex-shrink-0`, children: icon }), _jsxs("div", { className: "flex flex-col gap-1 flex-1", children: [_jsx("h3", { className: "font-semibold text-base", children: title }), _jsx("p", { className: "text-sm text-gray-600 leading-snug", children: description })] })] }));
}
//# sourceMappingURL=FeatureCard.js.map