import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrilogyIntro from './components/TrilogyIntro';
import TrilogyShowcase from './components/TrilogyShowcase';
import AuthorSection from './components/AuthorSection';
import ReaderOpinions from './components/ReaderOpinions';
import Footer from './components/Footer';
import ChapterReaderModal from './components/ChapterReaderModal';

export default function App() {
  const [activeChapterBookId, setActiveChapterBookId] = useState(null);

  return (
    <div className="min-h-screen bg-[#FAF6EF] text-[#1C1B1A] relative selection:bg-corten/20 selection:text-corten">
      {/* Floating Architectural Header */}
      <Navbar onOpenFirstChapter={() => setActiveChapterBookId('book1')} />

      {/* Main Narrative Flow */}
      <main>
        <Hero />
        <TrilogyIntro />
        <TrilogyShowcase onOpenChapter={(bookId) => setActiveChapterBookId(bookId)} />
        <AuthorSection />
        <ReaderOpinions />
      </main>

      {/* Footer with Substack and Social */}
      <Footer />

      {/* In-situ Chapter Reader Modal */}
      {activeChapterBookId && (
        <ChapterReaderModal
          bookId={activeChapterBookId}
          onClose={() => setActiveChapterBookId(null)}
        />
      )}
    </div>
  );
}
