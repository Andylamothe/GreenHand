import { useState, useEffect, useCallback } from "react";
import { ChartsApi } from "../api/chartsApi";

export default function useCharts() {
  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCharts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ChartsApi.getCharts();
      setCharts(res.data.files || []);
    } catch (error) {
      console.log("Error fetching charts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCharts();
  }, [fetchCharts]);

  return { charts, loading, refresh: fetchCharts };
}
