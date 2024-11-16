import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { styles } from "../styles";
import {  textVariant } from "../utils/motion";
import { useState } from "react";
import { CiLocationArrow1 } from "react-icons/ci";
import { GrDirections } from "react-icons/gr";
import { GoEyeClosed } from "react-icons/go";
import Switch from "react-switch";



const LinesComponent = ({  stationID, onRemove, onNull, directionVisible  }) => {
  const [lines, setLines] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://transportlive-cors-0f34afbe0c8f.herokuapp.com/https://maps.mo-bi.ro/api/nextArrivals/${stationID}`);
        const data = await response.json();
        if (Object.keys(data).length === 0) {
          console.warn('Received empty data:', data);
          onRemove();
          onNull();
          setLines(null);
        } else {
          setLines(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);

      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  
  return lines ? (
    <>
    <div className="w-[260px] ">
      <div className="flex flex-col items-center">
    <h1 className="text-[20px]">Stația {lines.name}</h1>


    <div className="flex flex-row gap-2 items-center">
    <CiLocationArrow1 /> 
    <a href={`https://www.google.com/maps/search/${lines.address}`} target="_blank" rel="noopener noreferrer"><h2 className="text-gray-400 ">{lines.address}</h2></a>
    </div>
    </div>

    <div className="flex flex-col gap-5 mt-3 items-center">

      {lines.lines.sort((a,b) => a.name - b.name).map((line) => (
        <div key={line.name} className="flex flex-row gap-5">
            <div style= {{ backgroundColor: line.arrivingTime === undefined ? '#6B7280' : line.color}} className={`flex justify-center items-center w-[100px] h-[50px] rounded-lg `}>
              <h2 className="font-black ">{line.name}</h2>
              
              </div>
          <div className='flex flex-col w-[100px] h-[50px] flex justify-center'>
            <div className="text-white font-black items-center  ">{line.arrivingTime  == 0 ? 'În stație' : line.arrivingTime > 0 ? line.arrivingTime/60 + ' minute' : <span className="text-gray-600">Program încheiat</span>}</div>
            {directionVisible &&  
              <div className='text-gray-400 flex flex-row items-center gap-2 '> <GrDirections /> <span>{line.direction == 0 ? 'Tur' : 'Retur'}</span></div>
          }
          </div>
          </div>

      ))}
          <motion.div className="flex flex-row gap-2 items-center"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          >
             <motion.div
                      animate={{
                        color: isHovered ? "#ff0000" : "#4f4f4f",
                      }}
                      className="text-2xl"
                    >
                <GoEyeClosed />
              </motion.div>
                <motion.span className=" cursor-pointer" onClick={onRemove}
                animate={{
                  color: isHovered ? "#ff0000" : "#4f4f4f",
                }}
                >Șterge</motion.span>
        </motion.div>
    </div>
    </div>
    </>
  ) : null;


};

const Main = () => {
  const [footerVisible, setFooterVisible] = useState(true);
  const [titleVisible, setTitleVisible] = useState(true);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [settingVisible, setSettingsVisible] = useState(false);
  const [directionVisible, setDirectionVisible] = useState(true);
  const [errorLine, setErrorLine] = useState('');
  const [id, setId] = useState('');
  const isMobile = /android|iPad|iPhone|iPod/i.test(navigator.userAgent.toLowerCase());
  const [submittedIDs, setSubmittedIDs] = useState(() => {
      const savedLines = localStorage.getItem("submittedIDs");
      return savedLines ? JSON.parse(savedLines) : [];
  });
  
  useEffect(() => {
    localStorage.setItem("submittedIDs", JSON.stringify(submittedIDs));
  }, [submittedIDs]);

  const handleButtonClick = () => {
    // Hide the button and show the popup
    setIsPopupVisible(true);
  };

  const handleSettingsClick = () => {
    setSettingsVisible(true);
  }

  const handleNull = (ID) => {
    setIsErrorVisible(true);
    setErrorLine(ID)
    setTimeout(() => {
      setIsErrorVisible(false);
      setErrorLine('');
    }, 5000); // Delay in milliseconds (500ms = 0.5 seconds)

  }

  const handleClosePopup = () => {
      setIsPopupVisible(false);
  };

  const handleCloseSettings = () => {
    setSettingsVisible(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPopupVisible(false);
    if(id !== '') {
      if(submittedIDs.includes(id)) {
        setIsErrorVisible(true);
        setErrorLine('dupl')
        setTimeout(() => {
          setIsErrorVisible(false);
          setErrorLine('');
        }, 5000); 
        setId('');
      } else {
        setSubmittedIDs([...submittedIDs, id]);
        setId('');
      }

    } 
    if(isMobile) {
    if(submittedIDs.length == 2) {
      setIsButtonVisible(false);
    }
  } else {
    if(submittedIDs.length == 4) {
      setIsButtonVisible(false);
    }
  }
  
  };

  const handleRemoveID = (removeID) => {
    setSubmittedIDs(submittedIDs.filter((submittedID) => submittedID !== removeID));
  }

  const handleCheck = (checkedValue, prop) => {
    if(prop == "direction") {
      setDirectionVisible(checkedValue);
    } else if(prop == "title") {
      setTitleVisible(checkedValue);
    } else if(prop == "footer") {
      setFooterVisible(checkedValue);
    } else if(prop = 'plus') {
      setIsButtonVisible(checkedValue);
    }
  }



  return (
    <>
    <AnimatePresence>
      {isPopupVisible && (
                  <form onSubmit={handleSubmit} >

      <motion.div
            className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
            initial={{ backdropFilter: "blur(0px)", opacity: 0 }}
            animate={{ backdropFilter: "blur(10px)", opacity: 1 }}
            exit={{ backdropFilter: "blur(0px)", opacity: 0 }}
            transition={{ duration: 0.3 }}
          >     
             <motion.div
          className="bg-[#262626] rounded-xl text-center w-96 max-w-lg shadow-lg"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 40 }}
        >
        <div className="w-full h-5 flex justify-end">
          <a className="p-4 cursor-pointer" onClick={handleClosePopup}>
            <span className="text-white font-black select-none">X</span>
          </a>
        </div>   
          <div className="p-8">
          <h2 className="text-xl font-semibold mb-4 text-white">Introduce ID-ul liniei pe care vrei sa o urmaresti</h2>
          <div className="flex items-center justify-center">
          <input type="number" value={id} onChange={(e) => setId(e.target.value)}  id="first_name" className="bg-[#404040] h-8 placeholder-[#919EF1] text-[#919EF1] text-[12px] lg:text-sm  rounded-lg border-gray-200 focus:border-transparent focus:ring-0 outline-none block w-[60px] pl-2.5 " placeholder="12354" required />
          </div>
          <motion.button
            type="submit"
            className="mt-5 bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 focus:outline-none"
            whileHover={{ scale: 1.1 }}

          >
            Adaugă
          </motion.button>
          </div>
        </motion.div>
        </motion.div>
        </form>
      )}
      </AnimatePresence>
      <AnimatePresence>
  {settingVisible && (
    <motion.div
      className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
      initial={{ backdropFilter: "blur(0px)", opacity: 0 }}
      animate={{ backdropFilter: "blur(10px)", opacity: 1 }}
      exit={{ backdropFilter: "blur(0px)", opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-[#262626] rounded-xl text-center w-100 max-w-lg shadow-lg"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 40 }}
      >
        <div className="w-full h-3 flex justify-end">
          <a className="p-4 cursor-pointer" onClick={handleCloseSettings}>
            <span className="text-white font-black select-none">X</span>
          </a>
        </div>
        <div className="p-8">
          <h2 className="text-xl font-semibold mb-4 text-white">Setări</h2>
          <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center justify-center gap-5">
            <span>Activează afișarea direcției (tur/retur)</span>
            <Switch onChange={(checkedValue) => handleCheck(checkedValue, "direction")} checked={directionVisible} />
          </div>

          <div className="flex flex-row items-center justify-center gap-5">
            <span>Activează afișarea footer-ului</span>
            <Switch onChange={(checkedValue) => handleCheck(checkedValue, "footer")} checked={footerVisible} />
          </div>
          <div className="flex flex-row items-center justify-center gap-5">
            <span>Activează afișarea titlului</span>
            <Switch onChange={(checkedValue) => handleCheck(checkedValue, "title")} checked={titleVisible} />
          </div>
          <div className="flex flex-row items-center justify-center gap-5">
            <span>Ascunde butonul plus</span>
            <Switch onChange={(checkedValue) => handleCheck(checkedValue, "plus")} checked={isButtonVisible} />
          </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    <div className="ml-10">
      <div className=" h-[200px] w-full flex flex-row justify-between ">
          <div className="flex flex-col ">
          {titleVisible && (
            <div>
            <motion.div variants={textVariant()}>
                <h2 className={`${styles.HeadText} `} >Transport Live</h2>
              </motion.div>
              <motion.div variants={textVariant()}>
                <p className={`${styles.SubText} `} >Aici poți vedea stațiile și sosirile, la un click distanță</p>

              </motion.div>
              </div>
          )}
              
          {isErrorVisible &&  (     
            <div 
            className="text-red-500">{errorLine == 'dupl' ? 'Ai introdus același ID de doua ori!' : `ID-ul ${errorLine} nu este valid. Încearcă din nou!`}</div>
            )}
          </div>
          <div className="p-4">
          <motion.svg  className='fill-white focus:ring-0 outline-none ' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50"
          whileHover={{  rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSettingsClick}
          >
              <path d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z"></path>
          </motion.svg>
            


          </div>
      </div>
      <div className="flex flex-row gap-10 justify-evenly ">
          {submittedIDs.map((submittedID, index) => (
            
            <LinesComponent key={index} onRemove={() => handleRemoveID(submittedID)} onNull={() => handleNull(submittedID)} directionVisible={directionVisible} stationID={submittedID}/>
            
          ))}
          {isButtonVisible && (
                      <motion.button whileTap={{ scale: 0.9 }} onClick={handleButtonClick} >
                      <div className="bg-black w-[100px] h-[50px] border flex items-center text-center justify-center rounded-xl"><span className="font-black text-xl">+</span></div>
                      </motion.button>
          )}
        </div>
      </div>
          {footerVisible && (
                  <motion.div className="flex flex-col justify-end items-center fixed bottom-5 left-0 right-0"
                  initial={{ opacity:  0.5 }}
                  animate={{ opacity: settingVisible || isPopupVisible ? 1 : 0.5 }}
                  exit={{  opacity: 0.5 }}
                  transition={{ duration: 0.3 }}
                  >
                  <div className="flex flex-col items-center leading-tight">
                    <h2>Dezvoltat de <span className="text-red-500">@rocristoi</span></h2>
                   <a href="https://github.com/rocristoi/TransportLive"> <h2 className="bg-gradient-to-r from-[#2da44e]  to-[#0366d6] text-transparent bg-clip-text">Contribuie la acest proiect pe Github</h2></a>
                  </div>
          </motion.div>

          )}

    </>
  );
  
};

export default Main;