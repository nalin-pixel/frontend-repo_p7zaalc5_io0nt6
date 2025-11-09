import { useState } from 'react';
import HeroCover from './components/HeroCover';
import KnowledgeGarden from './components/KnowledgeGarden';
import BloomPanel from './components/BloomPanel';
import AmbientAudio from './components/AmbientAudio';

function App() {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState('Learning');

  const openCourse = (data) => {
    setSubject(data?.subject || 'Learning');
    setOpen(true);
  };

  const closeCourse = () => setOpen(false);

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <HeroCover />
      <KnowledgeGarden onOpen={openCourse} />
      <BloomPanel open={open} subject={subject} onClose={closeCourse} />
      <AmbientAudio />
    </div>
  );
}

export default App;
