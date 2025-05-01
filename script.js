
const puzzles = [
  {
    scrambled: "Oily Hand Nods",
    answer: "Hall & Oates",
    prompt: "Unscramble this classic rock band name:",
    hints: [
      "🎤 Artist or Band: Hall & Oates",
      "📆 Song Release Date Hint: 'Private Eyes' released on September 1, 1981",
      "🔎 Reveal the Band Name: Hall & Oates (Blue-eyed soul duo)"
    ]
  },
  {
    scrambled: "Deed Zep Llein",
    answer: "Led Zeppelin",
    prompt: "Unscramble this classic rock band name:",
    hints: [
      "🎤 Artist or Band: Led Zeppelin",
      "📆 Song Release Date Hint: 'Whole Lotta Love' released on November 7, 1969",
      "🔎 Reveal the Band Name: Led Zeppelin (British rock legends)"
    ]
  },
  {
    scrambled: "Queen",
    answer: "Queen",
    prompt: "Unscramble this classic rock band name:",
    hints: [
      "🎤 Artist or Band: Queen",
      "📆 Song Release Date Hint: 'Bohemian Rhapsody' released on October 31, 1975",
      "🔎 Reveal the Band Name: Queen (Freddie Mercury's band)"
    ]
  },
  {
    scrambled: "Eth Seabtel",
    answer: "The Beatles",
    prompt: "Unscramble this classic rock band name:",
    hints: [
      "🎤 Artist or Band: The Beatles",
      "📆 Song Release Date Hint: 'Hey Jude' released on August 26, 1968",
      "🔎 Reveal the Band Name: The Beatles (British Invasion icons)"
    ]
  },
  {
    scrambled: "Htoo Lleo",
    answer: "The Who",
    prompt: "Unscramble this classic rock band name:",
    hints: [
      "🎤 Artist or Band: The Who",
      "📆 Song Release Date Hint: 'Baba O'Riley' released in October 1971",
      "🔎 Reveal the Band Name: The Who (Famous for 'Tommy')"
    ]
  },
  {
    scrambled: "Kni Pldofy",
    answer: "Pink Floyd",
    prompt: "Unscramble this classic rock band name:",
    hints: [
      "🎤 Artist or Band: Pink Floyd",
      "📆 Song Release Date Hint: 'Comfortably Numb' released on November 30, 1979",
      "🔎 Reveal the Band Name: Pink Floyd (Psychedelic prog rock)"
    ]
  },
  {
    scrambled: "Stonier Rolgl",
    answer: "Rolling Stones",
    prompt: "Unscramble this classic rock band name:",
    hints: [
      "🎤 Artist or Band: Rolling Stones",
      "📆 Song Release Date Hint: 'Satisfaction' released on June 6, 1965",
      "🔎 Reveal the Band Name: Rolling Stones (Mick Jagger's band)"
    ]
  },
  {
    scrambled: "CDA C",
    answer: "AC DC",
    prompt: "Unscramble this classic rock band name:",
    hints: [
      "🎤 Artist or Band: AC/DC",
      "📆 Song Release Date Hint: 'Back in Black' released on July 25, 1980",
      "🔎 Reveal the Band Name: AC/DC (High voltage rockers)"
    ]
  },
  {
    scrambled: "Glaese",
    answer: "Eagles",
    prompt: "Unscramble this classic rock band name:",
    hints: [
      "🎤 Artist or Band: Eagles",
      "📆 Song Release Date Hint: 'Hotel California' released on December 8, 1976",
      "🔎 Reveal the Band Name: Eagles (Famous California rock band)"
    ]
  },
  {
    scrambled: "Kssis",
    answer: "Kiss",
    prompt: "Unscramble this classic rock band name:",
    hints: [
      "🎤 Artist or Band: Kiss",
      "📆 Song Release Date Hint: 'Rock and Roll All Nite' released in 1975",
      "🔎 Reveal the Band Name: Kiss (Face-paint and fireworks)"
    ]
  }
];



function submitGuess() {
  const userGuess = document.getElementById("guess").value.trim().toLowerCase();
  const correctAnswer = puzzles[currentPuzzleIndex].answer.toLowerCase();
  attempts++;

  if (userGuess === correctAnswer) {
    let earned = attempts === 1 ? 3 : (attempts === 2 ? 2 : 1);
    points += earned;
    document.getElementById("feedback").innerText = `✅ Correct! +${earned} points.`;
    document.getElementById("score").innerText = `Points: ${points}`;
    launchConfetti();

    // Disable input while waiting
    document.getElementById("guess").disabled = true;

    setTimeout(() => {
      currentPuzzleIndex++;
      if (currentPuzzleIndex < puzzles.length) {
        updatePuzzle();
        document.getElementById("guess").disabled = false;
      } else {
        document.getElementById("puzzle-number").innerText = "🎉 Game Over 🎉";
        document.getElementById("puzzle-prompt").innerText = "";
        document.getElementById("puzzle-text").innerText = "";
        document.getElementById("feedback").innerText = "You've completed all the rocknonyms!";
        document.getElementById("guess").style.display = "none";
      }
    }, 2000);
  } else {
    document.getElementById("feedback").innerText = `❌ Not quite. Try again!`;
  }

  document.getElementById("guess").value = "";
}



function launchConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

function requestHint() {
  const puzzle = puzzles[currentPuzzleIndex];
  const cost = [3, 2, 5][hintsUsed];
  if (hintsUsed < 3 && points >= cost) {
    points -= cost;
    document.getElementById("hint").innerHTML += `<p>${puzzle.hints[hintsUsed]}</p>`;
    document.getElementById("score").innerText = `Points: ${points}`;
    hintsUsed++;
  } else {
    document.getElementById("hint").innerHTML = `<p>❗ Not enough points or all hints used!</p>`;
  }
}

function updatePuzzle() {
  const puzzle = puzzles[currentPuzzleIndex];
  document.getElementById("puzzle-number").innerText = `🤘 ROCKNONYM #${currentPuzzleIndex + 1} 🤘`;
  document.getElementById("puzzle-prompt").innerText = `🧩 ${puzzle.prompt}`;
  document.getElementById("puzzle-text").innerText = `"${puzzle.scrambled}"`;
  document.getElementById("feedback").innerText = "";
  document.getElementById("hint").innerText = "";
  document.getElementById("guess").value = "";
  document.getElementById("guess").disabled = false;
  attempts = 0;
  hintsUsed = 0;
}

window.onload = () => {
  updatePuzzle();
};
