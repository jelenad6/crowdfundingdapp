import React, { useState, useEffect } from 'react';
import '../style.css';

const CreateProject = ({ web3, accounts, contract }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [isContractReady, setIsContractReady] = useState(false);

  useEffect(() => {
    setIsContractReady(contract !== null);
  }, [contract]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isContractReady) {
      console.error('Contract is not initialized yet.');
      return;
    }
    const deadlineInUnix = Math.floor(new Date(deadline).getTime() / 1000);
    try {
      await contract.methods.createProject(name, description, targetAmount, deadlineInUnix).send({ from: accounts[0] });
      console.log('Project created successfully');
      setName('');
      setDescription('');
      setTargetAmount('');
      setDeadline('');
    } catch (error) {
      console.error('Error while creating project:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Create a Project</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" placeholder="Target Amount" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} required />
        <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;
