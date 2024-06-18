// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {
    
    // Struktura projekta
    struct Project {
        uint256 id;
        string name;
        string description;
        uint256 targetAmount;
        uint256 collectedAmount;
        uint256 deadline;
        address payable owner;
        bool completed;
    }

    // Brojač ID-eva projekata
    uint256 public projectCount = 0;

    // Mapiranje ID-a projekta na projekat
    mapping(uint256 => Project> public projects;

    // Mapiranje ID-a projekta na donatore i njihove donacije
    mapping(uint256 => mapping(address => uint256)) public donations;

    // Događaji
    event ProjectCreated(uint256 indexed projectId, string name, uint256 targetAmount, uint256 deadline, address owner);
    event DonationReceived(uint256 indexed projectId, address indexed donor, uint256 amount);
    event FundsWithdrawn(uint256 indexed projectId, address owner, uint256 amount);

    // Funkcija za kreiranje novog projekta
    function createProject(string memory _name, string memory _description, uint256 _targetAmount, uint256 _deadline) public {
       // require(_deadline > block.timestamp, "Rok mora biti u budućnosti");
        require(_targetAmount > 0, "Ciljani iznos mora biti veći od nule");

        projectCount++;
        projects[projectCount] = Project({
            id: projectCount,
            name: _name,
            description: _description,
            targetAmount: _targetAmount,
            collectedAmount: 0,
            deadline: _deadline,
            owner: payable(msg.sender),
            completed: false
        });

        emit ProjectCreated(projectCount, _name, _targetAmount, _deadline, msg.sender);
    }

    // Funkcija za doniranje projektu
    function donateToProject(uint256 _projectId) public payable {
        Project storage project = projects[_projectId];
        require(block.timestamp < project.deadline, "Period finansiranja projekta je završen");
        require(msg.value > 0, "Iznos donacije mora biti veći od nule");
        require(!project.completed, "Finansiranje projekta je već završeno");

        project.collectedAmount += msg.value;
        donations[_projectId][msg.sender] += msg.value;

        emit DonationReceived(_projectId, msg.sender, msg.value);
    }

    // Funkcija za povlačenje prikupljenih sredstava
    function withdrawFunds(uint256 _projectId) public {
        Project storage project = projects[_projectId];
        require(msg.sender == project.owner, "Samo vlasnik projekta može povući sredstva");
        require(block.timestamp >= project.deadline || project.collectedAmount >= project.targetAmount, "Period finansiranja nije završen ili ciljani iznos nije dostignut");
        require(!project.completed, "Sredstva su već povučena");

        uint256 amount = project.collectedAmount;
        project.collectedAmount = 0;
        project.completed = true;

        project.owner.transfer(amount);

        emit FundsWithdrawn(_projectId, project.owner, amount);
    }
}
