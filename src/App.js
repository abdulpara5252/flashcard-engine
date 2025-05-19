import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateCardForm from './components/CreateCardForm';
import ReviewCard from './components/ReviewCard';
import StatsDashboard from './components/StatsDashboard';

// Spaced Repetition Logic
const calculateNextReview = (card, rating) => {
  const now = new Date();
  let { interval, repetitions, ease } = card;
  
  if (rating === 'again') {
    interval = 1; // Reset to 1 day
    repetitions = 0;
    ease = Math.max(1.3, ease - 0.2); // Decrease ease factor but keep minimum at 1.3
  } else if (rating === 'hard') {
    interval = Math.max(1, interval * 1.2); // Smaller interval increase
    repetitions += 1;
    ease = Math.max(1.3, ease - 0.1); // Slight decrease in ease factor
  } else if (rating === 'easy') {
    interval = Math.round(interval * ease); // Full interval increase based on ease factor
    repetitions += 1;
    ease = Math.min(2.5, ease + 0.1); // Increase ease factor but cap at 2.5
  }
  
  const nextReview = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);
  return { ...card, interval, repetitions, ease, nextReview, lastReviewed: now };
};

function App() {
  const [cards, setCards] = useState(() => JSON.parse(localStorage.getItem('cards')) || []);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  const addCard = (front, back) => {
    setCards([...cards, {
      id: Date.now(),
      front,
      back,
      interval: 1,
      repetitions: 0,
      ease: 2.5,
      nextReview: new Date(),
      lastReviewed: null
    }]);
  };

  const cardsToReview = cards.filter(card => new Date(card.nextReview) <= new Date());

  const handleRating = (rating) => {
    const updatedCard = calculateNextReview(cards[currentCardIndex], rating);
    const newCards = [...cards];
    newCards[currentCardIndex] = updatedCard;
    setCards(newCards);
    setIsFlipped(false);
    if (currentCardIndex + 1 < cardsToReview.length) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  const getStats = () => {
    const totalReviews = cards.reduce((sum, card) => sum + card.repetitions, 0);
    const retentionRate = cards.length > 0 ? (cards.filter(c => c.repetitions > 0).length / cards.length) * 100 : 0;
    return { totalReviews, retentionRate };
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        {/* Navbar/Sidebar */}
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center md:justify-start md:space-x-4">
          <h1 className="text-xl font-bold">Flashcard Engine</h1>
          <div className="flex space-x-2 md:space-x-4">
            <Link to="/" className="px-3 py-1 rounded hover:bg-indigo-700/50">Home</Link>
            <Link to="/create" className="px-3 py-1 rounded hover:bg-indigo-700/50">Create</Link>
            <Link to="/review" className="px-3 py-1 rounded hover:bg-indigo-700/50">Review</Link>
            <Link to="/stats" className="px-3 py-1 rounded hover:bg-indigo-700/50">Stats</Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow p-4 max-w-4xl mx-auto w-full">
          <Routes>
            <Route path="/" element={
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
                <p className="text-gray-600 mb-4">You have {cardsToReview.length} cards to review today.</p>
                <Link
                  to="/review"
                  className={`bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 ${cardsToReview.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Start Review
                </Link>
              </div>
            } />
            <Route path="/create" element={<CreateCardForm addCard={addCard} />} />
            <Route path="/review" element={
              cardsToReview.length > 0 ? (
                <ReviewCard
                  card={cardsToReview[currentCardIndex]}
                  isFlipped={isFlipped}
                  setIsFlipped={setIsFlipped}
                  handleRating={handleRating}
                />
              ) : (
                <div className="text-center">
                  <p className="text-gray-600">No cards to review today!</p>
                  <Link to="/" className="text-indigo-600 hover:underline">Back to Home</Link>
                </div>
              )
            } />
            <Route path="/stats" element={<StatsDashboard cards={cards} getStats={getStats} />} />
          </Routes>
        </main>

        {/* Mobile Bottom Navbar */}
        <nav className="md:hidden fixed bottom-0 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex justify-around p-2">
          <Link to="/" className="p-2">Home</Link>
          <Link to="/create" className="p-2">Create</Link>
          <Link to="/review" className="p-2">Review</Link>
          <Link to="/stats" className="p-2">Stats</Link>
        </nav>
      </div>
    </Router>
  );
}

export default App;