const pages = {
  login: document.getElementById('loginPage'),
  signup: document.getElementById('signupPage'),
  home: document.getElementById('homePage'),
  game: document.getElementById('gamePage'),
  tutorial: document.getElementById('tutorialPage'),
  stats: document.getElementById('statsPage'),
};

const loginButton = document.getElementById('loginButton');
const signupButton = document.getElementById('signupButton');
const showSignupBtn = document.getElementById('showSignupBtn');
const showLoginBtn = document.getElementById('showLoginBtn');
const logoutButton = document.getElementById('logoutButton');
const showTutorialBtn = document.getElementById('showTutorialBtn');
const showStatsBtn = document.getElementById('showStatsBtn');
const tutorialBackBtn = document.getElementById('tutorialBackBtn');
const statsBackBtn = document.getElementById('statsBackBtn');
const joinGameBtn = document.getElementById('joinGameBtn');
const createCodeBtn = document.getElementById('createCodeBtn');
const quickMatchBtn = document.getElementById('quickMatchBtn');
const leaveGameBtn = document.getElementById('leaveGameBtn');
const restartGameBtn = document.getElementById('restartGameBtn');
const backHomeBtn = document.getElementById('backHomeBtn');

const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginPasswordToggle = document.getElementById('loginPasswordToggle');
const signupName = document.getElementById('signupName');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const signupPasswordToggle = document.getElementById('signupPasswordToggle');
const signupCountry = document.getElementById('signupCountry');
const passwordHint = document.getElementById('passwordHint');
const hintLength = document.getElementById('hintLength');
const hintUpper = document.getElementById('hintUpper');
const hintNumber = document.getElementById('hintNumber');
const hintSpecial = document.getElementById('hintSpecial');
const profileName = document.getElementById('profileName');
const profileCountry = document.getElementById('profileCountry');
const gameCodeInput = document.getElementById('gameCodeInput');
const activeGameCode = document.getElementById('activeGameCode');
const gameModeLabel = document.getElementById('gameModeLabel');
const playerNameDisplay = document.getElementById('playerNameDisplay');
const playerCountryDisplay = document.getElementById('playerCountryDisplay');
const opponentNameDisplay = document.getElementById('opponentNameDisplay');
const opponentCountryDisplay = document.getElementById('opponentCountryDisplay');
const botVoiceCard = document.querySelector('.bot-voice-card');
const botVoiceName = document.getElementById('botVoiceName');
const botVoiceText = document.getElementById('botVoiceText');
const opponentAvatar = document.getElementById('opponentAvatar');
const selectedBotPreview = document.getElementById('selectedBotPreview');
const selectedBotAvatar = document.getElementById('selectedBotAvatar');
const selectedBotName = document.getElementById('selectedBotName');
const selectedBotRank = document.getElementById('selectedBotRank');
const homeBotAvatar = document.getElementById('homeBotAvatar');
const homeBotName = document.getElementById('homeBotName');
const homeBotRank = document.getElementById('homeBotRank');
const currentPlayerElement = document.getElementById('currentPlayer');
const gameStatusElement = document.getElementById('gameStatus');
const playerTimerElement = document.getElementById('playerTimer');
const opponentTimerElement = document.getElementById('opponentTimer');
const totalGamesElement = document.getElementById('totalGames');
const totalWinsElement = document.getElementById('totalWins');
const totalLossesElement = document.getElementById('totalLosses');
const totalDrawsElement = document.getElementById('totalDraws');
const winPercentageElement = document.getElementById('winPercentage');
const currentStreakElement = document.getElementById('currentStreak');
const botGrid = document.getElementById('botGrid');
const botMuteBtn = document.getElementById('botMuteBtn');
const musicToggleBtn = document.getElementById('musicToggleBtn');
const resultModal = document.getElementById('resultModal');
const resultModalTitle = document.getElementById('resultModalTitle');
const resultModalMessage = document.getElementById('resultModalMessage');
const modalPlayAgainBtn = document.getElementById('modalPlayAgainBtn');
const modalHomeBtn = document.getElementById('modalHomeBtn');
const modalLogoutBtn = document.getElementById('modalLogoutBtn');
const cells = document.querySelectorAll('.cell');

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let boardState = Array(9).fill('');
let activePlayer = 'X';
let gameActive = true;
let activeProfile = null;
let activeGame = null;
let selectedBot = null;
let playerTimer = 60;
let opponentTimer = 60;
let timerInterval = null;
let botMuted = false;

