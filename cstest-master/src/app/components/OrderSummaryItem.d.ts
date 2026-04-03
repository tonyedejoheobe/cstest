interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    size?: string;
}
interface OrderSummaryItemProps {
    product: Product;
    onRemove?: (productId: string) => void;
}
export declare function OrderSummaryItem({ product, onRemove }: OrderSummaryItemProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=OrderSummaryItem.d.ts.map