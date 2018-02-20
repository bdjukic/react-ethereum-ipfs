pragma solidity ^0.4.8;

contract TomatoBlackMarket {
    
    struct Tomato {
        uint8 id;
        string displayName;
        uint8 price;
        TomatoStatus status;
        string photoIpfsHash;
    }
    
    uint8 tomatoCount;
    uint8[] tomatoIds;
    mapping(uint => Tomato) tomatos;
    
    enum TomatoStatus { Fresh, Rotten }
    
    event Log(string message);
    
    function getTomatoCounter() public view returns (uint8) {
        return tomatoCount;
    }
    
    function addTomato(string displayName, uint8 price, TomatoStatus status, string photoIpfsHash) {
        tomatos[tomatoCount] = Tomato(tomatoCount, displayName, price, status, photoIpfsHash);
        tomatoIds.push(tomatoCount);
        
        tomatoCount++;

        Log("Tomato added!");
    }
    
    function getTomato(uint8 tomatoId) public view returns (string displayName, uint8 price, TomatoStatus status, string photoIpfsHash) {
	Tomato currentTomato = tomatos[tomatoId];
      
	return (currentTomato.displayName, currentTomato.price, currentTomato.status, currentTomato.photoIpfsHash);
    }
}