const bots = [
  { name: 'Pixel Pup', country: 'Sweden', greeting: 'Hej', rank: 'Novice', difficulty: 'novice', color: '#6d28d9', gender: 'female', accent: 'en-GB' },
  { name: 'Robo Rook', country: 'Finland', greeting: 'Moi', rank: 'Novice', difficulty: 'novice', color: '#0ea5e9', gender: 'male', accent: 'en-GB' },
  { name: 'Circuit Queen', country: 'Japan', greeting: 'Konnichiwa', rank: 'Intermediate', difficulty: 'intermediate', color: '#fb7185', gender: 'female', accent: 'en-AU' },
  { name: 'Neon Knight', country: 'Canada', greeting: 'Hello', rank: 'Intermediate', difficulty: 'intermediate', color: '#22c55e', gender: 'male', accent: 'en-CA' },
  { name: 'Alpha Bishop', country: 'Germany', greeting: 'Hallo', rank: 'Intermediate', difficulty: 'intermediate', color: '#f59e0b', gender: 'male', accent: 'en-GB' },
  { name: 'Cyber Ruler', country: 'Australia', greeting: 'G’day', rank: 'Intermediate', difficulty: 'intermediate', color: '#a855f7', gender: 'female', accent: 'en-AU' },
  { name: 'Grandmaster Glitch', country: 'Russia', greeting: 'Privet', rank: 'Grandmaster', difficulty: 'hard', color: '#ef4444', gender: 'male', accent: 'en-GB' },
  { name: 'Zen Matrix', country: 'South Korea', greeting: 'Annyeong', rank: 'Grandmaster', difficulty: 'hard', color: '#14b8a6', gender: 'female', accent: 'en-US' },
];

selectedBot = bots[0];

const botTalk = {
  novice: {
    intro: [
      'Easy win incoming — don’t blink!',
      'I hope you brought a challenge, because I am not slowing down.',
    ],
    move: [
      'Try to keep up.',
      'This is getting too easy.',
      'Better make your move before I finish this.',
    ],
    win: [
      'Told you I was too strong.',
      'Victory feels good. Want a rematch?',
    ],
    loss: [
      'No way... I demand a rematch!',
      'Lucky move, but I’ll win next time.',
    ],
    draw: [
      'A draw? Hmph. I was winning.',
      'This was almost too easy. Let’s play again.',
    ],
  },
  intermediate: {
    intro: [
      'Good move. Let’s keep this competitive.',
      'I enjoy a fair match — may the best player win.',
    ],
    move: [
      'Nice choice, I’ll respond carefully.',
      'Let’s see how this plays out.',
      'Thoughtful move. I’m staying focused.',
    ],
    win: [
      'Well played. That round went my way.',
      'A solid game. I appreciate the challenge.',
    ],
    loss: [
      'That was a great move. Congratulations.',
      'You earned that win. I’ll learn from it.',
    ],
    draw: [
      'A fair result. Well played.',
      'We both fought hard for that draw.',
    ],
  },
  hard: {
    intro: [
      'I’m here to play smart and stay humble.',
      'Let’s have a strong game. I’ll respect your best moves.',
    ],
    move: [
      'Your move was thoughtful. I’ll answer calmly.',
      'I’m focused on the board, not the noise.',
      'That was a strong play. I’ll stay composed.',
    ],
    win: [
      'Well done. A strong opponent makes this meaningful.',
      'Thank you for a great match. It was earned.',
    ],
    loss: [
      'A well-deserved victory for you. Congratulations.',
      'You played beautifully. I’ll study this game.',
    ],
    draw: [
      'A balanced game. Respect.',
      'A draw feels fair. Let’s play again sometime.',
    ],
  },
};

const botSpeechMemory = {};
const botVoiceConfig = {};
let musicEnabled = true;
let audioContext = null;
let musicGain = null;
let musicTimer = null;
let musicOscillator = null;

function getBotPhrase(bot, category) {
  const profile = botTalk[bot.difficulty] || botTalk.intermediate;
  let options = profile[category] || [];
  if (!options.length) return '';

  if (category === 'intro' && bot.greeting) {
    options = options.map(phrase => `${bot.greeting}! ${phrase}`.trim());
  }

  const memoryKey = `${bot.name}:${category}`;
  const lastPhrase = botSpeechMemory[memoryKey];
  const candidates = options.filter(phrase => phrase !== lastPhrase);
  const choice = candidates.length ? candidates[Math.floor(Math.random() * candidates.length)] : options[Math.floor(Math.random() * options.length)];
  botSpeechMemory[memoryKey] = choice;
  return choice;
}

function updateBotVoice(bot, category) {
  if (!botVoiceCard) return;
  botVoiceName.textContent = bot.name;
  botVoiceText.textContent = getBotPhrase(bot, category);
  if (!botMuted) {
    speakBotLine(bot, botVoiceText.textContent);
  }
}

function chooseVoiceByGender(voices, gender, locale) {
  const normalizedLocale = (locale || 'en-US').toLowerCase();
  let voicePool = voices.filter(v => v.lang.toLowerCase().startsWith(normalizedLocale));
  if (!voicePool.length) {
    voicePool = voices.filter(v => /^en(?:-|$)/i.test(v.lang));
  }
  if (!voicePool.length) {
    voicePool = voices;
  }

  const humanFilter = voicePool.filter(v => !/robot|synth|narrator|whisper|alloy|amazon|google|stream/i.test((v.name + ' ' + (v.voiceURI || '')).toLowerCase()));
  const source = humanFilter.length ? humanFilter : voicePool;

  const genderHints = gender === 'female'
    ? ['female', 'woman', 'girl', 'samantha', 'amelia', 'zoe', 'linda', 'ivy', 'victoria']
    : ['male', 'man', 'boy', 'alex', 'michael', 'david', 'john', 'matthew', 'daniel', 'liam'];

  const matched = source.filter(v =>
    genderHints.some(hint => v.name.toLowerCase().includes(hint) || (v.voiceURI || '').toLowerCase().includes(hint))
  );

  if (matched.length) {
    return matched[Math.floor(Math.random() * matched.length)];
  }

  return source.length ? source[Math.floor(Math.random() * source.length)] : null;
}

