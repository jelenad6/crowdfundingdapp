import React, { useState } from 'react';
import '../style.css';

const DonateProject = ({ web3, accounts, contract }) => {
  const [projectId, setProjectId] = useState('');
  const [donationAmount, setDonationAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const donationInWei = web3.utils.toWei(donationAmount, 'ether');
    await contract.methods.donateToProject(projectId).send({ from: accounts[0], value: donationInWei });
  };

  return (
    <div className="form-container">
      <h2>Donate to a Project</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input type="number" placeholder="Project ID" value={projectId} onChange={(e) => setProjectId(e.target.value)} required />
        <input type="number" placeholder="Donation Amount (ETH)" value={donationAmount} onChange={(e) => setDonationAmount(e.target.value)} required />
        <button type="submit">Donate</button>
      </form>
    </div>
  );
};
export default DonateProject;
