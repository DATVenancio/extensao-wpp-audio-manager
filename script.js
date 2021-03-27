
const interval = setInterval(()=>{
    const header = document.querySelector("._1R3Un")
    if(header){
        console.log(header)
        clearInterval(interval)
        audioSettings();

        //speed selec
        const speed_selection = document.createElement("select")
        speed_selection.id="speed_selection"

        for(i=1;i<9;i+=1){
            var value = 0.25*i;
            var option = document.createElement("option");
            option.text= value.toString() + " X";
            option.value = value
            if(i==4){
                option.selected="selected"
            }
            
            speed_selection.add(option)
        }
        
        header.appendChild(speed_selection)


        //volume range
        const volume_slider = document.createElement("input")
        volume_slider.type="range"
        volume_slider.id="volume_slider"
        header.appendChild(volume_slider)

        //back button
        const back_button = document.createElement("img")
        back_button.id="back_button"
        back_button.src = chrome.runtime.getURL("./double-left.png");
        back_button.addEventListener("click",backButton)
        header.appendChild(back_button)
        //front button
        const front_button = document.createElement("img")
        front_button.id="front_button"
        front_button.src = chrome.runtime.getURL("./double-rigth.png");
        front_button.addEventListener("click",frontButton)
        header.appendChild(front_button)


    }
    
},1000)


function audioSettings(){
    setInterval(()=>{
    
        var select = document.getElementById("speed_selection")
        var speed = select.options[select.selectedIndex].value;

        var volume_slider = document.getElementById("volume_slider")
        var volume = parseFloat(volume_slider.value)/100

        
        
        const audios = document.querySelectorAll("audio");
                audios.forEach((audio)=>{
                    audio.playbackRate = speed
                    audio.volume=volume

                })
    },10)
}


function backButton(){
    const audios = document.querySelectorAll("audio");
                audios.forEach((audio)=>{
                    if(audio.currentTime>0){
                        if(audio.currentTime>5){
                            audio.currentTime -=5;
                        }else{
                            audio.currentTime =0;
                        }
                    }
                    
                })

}
function frontButton(){
    const audios = document.querySelectorAll("audio");
    audios.forEach((audio)=>{
        if(audio.currentTime>0){
                audio.currentTime +=5;
        }
        
    })

}