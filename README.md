import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";

/**
 * PRODUCTION READY STRUCTURE (FRONTEND)
 * ------------------------------------
 * ⚠️ Real payments MUST be handled in backend:
 * - Stripe Checkout Session (Node / Next.js API route)
 * - PayPal Orders API
 * - Ticket storage in DB (Supabase / Firebase / MongoDB)
 */

export default function TicketPage() {
  const [cart, setCart] = useState({});
  const [city, setCity] = useState("London");
  const [checkout, setCheckout] = useState(false);

  // 🌍 Multi-city tour (Lagos removed as requested)
  const cities = ["London", "New York", "Madrid", "São Paulo", "Paris"];

  const ticketTypes = [
    { name: "General Admission", price: 80 },
    { name: "VIP Standing", price: 180 },
    { name: "Front Row Experience", price: 350 },
    { name: "Meet & Greet Pass", price: 600 },
  ];

  const totalTickets = useMemo(() => {
    return Object.values(cart).reduce((a, b) => a + b, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return ticketTypes.reduce((sum, t) => {
      return sum + (cart[t.name] || 0) * t.price;
    }, 0);
  }, [cart]);

  function addTicket(name) {
    setCart((prev) => ({
      ...prev,
      [name]: (prev[name] || 0) + 1,
    }));
  }

  function removeTicket(name) {
    setCart((prev) => {
      const updated = { ...prev };
      if (!updated[name]) return updated;
      updated[name] -= 1;
      if (updated[name] <= 0) delete updated[name];
      return updated;
    });
  }

  /**
   * 🔐 STRIPE (PRODUCTION FLOW)
   * Replace with:
   * await fetch('/api/stripe/checkout', { method: 'POST', body: JSON.stringify(cart) })
   */
  async function handleStripeCheckout() {
    alert("Stripe Checkout should be connected to backend API /api/stripe/checkout");
  }

  /**
   * 💳 PAYPAL (PRODUCTION FLOW)
   * Replace with PayPal Orders API integration
   */
  async function handlePayPalCheckout() {
    alert("PayPal Checkout should be connected to backend Orders API");
  }

  // 🎫 Secure ticket ID (in production generate on backend)
  const ticketId = useMemo(() => {
    return "KAROLG-" + Math.random().toString(36).substring(2, 10).toUpperCase();
  }, [checkout]);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO */}
      <div className="relative h-[65vh] flex items-center justify-center text-center px-4 bg-[url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold">
            Karol G Global Tour 2026
          </h1>
          <p className="mt-2 text-gray-200">
            Secure Tickets • QR Entry • Multi-City Experience
          </p>

          {/* 🌍 CITY SELECT */}
          <div className="mt-4">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="text-black p-2 rounded"
            >
              {cities.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <Button
            className="mt-6 bg-pink-600 hover:bg-pink-700"
            onClick={() => setCheckout(true)}
          >
            Buy Tickets
          </Button>
        </div>
      </div>

      {/* MAIN */}
      {!checkout ? (
        <div className="max-w-5xl mx-auto p-4 grid md:grid-cols-2 gap-6">

          {/* EVENT INFO */}
          <Card className="bg-gray-900">
            <CardContent className="p-5">
              <h2 className="text-xl font-bold mb-3">Event Info</h2>
              <p>Artist: Karol G</p>
              <p>City: {city}</p>
              <p>Date: 2026 Global Tour</p>
              <p>Venue: Major Stadiums Worldwide</p>
              <p>Ticket Delivery: Digital QR Code</p>
            </CardContent>
          </Card>

          {/* TICKETS */}
          <Card className="bg-gray-900">
            <CardContent className="p-5">
              <h2 className="text-xl font-bold mb-3">Select Tickets</h2>

              {ticketTypes.map((t) => (
                <div
                  key={t.name}
                  className="flex justify-between items-center border-b border-gray-700 py-2"
                >
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-sm text-gray-400">${t.price}</p>
                    <p className="text-xs text-gray-500">
                      Selected: {cart[t.name] || 0}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => removeTicket(t.name)}>-</Button>
                    <Button onClick={() => addTicket(t.name)}>+</Button>
                  </div>
                </div>
              ))}

              <div className="mt-4">
                <p>Total Tickets: {totalTickets}</p>
                <p>Total Price: ${totalPrice}</p>

                <Button
                  className="w-full mt-3 bg-green-600"
                  disabled={totalTickets === 0}
                  onClick={() => setCheckout(true)}
                >
                  Proceed to Secure Checkout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* CHECKOUT + DIGITAL TICKET */
        <div className="max-w-xl mx-auto p-4">
          <Card className="bg-gray-900 text-center">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-3">Secure Payment</h2>
              <p className="text-gray-400 mb-4">
                Choose Stripe or PayPal (backend required)
              </p>

              <div className="flex flex-col gap-3">
                <Button onClick={handleStripeCheckout} className="bg-blue-600">
                  Pay with Stripe
                </Button>
                <Button onClick={handlePayPalCheckout} className="bg-yellow-500 text-black">
                  Pay with PayPal
                </Button>
              </div>

              {/* 🎫 DIGITAL TICKET PREVIEW */}
              <div className="mt-6 border-t border-gray-700 pt-4">
                <h3 className="font-bold">Digital Ticket Preview</h3>
                <p className="text-sm text-gray-400">QR Code Entry Pass</p>

                <div className="flex justify-center mt-4">
                  <QRCode value={`${ticketId}-${city}`} />
                </div>

                <p className="mt-3 text-xs text-gray-500">
                  Ticket ID: {ticketId}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* FOOTER */}
      <div className="text-center text-gray-500 text-xs p-6">
        Production-ready structure • Requires backend for payments & validation
      </div>
    </div>
  );
}
