import { useState, useCallback, useLayoutEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Preloader } from "@/components/Preloader";
import { CartProvider } from "@/context/CartContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ProductPage from "@/pages/ProductPage";
import CheckoutPage from "@/pages/CheckoutPage";
import PaymentPage from "@/pages/PaymentPage";
import OrderSuccessPage from "@/pages/OrderSuccessPage";
import AdminOrdersPage from "@/pages/AdminOrdersPage";
import Contact from "@/pages/Contact";
const queryClient = new QueryClient();


const easeOutExpo = [0.16, 1, 0.3, 1] as const;

function ScrollToTop() {
  const [location] = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function AnimatedRoutes() {
  const [location] = useLocation();
  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.55, ease: easeOutExpo }}
          style={{ willChange: "opacity, transform" }}
        >
          <Switch location={location}>
            <Route path="/" component={Home} />
            <Route path="/product/:slug" component={ProductPage} />
            <Route path="/checkout" component={CheckoutPage} />
            <Route path="/payment" component={PaymentPage} />
            <Route path="/order-success/:orderId" component={OrderSuccessPage} />
            <Route path="/admin" component={AdminOrdersPage} />

<Route path="/contact" component={Contact} />

            <Route component={NotFound} />
</Switch>
    </motion.div>
  </AnimatePresence>
);
}
      
     

  const handlePreloaderComplete = useCallback(() => {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem("alsaeron-loaded", "1");
    }
    setPreloaderDone(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <AnimatePresence>
            {!preloaderDone && (
              <Preloader key="preloader" onComplete={handlePreloaderComplete} />
            )}
          </AnimatePresence>

          {preloaderDone && (
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <AnimatedRoutes />
            </WouterRouter>
          )}

          <Toaster />
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
