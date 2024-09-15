import Songs from './db.js'
import { itemsArray } from './script.js'

const element = document.querySelector('.element')
const shuffle_btn = document.querySelector('#shuffle')
const authors = document.querySelectorAll('.author')
const songs = document.querySelectorAll('.song')
const elem2 = document.querySelector('#elem2')
const mp = document.querySelector('#music_player')
const start = document.querySelector("#start")
const stop = document.querySelector('#stop')
const playBtns = document.querySelectorAll(".play_btns")
const play_range = document.querySelector('#play_range')
let play_btn = document.querySelector('#play')
let next_btn = document.querySelector('#next')
let previous_btn = document.querySelector('#previous')
let repeat_btn = document.querySelector('#repeat')
const disk = document.querySelector(".disk")
const shuffleIcon = document.querySelector("#shuffleIcon")
let playing_id=  Songs[0].id;
const list = document.querySelector("#list2")
start.innerText = stop.innerText = '00:00'

//////////////////////////////////////////////////////////////////////////////////////
    // Music Player. Author: Jayeola Abdulhakeem
//////////////////////////////////////////////////////////////////////////////////////

const music_player = {                                                                                                                    
    modes:['repeatAll','repeatOne','noRepeat'],
    mode: 'repeatAll',
    shuffle: false,

    play: function(){  
        exitTimeUpdateListener()
        mp.play() 
        disk.classList.add('spin')
        play_range.max = mp.duration
        stop.innerText = parseAndDisplayTime('duration')
        mp.addEventListener('timeupdate',setTimer)
        stylePlayingItem()
    },

    pause:function(){
        exitTimeUpdateListener()
        mp.pause()
        play_btn.children[0].src = `assets/svgs/play.svg`
        disk.classList.remove('spin')
    },

    next: function(){
        this.switchSong(playing_id++,'next')
        itemsArray[playing_id + 7].style.border = "1px solid var(--accent)"
    },

    previous:function(){
        this.switchSong(playing_id--,'previous')
        list.scrollBy({top:-56, left:0, behavior:"smooth"})
    },

    changeSongDetails:function(){
        let author = Songs[playing_id].author;
        let song = Songs[playing_id].name;
        authors.forEach(element =>{
            element.innerText = author
        })
        songs.forEach(element =>{
            element.innerText = song
        })
    },
    
    setSong:function(){
        mp.src = `assets/songs/${Songs[playing_id].file}`
    },

    setMode:function(clicked){
       this.mode = this.modes[clicked]
       switch(clicked){
        case 0: {element.style.display = 'none'; shuffleIcon.classList.remove('shuffleIcon')};break;
        case 2: {shuffleIcon.classList.add('shuffleIcon'); element.style.display = 'none'};break;
        case 1 : {element.style.display = 'flex'; shuffleIcon.classList.remove('shuffleIcon')}; break;
        default: {element.style.display = 'none'; shuffleIcon.classList.remove('shuffleIcon')}
       }
    },

    useMode:function(){
        mp.onended=()=>{
            if(this.mode === 'repeatAll'){
                this.next()
            }else if(this.mode === 'repeatOne'){
                this.play()
            }else{
                return
            }
        }
    },

    setShuffle:function(){
        !this.shuffle? (()=>{
            this.shuffle = true
            elem2.style.display = 'block'
        })(): (()=>{
            this.shuffle = false
            elem2.style.display = 'none'
        })()
    },

    switchSong: function(action,order){
        if(this.shuffle && this.mode !== 'repeatOne'){
            let randomID = Math.round(Math.random()*(Songs.length-1))
            playing_id = randomID
        }else{
            if(order === 'next'){
                if(playing_id < Songs.length){
                    list.scrollBy({top:56, left:0, behavior:"smooth"})
                    action
                }else{
                    playing_id = 0
                    list.scrollBy({top:-56 * 7, left:0, behavior:"smooth"})
                }
            }else if(order === 'previous'){
                if(playing_id > 0){
                    action
                    list.scrollBy({top:-56, left:0, behavior:"smooth"})
                }else{
                    playing_id = 0
                }
            }else{
                action
            }
        }
        this.changeSongDetails()
        this.setSong()
        this.checkLoadedMetaData()
    },

    checkLoadedMetaData: function(){
        mp.addEventListener('loadedmetadata',()=>{
            mp.playing  && music_player.play()
        })
    }
}
//////////////////////////////////////////////////////////////////////////////////////
    //Music Player. Author: Jayeola Abdulhakeem
