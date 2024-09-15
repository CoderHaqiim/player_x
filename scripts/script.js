// "use strict"
import Songs from './db.js'
import {notifications} from './db.js'

const nav_items = document.querySelectorAll('.nav_item')
const pages = document.querySelectorAll('.page')
const library_slider = document.querySelector('#library-slide')
const notes_slider = document.querySelector('#notes-slider')
const search_btn = document.querySelector('.search')
const searchbar = document.querySelector('.searchbar')
const search2 = document.querySelector("#search2")
const playing = document.querySelector('.playing')
const navigation = document.querySelector('#navigation')
const desktopSearch = document.querySelector(".desktop_search")
const list2 = document.querySelector("#list2")
const navigation_height = navigation.clientHeight
const fileadd = document.querySelector('#fileadd')
const filebtn = document.querySelector('#filebtn')
const foot = document.querySelector('.foot')
const elem = document.querySelector('.elem')
const player = document.querySelector("#player")
const player2 = document.querySelector("#player2")
const aside1 = document.querySelector("#aside1")
const slides = document.querySelectorAll(".slides")
const sliderBtns = document.querySelectorAll(".scrollLeftBtn")
const loader = document.querySelector("#loader")
searchbar.open = false
elem.innerText = `${notifications.length}`
const [slide1, slide2] = slides
const [slideBtn1, slideBtn2] = sliderBtns
export const itemsArray = []
let screenWidth = innerWidth

onload = () => {
    nav_items[1].click()
    if(window.innerWidth >= 1000){
        aside1.appendChild(foot)
        player2.append(player)
        player.style.display = 'flex'
    }
    loader.style.display = "none"
}

function slideLeft () {
    sliderBtns.forEach((btn, index)=>{
        btn.onclick = () =>{
            console.log(index)
            slides[index].scrollBy({top:0, left:120, behavior:"smooth"})
        }
    })
}

onresize = () =>{ 
    if(innerWidth != screenWidth){
        window.location.reload()
    }
}

function mapItemsToNotification(){
    for(let i = 0; i < notifications.length; i++){
        let notification = document.createElement('div')
         notification.innerText = notifications[i].message
         notification.classList.add('note')
         notes_slider.appendChild(notification)
     }
}

filebtn.onclick = () =>{
    fileadd.click()
}

// map each song into library

function createListFromSongs(parentItem){
    Songs.map((element)=>{
        const item = document.createElement('div')
        const song = document.createElement('div')
        const author = document.createElement('div')
        item.classList.add('list_item')
        song.classList.add('top')
        author.classList.add('bottom')
        song.innerText = element.name
        author.innerText = element.author
        item.appendChild(song)
        item.appendChild(author)
        parentItem.append(item)

        itemsArray.push(item)
    })
}

//logic to change selected page
nav_items.forEach(element =>{
    element.onclick = (event) =>{
        let compareVariable = (event.target.id).slice(0,-3)
        nav_items.forEach(item => {
            (item.firstElementChild).classList.remove('selected_item')
            item.classList.remove("glassy")
            if(event.target.id === item.id){
                (item.firstElementChild).classList.add('selected_item')
                item.classList.add("glassy")
            }
        })

        if(compareVariable === 'player'){
            playing.style.display = 'none'
            navigation.style.height = `${navigation_height - 50 }px`

        }else{
            if(window.innerWidth < 1000){
                  playing.style.display = 'flex'
            }else{
                playing.style.display = 'none'
            }
            navigation.style.height = `${navigation_height}px`
        }
        pages.forEach( page =>{
            if(page.classList.contains('selected_page') && page.id ===  compareVariable){
                return
            }else{
                page.classList.remove('selected_page')
                if(page.id === compareVariable){
                    page.classList.add('selected_page')
                    app.style.height = 'auto'
                }
            } 
        })
    }
})

//Controlling the searchbar
search_btn.onclick = () =>{
  if(!searchbar.open){
    if(innerWidth < 1000){
        searchbar.style.animationName = 'slidedown'
        searchbar.style.display = 'flex'
        searchbar.open = true
    }else{
       desktopSearch.style.border="1px solid var(--accent)"
       search2.style.width = "400px"
       search2.focus()
    }
  }else{
    searchbar.style.animationName = 'slideup'
    searchbar.open = false
  }
}

search2.onblur = () =>{
    search2.style.width ="0px"
     desktopSearch.style.border="1px solid transparent"
}

createListFromSongs(library_slider)
createListFromSongs(list2)
mapItemsToNotification()
slideLeft()