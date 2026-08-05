const tickerItems = [
  { symbol: "S&P 500", price: "6,428.17", change: "+1.21%", trend: "up" },
  { symbol: "NASDAQ", price: "21,073.44", change: "+1.08%", trend: "up" },
  { symbol: "DOW", price: "44,218.83", change: "-0.32%", trend: "down" },
  { symbol: "FTSE 100", price: "8,982.12", change: "+0.65%", trend: "up" },
  { symbol: "DAX", price: "24,111.44", change: "-0.18%", trend: "down" },
  { symbol: "NIKKEI 225", price: "40,762.31", change: "+1.10%", trend: "up" },
  { symbol: "GOLD", price: "2,418.70", change: "+0.42%", trend: "up" },
  { symbol: "BRENT", price: "84.16", change: "-0.74%", trend: "down" },
  { symbol: "USD/JPY", price: "151.82", change: "+0.22%", trend: "up" },
  { symbol: "EUR/USD", price: "1.0864", change: "-0.11%", trend: "down" },
];

export default function MarketTicker() {
  return (
    <aside className="market-ticker" id="market-ticker" aria-label="Live market ticker">
      <div className="ticker-track">
        {[...tickerItems, ...tickerItems].map((item, index) => (
          <span className="ticker-item" key={`${item.symbol}-${index}`}>
            <strong>{item.symbol}</strong>
            <span className="ticker-price">{item.price}</span>
            <span className={`ticker-change ${item.trend === "up" ? "positive" : "negative"}`}>
              {item.change}
            </span>
          </span>
        ))}
      </div>
    </aside>
  );
}
