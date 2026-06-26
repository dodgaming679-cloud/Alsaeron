import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Package, ChevronDown, ChevronUp } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { CartSidebar } from "@/components/CartSidebar";

const ease = [0.16, 1, 0.3, 1] as const;

interface OrderProduct {
  name: string;
  category: string;
  quantity: number;
  priceINR: number;
}

interface Order {
  id: number;
  orderId: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  products: OrderProduct[];
  totalAmount: string;
  paymentScreenshot: string | null;
  status: string;
  createdAt: string;
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "rgba(234,179,8,0.15)",
    confirmed: "rgba(34,197,94,0.15)",
    shipped: "rgba(37,99,235,0.15)",
    delivered: "rgba(99,102,241,0.15)",
  };
  const textColors: Record<string, string> = {
    pending: "rgba(234,179,8,0.8)",
    confirmed: "rgba(34,197,94,0.8)",
    shipped: "rgba(37,99,235,0.9)",
    delivered: "rgba(99,102,241,0.9)",
  };
  return (
    <span
      className="text-[8px] tracking-[0.18em] font-sans uppercase px-3 py-1 rounded-full"
      style={{
        background: colors[status] ?? "rgba(255,255,255,0.08)",
        color: textColors[status] ?? "rgba(255,255,255,0.5)",
      }}
    >
      {status}
    </span>
  );
}

function OrderRow({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <motion.tr
        layout
        className="border-t border-white/[0.04] hover:bg-white/[0.012] transition-colors cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <td className="py-5 px-6">
          <p className="font-serif text-sm text-white/70 tracking-[0.05em]">{order.orderId}</p>
          <p className="text-[9px] font-sans text-white/24 mt-0.5">
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </td>
        <td className="py-5 px-6">
          <p className="text-sm font-sans text-white/60">{order.fullName}</p>
          <p className="text-[9px] font-sans text-white/24 mt-0.5">{order.email}</p>
        </td>
        <td className="py-5 px-6 hidden md:table-cell">
          <p className="text-[10px] font-sans text-white/40 leading-relaxed">
            {order.city}, {order.state}
          </p>
        </td>
        <td className="py-5 px-6">
          <p className="font-serif text-sm text-white/70">{order.totalAmount}</p>
        </td>
        <td className="py-5 px-6">
          <StatusBadge status={order.status} />
        </td>
        <td className="py-5 px-6 text-white/20">
          {expanded ? <ChevronUp size={14} strokeWidth={1} /> : <ChevronDown size={14} strokeWidth={1} />}
        </td>
      </motion.tr>

      {expanded && (
        <tr>
          <td colSpan={6} className="px-6 pb-8 pt-2">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className="p-6 rounded-sm"
              style={{ background: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Products */}
                <div>
                  <p className="text-[9px] tracking-[0.24em] font-sans uppercase text-white/24 mb-4">
                    Ordered Items
                  </p>
                  <div className="space-y-3">
                    {order.products.map((p, i) => (
                      <div key={i} className="flex justify-between">
                        <div>
                          <p className="text-[11px] font-sans text-white/55">{p.name}</p>
                          <p className="text-[9px] font-sans text-white/24 uppercase tracking-[0.12em]">
                            {p.category} × {p.quantity}
                          </p>
                        </div>
                        <p className="text-[11px] font-sans text-white/40">
                          {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p.priceINR * p.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping */}
                <div>
                  <p className="text-[9px] tracking-[0.24em] font-sans uppercase text-white/24 mb-4">
                    Shipping To
                  </p>
                  <p className="text-[11px] font-sans text-white/50 leading-relaxed">
                    {order.address}
                    <br />
                    {order.city}, {order.state} - {order.pincode}
                  </p>
                  <p className="mt-2 text-[11px] font-sans text-white/35">{order.phone}</p>
                </div>

                {/* Payment screenshot */}
                <div>
                  <p className="text-[9px] tracking-[0.24em] font-sans uppercase text-white/24 mb-4">
                    Payment Proof
                  </p>
                  {order.paymentScreenshot ? (
                    <img
                      src={order.paymentScreenshot}
                      alt="Payment proof"
                      className="max-w-[180px] max-h-44 object-contain rounded-sm"
                      style={{ border: "1px solid rgba(37,99,235,0.2)" }}
                    />
                  ) : (
                    <p className="text-[10px] font-sans text-white/20 italic">No screenshot uploaded</p>
                  )}
                </div>
              </div>
            </motion.div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchOrders() {
    try {
      const res = await fetch("/api/orders");
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = (await res.json()) as { orders: Order[] };
      setOrders(data.orders);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => { void fetchOrders(); }, []);

  function handleRefresh() {
    setRefreshing(true);
    void fetchOrders();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <CartSidebar />

      <div className="pt-28 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="flex items-end justify-between mb-14"
        >
          <div>
            <p className="text-[9px] tracking-[0.36em] font-sans uppercase text-primary mb-3">
              Administration
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-white leading-tight">
              Order Management
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[9px] tracking-[0.2em] font-sans uppercase text-white/24">
              {orders.length} order{orders.length !== 1 ? "s" : ""}
            </span>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="text-white/24 hover:text-white transition-colors"
            >
              <RefreshCw size={15} strokeWidth={1} className={refreshing ? "animate-spin" : ""} />
            </button>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <RefreshCw size={20} strokeWidth={1} className="text-white/20 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-32">
            <p className="text-red-400/60 font-sans text-sm">{error}</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <Package size={36} strokeWidth={0.8} className="text-white/10 mb-6" />
            <p className="font-serif text-2xl text-white/20 italic">No orders yet.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease }}
            className="overflow-x-auto"
            style={{ border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <table className="w-full min-w-[640px]">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  {["Order ID", "Customer", "Location", "Amount", "Status", ""].map((h) => (
                    <th
                      key={h}
                      className="py-4 px-6 text-left text-[9px] tracking-[0.24em] font-sans uppercase text-white/20"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <OrderRow key={order.id} order={order} />
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </div>
  );
}
