import React, { useState } from 'react';
import '../style.css';

const WithdrawFunds = ({ web3, accounts, contract }) => {
  const [projectId, setProjectId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await contract.methods.withdrawFunds(projectId).send({ from: accounts[0] });
  };

  return (
    <div className="form-container">
      <h2>Withdraw Funds</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input type="number" placeholder="Project ID" value={projectId} onChange={(e) => setProjectId(e.target.value)} required />
        <button type="submit">Withdraw</button>
      </form>
    </div>
  );
};
export default WithdrawFunds;
