import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, MouseEvent, TouchEvent } from 'react';
export function ImageComparisonSlider({ baseImage, overlayImage, className = '' }) {
    const [sliderPosition, setSliderPosition] = useState(50); // Percentage from left
    const containerRef = useRef(null);
    const updatePosition = (clientX) => {
        if (!containerRef.current)
            return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        // Clamp between 0 and 100
        setSliderPosition(Math.min(Math.max(percentage, 0), 100));
    };
    const handleMouseMove = (e) => {
        updatePosition(e.clientX);
    };
    const handleTouchMove = (e) => {
        if (e.touches.length > 0) {
            updatePosition(e.touches[0].clientX);
        }
    };
    const handleMouseLeave = () => {
        // Reset to center when mouse leaves
        setSliderPosition(50);
    };
    const handleTouchEnd = () => {
        // Reset to center when touch ends
        setSliderPosition(50);
    };
    return (_jsxs("div", { ref: containerRef, className: `relative overflow-hidden cursor-col-resize touch-none ${className}`, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, children: [_jsx("img", { src: baseImage, alt: "Dog kibble", className: "w-full h-full object-cover select-none", draggable: false }), _jsx("div", { className: "absolute top-0 left-0 h-full overflow-hidden transition-all duration-100 ease-out", style: { width: `${sliderPosition}%` }, children: _jsx("img", { src: overlayImage, alt: "Raw dog food ingredients", className: "h-full object-cover select-none", draggable: false, style: {
                        width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%',
                        objectPosition: 'left center'
                    } }) }), _jsx("div", { className: "absolute top-0 h-full w-1 bg-white shadow-lg transition-all duration-100 ease-out pointer-events-none", style: { left: `${sliderPosition}%`, transform: 'translateX(-50%)' }, children: _jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center", children: _jsxs("div", { className: "flex gap-1", children: [_jsx("div", { className: "w-0.5 h-4 bg-gray-400" }), _jsx("div", { className: "w-0.5 h-4 bg-gray-400" })] }) }) })] }));
}
//# sourceMappingURL=ImageComparisonSlider.js.map