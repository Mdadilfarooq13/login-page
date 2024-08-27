import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Card } from "antd";
import MainLayout from "../components/main_layout.js";

function Charts() {
  const chart1Ref = useRef(null);
  const chart2Ref = useRef(null);

  useEffect(() => {
    // Destroy the chart if it already exists
    if (chart1Ref.current) {
      chart1Ref.current.destroy();
    }

    // Chart 1 - Line Chart
    const ctx1 = document.getElementById("chart1").getContext("2d");
    chart1Ref.current = new Chart(ctx1, {
      type: "line",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Sales",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
    });

    // Destroy the chart if it already exists
    if (chart2Ref.current) {
      chart2Ref.current.destroy();
    }

    // Chart 2 - Bar Chart
    const ctx2 = document.getElementById("chart2").getContext("2d");
    chart2Ref.current = new Chart(ctx2, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });

    // Cleanup function to destroy charts when the component is unmounted
    return () => {
      if (chart1Ref.current) {
        chart1Ref.current.destroy();
      }
      if (chart2Ref.current) {
        chart2Ref.current.destroy();
      }
    };
  }, []);

  return (
    <MainLayout>
      <div style={{ width: "100%", margin: "auto" }}>
        <Card title="Sales Over Time" style={{ marginBottom: "20px" }}>
          <canvas id="chart1" style={{ width: "100%" }}></canvas>
        </Card>
        <Card title="Votes Distribution">
          <canvas id="chart2" style={{ width: "100%" }}></canvas>
        </Card>
      </div>
    </MainLayout>
  );
}

export default Charts;
