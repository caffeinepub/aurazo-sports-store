import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface StoreSettings {
    announcementText: string;
    countdownDurationHours: bigint;
    heroSubheadline: string;
    heroHeadline: string;
}
export interface FAQItem {
    id: bigint;
    question: string;
    order: bigint;
    answer: string;
}
export interface Review {
    id: bigint;
    verified: boolean;
    city: string;
    name: string;
    reviewText: string;
    rating: bigint;
}
export interface Product {
    originalPrice: bigint;
    name: string;
    buy3Price?: bigint;
    sizes: Array<string>;
    stockCount: bigint;
    benefits: Array<string>;
    salePrice: bigint;
    buy2Price?: bigint;
}
export interface backendInterface {
    addFAQ(faq: FAQItem): Promise<void>;
    addProduct(product: Product): Promise<void>;
    addReview(review: Review): Promise<void>;
    getAllFAQs(): Promise<Array<FAQItem>>;
    getAllProducts(): Promise<Array<Product>>;
    getAllReviews(): Promise<Array<Review>>;
    getOrderCount(): Promise<bigint>;
    getProduct(name: string): Promise<Product>;
    getStoreSettings(): Promise<StoreSettings>;
    incrementOrderCount(): Promise<bigint>;
    init(): Promise<void>;
    isAdmin(): Promise<boolean>;
    removeFAQ(faqId: bigint): Promise<void>;
    removeProduct(productName: string): Promise<void>;
    removeReview(reviewId: bigint): Promise<void>;
    transferAdmin(newAdmin: Principal): Promise<void>;
    updateProduct(product: Product): Promise<void>;
    updateStoreSettings(newSettings: StoreSettings): Promise<void>;
}
