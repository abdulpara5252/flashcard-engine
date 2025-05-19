import { motion } from 'framer-motion';

function ReviewCard({ card, isFlipped, setIsFlipped, handleRating }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="w-full max-w-md h-64 bg-white rounded-2xl shadow-xl cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="relative w-full h-full transform-style-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute w-full h-full flex items-center justify-center p-6 bg-indigo-50 rounded-2xl backface-hidden">
            <p className="text-xl text-center text-gray-800">{card.front}</p>
          </div>
          <div className="absolute w-full h-full flex items-center justify-center p-6 bg-purple-50 rounded-2xl backface-hidden rotate-y-180">
            <p className="text-xl text-center text-gray-800">{card.back}</p>
          </div>
        </motion.div>
      </motion.div>
      {isFlipped && (
        <div className="mt-6 flex space-x-4">
          <motion.button
            onClick={() => handleRating('again')}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Again
          </motion.button>
          <motion.button
            onClick={() => handleRating('hard')}
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Hard
          </motion.button>
          <motion.button
            onClick={() => handleRating('easy')}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Easy
          </motion.button>
        </div>
      )}
    </div>
  );
}

export default ReviewCard;