import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./HomePage.module.css";
import { Title } from "../../components/Title/Title";
import { Socials } from "../../components/Socials/Socials";
import { ContractAddress } from "../../components/ContractAddress/ContractAddress";

import marmotClose from "../../assets/images/screaming_marmot_close.png";
import marmotOpen from "../../assets/images/screaming_marmot_open.png";
import screamSound from "../../assets/media/screamot_scream.mp4";

const HomePage = () => {
  const [isMouthOpen, setMouthOpen] = useState(false);
  const [counter, setCounter] = useState(0);
  const [shouldJiggle, setShouldJiggle] = useState(false);
  const audioRef = useRef(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const contractAddress = "CA: 7GCihgDB8fe6KNjn2MYtkzZcRJQy3t9GHdC8uHYmW2hr";

  // ✅ Fix: Remove unused globalCounter variable
  useEffect(() => {}, []);

  // Jiggle animation logic
  useEffect(() => {
    let timer;
    if (shouldJiggle) {
      const countElement = document.querySelector(`.${styles.count}`);
      if (countElement) {
        countElement.classList.add(styles.jiggle);
      }

      timer = setTimeout(() => {
        if (countElement) {
          countElement.classList.remove(styles.jiggle);
        }
        setShouldJiggle(false);
      }, 500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [shouldJiggle]);

  // Handle the click action and audio
  //   const handleClick = async () => {
  //     if (audioRef.current) {
  //       audioRef.current.pause();
  //       audioRef.current.currentTime = 0;
  //       audioRef.current.play().catch((error) => {
  //         console.error("Playback failed:", error);
  //       });
  //     }

  //     if (!isMouthOpen) {
  //       setCounter((prevCounter) => prevCounter + 1);
  //       setShouldJiggle(true);
  //       setMouthOpen(true);
  //     }

  //     timeoutRef.current = setTimeout(() => {
  //       setMouthOpen(false);
  //     }, 250);
  //   };
  // Handle the click action and audio
  const handleClick = async () => {
    if (audioRef.current) {
      try {
        audioRef.current.pause(); // Stop current playback
        audioRef.current.currentTime = 0; // Reset to beginning
        audioRef.current.load(); // Ensures mobile browsers reset the audio buffer
        await audioRef.current.play(); // Start playing

        setCounter((prevCounter) => prevCounter + 1);
        setShouldJiggle(true);
        setMouthOpen(true);

        timeoutRef.current = setTimeout(() => {
          setMouthOpen(false);
        }, 250);
      } catch (error) {
        console.error("Playback failed:", error);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // ✅ Fix: Memoized navigate function to avoid ESLint warning
  const navigateToAboutPage = () => {
    navigate("/about-scream");
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <audio ref={audioRef} src={screamSound} preload="auto" playsInline />

      <div className={styles.imageContainer}>
        <img
          src={isMouthOpen ? marmotOpen : marmotClose}
          alt="Screaming Marmot"
          className={styles.image}
        />
      </div>

      <div className={styles.mainContent}>
        <div className={styles.topHalf}>
          <Title />
        </div>
        <div className={styles.bottomHalf}>
          <div className={styles.infoBoxContainer}>
            <ContractAddress contractAddress={contractAddress} />
            <Socials navigateToAboutPage={navigateToAboutPage} />
          </div>
        </div>
      </div>

      <div className={styles.counterContainer}>
        <h1 className={styles.count}>{counter}</h1>
      </div>

      <div className={styles.globalCounterContainer}>
        <h2 className={styles.globalCount}>Total Screams: 100</h2>
      </div>
    </div>
  );
};

export default HomePage;

// When you click and call increment_counter, the total_screams value in the database is incremented.
// This database change emits a 'postgres_changes' event.
// Your subscription listens for this event and triggers the callback function.
// The callback function receives the new data (payload.new.total_screams) and updates the globalCounter state using setGlobalCounter.
// React re-renders the component with the updated globalCounter, showing the new total screams immediately.

/* Visualization of the Flow */

// 1. Component Mounts:

//   Fetches initial global counter.
//   Subscribes to real-time updates.

// 2. User Clicks:

//   Local counter increments (setCounter).
//   Calls RPC to increment total_screams in the database.

// 3. Database Updates:

//   total_screams is incremented in the database.

// 4. Real-time Event Emitted:

//   'UPDATE' event is emitted by Supabase.

// 5. Subscription Callback Fires:

//   Receives new total_screams value.
//   Updates globalCounter state (setGlobalCounter).

// 6. Component Re-renders:

//   Displays updated globalCounter.

/* WHAT THE .CHANNEL() FUNCTION MEANS */

// The abstraction created by .channel('scream_counter_channel') is only temporary and tied to the lifecycle of the React component (in this case, HomePage.jsx).

// What happens when the component unmounts or the user navigates away?
// When the Component Unmounts or User Navigates Away:

// The subscription to the real-time changes via .channel() is active as long as the component is mounted.
// In your current implementation, when the HomePage.jsx component unmounts (e.g., when the user navigates to another page using the router or closes the browser), the subscription is removed. This happens because you call supabase.removeChannel(screamSubscription) in the cleanup function inside the useEffect hook.
// This ensures that once the user leaves the page, the WebSocket connection tied to the scream_counter_channel is closed and no longer consumes resources.
// Browser Session or Tab Closure:

// If the user closes the browser tab or the session ends, the WebSocket connection is also terminated. The subscription is automatically cleaned up by the browser since the connection is no longer active.

// Summary:
// Temporary: The WebSocket subscription via .channel() is temporary and tied to the component's lifecycle.
// Cleanup: It is removed when the component unmounts (on page navigation) or when the browser session ends (closing the tab or session).
