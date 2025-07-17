import React, { useEffect, useState } from 'react';
import CrowdfundingABI from './Crowdfunding.json'; 
import getWeb3 from './web3'; 

import CreateProject from './components/CreateProject';
import WithdrawFunds from './components/WithdrawFunds';
import DonateProject from './components/DonateProject';
import './style.css';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        
        const web3 = await getWeb3();
        setWeb3(web3);

        
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);

        
        const contractAddress = '0x605A340dD08CE0AD6a40f6ad3c2F6621C0888533'; 
        const contractInstance = new web3.eth.Contract(
          CrowdfundingABI,
          contractAddress
        );
        setContract(contractInstance);
      } catch (error) {
        console.error('Error while initializing application:', error);
      }
    };

    init();
  }, []);

  
  if (!web3 || !contract) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Crowdfunding DApp</h1>
      <CreateProject web3={web3} accounts={accounts} contract={contract} />
      <WithdrawFunds web3={web3} accounts={accounts} contract={contract} />
      <DonateProject web3={web3} accounts={accounts} contract={contract} />
    </div>
  );
};

export default App;