function getVoiceConfig(bot) {
  if (botVoiceConfig[bot.name]) return botVoiceConfig[bot.name];
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;

  const voices = window.speechSynthesis.getVoices() || [];
  if (!voices.length && typeof window !== 'undefined') {
    window.speechSynthesis.onvoiceschanged = () => {
      Object.keys(botVoiceConfig).forEach(key => delete botVoiceConfig[key]);
      getVoiceConfig(bot);
    };
  }
  if (!voices.length) {
    window.speechSynthesis.getVoices();
  }

  const locale = bot.accent || 'en-US';
  const voice = chooseVoiceByGender(voices, bot.gender, locale);
  const settings = getVoiceSettings(bot);
  const config = { voice, rate: settings.rate, pitch: settings.pitch };
  if (voice) {
    botVoiceConfig[bot.name] = config;
  }
  return config;
}

function ensureSpeechVoicesLoaded() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  const voices = window.speechSynthesis.getVoices() || [];
  if (voices.length) return;
  window.speechSynthesis.onvoiceschanged = () => {
    const bot = activeGame?.opponentBot || selectedBot;
    if (bot) {
      Object.keys(botVoiceConfig).forEach(key => delete botVoiceConfig[key]);
      updateBotVoice(bot, 'intro');
    }
  };
  window.speechSynthesis.getVoices();
}

function getVoiceSettings(bot) {
  const difficulty = bot.difficulty;
  if (difficulty === 'novice') {
    return { rate: 1.0, pitch: 1.05 };
  }
  if (difficulty === 'intermediate') {
    return { rate: 0.98, pitch: 1.0 };
  }
  return { rate: 0.95, pitch: 0.95 };
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createGameMusic() {
  if (typeof window === 'undefined' || !window.AudioContext) return;
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    musicGain = audioContext.createGain();
    musicGain.gain.value = 1.0;
    musicGain.connect(audioContext.destination);
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  const droneOsc = audioContext.createOscillator();
  const padOsc = audioContext.createOscillator();
  const bellOsc = audioContext.createOscillator();
  const bellOsc2 = audioContext.createOscillator();
  const droneGain = audioContext.createGain();
  const padGain = audioContext.createGain();
  const bellGain = audioContext.createGain();
  const delay = audioContext.createDelay();
  const feedback = audioContext.createGain();

  droneOsc.type = 'sine';
  padOsc.type = 'triangle';
  bellOsc.type = 'triangle';
  bellOsc2.type = 'sine';

  bellOsc2.detune.value = 20;
  padOsc.detune.value = -8;

  droneGain.gain.value = 0.18;
  padGain.gain.value = 0.34;
  bellGain.gain.value = 0.8;
  feedback.gain.value = 0.18;
  delay.delayTime.value = 0.3;

  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(musicGain);

  droneOsc.connect(droneGain);
  padOsc.connect(padGain);
  bellOsc.connect(bellGain);
  bellOsc2.connect(bellGain);
  droneGain.connect(musicGain);
  padGain.connect(musicGain);
  bellGain.connect(delay);

  const bellDirectGain = audioContext.createGain();
  bellDirectGain.gain.value = 0.45;
  bellOsc.connect(bellDirectGain);
  bellOsc2.connect(bellDirectGain);
  bellDirectGain.connect(musicGain);

  droneOsc.start();
  padOsc.start();
  bellOsc.start();
  bellOsc2.start();

  const chordProgression = [
    [110, 138.59, 165.41],
    [98, 123.47, 146.83],
    [103.83, 130.81, 155.56],
    [92.5, 110, 138.59],
  ];
  const melodySequence = [0, 1, 2, 1, 0, 1, 3, 2];
  const noteOffsets = [0, 2, 4, 5, 7, 9, 11, 12];
  let chordIndex = 0;
  let melodyIndex = 0;

  musicTimer = setInterval(() => {
    if (!musicEnabled) return;
    const chord = chordProgression[chordIndex % chordProgression.length];
    const root = chord[0];
    const offset = noteOffsets[melodySequence[melodyIndex % melodySequence.length]];
    const melodyNote = root * Math.pow(2, offset / 12);

    droneOsc.frequency.setValueAtTime(chord[0], audioContext.currentTime);
    padOsc.frequency.setValueAtTime(chord[1], audioContext.currentTime);
    bellOsc.frequency.setValueAtTime(melodyNote, audioContext.currentTime);
    bellOsc2.frequency.setValueAtTime(melodyNote * 1.01, audioContext.currentTime);

    const now = audioContext.currentTime;
    bellGain.gain.cancelScheduledValues(now);
    bellGain.gain.setValueAtTime(0, now);
  bellGain.gain.linearRampToValueAtTime(0.35, now + 0.02);
  bellGain.gain.exponentialRampToValueAtTime(0.005, now + 0.45);
    feedback.gain.setValueAtTime(0.20 + Math.sin(melodyIndex / 4) * 0.03, now);

    melodyIndex += 1;
    if (melodyIndex % melodySequence.length === 0) chordIndex += 1;
  }, 700);

  return { droneOsc, padOsc, bellOsc, bellOsc2 };
}

function stopGameMusic(oscillatorPair) {
  if (!audioContext || !oscillatorPair) return;
  if (oscillatorPair.droneOsc) {
    oscillatorPair.droneOsc.stop();
  }
  if (oscillatorPair.padOsc) {
    oscillatorPair.padOsc.stop();
  }
  if (oscillatorPair.bellOsc) {
    oscillatorPair.bellOsc.stop();
  }
  if (oscillatorPair.bellOsc2) {
    oscillatorPair.bellOsc2.stop();
  }
  clearInterval(musicTimer);
  musicTimer = null;
  musicOscillator = null;
}

function setMusicEnabled(enabled) {
  musicEnabled = enabled;
  if (musicToggleBtn) {
    musicToggleBtn.textContent = musicEnabled ? 'Music Off' : 'Music On';
  }

  if (!musicEnabled) {
    if (audioContext) {
      audioContext.suspend();
    }
    if (musicOscillator) {
      stopGameMusic(musicOscillator);
    }
    return;
  }

  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }

  if (activeGame && activeGame.mode === 'bot' && !musicOscillator) {
    musicOscillator = createGameMusic();
  }
}

