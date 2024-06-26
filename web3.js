import Web3 from 'web3';

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      } else if (window.web3) {
        // Use existing provider
        const web3 = new Web3(window.web3.currentProvider);
        resolve(web3);
      } else {
        reject(new Error('Must install MetaMask or similar extension'));
      }
    });
  });

export default getWeb3;
