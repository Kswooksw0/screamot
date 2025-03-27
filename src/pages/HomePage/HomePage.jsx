// import React from 'react'
// import { Title } from '../../components/Title/Title'
// import { Socials } from '../../components/Socials/Socials'


// const HomePage = () => {
//   return (
//     <div>
//         hello
//         <Title></Title>
//         <Socials></Socials>
//     </div>
//   )
// }

// export default HomePage;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // For navigation

import styles from "./HomePage.module.css";
import { Title } from "../../components/Title/Title";
import { Socials } from "../../components/Socials/Socials";
import { ContractAddress } from "../../components/ContractAddress/ContractAddress";
// import { supabase } from "../../supabaseClient";

// utility
import { isMultipleOfMillion } from "../../lib/isMultipleOfMillion";

import marmotClose from "../../assets/images/screaming_marmot_close.png";
import marmotOpen from "../../assets/images/screaming_marmot_open.png";
import screamSound from "../../assets/media/screamot_scream.mp4";


const HomePage = () => {
  const [isMouthOpen, setMouthOpen] = useState(false);
  const [counter, setCounter] = useState(0);
  const [globalCounter, setGlobalCounter] = useState(100);
  const [shouldJiggle, setShouldJiggle] = useState(false);
  const audioRef = useRef(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate(); // Navigation hook

  const contractAddress = "CA: 7GCihgDB8fe6KNjn2MYtkzZcRJQy3t9GHdC8uHYmW2hr";

  // Fetch global scream counter from Supabase
  useEffect(() => {
    // const fetchGlobalCounter = async () => {
    //   const { data, error } = await supabase
    //     .from("scream_counter")
    //     .select("total_screams")
    //     .eq("id", 1)
    //     .single();

    //   if (error) {
    //     console.error("Error fetching global counter:", error);
    //   } else if (data) {
    //     setGlobalCounter(data.total_screams);
    //   }
    // };

    // fetchGlobalCounter();

    // const screamSubscription = supabase
    //   .channel("scream_counter_channel")
    //   .on(
    //     "postgres_changes",
    //     { event: "UPDATE", schema: "public", table: "scream_counter" },
    //     (payload) => {
    //       setGlobalCounter(payload.new.total_screams);
    //     }
    //   )
    //   .subscribe();

    // return () => {
    //   supabase.removeChannel(screamSubscription);
    // };
  }, []);

  // useEffect(() => {
  //   // if the number of screams is a multiple of millions, alert
  //   if(isMultipleOfMillion(globalCounter)) {
  //     console.log('Jackpot!');
  //   }
  // })

  // Jiggle animation logic
  useEffect(() => {
    let timer;
    if (shouldJiggle) {
      const countElement = document.querySelector(`.${styles.count}`);
      countElement.classList.add(styles.jiggle);

      timer = setTimeout(() => {
        countElement.classList.remove(styles.jiggle);
        setShouldJiggle(false);
      }, 500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [shouldJiggle]);

  // Handle the click action and audio
  const handleClick = async () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((error) => {
      alert("Playback failed:", error);
    });

    if (!isMouthOpen) {
      setCounter(counter + 1);
      setShouldJiggle(true);
      setMouthOpen(true);

      // const { error } = await supabase.rpc("increment_counter", {});

      // if (error) {
      //   console.error("Error updating global counter:", error);
      // }
    }

    timeoutRef.current = setTimeout(() => {
      setMouthOpen(false);
    }, 250);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // need to find a way to prevent this effect from running everytime there is a click
  useEffect(() => {
    // console.log(globalCounter);
    if (counter > 0 && isMultipleOfMillion(globalCounter + 1)) {
      console.log('millionth!');
    }
  }, [counter]);

  // Handle navigation for button or logo
  const navigateToAboutPage = () => {
    // alert('hello')
    navigate("/about-scream");
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <audio ref={audioRef} src={screamSound} preload="auto" />
      <div className={styles.imageContainer}>
        <img
          // loading="lazy"
          src={isMouthOpen ? marmotOpen : marmotClose}
          alt="Screaming Marmot"
          className={styles.image}
        />
      </div>

      <div className={styles.mainContent}>
        {/* Reason why alert saying 'Playback failed:' pops up when clicking: the issue is occurring 
        because you have both the handleClick event on the container and the logo element itself. 
        When you click the logo in mobile view, both the click event on the logo (which leads to the About page) 
        and the global click handler (which plays the scream audio) are triggered. This results in the audio still trying to play, 
        and when you navigate away from the Home page, the audio playback gets interrupted, leading to the error. To resolve this, 
        Use event.stopPropagation() in the handleLogoClick function in the Logo.jsx file. 
        This will prevent the click event from bubbling up to the parent container. event.stopPropagation() ensures that when you 
        click on the logo, the click event doesn't propagate to its parent containers, which include the handleClick function that 
        plays the scream audio. This will prevent the "Playback failed" alert and ensure only navigation occurs when 
        clicking the logo in mobile mode.*/}
        <div className={styles.topHalf}>
          <Title />
        </div>
        <div className={styles.bottomHalf}>
          <div className={styles.infoBoxContainer}>
            {/* Smart contract address container for larger screens */}
            <ContractAddress contractAddress={contractAddress} />
            {/* Icons for socials */}
            <Socials navigateToAboutPage={navigateToAboutPage} />
          </div>
        </div>
      </div>

      <div className={styles.counterContainer}>
        <h1 className={styles.count}>{counter}</h1>
      </div>

      <div className={styles.globalCounterContainer}>
        {/* <h2 className={styles.globalCount}>Total Screams: {globalCounter}</h2> */}
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