function getVoiceForBot(bot) {
  const config = getVoiceConfig(bot);
  return config ? config.voice : null;
}

function speakBotLine(bot, text) {
  if (botMuted || typeof window === 'undefined' || !window.speechSynthesis || !text) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  ensureSpeechVoicesLoaded();
  const voice = getVoiceForBot(bot);
  const settings = getVoiceSettings(bot);
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;
  utterance.volume = 1;
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang || bot.accent || 'en-US';
  } else {
    const fallbackVoices = window.speechSynthesis.getVoices() || [];
    if (fallbackVoices.length) {
      utterance.voice = fallbackVoices[0];
      utterance.lang = utterance.voice.lang || bot.accent || 'en-US';
    } else {
      utterance.lang = bot.accent || 'en-US';
    }
  }
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }
  window.speechSynthesis.speak(utterance);
}

function toggleBotMute() {
  botMuted = !botMuted;
  if (botMuteBtn) {
    botMuteBtn.textContent = botMuted ? 'Unmute' : 'Mute';
  }
  if (botMuted && typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

function showPage(page) {
  Object.values(pages).forEach(section => section.classList.add('hidden'));
  page.classList.remove('hidden');
}

function saveProfile(profile) {
  localStorage.setItem('tic_tac_toe_profile_' + profile.email, JSON.stringify(profile));
}

function loadProfile(email) {
  const stored = localStorage.getItem('tic_tac_toe_profile_' + email);
  return stored ? JSON.parse(stored) : null;
}

function saveActiveProfile(email) {
  localStorage.setItem('tic_tac_toe_active', email);
}

function loadActiveProfile() {
  const email = localStorage.getItem('tic_tac_toe_active');
  return email ? loadProfile(email) : null;
}

function updateProfileUI() {
  profileName.textContent = activeProfile.username;
  profileCountry.textContent = activeProfile.country;
}

function updateStatsUI() {
  const stats = activeProfile.stats;
  totalGamesElement.textContent = stats.totalGames;
  totalWinsElement.textContent = stats.wins;
  totalLossesElement.textContent = stats.losses;
  totalDrawsElement.textContent = stats.draws;
  winPercentageElement.textContent = stats.totalGames ? Math.round((stats.wins / stats.totalGames) * 100) + '%' : '0%';
  currentStreakElement.textContent = stats.currentStreak;
}

function createRandomGameCode() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

function resetBoard() {
  boardState = Array(9).fill('');
  gameActive = true;
  activePlayer = 'X';
  playerTimer = 60;
  opponentTimer = 60;
  updateBoardUI();
  updateCurrentPlayer();
  updateStatus('Make your move');
  resetTimers();
  startTimers();
}

function updateBoardUI() {
  cells.forEach(cell => {
    const index = Number(cell.dataset.index);
    cell.textContent = boardState[index];
    cell.disabled = !gameActive || boardState[index] !== '';
    cell.style.background = '';
  });
}

function updateStatus(message) {
  gameStatusElement.textContent = message;
}

function updateCurrentPlayer() {
  currentPlayerElement.textContent = activePlayer;
}

function updateTimersUI() {
  playerTimerElement.textContent = `${playerTimer}s`;
  opponentTimerElement.textContent = `${opponentTimer}s`;
}

function buildBotAvatar(name, color, gender = 'neutral') {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('');

  const hair = {
    male: `<path d='M70 80 q60 -40 120 0 q-10 -30 -70 -30 q-50 0 -55 30' fill='#ffffff' opacity='0.9'/>`,
    female: `<path d='M70 80 q80 -60 120 0 q-20 -80 -60 -80 q-70 0 -80 80' fill='#ffffff' opacity='0.9'/>`,
    neutral: `<path d='M70 80 q60 -40 120 0 q-40 -50 -80 -50 q-50 0 -60 50' fill='#ffffff' opacity='0.9'/>`,
  };

  const accessory = gender === 'female'
    ? `<circle cx='75' cy='95' r='10' fill='#ffffff' opacity='0.25' />`
    : gender === 'male'
    ? `<rect x='70' y='90' width='20' height='8' rx='4' fill='#ffffff' opacity='0.25' />`
    : '';

  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='260' height='260' viewBox='0 0 260 260'>
      <defs>
        <linearGradient id='bgGrad' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='${color}' />
          <stop offset='100%' stop-color='#1e293b' />
        </linearGradient>
      </defs>
      <rect width='260' height='260' rx='32' fill='url(#bgGrad)' />
      <circle cx='130' cy='120' r='58' fill='#fff' opacity='0.14' />
      <circle cx='130' cy='130' r='52' fill='#f8fafc' />
      ${hair[gender] || hair.neutral}
      ${accessory}
      <circle cx='110' cy='130' r='8' fill='#111827' />
      <circle cx='150' cy='130' r='8' fill='#111827' />
      <path d='M110 160 q20 18 40 0' stroke='#111827' stroke-width='6' fill='none' stroke-linecap='round' />
      <text x='50%' y='226' dominant-baseline='middle' text-anchor='middle' font-family='Inter, sans-serif' font-size='40' fill='#fff' font-weight='800'>${initials}</text>
    </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

selectedBot = bots[0];

function renderBotGrid() {
  botGrid.innerHTML = '';
  bots.forEach((bot, index) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'bot-card';
    card.dataset.botIndex = index;
    card.innerHTML = `
      <img src="${buildBotAvatar(bot.name, bot.color, bot.gender)}" alt="${bot.name} avatar" />
      <div class="bot-name">${bot.name}</div>
      <div class="bot-meta">${bot.country}</div>
      <div class="bot-rank">${bot.rank}</div>
    `;
    card.addEventListener('click', () => selectBot(index));
    botGrid.appendChild(card);
  });
}

function selectBot(index) {
  selectedBot = bots[index];
  document.querySelectorAll('.bot-card').forEach(card => card.classList.remove('selected'));
  const selectedCard = botGrid.querySelector(`.bot-card[data-bot-index="${index}"]`);
  if (selectedCard) {
    selectedCard.classList.add('selected');
  }
  updateSelectedBotPreview();
}

function updateSelectedBotPreview() {
  if (!selectedBotPreview) return;
  if (!selectedBot) {
    selectedBotAvatar.src = '';
    selectedBotAvatar.alt = 'No bot selected';
    selectedBotName.textContent = 'Choose a bot';
    selectedBotRank.textContent = 'Tap any bot to preview';
    if (homeBotAvatar) {
      homeBotAvatar.src = '';
      homeBotAvatar.alt = 'No bot selected';
      homeBotName.textContent = 'Bot preview';
      homeBotRank.textContent = 'Select a bot to preview';
    }
    return;
  }

  const avatarSrc = buildBotAvatar(selectedBot.name, selectedBot.color, selectedBot.gender);
  selectedBotAvatar.src = avatarSrc;
  selectedBotAvatar.alt = `${selectedBot.name} avatar`;
  selectedBotName.textContent = selectedBot.name;
  selectedBotRank.textContent = selectedBot.rank;
  if (homeBotAvatar) {
    homeBotAvatar.src = avatarSrc;
    homeBotAvatar.alt = `${selectedBot.name} avatar`;
    homeBotName.textContent = selectedBot.name;
    homeBotRank.textContent = selectedBot.rank;
  }
}

// Ensure a default bot preview is shown when the app loads.
updateSelectedBotPreview();

function showResultModal(title, message) {
  resultModalTitle.textContent = title;
  resultModalMessage.textContent = message;
  resultModal.classList.remove('hidden');
}

function hideResultModal() {
  resultModal.classList.add('hidden');
}

function togglePasswordVisibility(input, button) {
  const visible = input.type === 'text';
  input.type = visible ? 'password' : 'text';
  button.textContent = visible ? '👁' : '🙈';
  button.setAttribute('aria-label', visible ? 'Show password' : 'Hide password');
}

function isPasswordStrong(password) {
  const lengthValid = password.length >= 8;
  const upperLowerValid = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const numberValid = /\d/.test(password);
  const specialValid = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  return lengthValid && upperLowerValid && numberValid && specialValid;
}

function validatePasswordHints(password) {
  const checks = [
    { element: hintLength, valid: password.length >= 8 },
    { element: hintUpper, valid: /[a-z]/.test(password) && /[A-Z]/.test(password) },
    { element: hintNumber, valid: /\d/.test(password) },
    { element: hintSpecial, valid: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) },
  ];

  checks.forEach(check => {
    check.element.classList.toggle('valid', check.valid);
    check.element.classList.toggle('invalid', !check.valid);
  });
}

function getOpponentInfo(code) {
  const stored = localStorage.getItem('tic_tac_toe_room_' + code);
  return stored ? JSON.parse(stored) : null;
}

function storeGameRoom(code, room) {
  localStorage.setItem('tic_tac_toe_room_' + code, JSON.stringify(room));
}

function joinGame(code) {
  const normalizedCode = code.trim();
  if (!/^[0-9]{4}$/.test(normalizedCode)) {
    alert('Enter a valid 4-digit game code.');
    return;
  }

  let room = getOpponentInfo(normalizedCode);
  const isMatched = room && !room.playerTwo;

  if (!room) {
    room = {
      code: normalizedCode,
      playerOne: activeProfile.email,
      playerTwo: null,
      createdAt: Date.now(),
    };
    storeGameRoom(normalizedCode, room);
    startGame(normalizedCode, 'bot', selectedBot || bots[2]);
    return;
  }

  if (isMatched) {
    room.playerTwo = activeProfile.email;
    storeGameRoom(normalizedCode, room);
    startGame(normalizedCode, 'player');
    return;
  }

  startGame(normalizedCode, 'bot');
}

function startGame(code, mode, bot = null) {
  activeGame = {
    code,
    mode,
    opponentEmail: null,
    opponentBot: bot || (activeGame && activeGame.opponentBot) || null,
  };

  activeGameCode.textContent = code;

  if (mode === 'player') {
    const room = getOpponentInfo(code);
    activeGame.opponentEmail = room.playerOne === activeProfile.email ? room.playerTwo : room.playerOne;
    const opponentProfile = loadProfile(activeGame.opponentEmail);
    opponentNameDisplay.textContent = opponentProfile.username;
    opponentCountryDisplay.textContent = opponentProfile.country;
    gameModeLabel.textContent = 'Mode: Player vs Player';
    botVoiceCard?.classList.add('hidden');
    if (opponentAvatar) {
      opponentAvatar.src = '';
      opponentAvatar.alt = 'Opponent avatar';
    }
  } else {
    if (musicOscillator) {
      stopGameMusic(musicOscillator);
    }
    const bot = activeGame.opponentBot || bots[2];
    opponentNameDisplay.textContent = bot.name;
    opponentCountryDisplay.textContent = bot.country;
    gameModeLabel.textContent = `Mode: Player vs ${bot.rank}`;
    botVoiceCard?.classList.remove('hidden');
    if (opponentAvatar) {
      opponentAvatar.src = buildBotAvatar(bot.name, bot.color, bot.gender);
      opponentAvatar.alt = `${bot.name} avatar`;
    }
    updateBotVoice(bot, 'intro');
    if (musicEnabled) {
      musicOscillator = createGameMusic();
    }
  }

  playerNameDisplay.textContent = activeProfile.username;
  playerCountryDisplay.textContent = activeProfile.country;
  resetBoard();
  showPage(pages.game);
}

function handleGameOver(result) {
  gameActive = false;
  clearInterval(timerInterval);
  let title = '';
  let message = '';

  if (result === 'userWin') {
    updateStatus('You win!');
    activeProfile.stats.wins += 1;
    activeProfile.stats.currentStreak += 1;
    title = 'Victory!';
    message = 'You outplayed the opponent. Great job!';
  } else if (result === 'userLoss') {
    updateStatus('You lose!');
    activeProfile.stats.losses += 1;
    activeProfile.stats.currentStreak = 0;
    title = 'Defeat';
    message = 'The opponent won this round. Try again!';
  } else {
    updateStatus('Draw!');
    activeProfile.stats.draws += 1;
    activeProfile.stats.currentStreak = 0;
    title = 'Draw';
    message = 'The match ended in a tie. Rematch?';
  }

  activeProfile.stats.totalGames += 1;
  saveProfile(activeProfile);
  updateStatsUI();
  showResultModal(title, message);
}

function checkForWinner() {
  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    const valueA = boardState[a];
    const valueB = boardState[b];
    const valueC = boardState[c];

    if (valueA && valueA === valueB && valueA === valueC) {
      highlightWinningCells(pattern);
      return true;
    }
  }
  return false;
}

