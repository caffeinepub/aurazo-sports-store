import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";

actor {
  type StoreSettings = {
    announcementText : Text;
    heroHeadline : Text;
    heroSubheadline : Text;
    countdownDurationHours : Nat;
  };

  type Product = {
    name : Text;
    originalPrice : Nat;
    salePrice : Nat;
    stockCount : Nat;
    buy2Price : ?Nat;
    buy3Price : ?Nat;
    sizes : [Text];
    benefits : [Text];
  };

  type Review = {
    id : Nat;
    name : Text;
    city : Text;
    rating : Nat;
    reviewText : Text;
    verified : Bool;
  };

  type FAQItem = {
    id : Nat;
    question : Text;
    answer : Text;
    order : Nat;
  };

  module FAQItem {
    public func compare(item1 : FAQItem, item2 : FAQItem) : Order.Order {
      Nat.compare(item1.order, item2.order);
    };
  };

  let admin = Map.empty<Principal, Bool>();

  let products = Map.empty<Text, Product>();
  let reviews = Map.empty<Nat, Review>();
  let faqs = Map.empty<Nat, FAQItem>();

  var storeSettings : StoreSettings = {
    announcementText = "Welcome to Aurazo Sports Gear!";
    heroHeadline = "Gear Up for Adventure";
    heroSubheadline = "Premium sports gear for athletes and enthusiasts.";
    countdownDurationHours = 24;
  };

  var orderCount = 0;

  public shared ({ caller }) func init() : async () {
    if (admin.isEmpty()) {
      admin.add(caller, true);
    };
  };

  func requireAdmin(caller : Principal) {
    if (not admin.containsKey(caller)) { Runtime.trap("Unauthorized - must be admin") };
  };

  public query ({ caller }) func isAdmin() : async Bool {
    admin.containsKey(caller);
  };

  public shared ({ caller }) func transferAdmin(newAdmin : Principal) : async () {
    requireAdmin(caller);
    admin.add(newAdmin, true);
  };

  public shared ({ caller }) func updateStoreSettings(newSettings : StoreSettings) : async () {
    requireAdmin(caller);
    storeSettings := newSettings;
  };

  public query ({ caller }) func getStoreSettings() : async StoreSettings {
    storeSettings;
  };

  public shared ({ caller }) func addProduct(product : Product) : async () {
    requireAdmin(caller);
    products.add(product.name, product);
  };

  public shared ({ caller }) func updateProduct(product : Product) : async () {
    requireAdmin(caller);
    if (not products.containsKey(product.name)) { Runtime.trap("Product does not exist") };
    products.add(product.name, product);
  };

  public shared ({ caller }) func removeProduct(productName : Text) : async () {
    requireAdmin(caller);
    if (not products.containsKey(productName)) { Runtime.trap("Product does not exist") };
    products.remove(productName);
  };

  public query ({ caller }) func getProduct(name : Text) : async Product {
    switch (products.get(name)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public shared ({ caller }) func addReview(review : Review) : async () {
    requireAdmin(caller);
    reviews.add(review.id, review);
  };

  public shared ({ caller }) func removeReview(reviewId : Nat) : async () {
    requireAdmin(caller);
    if (not reviews.containsKey(reviewId)) { Runtime.trap("Review does not exist") };
    reviews.remove(reviewId);
  };

  public query ({ caller }) func getAllReviews() : async [Review] {
    reviews.values().toArray();
  };

  public shared ({ caller }) func addFAQ(faq : FAQItem) : async () {
    requireAdmin(caller);
    faqs.add(faq.id, faq);
  };

  public shared ({ caller }) func removeFAQ(faqId : Nat) : async () {
    requireAdmin(caller);
    if (not faqs.containsKey(faqId)) { Runtime.trap("FAQ item does not exist") };
    faqs.remove(faqId);
  };

  public query ({ caller }) func getAllFAQs() : async [FAQItem] {
    faqs.values().toArray().sort();
  };

  public shared ({ caller }) func incrementOrderCount() : async Nat {
    orderCount += 1;
    orderCount;
  };

  public query ({ caller }) func getOrderCount() : async Nat {
    orderCount;
  };
};
