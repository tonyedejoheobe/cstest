interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    size?: string;
}
interface OrderSummaryProps {
    products: Product[];
    subtotal: number;
    addOnsPrice: number;
    shippingCost: number;
    discountAmount: number;
    total: number;
    addBowl?: boolean;
    addDrinker?: boolean;
    addSupplement?: boolean;
    addToy?: boolean;
    addonPrices?: {
        bowl: number;
        drinker: number;
        supplement: number;
        toy: number;
    };
    onToggleBowl?: (checked: boolean) => void;
    onToggleDrinker?: (checked: boolean) => void;
    onToggleSupplement?: (checked: boolean) => void;
    onToggleToy?: (checked: boolean) => void;
    onRemoveItem?: (productId: string) => void;
}
export declare function OrderSummary({ products, subtotal, addOnsPrice, shippingCost, discountAmount, total, addBowl, addDrinker, addSupplement, addToy, addonPrices, onToggleBowl, onToggleDrinker, onToggleSupplement, onToggleToy, }: OrderSummaryProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=OrderSummary.d.ts.map