function checkForDraw() {
  return boardState.every(cell => cell !== '');
}

function highlightWinningCells(pattern) {
  pattern.forEach(index => {
    const cell = cells[index];
    cell.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(37, 99, 235, 0.35))';
  });
}

function handleCellClick(event) {
  const clickedCell = event.target;
  const cellIndex = Number(clickedCell.dataset.index);

  if (boardState[cellIndex] || !gameActive) {
    return;
  }

  boardState[cellIndex] = activePlayer;
  clickedCell.textContent = activePlayer;
  clickedCell.disabled = true;

  if (checkForWinner()) {
    handleGameOver('userWin');
    return;
  }

  if (checkForDraw()) {
    handleGameOver('draw');
    return;
  }

  switchPlayer();

  if (activeGame.mode === 'bot' && activePlayer === 'O') {
    setTimeout(botMove, 700);
  }
}

function botMove() {
  if (!gameActive) return;
  const bot = activeGame.opponentBot || bots[2];
  const moveIndex = chooseBotMove(bot.difficulty);
  boardState[moveIndex] = activePlayer;
  const cell = document.querySelector(`.cell[data-index="${moveIndex}"]`);
  cell.textContent = activePlayer;
  cell.disabled = true;
  updateBotVoice(bot, 'move');

  if (checkForWinner()) {
    updateBotVoice(bot, 'win');
    handleGameOver('userLoss');
    return;
  }

  if (checkForDraw()) {
    updateBotVoice(bot, 'draw');
    handleGameOver('draw');
    return;
  }

  switchPlayer();
}

