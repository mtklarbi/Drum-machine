import { useEffect, useState } from "react";

const audioClips = [
  {
    id: 'Q',
    keyCode: 81,
    description: 'Heater 1',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    id: 'W',
    keyCode: 87,
    description: 'Heater 2',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    id: 'E',
    keyCode: 69,
    description: 'Heater 3',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    id: 'A',
    keyCode: 65,
    description: 'Heater 4',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    id: 'S',
    keyCode: 83,
    description: 'Clap',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    id: 'D',
    keyCode: 68,
    description: 'Open-HH',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    id: 'Z',
    keyCode: 90,
    description: 'Kick-n\'-Hat',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    id: 'X',
    keyCode: 88,
    description: 'Kick',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    id: 'C',
    keyCode: 67,
    description: 'Closed-HH',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];




function App() {
  const [textDisplay, setTextDisplay] = useState('select')
  const playSound = (selector: string) => {
    const audio = document.getElementById(selector) as HTMLAudioElement;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
    const drumsPad = audioClips.find(clip => clip.id === selector)
    if (drumsPad){
      setTextDisplay(drumsPad.description)
    }
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const clip = audioClips.find(clip => clip.keyCode === e.keyCode);
      if (clip) {
        playSound(clip.id);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

 

  return (
    
    <div 
      id="drum-machine" 
      className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-2xl"
      >
      <div 
        id="display" 
        className="text-center text-2xl font-bold text-green-400 mb-4 p-2 bg-gray-700 rounded"
      >
        {textDisplay}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {audioClips.map((clip) => (
          <div 
            key={clip.id}
            id={`drum-pad-${clip.id}`}
            className="drum-pad 
              bg-green-600 
              hover:bg-green-500 
              text-white 
              font-bold 
              py-4 
              text-center 
              rounded 
              cursor-pointer 
              transition 
              transform 
              hover:scale-105
              active:bg-green-700"
            onClick={()=>playSound(clip.id)}
          >
            {clip.id}
            <audio 
              id={clip.id} 
              className="clip"
              src={clip.src}
            ></audio>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
