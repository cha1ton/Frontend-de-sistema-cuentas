import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalPorCobrar: 0,
    totalPorPagar: 0,
    facturasVencidas: 0,
    flujoPorMes: [],
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("http://127.0.0.1:8000/api/dashboard-metrics/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMetrics(response.data);
      } catch (error) {
        console.error("Error fetching dashboard metrics:", error);
      }
    };

    fetchMetrics();
  }, []);

  // Datos para el gráfico de barras
  const barChartData = {
    labels: metrics.flujoPorMes.map((mes) => mes.mes),
    datasets: [
      {
        label: "Total Mensual",
        data: metrics.flujoPorMes.map((mes) => mes.total),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Datos para el gráfico de pastel
  const pieChartData = {
    labels: ["Por Cobrar", "Por Pagar"],
    datasets: [
      {
        label: "Resumen Financiero",
        data: [metrics.totalPorCobrar, metrics.totalPorPagar],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Dashboard Financiero</h1>
      <div className="row">
        {/* Métricas Resumidas */}
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">Total Por Cobrar</div>
            <div className="card-body">
              <h5 className="card-title">S/. {metrics.totalPorCobrar.toFixed(2)}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-danger mb-3">
            <div className="card-header">Total Por Pagar</div>
            <div className="card-body">
              <h5 className="card-title">S/. {metrics.totalPorPagar.toFixed(2)}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3">
            <div className="card-header">Facturas Vencidas</div>
            <div className="card-body">
              <h5 className="card-title">{metrics.facturasVencidas}</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Gráfico de Barras */}
        <div className="col-md-8">
          <div className="card p-3">
            <h4 className="text-center">Proyección de Flujo Mensual</h4>
            <Bar data={barChartData} />
          </div>
        </div>

        {/* Gráfico de Pastel */}
        <div className="col-md-4">
          <div className="card p-3">
            <h4 className="text-center">Resumen Financiero</h4>
            <Pie data={pieChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
