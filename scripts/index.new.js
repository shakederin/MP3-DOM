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
            if (deletedId.indexOf(song.id) < 0 ){
            createSongElement(song);
            }
        }
    }
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
          "duration" : durationToSeconds(duration),
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

// Making the add-song-button actually do something
function collectInfo (){
    let songInfo = [] ;
    let inputForm = document.getElementById("inputs");
        for ( i= 0 ; i < inputForm.length ; i++){
          songInfo.push(inputForm.elements[i].value);
        }    
    addSong(songInfo[0], songInfo[1],songInfo[2],songInfo[3],songInfo[4]);
    // clear the songs
    document.getElementById("songs").innerHTML = '';
    // sort the with the new song
    sortSongsByTitle();
    // load the songs again
   for ( const song of sortedSongs){
          createSongElement(song);
    }
}

let action = document.getElementById("add-button");
action.addEventListener("click", collectInfo);

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
        
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton", "controllButton");
        deleteButton.innerText = "X"; 
        deleteButton.onclick =  function() {deteleSongButton(id)};
        const playButton = document.createElement("button");
        playButton.innerText = "|>"; 
        playButton.classList.add("playButton", "controllButton");
        playButton.onclick =  function() {playSong(id)};

        songEle.prepend(imgEl);
        songEle.append(deleteButton);
        songEle.append(playButton);
        songEle.append(durationEl);
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
    const playlistLegnth = createElement("span", [" " + songs.length +" songs"]);
    playlistList.append(playlistEl);
    playlistList.append(playlistLegnth);
    playlistList.append( playlistDuration);
    playlistt.append(playlistList);
}

/**
 * Creates a new DOM element.
 *
*/
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
    const el = document.createElement(tagName);
    for ( let child of children){
        if (typeof child === "string"){
           child = document.createTextNode(child);
        }
        el.append(child);
    }
    for ( const clas of classes){
        el.classList.add(clas);
    }
    for ( const attr in attributes){
        el.setAttribute(attr, attributes[attr])
    };
        return el;
}

let sortedSongs ;
sortSongsByTitle();
function sortSongsByTitle (){
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
    }

for ( const song of sortedSongs){
      createSongElement(song);
 }
 let sortedPlaylists ;
 sortedPlaylists = player.playlists.sort(function (a, b) {
       let nameA = a.name
       let nameB = b.name
         if (nameA < nameB) {
         return -1;
         }
         if (nameA < nameB) {
         return 1;
         }
     })
 for ( const playlist of sortedPlaylists){
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
 
const inputsPlace = document.getElementById("inputs")
const headerSongss = createElement("div", ["Songs:"], ["header"]);
document.body.prepend(headerSongss);
const headerr = createElement("div", ["MP3 Player"], ["headerMain"]);
document.body.prepend(headerr);

const deletedId = [];
function deteleSongButton(id){
    document.getElementById("songs").innerHTML = '';
    deletedId.push(id);
    for ( const song of sortedSongs){
            if (deletedId.indexOf(song.id) < 0){
                createSongElement(song);
            }  
        }
    document.getElementById("playlists").innerHTML = '';
    for ( const playlist of sortedPlaylists){
         playlist.songs.splice([playlist.songs.indexOf(id)],1) ; 
              createPlaylistElement(playlist)
    }    
}
