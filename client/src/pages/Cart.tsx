import { useState } from "react";
import { Link } from "wouter";
import { 
  ShoppingCart, 
  Trash2, 
  CreditCard, 
  QrCode, 
  Banknote,
  CheckCircle2,
  Copy,
  Music2,
  ArrowLeft
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";

export default function Cart() {
  const { items, removeFromCart, total, clearCart } = useCart();
  const { addPurchasedAlbums } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderNumber] = useState(`IMH-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
  const [protocolNumber] = useState(`PROT-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`);

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.05; // 5% de taxa
  const finalTotal = subtotal + tax;

  const handleCheckout = () => {
    if (!selectedPayment) {
      alert("Por favor, selecione um método de pagamento");
      return;
    }
    if (items.length === 0) {
      alert("Seu carrinho está vazio");
      return;
    }
    // Adicionar álbuns comprados ao contexto de autenticação
    addPurchasedAlbums(items);
    setOrderCompleted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copiado para a área de transferência!");
  };

  if (orderCompleted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="container py-4 flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Music2 className="w-6 h-6 text-accent" />
                <span className="font-heading text-xl">IMH</span>
              </a>
            </Link>
          </div>
        </header>

        {/* Success Message */}
        <div className="container py-16 max-w-2xl">
          <div className="border border-accent bg-card p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4" />
            <h1 className="font-display text-3xl mb-4">Pedido Confirmado!</h1>
            <p className="font-body text-muted-foreground mb-8">
              Seu pedido foi processado com sucesso. Você receberá um email com os links de download.
            </p>

            {/* Order Details */}
            <div className="bg-secondary p-6 mb-6 text-left space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="font-subheading text-sm">Número do Pedido:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-semibold">{orderNumber}</span>
                  <button
                    onClick={() => copyToClipboard(orderNumber)}
                    className="text-accent hover:text-accent/80 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="font-subheading text-sm">Protocolo:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-semibold">{protocolNumber}</span>
                  <button
                    onClick={() => copyToClipboard(protocolNumber)}
                    className="text-accent hover:text-accent/80 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="font-subheading text-sm">Método de Pagamento:</span>
                <span className="font-body text-sm capitalize">{selectedPayment}</span>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-border">
                <span className="font-subheading">Total Pago:</span>
                <span className="font-heading text-xl text-accent">R$ {finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Instructions */}
            {selectedPayment === "pix" && (
              <div className="bg-secondary p-6 mb-6 text-left">
                <h3 className="font-subheading mb-3">Instruções PIX</h3>
                <p className="font-body text-sm text-muted-foreground mb-4">
                  O pagamento via PIX foi confirmado automaticamente. Os links de download foram enviados para seu email.
                </p>
                <div className="flex justify-center">
                  <div className="w-48 h-48 bg-white p-4 flex items-center justify-center">
                    <QrCode className="w-full h-full text-gray-800" />
                  </div>
                </div>
              </div>
            )}

            {selectedPayment === "boleto" && (
              <div className="bg-secondary p-6 mb-6 text-left">
                <h3 className="font-subheading mb-3">Instruções Boleto</h3>
                <p className="font-body text-sm text-muted-foreground mb-4">
                  O boleto foi gerado e enviado para seu email. O prazo de vencimento é de 3 dias úteis.
                </p>
                <button className="w-full bg-accent text-accent-foreground font-subheading py-3 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all">
                  Baixar Boleto
                </button>
              </div>
            )}

            {(selectedPayment === "credito" || selectedPayment === "debito") && (
              <div className="bg-secondary p-6 mb-6 text-left">
                <h3 className="font-subheading mb-3">Pagamento Aprovado</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Seu pagamento foi processado com sucesso. Os links de download foram enviados para seu email.
                </p>
              </div>
            )}

            {selectedPayment === "paypal" && (
              <div className="bg-secondary p-6 mb-6 text-left">
                <h3 className="font-subheading mb-3">PayPal Confirmado</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Seu pagamento via PayPal foi confirmado. Os links de download foram enviados para seu email.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/">
                <a className="flex-1 border border-border bg-secondary text-foreground font-subheading py-3 px-6 text-center hover:bg-muted transition-all">
                  Voltar para Home
                </a>
              </Link>
              <button 
                onClick={() => setLocation("/downloads")}
                className="flex-1 bg-accent text-accent-foreground font-subheading py-3 px-6 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all active:scale-95"
              >
                Ver Meus Downloads
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Music2 className="w-6 h-6 text-accent" />
              <span className="font-heading text-xl">Independent Music Hub</span>
            </a>
          </Link>
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-accent" />
            <span className="font-subheading">{items.length} itens</span>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <Link href="/">
          <a className="inline-flex items-center gap-2 font-body text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Continuar comprando
          </a>
        </Link>

        <h1 className="font-display text-4xl mb-8">Carrinho de Compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.length === 0 ? (
              <div className="border border-border bg-card p-12 text-center">
                <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="font-heading text-xl mb-2">Seu carrinho está vazio</h2>
                <p className="font-body text-muted-foreground mb-6">
                  Adicione alguns álbuns para começar a apoiar artistas independentes
                </p>
                <Link href="/">
                  <a className="inline-block bg-accent text-accent-foreground font-subheading py-3 px-8 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all">
                    Explorar Artistas
                  </a>
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="border border-border bg-card p-4 flex gap-4 animate-in fade-in duration-300"
                >
                  {item.coverImage && (
                    <img
                      src={item.coverImage}
                      alt={item.albumTitle}
                      className="w-24 h-24 object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-subheading mb-1">{item.albumTitle}</h3>
                    <p className="font-body text-sm text-muted-foreground mb-2">{item.artistName}</p>
                    <p className="font-heading text-lg text-accent">R$ {item.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-destructive hover:text-destructive/80 transition-colors h-fit"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Order Summary & Payment */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="border border-border bg-card p-6 sticky top-4">
              <h2 className="font-heading text-xl mb-4">Resumo do Pedido</h2>
              
              <div className="space-y-3 mb-4 pb-4 border-b border-border">
                <div className="flex justify-between font-body">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-body">
                  <span className="text-muted-foreground">Taxa de processamento</span>
                  <span>R$ {tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-heading text-lg">Total</span>
                <span className="font-heading text-xl text-accent">R$ {finalTotal.toFixed(2)}</span>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="font-subheading mb-3">Método de Pagamento</h3>
                <div className="space-y-2">
                  {/* PIX */}
                  <label
                    className={`flex items-center gap-3 p-4 border cursor-pointer transition-all ${
                      selectedPayment === "pix"
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="pix"
                      checked={selectedPayment === "pix"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="w-4 h-4"
                    />
                    <QrCode className="w-5 h-5 text-accent" />
                    <span className="font-body flex-1">PIX</span>
                    <span className="font-caption text-xs">Instantâneo</span>
                  </label>

                  {/* Cartão de Crédito */}
                  <label
                    className={`flex items-center gap-3 p-4 border cursor-pointer transition-all ${
                      selectedPayment === "credito"
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="credito"
                      checked={selectedPayment === "credito"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="w-4 h-4"
                    />
                    <CreditCard className="w-5 h-5 text-accent" />
                    <span className="font-body flex-1">Cartão de Crédito</span>
                    <span className="font-caption text-xs">Até 12x</span>
                  </label>

                  {/* Cartão de Débito */}
                  <label
                    className={`flex items-center gap-3 p-4 border cursor-pointer transition-all ${
                      selectedPayment === "debito"
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="debito"
                      checked={selectedPayment === "debito"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="w-4 h-4"
                    />
                    <CreditCard className="w-5 h-5 text-accent" />
                    <span className="font-body flex-1">Cartão de Débito</span>
                    <span className="font-caption text-xs">À vista</span>
                  </label>

                  {/* PayPal */}
                  <label
                    className={`flex items-center gap-3 p-4 border cursor-pointer transition-all ${
                      selectedPayment === "paypal"
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={selectedPayment === "paypal"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="w-4 h-4"
                    />
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#00457C">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .76-.653h8.53c2.77 0 4.66.567 5.62 1.686.96 1.12 1.04 2.753.24 4.856-.03.08-.06.17-.09.25-.48 1.42-1.18 2.49-2.1 3.19-.92.7-2.07 1.05-3.44 1.05h-1.74a.77.77 0 0 0-.76.65l-.03.15-1.05 6.62-.02.13a.64.64 0 0 1-.63.54zm.95-10.37l.03-.15.72-4.54a.77.77 0 0 1 .76-.65h1.74c1.37 0 2.52-.35 3.44-1.05.92-.7 1.62-1.77 2.1-3.19.03-.08.06-.17.09-.25.8-2.103.72-3.736-.24-4.856C15.766 4.287 13.876 3.72 11.106 3.72h-8.53a.77.77 0 0 0-.76.653L.709 20.597a.641.641 0 0 0 .633.74h4.606l1.078-6.77z"/>
                    </svg>
                    <span className="font-body flex-1">PayPal</span>
                  </label>

                  {/* Boleto */}
                  <label
                    className={`flex items-center gap-3 p-4 border cursor-pointer transition-all ${
                      selectedPayment === "boleto"
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="boleto"
                      checked={selectedPayment === "boleto"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="w-4 h-4"
                    />
                    <Banknote className="w-5 h-5 text-accent" />
                    <span className="font-body flex-1">Boleto Bancário</span>
                    <span className="font-caption text-xs">3 dias</span>
                  </label>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={items.length === 0 || !selectedPayment}
                className="w-full bg-accent text-accent-foreground font-subheading py-4 px-6 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Finalizar Compra
              </button>

              <p className="font-caption text-xs text-center mt-4">
                Ao finalizar a compra, você concorda com nossos termos de serviço
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
