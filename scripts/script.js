import Songs from './db.js'
import {notifications} from './db.js'

const nav_items = document.querySelectorAll('.nav_item')
const pages = document.querySelectorAll('.page')
const library_slider = document.querySelector('#library-slide')
const notes_slider = document.querySelector('#notes-slider')
const search_btn = document.querySelector('.search')
const searchbar = document.querySelector('.searchbar')
const playing = document.querySelector('.playing')
const navigation = document.querySelector('#navigation')
const list2 = document.querySelector("#list2")
const navigation_height = navigation.clientHeight
const fileadd = document.querySelector('#fileadd')
const filebtn = document.querySelector('#filebtn')
const foot = document.querySelector('.foot')
const elem = document.querySelector('.elem')
const player = document.querySelector("#player")
const player2 = document.querySelector("#player2")
const aside1 = document.querySelector("#aside1")
const slides = document.querySelectorAll("slides")
searchbar.open = false
elem.innerText = `${notifications.length}`

onload = () => {
    nav_items[1].click()
    if(window.innerWidth >= 1000){
        aside1.appendChild(foot)
        player2.append(player)
        player.style.display = 'flex'
    }
}


onresize = () =>{ 
    if(window.innerWidth = 1000){
        window.location.reload()
    }
}

for(let i = 0; i < notifications.length; i++){
   let notification = document.createElement('div')
    notification.innerText = notifications[i].message
    notification.classList.add('note')
    notes_slider.appendChild(notification)
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

//logic to change color of icons

//Controlling the searchbar
search_btn.onclick = () =>{
  if(!searchbar.open){
    searchbar.style.animationName = 'slidedown'
    searchbar.style.display = 'flex'
    searchbar.open = true
  }else{
    searchbar.style.animationName = 'slideup'
    // searchbar.style.display = 'none'
    searchbar.open = false
  }
}

createListFromSongs(library_slider)
createListFromSongs(list2)