function chooseBotMove(difficulty) {
  if (difficulty === 'novice') {
    return chooseNoviceMove();
  }
  if (difficulty === 'intermediate') {
    return chooseIntermediateMove();
  }
  return chooseHardMove();
}

function chooseNoviceMove() {
  const empty = boardState.map((v, i) => (v === '' ? i : null)).filter(i => i !== null);
  if (Math.random() < 0.4) {
    return empty[Math.floor(Math.random() * empty.length)];
  }
  return chooseIntermediateMove();
}

function chooseIntermediateMove() {
  const winMove = findWinningMove('O');
  if (winMove !== null) return winMove;
  const blockMove = findWinningMove('X');
  if (blockMove !== null) return blockMove;
  const center = 4;
  if (boardState[center] === '') return center;
  const corners = [0, 2, 6, 8].filter(i => boardState[i] === '');
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
  const empty = boardState.map((v, i) => (v === '' ? i : null)).filter(i => i !== null);
  return empty[Math.floor(Math.random() * empty.length)];
}

function chooseHardMove() {
  const winning = findWinningMove('O');
  if (winning !== null) return winning;
  const blocking = findWinningMove('X');
  if (blocking !== null) return blocking;
  const forks = findForkMove('O');
  if (forks !== null) return forks;
  const blockFork = findForkMove('X');
  if (blockFork !== null) return blockFork;
  const center = 4;
  if (boardState[center] === '') return center;
  const opposite = findOppositeCorner();
  if (opposite !== null) return opposite;
  const emptyCorners = [0, 2, 6, 8].filter(i => boardState[i] === '');
  if (emptyCorners.length) return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
  return chooseIntermediateMove();
}