//////////////////////////////////////////////////////////////////////////////////////




//monitors and updates the range of the player
function setTimer(){
    play_range.value = mp.currentTime
    start.innerText = parseAndDisplayTime('currentTime')
}

//time parser to parse the currentTime to a string in seconds and minutes to update playing time 
let parseAndDisplayTime = (item)=>{
    let seconds  = parseInt(mp[item] % 60).toString().padStart(2,'0')
    let minutes = (Math.floor(mp[item]/60)).toString().padStart(2,"0")
    return `${minutes}:${seconds}`
}

//pauses the timeupdate event when the mouse is down on the range
play_range.addEventListener('mousedown',()=>{
    exitTimeUpdateListener()
    play_range.addEventListener('change',()=>{
        mp.currentTime = play_range.value
    })
})

play_range.addEventListener('change',()=>{
    exitTimeUpdateListener()
    mp.currentTime = play_range.value
    mp.addEventListener('timeupdate',setTimer)

})

// play_range.addEventListener('touchstart',()=>{
//     exitTimeUpdateListener()
//     play_range.addEventListener('touchmove',()=>{
//         mp.currentTime = play_range.value
//     })
// })

function exitTimeUpdateListener(){
    mp.removeEventListener('timeupdate',setTimer)
}

//adds the listener when mouse is off the range (touchend used for compatibility with mobile devices)
play_range.addEventListener('mouseup',()=>{
    mp.addEventListener('timeupdate',setTimer)
})
play_range.addEventListener('touchend',()=>{
    mp.addEventListener('timeupdate',setTimer)
})

// start and pause songs
playBtns.forEach((btn, index)=>{
    btn.onclick=(event)=>{
        event.stopPropagation()
        if(!mp.playing){
            music_player.play()
            mp.playing = true
            playBtns.forEach(item =>{
                item.children[0].src = `assets/svgs/pause.svg`
            })
        }else{
            music_player.pause()
            mp.playing = false
            playBtns.forEach(item =>{
                item.children[0].src = `assets/svgs/play.svg`
            })
        }
    }
})


//change to the next song
next_btn.onclick=()=>{
    music_player.next()
    stylePlayingItem()
}

previous_btn.onclick=()=>{
    music_player.previous()
    stylePlayingItem()
}

shuffle_btn.onclick = () =>{
    music_player.setShuffle()
}

//closure to monitor clicked variable and decide the play mode
function modetoggle(){
    let clicked = 0;
    return function countClicks(){
        clicked < 2? (clicked++) : (clicked = 0)
        music_player.setMode(clicked)
    }
}

function manualSelect(){
    itemsArray.forEach((item, index)=>{
        if(index >= 7){
            item.onclick = () =>{
                itemsArray.forEach(it => it.style.border = "1px solid transparent")
                playing_id = index - 7
                // music_player.setSong()
                // music_player.changeSongDetails()
                // mp.playing? music_player.play() : music_player.pause()
                music_player.switchSong(playing_id, null)
                item.style.border = "1px solid var(--accent)"
            }
        }
    })
}

function stylePlayingItem(){
    itemsArray.forEach(item =>{
        item.style.border = "1px solid transparent"
    })
    itemsArray[playing_id + 7].style.border = "1px solid var(--accent)"
}

let countMode = modetoggle()
repeat_btn.onclick=()=>{
    countMode()
}


manualSelect()
music_player.changeSongDetails()
music_player.setSong()
music_player.setMode(0)
music_player.useMode()