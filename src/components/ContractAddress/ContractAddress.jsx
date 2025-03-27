import React from "react";
import styles from "./ContractAddress.module.css";
import solscanLogo from "../../assets/images/solscan_logo.png"; // Correct path

export const ContractAddress = React.memo(({ contractAddress }) => {
  const handleCAClick = (event) => {
    event.stopPropagation();
    // navigateToAboutPage();
    // alert('hello world')
  };
  return (
    <>
      <div className={styles.contractAddressContainer} onClick={handleCAClick}>
        <img
          src={solscanLogo}
          className={styles.solscanLogo}
          alt="Solscan Logo"
        />
        <span className={styles.contractAddress}>{contractAddress}</span>
      </div>
    </>
  );
});