function findWinningMove(symbol) {
  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    const values = [boardState[a], boardState[b], boardState[c]];
    const countSymbol = values.filter(v => v === symbol).length;
    const countEmpty = values.filter(v => v === '').length;
    if (countSymbol === 2 && countEmpty === 1) {
      const emptyIndex = pattern.find(i => boardState[i] === '');
      return emptyIndex;
    }
  }
  return null;
}

function findForkMove(symbol) {
  const empty = boardState.map((v, i) => (v === '' ? i : null)).filter(i => i !== null);
  for (const index of empty) {
    const clone = [...boardState];
    clone[index] = symbol;
    const wins = winningPatterns.reduce((count, pattern) => {
      const values = [clone[pattern[0]], clone[pattern[1]], clone[pattern[2]]];
      return count + (values.filter(v => v === symbol).length === 2 && values.filter(v => v === '').length === 1 ? 1 : 0);
    }, 0);
    if (wins >= 2) return index;
  }
  return null;
}

function findOppositeCorner() {
  const oppositePairs = [[0, 8], [2, 6], [6, 2], [8, 0]];
  for (const [corner, opposite] of oppositePairs) {
    if (boardState[corner] === 'X' && boardState[opposite] === '') {
      return opposite;
    }
  }
  return null;
}

function switchPlayer() {
  activePlayer = activePlayer === 'X' ? 'O' : 'X';
  updateCurrentPlayer();
  updateStatus(`It's ${activePlayer}'s turn`);
}

function resetTimers() {
  clearInterval(timerInterval);
  playerTimer = 60;
  opponentTimer = 60;
  updateTimersUI();
}

function startTimers() {
  timerInterval = setInterval(() => {
    if (!gameActive) {
      return;
    }

    if (activePlayer === 'X') {
      playerTimer -= 1;
      if (playerTimer <= 0) {
        playerTimer = 0;
        updateTimersUI();
        handleGameOver('userLoss');
        return;
      }
    } else {
      opponentTimer -= 1;
      if (opponentTimer <= 0) {
        opponentTimer = 0;
        updateTimersUI();
        handleGameOver('userWin');
        return;
      }
    }

    updateTimersUI();
  }, 1000);
}

