    import { useState, useEffect } from "react"

    export default function Board () {

        const [cell,setCell] = useState({
            row: '',
            col: ''
        });

        // const[isClicked, SetIsClicked] = useState([{
        //     row: null,
        //     col: null
        // }])
        async function fetchResult () {
        
                    const response = await fetch("http://localhost:3000/player-move",
                            {
                        method: 'POST',
                        headers: {
                                   'Content-Type': 'application/json', 
                                   'rowIndex' : cell.row,
                                   'colIndex' : cell.col
                                 }
                    })

                    const data =  await response.json();

                    console.log(data);
                }

        function handleKeyPress(rowIndex, colIndex){

            setCell((k) => ({...k, row: rowIndex, col: colIndex}));
 
            // SetIsClicked((k) => [...k, {row: rowIndex, col: colIndex}])

            console.log(rowIndex + " " + colIndex);

            fetchResult();

        }
         


    
        return <div className="container h-[50vh] w-[30vw] flex flex-wrap">

        
            <div onClick={() => handleKeyPress(0,0)} className="h-[33.3%] w-[33.3%] border-2 border-black"></div>
            <div onClick={() => handleKeyPress(0,1)} className="h-[33.3%] w-[33.3%] border-2 border-black"></div>
            <div onClick={() => handleKeyPress(0,2)} className="h-[33.3%] w-[33.3%] border-2 border-black"></div>
            <div onClick={() => handleKeyPress(1,0)} className="h-[33.3%] w-[33.3%] border-2 border-black"></div>
            <div onClick={() => handleKeyPress(1,1)} className="h-[33.3%] w-[33.3%] border-2 border-black"></div>
            <div onClick={() => handleKeyPress(1,2)} className="h-[33.3%] w-[33.3%] border-2 border-black"></div>
            <div onClick={() => handleKeyPress(2,0)} className="h-[33.3%] w-[33.3%] border-2 border-black"></div>
            <div onClick={() => handleKeyPress(2,1)} className="h-[33.3%] w-[33.3%] border-2 border-black"></div>
            <div onClick={() => handleKeyPress(2,2)} className="h-[33.3%] w-[33.3%] border-2 border-black"></div>
            
            

        </div>
    }