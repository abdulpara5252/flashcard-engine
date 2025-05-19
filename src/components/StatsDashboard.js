import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { motion } from 'framer-motion';

function StatsDashboard({ cards, getStats }) {
  const { totalReviews, retentionRate } = getStats();

  const chartData = {
    labels: ['Total Reviews', 'Retention Rate (%)'],
    datasets: [{
      label: 'Stats',
      data: [totalReviews, retentionRate],
      backgroundColor: ['#4f46e5', '#10b981'],
      borderRadius: 8,
    }]
  };

  return (
    <motion.div
      className="bg-white p-8 rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Review Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.div
          className="bg-indigo-50 p-4 rounded-lg shadow-sm"
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-gray-600">Total Reviews</p>
          <p className="text-3xl font-bold text-indigo-600">{totalReviews}</p>
        </motion.div>
        <motion.div
          className="bg-green-50 p-4 rounded-lg shadow-sm"
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-gray-600">Retention Rate</p>
          <p className="text-3xl font-bold text-green-600">{retentionRate.toFixed(2)}%</p>
        </motion.div>
      </div>
      <Bar
        data={chartData}
        options={{
          scales: { y: { beginAtZero: true } },
          animation: { duration: 1000, easing: 'easeOutQuart' }
        }}
      />
    </motion.div>
  );
}

export default StatsDashboard;