function attemptLogin() {
  const email = loginEmail.value.trim().toLowerCase();
  const password = loginPassword.value;

  if (!email || !password) {
    alert('Please fill in both email and password.');
    return;
  }

  const profile = loadProfile(email);
  if (!profile || profile.password !== password) {
    alert('Invalid login details.');
    return;
  }

  activeProfile = profile;
  saveActiveProfile(email);
  updateProfileUI();
  updateStatsUI();
  showPage(pages.home);
}

function attemptSignup() {
  const username = signupName.value.trim();
  const email = signupEmail.value.trim().toLowerCase();
  const password = signupPassword.value;
  const country = signupCountry.value;

  if (!username || !email || !password || !country) {
    alert('Please fill all signup fields and choose a country.');
    return;
  }

  if (!isPasswordStrong(password)) {
    alert('Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.');
    return;
  }

  if (loadProfile(email)) {
    alert('Email already registered.');
    return;
  }

  const profile = {
    username,
    email,
    password,
    country,
    stats: {
      totalGames: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      currentStreak: 0,
    },
  };

  saveProfile(profile);
  activeProfile = profile;
  saveActiveProfile(email);
  updateProfileUI();
  updateStatsUI();
  showPage(pages.home);
}

function generateFourDigitCode() {
  return String(1000 + Math.floor(Math.random() * 9000));
}

function createCode() {
  const code = generateFourDigitCode();
  gameCodeInput.value = code;
  updateJoinButtonState();
}

function updateJoinButtonState() {
  const isValidCode = /^[0-9]{4}$/.test(gameCodeInput.value.trim());
  if (isValidCode) {
    joinGameBtn.classList.remove('hidden');
  } else {
    joinGameBtn.classList.add('hidden');
  }
}

function quickMatch() {
  const code = generateFourDigitCode();
  gameCodeInput.value = code;
  updateJoinButtonState();
  startGame(code, 'bot', selectedBot || bots[2]);
}

function leaveGame() {
  clearInterval(timerInterval);
  activeGame = null;
  if (musicOscillator) {
    stopGameMusic(musicOscillator);
  }
  resetBoard();
  showPage(pages.home);
}

function restartRound() {
  resetBoard();
}

function showTutorial() {
  showPage(pages.tutorial);
}

function showStats() {
  updateStatsUI();
  showPage(pages.stats);
}

function showHome() {
  if (musicOscillator) {
    stopGameMusic(musicOscillator);
  }
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  if (audioContext && audioContext.state !== 'closed') {
    audioContext.suspend();
  }
  updateProfileUI();
  updateStatsUI();
  showPage(pages.home);
}

function loadExistingSession() {
  const profile = loadActiveProfile();
  if (profile) {
    activeProfile = profile;
  } else {
    activeProfile = {
      username: 'Guest',
      email: 'guest@tic.com',
      country: 'World',
      stats: {
        totalGames: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        currentStreak: 0,
      },
    };
  }

  updateProfileUI();
  updateStatsUI();
  showPage(pages.home);
  updateSelectedBotPreview();
  updateJoinButtonState();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
loginButton.addEventListener('click', attemptLogin);
signupButton.addEventListener('click', attemptSignup);
showSignupBtn.addEventListener('click', () => showPage(pages.signup));
showLoginBtn.addEventListener('click', () => showPage(pages.login));
logoutButton.addEventListener('click', () => {
  localStorage.removeItem('tic_tac_toe_active');
  activeProfile = null;
  showPage(pages.login);
});
showTutorialBtn.addEventListener('click', showTutorial);
showStatsBtn.addEventListener('click', showStats);
tutorialBackBtn.addEventListener('click', showHome);
statsBackBtn.addEventListener('click', showHome);
joinGameBtn.addEventListener('click', () => joinGame(gameCodeInput.value));
createCodeBtn.addEventListener('click', createCode);
gameCodeInput.addEventListener('input', updateJoinButtonState);
quickMatchBtn.addEventListener('click', quickMatch);
leaveGameBtn.addEventListener('click', leaveGame);
backHomeBtn.addEventListener('click', leaveGame);
restartGameBtn.addEventListener('click', restartRound);
modalPlayAgainBtn.addEventListener('click', () => {
  hideResultModal();
  resetBoard();
});
modalHomeBtn.addEventListener('click', () => {
  hideResultModal();
  showHome();
});
modalLogoutBtn.addEventListener('click', () => {
  hideResultModal();
  localStorage.removeItem('tic_tac_toe_active');
  activeProfile = null;
  showPage(pages.login);
});
if (botMuteBtn) {
  botMuteBtn.addEventListener('click', toggleBotMute);
}
if (musicToggleBtn) {
  musicToggleBtn.addEventListener('click', () => setMusicEnabled(!musicEnabled));
}

loginPasswordToggle.addEventListener('click', () => togglePasswordVisibility(loginPassword, loginPasswordToggle));
signupPasswordToggle.addEventListener('click', () => togglePasswordVisibility(signupPassword, signupPasswordToggle));
signupPassword.addEventListener('input', () => validatePasswordHints(signupPassword.value));
validatePasswordHints(signupPassword.value);

renderBotGrid();
setMusicEnabled(musicEnabled);
ensureSpeechVoicesLoaded();
loadExistingSession();
