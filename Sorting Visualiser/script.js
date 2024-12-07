const n=30;
array=[];

let audioCtx=null;

function playSound(freq)
{
    if(audioCtx==null){
        audioCtx=new(
            AudioContext ||
            webkitAudioContext)();
    }
    const dur=0.1;
    const osc=audioCtx.createOscillator();
    osc.frequency.value=freq;
    osc.start();
    osc.stop(audioCtx.currentTime+dur);
    const node=audioCtx.createGain();
    node.gain.value=0.1;
    osc.connect(node);
    node.connect(audioCtx.destination);
}
function init(){
    for(let i=0;i<n;i++) {
        array[i]=Math.random();
    }
    showBars();
}
function play(){
    const copy=[...array];
    const moves=bubbleSort(copy);
    animate(moves);
}

function animate(moves){
    if(moves.length==0){
        showBars();
        return;
    }
    const move=moves.shift();
    const [i,j] = move.indices;
    if (move.type =="swap"){
        [array[i],array[j]]=[array[j],array[i]];}
    playSound(200+array[i]*500);
    playSound(150+array[j]*500);    
    showBars(move);
    setTimeout(function(){
        animate(moves);
    },200);
}

function bubbleSort(array)
   { const moves =[];
     do{
        var swapped=false;
        for(let i=1;i<array.length;i++){
            moves.push({indices:[i-1,i],type:"comp"});
            if(array[i-1]>array[i]){
                swapped=true;
                moves.push({indices:[i-1,i],type:"swap"});
                [array[i-1],array[i]]=[array[i],array[i-1]]
            }
        }

    }while(swapped);
    return moves;
}
function showBars(move){
    container.innerHTML="";
    for(let i=0;i<array.length;i++)
    {
        const bar =document.createElement("div");
        bar.style.height=array[i]*100+"%";
        bar.classList.add("bar");
        if(move && move.indices.includes(i)){
            bar.style.backgroundColor=
                move.type=="swap"?"red":"yellow";
        }
        container.appendChild(bar);
    }
}