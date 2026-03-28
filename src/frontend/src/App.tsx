import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { CartProvider } from "./contexts/CartContext";
import { StoreProvider } from "./contexts/StoreContext";
import { AdminPage } from "./pages/AdminPage";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "#11151A",
            border: "1px solid #2A3138",
            color: "#fff",
          },
        }}
      />
    </>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product",
  component: ProductPage,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([homeRoute, productRoute, adminRoute]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <StoreProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </StoreProvider>
  );
}
