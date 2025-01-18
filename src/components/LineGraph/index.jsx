import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  SplineSeries,
  DateTime,
  Legend,
  Tooltip,
  Highlight,
} from "@syncfusion/ej2-react-charts";

const LineGraph = () => {
  const data1 = [
    { x: new Date(2023, 0, 1), y: 100 },
    { x: new Date(2023, 0, 2), y: 120 },
    { x: new Date(2023, 0, 3), y: 140 },
    { x: new Date(2023, 0, 4), y: 180 },
    { x: new Date(2023, 0, 5), y: 250 },
    { x: new Date(2023, 0, 6), y: 300 },
    { x: new Date(2023, 0, 7), y: 400 },
  ];

  const data2 = [
    { x: new Date(2023, 0, 1), y: 80 },
    { x: new Date(2023, 0, 2), y: 90 },
    { x: new Date(2023, 0, 3), y: 100 },
    { x: new Date(2023, 0, 4), y: 110 },
    { x: new Date(2023, 0, 5), y: 150 },
    { x: new Date(2023, 0, 6), y: 180 },
    { x: new Date(2023, 0, 7), y: 250 },
  ];

  return (
    <ChartComponent
      id="container"
      primaryXAxis={{
        valueType: "DateTime",
        labelFormat: "ddd", // Day of the week (Monday, etc.)
        majorGridLines: { width: 0 },
        edgeLabelPlacement: "Shift",
      }}
      primaryYAxis={{
        labelFormat: "{value}",
        title: "Likes Count",
        minimum: 0,
        maximum: 500,
        interval: 100,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
      }}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true, enableHighlight: true }}
      title=""
      legendSettings={{
        visible: true,
        position: "Bottom",
        enableHighlight: true,
      }}
    >
      <Inject services={[SplineSeries, DateTime, Legend, Tooltip, Highlight]} />
      <SeriesCollectionDirective>
        <SeriesDirective
          type="Spline"
          dataSource={data1}
          xName="x"
          yName="y"
          name="Video 1"
          width={2}
          marker={{ visible: true, width: 6, height: 6, shape: "Circle" }}
        />
        <SeriesDirective
          type="Spline"
          dataSource={data2}
          xName="x"
          yName="y"
          name="Video 2"
          width={2}
          marker={{ visible: true, width: 6, height: 6, shape: "Triangle" }}
        />
        {/* Add more SeriesDirective elements for additional videos */}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineGraph;
