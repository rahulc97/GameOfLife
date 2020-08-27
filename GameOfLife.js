//importing lodash for deepcloning
var _ = require('lodash');
//first input case
// let currentGeneration=[[1,1],[1,1]];
//second input case
// let currentGeneration=[[1,1,0],[1,0,1],[0,1,0]];
//third input case
// let currentGeneration=[[0,1,0],[0,1,0],[0,1,0]];
//fourth input case
let currentGeneration=[[0,0,0,0],[0,1,1,1],[1,1,1,0],[0,0,0,0]];


const rowMaxIndex=currentGeneration.length;
const colMaxIndex=currentGeneration[0].length;
// console.log(rowMaxIndex,colMaxIndex);

const getNextGeneration=(currentGeneration)=>{
    let nextGeneration=_.cloneDeep(currentGeneration);
    for(let row=0;row<rowMaxIndex;row++){
        for(let col=0;col<colMaxIndex;col++){
            liveCount=getNeighbourLiveCount(currentGeneration,row,col);
            let liveValue=getLifeValue(liveCount,currentGeneration[row][col])
            nextGeneration[row][col]=liveValue;
            // console.log("[Life value]",liveValue,"row",row,col);
        }
    }
    // console.log(nextGeneration);
    return nextGeneration;

}

const getNeighbourLiveCount=(generation,rowIndex,columnIndex)=>{
    // console.log(generation);
    let liveCount=0;
    rowNeighborStartingIndex=rowIndex-1;
    colNeighborStartingIndex=columnIndex-1;
    for(let row=rowNeighborStartingIndex;row<=rowNeighborStartingIndex+2;row++){
        for(let col=colNeighborStartingIndex;col<=colNeighborStartingIndex+2;col++){
            if(row>=0 && row<rowMaxIndex && col>=0 && col<colMaxIndex){
                if(!(row==rowIndex && col==columnIndex)){
                    liveCount+=generation[row][col];
                }
            }
        }
    }
    // console.log(liveCount," row",rowIndex,columnIndex);
    return liveCount;
}
const getLifeValue=(liveCount,liveValue)=>{
    if(liveCount<2 || liveCount>3){
        return 0;
    }else if(liveCount==3 && liveValue==0){
        return 1;
    }else if(liveCount==2 || liveCount==3){
        return liveValue
    }

}
const printPattern=(generationMatrix)=>{
    for(let row=0; row<rowMaxIndex;row++){
        let outputPattern="";
        for(let col=0;col<colMaxIndex;col++){
            if(generationMatrix[row][col]==0){
                outputPattern=outputPattern+" - "
            }if(generationMatrix[row][col]==1){
                outputPattern=outputPattern+" X "
            }
        }
        console.log(outputPattern);
    }
}
console.log("*********************Input Pattern *****************");
printPattern(currentGeneration);
let nextGen=getNextGeneration(currentGeneration);
console.log("*********************Output Pattern *****************");
printPattern(nextGen);
