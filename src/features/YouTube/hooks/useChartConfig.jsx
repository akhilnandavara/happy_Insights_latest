import React, { useMemo } from 'react'
import { chartStyles } from '../../../data/chart';

export const useChartConfig = (chartType, apiData) => {
  return useMemo(() => {
    if (!apiData || !apiData.datasets) {
      console.warn("Invalid API data provided for chart configuration.");
      return { labels: [], datasets: [] };
    }

    const styleConfig = chartStyles[chartType] || {};
    const datasets = apiData.datasets.map((dataset, index) => ({
      ...dataset,
      ...styleConfig,
      backgroundColor: Array.isArray(styleConfig.backgroundColor)
        ? styleConfig.backgroundColor[
            index % styleConfig.backgroundColor.length
          ]
        : styleConfig.backgroundColor || "rgba(0, 123, 255, 0.5)",
      borderColor: Array.isArray(styleConfig.borderColor)
        ? styleConfig.borderColor[index % styleConfig.borderColor.length]
        : styleConfig.borderColor || "rgba(0, 123, 255, 1)",
    }));

    return {
      labels: apiData.labels || [],
      datasets,
    };
  }, [chartType, apiData]);
};
