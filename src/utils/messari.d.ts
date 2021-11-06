interface MessariMetrics {
  id: string;
  market_data: {
    percent_change_usd_last_24_hours: number;
    price_usd: number;
  };
  marketcap: {
    rank: number;
    current_marketcap_usd: number;
  };
}

interface Asset {
  id: string;
  name: string;
  symbol: string;
  metrics: MessariMetrics;
}
