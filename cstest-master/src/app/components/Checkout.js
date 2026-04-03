import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Shield, Check, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { OrderSummary } from './OrderSummary';
import { CheckoutForm } from './CheckoutForm';
const SHIPPING_COSTS = {
    standard: 0,
    express: 12.99,
    overnight: 24.99,
};
const ADDON_PRICES = {
    bowl: 24.99,
    drinker: 19.99,
    supplement: 34.99,
    toy: 0,
};
const SAMPLE_PRODUCTS = [
    {
        id: '1',
        name: 'Premium Raw Dog Food - Chicken',
        price: 49.99,
        quantity: 1,
        size: '10 lb',
        image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23FF7A59%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2216%22 fill=%22white%22 text-anchor=%22middle%22 dy=%22.3em%22%3EDog Food%3C/text%3E%3C/svg%3E',
    },
];
export function Checkout({ onOrderComplete }) {
    const [checkoutState, setCheckoutState] = useState({
        discountCode: '',
        discountApplied: false,
        discountAmount: 0,
        termsAccepted: false,
        isProcessing: false,
        shippingMethod: 'standard',
        addBowl: false,
        addDrinker: false,
        addSupplement: false,
        addToy: false,
    });
    const subtotal = SAMPLE_PRODUCTS.reduce((sum, product) => sum + product.price * product.quantity, 0);
    const addOnsPrice = (checkoutState.addBowl ? ADDON_PRICES.bowl : 0) +
        (checkoutState.addDrinker ? ADDON_PRICES.drinker : 0) +
        (checkoutState.addSupplement ? ADDON_PRICES.supplement : 0) +
        (checkoutState.addToy ? ADDON_PRICES.toy : 0);
    const shippingCost = SHIPPING_COSTS[checkoutState.shippingMethod];
    const total = subtotal + addOnsPrice + shippingCost - checkoutState.discountAmount;
    const handleApplyDiscount = () => {
        // Simple discount code validation
        const validCodes = {
            SAVE10: subtotal * 0.1,
            SAVE20: subtotal * 0.2,
            FIRST: subtotal * 0.15,
        };
        if (validCodes[checkoutState.discountCode.toUpperCase()]) {
            setCheckoutState(prev => ({
                ...prev,
                discountApplied: true,
                discountAmount: validCodes[checkoutState.discountCode.toUpperCase()],
            }));
        }
        else {
            setCheckoutState(prev => ({
                ...prev,
                discountApplied: false,
                discountAmount: 0,
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!checkoutState.termsAccepted) {
            alert('Please accept the terms and conditions');
            return;
        }
        setCheckoutState(prev => ({ ...prev, isProcessing: true }));
        // Simulate payment processing
        setTimeout(() => {
            setCheckoutState(prev => ({ ...prev, isProcessing: false }));
            if (onOrderComplete) {
                onOrderComplete();
            }
            else {
                alert('Order placed successfully! (Demo - No actual charge)');
            }
        }, 2000);
    };
    return (_jsx("main", { className: "bg-white", children: _jsx("section", { className: "max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12", children: [_jsx("div", { className: "lg:col-span-2", children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-8", children: [_jsxs("div", { className: "border border-gray-200 rounded-lg p-6", children: [_jsxs("h2", { className: "text-xl font-bold mb-6 flex items-center gap-2", children: [_jsx("span", { className: "flex items-center justify-center w-8 h-8 rounded-full bg-[#FF7A59] text-white text-sm font-semibold", children: "1" }), "Shipping Address"] }), _jsx(CheckoutForm, { formType: "shipping" })] }), _jsxs("div", { className: "border border-gray-200 rounded-lg p-6", children: [_jsxs("h2", { className: "text-xl font-bold mb-6 flex items-center gap-2", children: [_jsx("span", { className: "flex items-center justify-center w-8 h-8 rounded-full bg-[#FF7A59] text-white text-sm font-semibold", children: "2" }), "Billing Address"] }), _jsx("div", { className: "mb-4", children: _jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [_jsx(Checkbox, { defaultChecked: true }), _jsx("span", { className: "text-sm text-gray-600", children: "Same as shipping address" })] }) }), _jsxs("details", { className: "cursor-pointer", children: [_jsx("summary", { className: "text-sm font-semibold text-gray-700 cursor-pointer mb-4", children: "Different billing address" }), _jsx(CheckoutForm, { formType: "billing" })] })] }), _jsxs("div", { className: "border border-gray-200 rounded-lg p-6", children: [_jsxs("h2", { className: "text-xl font-bold mb-6 flex items-center gap-2", children: [_jsx("span", { className: "flex items-center justify-center w-8 h-8 rounded-full bg-[#FF7A59] text-white text-sm font-semibold", children: "3" }), "Shipping Method"] }), _jsx("div", { className: "space-y-3", children: [
                                                { id: 'standard', name: 'Standard Shipping', time: '5-7 business days', cost: 0 },
                                                { id: 'express', name: 'Express Shipping', time: '2-3 business days', cost: 12.99 },
                                                { id: 'overnight', name: 'Overnight Shipping', time: '1 business day', cost: 24.99 },
                                            ].map(method => (_jsxs("label", { className: "flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition", children: [_jsx("input", { type: "radio", name: "shipping", value: method.id, checked: checkoutState.shippingMethod === method.id, onChange: (e) => setCheckoutState(prev => ({ ...prev, shippingMethod: e.target.value })), className: "mr-3" }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-semibold text-sm text-gray-900", children: method.name }), _jsx("div", { className: "text-xs text-gray-500", children: method.time })] }), _jsx("div", { className: "font-semibold text-sm text-gray-900", children: method.cost === 0 ? 'FREE' : `$${method.cost.toFixed(2)}` })] }, method.id))) })] }), _jsxs("div", { className: "border border-gray-200 rounded-lg p-6", children: [_jsxs("h2", { className: "text-xl font-bold mb-6 flex items-center gap-2", children: [_jsx("span", { className: "flex items-center justify-center w-8 h-8 rounded-full bg-[#FF7A59] text-white text-sm font-semibold", children: "4" }), "Payment Method"] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("label", { className: "flex items-start p-4 border-2 border-[#FF7A59] rounded-lg cursor-pointer bg-orange-50", children: [_jsx("input", { type: "radio", name: "payment", defaultChecked: true, className: "mt-1 mr-3" }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-semibold text-sm mb-3", children: "Credit or Debit Card" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx(Label, { className: "text-xs font-semibold mb-1 block", children: "Cardholder Name" }), _jsx(Input, { placeholder: "John Doe", required: true })] }), _jsxs("div", { children: [_jsxs(Label, { className: "text-xs font-semibold mb-1 block flex items-center gap-2", children: ["Card Number", _jsx(Lock, { className: "w-3 h-3 text-gray-500" })] }), _jsx(Input, { placeholder: "1234 5678 9012 3456", maxLength: 19, required: true })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { children: [_jsx(Label, { className: "text-xs font-semibold mb-1 block", children: "Expiration" }), _jsx(Input, { placeholder: "MM / YY", required: true })] }), _jsxs("div", { children: [_jsx(Label, { className: "text-xs font-semibold mb-1 block", children: "CVV" }), _jsx(Input, { placeholder: "123", maxLength: 4, required: true })] })] })] })] })] }), _jsxs("label", { className: "flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition", children: [_jsx("input", { type: "radio", name: "payment", className: "mt-1 mr-3" }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-semibold text-sm", children: "PayPal" }), _jsx("div", { className: "text-xs text-gray-500 mt-1", children: "Fast, secure, and encrypted" })] })] })] }), _jsxs("div", { className: "mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2", children: [_jsx(Lock, { className: "w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" }), _jsx("div", { className: "text-xs text-blue-900", children: "Your payment information is encrypted and secure. We use industry-standard 256-bit SSL encryption to protect your data." })] })] }), _jsxs("div", { className: "border border-gray-200 rounded-lg p-6", children: [_jsx("h3", { className: "font-bold mb-4", children: "Promo Code" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { placeholder: "Enter promo code (Try: SAVE10, SAVE20, or FIRST)", value: checkoutState.discountCode, onChange: (e) => setCheckoutState(prev => ({ ...prev, discountCode: e.target.value })), className: "flex-1" }), _jsx(Button, { type: "button", onClick: handleApplyDiscount, variant: "outline", className: "px-4", children: "Apply" })] }), checkoutState.discountApplied && (_jsxs("div", { className: "mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-800 flex items-center gap-2", children: [_jsx(Check, { className: "w-4 h-4" }), "Discount applied! You save $", checkoutState.discountAmount.toFixed(2)] }))] }), _jsx("div", { className: "border border-gray-200 rounded-lg p-6", children: _jsxs("label", { className: "flex items-start gap-3 cursor-pointer", children: [_jsx(Checkbox, { checked: checkoutState.termsAccepted, onCheckedChange: (checked) => setCheckoutState(prev => ({ ...prev, termsAccepted: checked })), className: "mt-1" }), _jsx("div", { className: "flex-1", children: _jsxs("p", { className: "text-sm text-gray-700", children: ["I agree to the ", _jsx("a", { href: "#", className: "text-[#FF7A59] hover:underline font-semibold", children: "Terms of Service" }), " and ", _jsx("a", { href: "#", className: "text-[#FF7A59] hover:underline font-semibold", children: "Privacy Policy" })] }) })] }) }), _jsx("button", { type: "submit", disabled: checkoutState.isProcessing || !checkoutState.termsAccepted, className: "w-full bg-[#FF7A59] hover:bg-[#ff6844] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-lg", children: checkoutState.isProcessing ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-5 h-5 animate-spin" }), "Processing..."] })) : (`Complete Purchase - $${total.toFixed(2)}`) }), _jsx("p", { className: "text-center text-xs text-gray-500", children: "By completing this purchase, you agree to our terms. Your information is secure and encrypted." })] }) }), _jsxs("div", { children: [_jsx(OrderSummary, { products: SAMPLE_PRODUCTS, subtotal: subtotal, addOnsPrice: addOnsPrice, shippingCost: shippingCost, discountAmount: checkoutState.discountAmount, total: total, addBowl: checkoutState.addBowl, addDrinker: checkoutState.addDrinker, addSupplement: checkoutState.addSupplement, addToy: checkoutState.addToy, addonPrices: ADDON_PRICES, onToggleBowl: (checked) => setCheckoutState(prev => ({ ...prev, addBowl: checked })), onToggleDrinker: (checked) => setCheckoutState(prev => ({ ...prev, addDrinker: checked })), onToggleSupplement: (checked) => setCheckoutState(prev => ({ ...prev, addSupplement: checked })), onToggleToy: (checked) => setCheckoutState(prev => ({ ...prev, addToy: checked })) }), _jsxs("div", { className: "mt-8 space-y-4", children: [_jsx("div", { className: "p-4 bg-green-50 border border-green-200 rounded-lg", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Shield, { className: "w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "font-bold text-sm text-green-900", children: "31-Day Money-Back Guarantee" }), _jsx("p", { className: "text-xs text-green-800 mt-1", children: "Not satisfied? Full refund, no questions asked." })] })] }) }), _jsx("div", { className: "p-4 bg-blue-50 border border-blue-200 rounded-lg", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Lock, { className: "w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "font-bold text-sm text-blue-900", children: "Secure Checkout" }), _jsx("p", { className: "text-xs text-blue-800 mt-1", children: "SSL encrypted \u2022 PCI DSS compliant" })] })] }) }), _jsx("div", { className: "p-4 bg-amber-50 border border-amber-200 rounded-lg", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(AlertCircle, { className: "w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "font-bold text-sm text-amber-900", children: "Vet Developed Formula" }), _jsx("p", { className: "text-xs text-amber-800 mt-1", children: "Created by certified veterinary nutritionists" })] })] }) })] })] })] }) }) }));
}
//# sourceMappingURL=Checkout.js.map