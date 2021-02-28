//create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination();
let randomPlay = false;
let randomPlayInterval = null;
let recordingSong = false;
let recordedSong = [];
let playingRecordedSong = false;

const buttonForNote = {
    "A4": "note1",
    "B4": "note2",
    "C4": "note3",
    "D4": "note4",
    "E4": "note5",
    "F4": "note6",
    "G4": "note7"
}
const colorForNote = {
    "A4": "red",
    "B4": "yellow",
    "C4": "green",
    "D4": "blue",
    "E4": "pink",
    "F4": "purple",
    "G4": "orange"
}

const playNote = (note) => {
    if (recordingSong && !randomPlay) {
        recordedSong.push(note);
    }
    synth.triggerAttackRelease(note, "8n");
    document.getElementById(buttonForNote[note]).style.backgroundColor = colorForNote[note];
    setTimeout(() => document.getElementById(buttonForNote[note]).style.backgroundColor = '', 100);
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case '1':
            playNote("A4");
            break;
        case '2':
            playNote("B4");
            break;
        case '3':
            playNote("C4");
            break;
        case '4':
            playNote("D4");
            break;
        case '5':
            playNote("E4");
            break;
        case '6':
            playNote("F4");
            break;
        case '7':
            playNote("G4");
            break;
    }
})

const notes = ["A4", "B4", "C4", "D4", "E4", "F4", "G4"];

const play = () => {
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    playNote(randomNote);
}

const playRandom = (event) => {
    if (randomPlay) {
        randomPlay = false;
        event.currentTarget.classList.add('fa-play');
        event.currentTarget.classList.remove('fa-pause');
        clearInterval(randomPlayInterval);
    } else {
        randomPlay = true;
        event.currentTarget.classList.remove('fa-play');
        event.currentTarget.classList.add('fa-pause');
        randomPlayInterval = setInterval(play, 500);
    }
}

const recordSong = (event) => {
    if (recordingSong) {
        recordingSong = false;
        event.currentTarget.classList.add('fa-play');
        event.currentTarget.classList.remove('fa-stop');
        
    } else {
        recordedSong = [];
        recordingSong = true;
        event.currentTarget.classList.remove('fa-play');
        event.currentTarget.classList.add('fa-stop');
    }
}

const playRecord = (event) => {
    if (recordedSong.length === 0 || playingRecordedSong || recordingSong) {
        return;
    }
    playingRecordedSong = true;
    const btn = event.currentTarget;
    event.currentTarget.classList.remove('fa-play');
    event.currentTarget.classList.add('fa-spinner', 'fa-spin');
    recordedSong.forEach((note, index) => {
        setTimeout(
            () => {
                playNote(note);
                if (index == recordedSong.length - 1) {
                    playingRecordedSong = false;
                    btn.classList.add('fa-play');
                    btn.classList.remove('fa-spinner', 'fa-spin');
                }
            },
            index * 500
        );
    })
}

document.getElementById('random-play').addEventListener('click', playRandom);
document.getElementById('record-song').addEventListener('click', recordSong);
document.getElementById('record-play').addEventListener('click', playRecord);
