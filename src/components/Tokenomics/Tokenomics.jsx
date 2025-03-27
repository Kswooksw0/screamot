import React from "react";
import styles from "./Tokenomics.module.css";
import { ContractAddress } from "../ContractAddress/ContractAddress";

export const Tokenomics = () => {
  const contractAddress = "CA: 7GCihgDB8fe6KNjn2MYtkzZcRJQy3t9GHdC8uHYmW2hr";
  return (
    <div className={styles.tokenomicsContainer}>
      <div className={styles.title}>Tokenomics</div>
      <div> 0/0 Tax</div>
      <div>Liquidity Pool Burnt </div>
      <div>Immutable</div>
      <div>100% Community Owned</div>
      <ContractAddress contractAddress={contractAddress} />
    </div>
  );
};
