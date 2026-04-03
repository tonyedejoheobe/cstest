import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export function LazyImage({ src, alt, className = '', placeholderBg = 'bg-gray-200' }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const handleLoad = () => {
        setIsLoaded(true);
    };
    const handleError = () => {
        setHasError(true);
    };
    return (_jsxs("div", { className: `relative overflow-hidden ${className}`, children: [!isLoaded && !hasError && (_jsx("div", { className: `absolute inset-0 ${placeholderBg} animate-pulse` })), hasError && (_jsx("div", { className: `absolute inset-0 ${placeholderBg} flex items-center justify-center`, children: _jsx("span", { className: "text-xs text-gray-400", children: "Image unavailable" }) })), _jsx("img", { src: src, alt: alt, onLoad: handleLoad, onError: handleError, className: `w-full h-full object-cover transition-opacity duration-300 ${isLoaded && !hasError ? 'opacity-100' : 'opacity-0'}`, loading: "lazy" })] }));
}
//# sourceMappingURL=LazyImage.js.map