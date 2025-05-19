import { useState } from 'react';
import { motion } from 'framer-motion';

function CreateCardForm({ addCard }) {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (front && back) {
      addCard(front, back);
      setFront('');
      setBack('');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-xl max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create Flashcard</h2>
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Front</label>
        <input
          type="text"
          value={front}
          onChange={(e) => setFront(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Back</label>
        <input
          type="text"
          value={back}
          onChange={(e) => setBack(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <motion.button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 shadow-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add Card
      </motion.button>
    </motion.form>
  );
}

export default CreateCardForm;