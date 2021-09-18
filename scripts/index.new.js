/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
 let idOnclick = 1;
 function playSong(songId) {
     document.getElementById("songs").innerHTML = '';
     for ( const song of sortedSongs){
         if(song.id === songId){
             idOnclick = 2;
             createSongElement(song);
       
         } 
         else {
             idOnclick = 1;
             createSongElement(song);
            
         }
     }
 }

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(songId) {
    
}
function durationToSeconds(duration){
    let mm = duration[0] + duration[1];
    let ss = duration[3] + duration[4];
    return duration = +mm * 60 + +ss;
    }

/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong(title, album, artist, duration, coverArt) {
    
    player.songs.push(
        {
          "id" : generateId(),
          "title" : title,
          "album" : album,
          "artist" :  artist,
          "duration" : duration,
          "coverArt" : coverArt
        }
    ) 
}
function generateId (){
    let maxId = 0;
    for (let i = 0 ; i < player.songs.length ; i++){
        if (maxId < player.songs[i].id){
            maxId = player.songs[i].id; 
        }
    }
    return maxId +1;
}

function collectInfo (){
    let songInfo = [] ;
    let inputForm = document.getElementById("inputs");
        for ( i= 0 ; i < inputForm.length ; i++){
          songInfo.push(inputForm.elements[i].value);
        }  
       
    addSong(songInfo[0], songInfo[1],songInfo[2],songInfo[3],songInfo[4]);
   
    // clear the songs
    document.getElementById("songs").innerHTML = '';
    // load the songs again
   for ( const song of sortedSongs){
          createSongElement(song);
    }
}

let action = document.getElementById("add-button");
action.addEventListener("click", collectInfo);




/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
    // Your code here
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
    // Your code here
}

/**
 * Creates a song DOM element based on a song object.
 */

 const songss = document.getElementById("songs");

function createSongElement({ id, title, album, artist, duration, coverArt }) {
        let clssong ="Off";
        if ( idOnclick === 2){
            clssong ="On";
        }   
        songEle = createElement("div", [title + " from " + album + " by " + artist ], [clssong] );
        const imgEl = document.createElement("img");
        imgEl.setAttribute("src", coverArt);
        imgEl.classList.add("imgCss");
        const durationEl = document.createElement("duration");
        durationEl.innerText = durationMmss(duration);
        durationEl.classList.add(ClassByDurationLength (duration));
        songEle.prepend(imgEl);
        songEle.append(durationEl);
        songEle.onclick =  function() {playSong(id)};
        songss.append(songEle);
    }

    function ClassByDurationLength (duration){
        if (duration < 120) {
            return ("ShortestDuration");
        }
        if (duration > 119 && duration < 180) {
            return ("ShorterDuration");
        }
        if (duration > 179 && duration < 240) {
            return ("ShortDuration");
        }
        if (duration > 239 && duration < 300) {
            return ("MediumDuration");
        }
        if (duration > 299 && duration < 360) {
            return ("LongDuration"); 
        }
        if (duration > 359 && duration < 420) {
            return ("LongererDuration"); 
        } else {
            return ("LongerestDuration");
        }     
    }

/**
 * Creates a playlist DOM element based on a playlist object.
 */
 const playlistt = document.getElementById("playlists");
 
function createPlaylistElement({ id, name, songs }) {
    const playlistList = createElement("div", [], ["playlistsList"]);
     const playlistEl = createElement("span", [name], ["playlistsName"]);
     const playlistDuration = createElement("span", [" " +durationMmss(playlistTotalDuration(id))], ["playlistsName"]);
     const playlistLegnth = createElement("span", [" " + songs.length +" songs"])
     playlistList.append(playlistEl);
     playlistList.append(playlistLegnth);
     playlistList.append( playlistDuration);
     playlistt.append(playlistList);
 }

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"}, {click: (...) => {...}})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 * @param {Object} eventListeners - the event listeners on the element
 */
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
    const el = document.createElement(tagName);
    for ( let child of children){
        if (typeof child === "string"){
           child = document.createTextNode(child);
        }
        el.append(child)
    }
    for ( const clas of classes){
        el.classList.add(clas);
    }
    for ( const attr in attributes){
        el.setAttribute(attr, attributes[attr])
    };
        return el;
}

/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
function generateSongs() {
    // Your code here
}

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
function generatePlaylists() {
    // Your code here
}

// Creating the page structure
generateSongs()
generatePlaylists()

// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)
let sortedSongs ;
     sortedSongs = player.songs.sort(function (a, b) {
       let titleA = a.title
       let titleB = b.title
         if (titleA < titleB) {
         return -1;
         }
         if (titleA < titleB) {
         return 1;
         }
     })
 for ( const song of sortedSongs){
      createSongElement(song);
 }
 let sortedplaylists ;
 sortedplaylists = player.playlists.sort(function (a, b) {
       let nameA = a.name
       let nameB = b.name
         if (nameA < nameB) {
         return -1;
         }
         if (nameA < nameB) {
         return 1;
         }
     })
 for ( const playlist of sortedplaylists){
     createPlaylistElement(playlist);
 }
 
 function durationMmss(duration) {
     let mm = Math.floor(duration / 60);
     let ss = duration % 60;
       if ( mm < 10 ){
        mm = "0" + mm;
       }
       if ( ss < 10 ){
        ss = "0" + ss;
       }
       return mm + ":" + ss;
 }
   
 function durationById(id) {
     for ( let i = 0 ; i < player.songs.length ; i++){
       if (player.songs[i].id === id){
         return (player.songs[i].duration)
       }
     }
 }
 
 function playlistTotalDuration(id){
     for ( let i = 0 ; i < player.playlists.length ; i++){
         let playlistDuration = 0;
         if (player.playlists[i].id === id){
             for ( let j = 0 ; j < player.playlists[i].songs.length ; j++){
                 playlistDuration += durationById(player.playlists[i].songs[j]);
             } 
         return (playlistDuration); 
         }
     }  
 }                      
 
//  const headerSongss = createElement("div", ["Songs:"], ["header"]);
//  document.body.prepend(headerSongss);
 
 const headerr = createElement("div", ["MP3 Player"], ["headerMain"]);
 document.body.prepend(headerr);
 
//  const headerPlaylist = createElement("div", ["Playlists: "], ["header"]);
//  playlists.before(headerPlaylist);