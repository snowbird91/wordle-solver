class WordleSolver {
    constructor() {
        this.currentRow = 0;
        this.currentCol = 0;
        this.gameState = Array(6).fill().map(() => Array(5).fill({letter: '', state: 'empty'}));
        this.keyboardState = {};
        this.isAnalyzing = false;
        this.focusedTile = null;
        this.wordValidation = true;
        
        // Common 5-letter words for Wordle (subset for now, will expand)
        this.wordList = [
            'ABOUT', 'ABOVE', 'ABUSE', 'ACTOR', 'ACUTE', 'ADMIT', 'ADOPT', 'ADULT', 'AFTER', 'AGAIN',
            'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 'ALIEN', 'ALIGN', 'ALIKE', 'ALIVE',
            'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'AMONG', 'ANGER', 'ANGLE', 'ANGRY', 'APART', 'APPLE',
            'APPLY', 'ARENA', 'ARGUE', 'ARISE', 'ARRAY', 'ASIDE', 'ASSET', 'AVOID', 'AWAKE', 'AWARD',
            'AWARE', 'BADLY', 'BAKER', 'BASES', 'BASIC', 'BEACH', 'BEGAN', 'BEGIN', 'BEING', 'BELOW',
            'BENCH', 'BILLY', 'BIRTH', 'BLACK', 'BLAME', 'BLANK', 'BLAST', 'BLIND', 'BLOCK', 'BLOOD',
            'BOARD', 'BOOST', 'BOOTH', 'BOUND', 'BRAIN', 'BRAND', 'BRASS', 'BRAVE', 'BREAD', 'BREAK',
            'BREED', 'BRICK', 'BRIEF', 'BRING', 'BROAD', 'BROKE', 'BROWN', 'BUILD', 'BUILT', 'BUYER',
            'CABLE', 'CALIF', 'CARRY', 'CATCH', 'CAUSE', 'CHAIN', 'CHAIR', 'CHAOS', 'CHARM', 'CHART',
            'CHASE', 'CHEAP', 'CHECK', 'CHEST', 'CHIEF', 'CHILD', 'CHINA', 'CHOSE', 'CIVIL', 'CLAIM',
            'CLASS', 'CLEAN', 'CLEAR', 'CLICK', 'CLIMB', 'CLOCK', 'CLOSE', 'CLOUD', 'COACH', 'COAST',
            'COULD', 'COUNT', 'COURT', 'COVER', 'CRAFT', 'CRASH', 'CRAZY', 'CREAM', 'CRIME', 'CROSS',
            'CROWD', 'CROWN', 'CRUDE', 'CURVE', 'CYCLE', 'DAILY', 'DANCE', 'DATED', 'DEALT', 'DEATH',
            'DEBUT', 'DELAY', 'DEPTH', 'DOING', 'DOUBT', 'DOZEN', 'DRAFT', 'DRAMA', 'DRANK', 'DRAWN',
            'DREAM', 'DRESS', 'DRILL', 'DRINK', 'DRIVE', 'DROVE', 'DYING', 'EAGER', 'EARLY', 'EARTH',
            'EIGHT', 'ELITE', 'EMPTY', 'ENEMY', 'ENJOY', 'ENTER', 'ENTRY', 'EQUAL', 'ERROR', 'EVENT',
            'EVERY', 'EXACT', 'EXIST', 'EXTRA', 'FAITH', 'FALSE', 'FAULT', 'FIBER', 'FIELD', 'FIFTH',
            'FIFTY', 'FIGHT', 'FINAL', 'FIRST', 'FIXED', 'FLASH', 'FLEET', 'FLOOR', 'FLUID', 'FOCUS',
            'FORCE', 'FORTH', 'FORTY', 'FORUM', 'FOUND', 'FRAME', 'FRANK', 'FRAUD', 'FRESH', 'FRONT',
            'FRUIT', 'FULLY', 'FUNNY', 'GIANT', 'GIVEN', 'GLASS', 'GLOBE', 'GOING', 'GRACE', 'GRADE',
            'GRAIN', 'GRAND', 'GRANT', 'GRASS', 'GRAVE', 'GREAT', 'GREEN', 'GROSS', 'GROUP', 'GROWN',
            'GUARD', 'GUESS', 'GUEST', 'GUIDE', 'HAPPY', 'HARSH', 'HASTE', 'HEART', 'HEAVY', 'HENCE',
            'HENRY', 'HORSE', 'HOTEL', 'HOUSE', 'HUMAN', 'HURRY', 'IMAGE', 'INDEX', 'INNER', 'INPUT',
            'ISSUE', 'JAPAN', 'JIMMY', 'JOINT', 'JONES', 'JUDGE', 'KNOWN', 'LABEL', 'LARGE', 'LASER',
            'LATER', 'LAUGH', 'LAYER', 'LEARN', 'LEASE', 'LEAST', 'LEAVE', 'LEGAL', 'LEVEL', 'LEWIS',
            'LIGHT', 'LIMIT', 'LINKS', 'LIVES', 'LOCAL', 'LOOSE', 'LOWER', 'LUCKY', 'LUNCH', 'LYING',
            'MAGIC', 'MAJOR', 'MAKER', 'MARCH', 'MARIA', 'MATCH', 'MAYBE', 'MAYOR', 'MEANT', 'MEDIA',
            'METAL', 'MIGHT', 'MINOR', 'MINUS', 'MIXED', 'MODEL', 'MONEY', 'MONTH', 'MORAL', 'MOTOR',
            'MOUNT', 'MOUSE', 'MOUTH', 'MOVED', 'MOVIE', 'MUSIC', 'NEEDS', 'NERVE', 'NEVER', 'NEWLY',
            'NIGHT', 'NOISE', 'NORTH', 'NOTED', 'NOVEL', 'NURSE', 'OCEAN', 'OFFER', 'OFTEN', 'ORDER',
            'OTHER', 'OUGHT', 'PAINT', 'PANEL', 'PAPER', 'PARTY', 'PEACE', 'PETER', 'PHASE', 'PHONE',
            'PHOTO', 'PIANO', 'PIECE', 'PILOT', 'PITCH', 'PLACE', 'PLAIN', 'PLANE', 'PLANT', 'PLATE',
            'POINT', 'POUND', 'POWER', 'PRESS', 'PRICE', 'PRIDE', 'PRIME', 'PRINT', 'PRIOR', 'PRIZE',
            'PROOF', 'PROUD', 'PROVE', 'QUEEN', 'QUICK', 'QUIET', 'QUITE', 'RADIO', 'RAISE', 'RANGE',
            'RAPID', 'RATIO', 'REACH', 'READY', 'REALM', 'REBEL', 'REFER', 'RELAX', 'REPAY', 'REPLY',
            'RIGHT', 'RIVAL', 'RIVER', 'ROBIN', 'ROGER', 'ROMAN', 'ROUGH', 'ROUND', 'ROUTE', 'ROYAL',
            'RURAL', 'SCALE', 'SCENE', 'SCOPE', 'SCORE', 'SENSE', 'SERVE', 'SETUP', 'SEVEN', 'SHALL',
            'SHAPE', 'SHARE', 'SHARP', 'SHEET', 'SHELF', 'SHELL', 'SHIFT', 'SHINE', 'SHIRT', 'SHOCK',
            'SHOOT', 'SHORT', 'SHOWN', 'SIDES', 'SIGHT', 'SIGNS', 'SILLY', 'SINCE', 'SIXTH', 'SIXTY',
            'SIZED', 'SKILL', 'SLEEP', 'SLIDE', 'SMALL', 'SMART', 'SMILE', 'SMITH', 'SMOKE', 'SOLID',
            'SOLVE', 'SORRY', 'SOUND', 'SOUTH', 'SPACE', 'SPARE', 'SPEAK', 'SPEED', 'SPEND', 'SPENT',
            'SPLIT', 'SPOKE', 'SPORT', 'SQUAD', 'STAFF', 'STAGE', 'STAKE', 'STAND', 'START', 'STATE',
            'STEAM', 'STEEL', 'STEEP', 'STEER', 'STICK', 'STILL', 'STOCK', 'STONE', 'STOOD', 'STORE',
            'STORM', 'STORY', 'STRIP', 'STUCK', 'STUDY', 'STUFF', 'STYLE', 'SUGAR', 'SUITE', 'SUPER',
            'SWEET', 'TABLE', 'TAKEN', 'TASTE', 'TAXES', 'TEACH', 'TEAMS', 'TEETH', 'TERRY', 'TEXAS',
            'THANK', 'THEFT', 'THEIR', 'THEME', 'THERE', 'THESE', 'THICK', 'THING', 'THINK', 'THIRD',
            'THOSE', 'THREE', 'THREW', 'THROW', 'THUMB', 'TIGER', 'TIGHT', 'TIMER', 'TIMES', 'TIRED',
            'TITLE', 'TODAY', 'TOPIC', 'TOTAL', 'TOUCH', 'TOUGH', 'TOWER', 'TRACK', 'TRADE', 'TRAIN',
            'TREAT', 'TREND', 'TRIAL', 'TRIBE', 'TRICK', 'TRIED', 'TRIES', 'TRUCK', 'TRULY', 'TRUNK',
            'TRUST', 'TRUTH', 'TWICE', 'UNDER', 'UNDUE', 'UNION', 'UNITY', 'UNTIL', 'UPPER', 'UPSET',
            'URBAN', 'USAGE', 'USUAL', 'VALUE', 'VIDEO', 'VIRUS', 'VISIT', 'VITAL', 'VOCAL', 'VOICE',
            'WASTE', 'WATCH', 'WATER', 'WHEEL', 'WHERE', 'WHICH', 'WHILE', 'WHITE', 'WHOLE', 'WHOSE',
            'WOMAN', 'WOMEN', 'WORLD', 'WORRY', 'WORSE', 'WORST', 'WORTH', 'WOULD', 'WRITE', 'WRONG',
            'WROTE', 'YOUNG', 'YOUTH', 'ZERO'
        ];
        
        this.init();
    }

    init() {
        this.createGameBoard();
        this.createKeyboard();
        this.setupEventListeners();
        this.setupTheme();
    }

    createGameBoard() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = '';

        for (let row = 0; row < 6; row++) {
            const gameRow = document.createElement('div');
            gameRow.className = 'game-row';
            gameRow.setAttribute('data-row', row);

            for (let col = 0; col < 5; col++) {
                const tile = document.createElement('div');
                tile.className = 'game-tile';
                tile.setAttribute('data-row', row);
                tile.setAttribute('data-col', col);
                tile.setAttribute('tabindex', '0');
                tile.setAttribute('role', 'button');
                tile.setAttribute('aria-label', `Letter ${col + 1}, Row ${row + 1}`);
                
                // Add click event to cycle through states
                tile.addEventListener('click', (e) => this.cycleTileState(e));
                
                gameRow.appendChild(tile);
            }

            gameBoard.appendChild(gameRow);
        }
    }

    createKeyboard() {
        const keyboardContainer = document.getElementById('keyboardContainer');
        const keyboard = document.createElement('div');
        keyboard.className = 'keyboard';
        keyboard.id = 'keyboard';

        const keyboardLayout = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
        ];

        keyboardLayout.forEach(row => {
            const keyboardRow = document.createElement('div');
            keyboardRow.className = 'keyboard-row';

            row.forEach(keyText => {
                const key = document.createElement('button');
                key.className = 'key';
                key.setAttribute('data-key', keyText);
                key.setAttribute('aria-label', keyText);
                
                if (keyText === 'ENTER' || keyText === 'BACKSPACE') {
                    key.classList.add('wide');
                }
                
                key.textContent = keyText === 'BACKSPACE' ? '⌫' : keyText;
                
                key.addEventListener('click', (e) => this.handleKeyPress(keyText));
                
                keyboardRow.appendChild(key);
            });

            keyboard.appendChild(keyboardRow);
        });

        keyboardContainer.innerHTML = '';
        keyboardContainer.appendChild(keyboard);
    }

    setupEventListeners() {
        // Enhanced keyboard input with arrow navigation
        document.addEventListener('keydown', (e) => this.handlePhysicalKeyboard(e));
        
        // Analyze button
        document.getElementById('analyzeBtn').addEventListener('click', () => this.analyzeSuggestions());
        
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        
        // Help modal
        document.getElementById('helpBtn').addEventListener('click', () => this.showHelp());
        document.getElementById('closeHelp').addEventListener('click', () => this.hideHelp());
        document.getElementById('helpModal').addEventListener('click', (e) => {
            if (e.target.id === 'helpModal') this.hideHelp();
        });
        
        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.hideHelp();
        });
        
        // Auto-focus on game board for better UX
        this.focusGameBoard();
    }

    focusGameBoard() {
        const currentTile = this.getTile(this.currentRow, this.currentCol);
        if (currentTile) {
            currentTile.focus();
            this.focusedTile = currentTile;
            this.updateTileFocus();
        }
    }

    updateTileFocus() {
        // Remove focus styling from all tiles
        document.querySelectorAll('.game-tile').forEach(tile => {
            tile.classList.remove('focused');
        });
        
        // Add focus styling to current tile
        if (this.focusedTile) {
            this.focusedTile.classList.add('focused');
        }
    }

    handlePhysicalKeyboard(event) {
        const key = event.key.toUpperCase();
        
        // Handle arrow navigation
        if (['ARROWUP', 'ARROWDOWN', 'ARROWLEFT', 'ARROWRIGHT'].includes(key)) {
            event.preventDefault();
            this.handleArrowNavigation(key);
            return;
        }
        
        // Handle tab navigation
        if (key === 'TAB') {
            event.preventDefault();
            this.handleTabNavigation(event.shiftKey);
            return;
        }
        
        // Existing key handling
        if (key === 'ENTER') {
            this.handleKeyPress('ENTER');
        } else if (key === 'BACKSPACE') {
            this.handleKeyPress('BACKSPACE');
        } else if (key.match(/^[A-Z]$/)) {
            this.handleKeyPress(key);
        }
    }

    handleArrowNavigation(direction) {
        let newRow = this.currentRow;
        let newCol = this.currentCol;
        
        switch (direction) {
            case 'ARROWUP':
                newRow = Math.max(0, this.currentRow - 1);
                break;
            case 'ARROWDOWN':
                newRow = Math.min(5, this.currentRow + 1);
                break;
            case 'ARROWLEFT':
                if (this.currentCol > 0) {
                    newCol = this.currentCol - 1;
                } else if (this.currentRow > 0) {
                    newRow = this.currentRow - 1;
                    newCol = 4;
                }
                break;
            case 'ARROWRIGHT':
                if (this.currentCol < 4) {
                    newCol = this.currentCol + 1;
                } else if (this.currentRow < 5) {
                    newRow = this.currentRow + 1;
                    newCol = 0;
                }
                break;
        }
        
        this.navigateToTile(newRow, newCol);
    }

    handleTabNavigation(isShift) {
        let newRow = this.currentRow;
        let newCol = this.currentCol;
        
        if (isShift) {
            // Navigate backwards
            if (this.currentCol > 0) {
                newCol = this.currentCol - 1;
            } else if (this.currentRow > 0) {
                newRow = this.currentRow - 1;
                newCol = 4;
            }
        } else {
            // Navigate forwards
            if (this.currentCol < 4) {
                newCol = this.currentCol + 1;
            } else if (this.currentRow < 5) {
                newRow = this.currentRow + 1;
                newCol = 0;
            }
        }
        
        this.navigateToTile(newRow, newCol);
    }

    navigateToTile(row, col) {
        this.currentRow = row;
        this.currentCol = col;
        
        const newTile = this.getTile(row, col);
        if (newTile) {
            this.focusedTile = newTile;
            newTile.focus();
            this.updateTileFocus();
        }
    }

    handleKeyPress(key) {
        if (key === 'ENTER') {
            this.submitRow();
        } else if (key === 'BACKSPACE') {
            this.deleteLetter();
        } else if (key.match(/^[A-Z]$/)) {
            this.addLetter(key);
        }
    }

    addLetter(letter) {
        if (this.currentRow >= 6) return;
        
        // Find the next empty tile in current row
        let targetCol = this.currentCol;
        if (targetCol >= 5) {
            // Row is full, don't add more letters
            this.showTemporaryMessage("Row is full! Press Enter to continue or Backspace to edit.");
            return;
        }
        
        const tile = this.getTile(this.currentRow, targetCol);
        if (tile) {
            tile.textContent = letter;
            tile.classList.add('filled', 'absent'); // Start with gray/absent by default
            
            this.gameState[this.currentRow][targetCol] = {
                letter: letter,
                state: 'absent' // Default to absent (gray) state
            };
            
            // Move to next column
            this.currentCol = Math.min(4, targetCol + 1);
            
            // Add visual feedback
            this.animateTile(tile, 'pulse');
            
            // Update focus to next tile if not at end
            if (this.currentCol < 5) {
                this.navigateToTile(this.currentRow, this.currentCol);
            }
            
            // Check if word is complete
            if (this.currentCol === 5) {
                this.validateCurrentWord();
            }
        }
    }

    deleteLetter() {
        if (this.currentRow >= 6) return;
        
        // If we're at the beginning of a row and current tile is empty, go to previous row
        if (this.currentCol === 0) {
            const currentTile = this.getTile(this.currentRow, 0);
            if (currentTile && !currentTile.textContent.trim()) {
                if (this.currentRow > 0) {
                    this.navigateToTile(this.currentRow - 1, 4);
                }
                return;
            }
        }
        
        // Find the rightmost filled tile in current row
        let targetCol = this.currentCol;
        const currentTile = this.getTile(this.currentRow, targetCol);
        
        if (currentTile && currentTile.textContent.trim()) {
            // Current tile has content, delete it
        } else if (targetCol > 0) {
            // Current tile is empty, go back one
            targetCol = targetCol - 1;
        } else {
            // At beginning with empty tile
            return;
        }
        
        const tile = this.getTile(this.currentRow, targetCol);
        if (tile) {
            tile.textContent = '';
            tile.className = 'game-tile';
            
            this.gameState[this.currentRow][targetCol] = {
                letter: '',
                state: 'empty'
            };
            
            // Update position
            this.currentCol = targetCol;
            this.navigateToTile(this.currentRow, this.currentCol);
            
            // Add visual feedback
            this.animateTile(tile, 'fadeIn');
        }
    }

    submitRow() {
        if (this.currentRow >= 6) return;
        
        // Check if row is complete
        const currentWord = this.getCurrentWord();
        if (currentWord.length < 5) {
            this.showTemporaryMessage("Complete the word before submitting!");
            return;
        }
        
        // Validate word if validation is enabled
        if (this.wordValidation && !this.isValidWord(currentWord)) {
            this.showTemporaryMessage(`"${currentWord}" is not a valid word. Continue anyway?`);
            // For now, allow invalid words but show warning
        }
        
        // Add animation to the completed row
        const currentRowElement = document.querySelector(`[data-row="${this.currentRow}"]`);
        if (currentRowElement) {
            this.animateRow(currentRowElement);
        }
        
        // Move to next row
        this.currentRow++;
        this.currentCol = 0;
        
        // Focus on next row if available
        if (this.currentRow < 6) {
            this.navigateToTile(this.currentRow, 0);
        } else {
            this.showTemporaryMessage("Game completed! Click 'Analyze & Suggest' for recommendations.");
        }
        
        // Update keyboard state
        this.updateKeyboardFromGameState();
    }

    getCurrentWord() {
        let word = '';
        for (let col = 0; col < 5; col++) {
            const cellData = this.gameState[this.currentRow][col];
            if (cellData && cellData.letter) {
                word += cellData.letter;
            }
        }
        return word;
    }

    validateCurrentWord() {
        const word = this.getCurrentWord();
        if (word.length === 5) {
            if (this.isValidWord(word)) {
                this.showTemporaryMessage(`"${word}" - Press Enter to submit!`, 'success');
            } else {
                this.showTemporaryMessage(`"${word}" - Not in word list, but you can still submit`, 'warning');
            }
        }
    }

    isValidWord(word) {
        // Basic validation - in a real implementation, this would check against a word list
        // For now, just check if it's 5 letters and all letters
        return word.length === 5 && /^[A-Z]+$/.test(word);
    }

    showTemporaryMessage(message, type = 'info') {
        // Remove existing message
        const existingMessage = document.querySelector('.temp-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageEl = document.createElement('div');
        messageEl.className = `temp-message temp-message-${type}`;
        messageEl.textContent = message;
        
        // Insert after game board
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.parentNode.insertBefore(messageEl, gameBoard.nextSibling);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 3000);
    }

    cycleTileState(event) {
        const tile = event.target;
        const row = parseInt(tile.getAttribute('data-row'));
        const col = parseInt(tile.getAttribute('data-col'));
        
        // Only allow state changes for tiles with letters
        if (!tile.textContent.trim()) return;
        
        const currentState = this.gameState[row][col].state;
        let newState;
        
        switch (currentState) {
            case 'absent':
                newState = 'present';
                break;
            case 'present':
                newState = 'correct';
                break;
            case 'correct':
                newState = 'absent';
                break;
            case 'filled':
                newState = 'absent'; // In case there are any old 'filled' states
                break;
            default:
                newState = 'absent';
        }
        
        this.updateTileState(tile, row, col, newState);
        this.updateKeyboardFromGameState();
    }

    updateTileState(tile, row, col, state) {
        // Remove existing state classes
        tile.classList.remove('filled', 'absent', 'present', 'correct');
        
        // Add new state class
        if (state !== 'empty') {
            tile.classList.add(state);
        }
        
        // Update game state
        this.gameState[row][col].state = state;
        
        // Add animation
        this.animateTile(tile, 'pulse');
    }

    updateKeyboardFromGameState() {
        // Reset keyboard state
        this.keyboardState = {};
        
        // Analyze game state to determine keyboard colors
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 5; col++) {
                const cellData = this.gameState[row][col];
                if (cellData.letter && cellData.state !== 'empty' && cellData.state !== 'filled') {
                    const letter = cellData.letter;
                    const state = cellData.state;
                    
                    // Priority: correct > present > absent
                    if (!this.keyboardState[letter] || 
                        (state === 'correct') ||
                        (state === 'present' && this.keyboardState[letter] !== 'correct')) {
                        this.keyboardState[letter] = state;
                    }
                }
            }
        }
        
        // Update keyboard visual state
        this.updateKeyboardVisuals();
    }

    updateKeyboardVisuals() {
        const keys = document.querySelectorAll('.key[data-key]');
        
        keys.forEach(key => {
            const letter = key.getAttribute('data-key');
            if (letter && letter.match(/^[A-Z]$/)) {
                // Remove existing state classes
                key.classList.remove('absent', 'present', 'correct');
                
                // Add appropriate state class
                if (this.keyboardState[letter]) {
                    key.classList.add(this.keyboardState[letter]);
                }
            }
        });
    }

    getTile(row, col) {
        return document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    }

    animateTile(tile, animationType) {
        tile.style.animation = 'none';
        setTimeout(() => {
            tile.style.animation = `${animationType} 0.3s ease`;
        }, 10);
        
        setTimeout(() => {
            tile.style.animation = 'none';
        }, 300);
    }

    animateRow(row) {
        const tiles = row.querySelectorAll('.game-tile');
        tiles.forEach((tile, index) => {
            setTimeout(() => {
                this.animateTile(tile, 'fadeIn');
            }, index * 100);
        });
    }

    setupTheme() {
        const savedTheme = localStorage.getItem('wordle-solver-theme') || 'light';
        this.setTheme(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('wordle-solver-theme', theme);
        
        const themeIcon = document.querySelector('.theme-icon');
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }

    showHelp() {
        document.getElementById('helpModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hideHelp() {
        document.getElementById('helpModal').classList.remove('active');
        document.body.style.overflow = '';
    }

    analyzeSuggestions() {
        if (this.isAnalyzing) return;
        
        this.isAnalyzing = true;
        const analyzeBtn = document.getElementById('analyzeBtn');
        const originalText = analyzeBtn.innerHTML;
        
        // Show loading state
        analyzeBtn.innerHTML = '<span class="btn-icon">⏳</span>Analyzing...';
        analyzeBtn.disabled = true;
        
        // Run the actual solver algorithm
        setTimeout(() => {
            const suggestions = this.generateSuggestions();
            this.showSuggestions(suggestions);
            
            // Reset button
            analyzeBtn.innerHTML = originalText;
            analyzeBtn.disabled = false;
            this.isAnalyzing = false;
        }, 500); // Reduced delay since we're doing real computation
    }

    generateSuggestions() {
        // Extract game state information
        const gameInfo = this.extractGameConstraints();
        
        // Filter words based on constraints
        const validWords = this.filterWordsByConstraints(gameInfo);
        
        // Score remaining words
        const scoredWords = this.scoreWords(validWords, gameInfo);
        
        // Return top 5 suggestions
        return scoredWords.slice(0, 5);
    }

    extractGameConstraints() {
        const constraints = {
            confirmedLetters: new Map(), // position -> letter
            presentLetters: new Set(),   // letters in word but wrong position
            absentLetters: new Set(),    // letters not in word
            positionExclusions: new Map() // position -> Set of excluded letters
        };

        // Analyze all entered words
        for (let row = 0; row < this.currentRow; row++) {
            for (let col = 0; col < 5; col++) {
                const cellData = this.gameState[row][col];
                if (cellData.letter) {
                    const letter = cellData.letter;
                    
                    switch (cellData.state) {
                        case 'correct':
                            constraints.confirmedLetters.set(col, letter);
                            break;
                        case 'present':
                            constraints.presentLetters.add(letter);
                            if (!constraints.positionExclusions.has(col)) {
                                constraints.positionExclusions.set(col, new Set());
                            }
                            constraints.positionExclusions.get(col).add(letter);
                            break;
                        case 'absent':
                            constraints.absentLetters.add(letter);
                            break;
                    }
                }
            }
        }

        return constraints;
    }

    filterWordsByConstraints(constraints) {
        return this.wordList.filter(word => {
            // Check confirmed letters (green tiles)
            for (let [pos, letter] of constraints.confirmedLetters) {
                if (word[pos] !== letter) return false;
            }

            // Check present letters (yellow tiles) - must be in word but not in excluded positions
            for (let letter of constraints.presentLetters) {
                if (!word.includes(letter)) return false;
            }

            // Check position exclusions for present letters
            for (let [pos, excludedLetters] of constraints.positionExclusions) {
                if (excludedLetters.has(word[pos])) return false;
            }

            // Check absent letters (gray tiles)
            for (let letter of constraints.absentLetters) {
                // Special case: if letter is also present, only exclude it from non-confirmed positions
                if (constraints.presentLetters.has(letter)) {
                    // This letter exists in the word, so we can't completely exclude it
                    continue;
                }
                if (word.includes(letter)) return false;
            }

            return true;
        });
    }

    scoreWords(words, constraints) {
        const scoredWords = words.map(word => {
            let score = 0;
            const reason = [];

            // Base score: letter frequency in English
            const letterFreq = {
                'E': 12.70, 'T': 9.06, 'A': 8.17, 'O': 7.51, 'I': 6.97, 'N': 6.75,
                'S': 6.33, 'H': 6.09, 'R': 5.99, 'D': 4.25, 'L': 4.03, 'C': 2.78,
                'U': 2.76, 'M': 2.41, 'W': 2.36, 'F': 2.23, 'G': 2.02, 'Y': 1.97,
                'P': 1.93, 'B': 1.29, 'V': 0.98, 'K': 0.77, 'J': 0.15, 'X': 0.15,
                'Q': 0.10, 'Z': 0.07
            };

            for (let letter of word) {
                score += letterFreq[letter] || 0;
            }

            // Bonus for unique letters (avoid repeated letters early in game)
            const uniqueLetters = new Set(word).size;
            if (uniqueLetters === 5) {
                score += 10;
                reason.push("all unique letters");
            }

            // Bonus for common letter positions
            if (['S', 'C', 'B', 'T', 'P', 'A', 'F'].includes(word[0])) {
                score += 5;
                reason.push("common starting letter");
            }

            // Bonus for vowels in good positions
            const vowels = ['A', 'E', 'I', 'O', 'U'];
            if (vowels.includes(word[1]) || vowels.includes(word[2])) {
                score += 3;
                reason.push("good vowel placement");
            }

            // Penalty for words with uncommon letter combinations
            if (word.includes('QU') || word.includes('XY') || word.includes('ZZ')) {
                score -= 10;
            }

            // If we have constraints, boost words that help eliminate possibilities
            if (constraints.absentLetters.size === 0 && constraints.presentLetters.size === 0) {
                // First guess - prioritize information gathering
                if (uniqueLetters === 5 && vowels.filter(v => word.includes(v)).length >= 2) {
                    score += 15;
                    reason.push("excellent starter word");
                }
            }

            return {
                word,
                score: Math.round(score),
                reason: reason.length > 0 ? reason.join(", ") : "solid choice based on letter frequency"
            };
        });

        // Sort by score descending
        return scoredWords.sort((a, b) => b.score - a.score);
    }

    showSuggestions(suggestions = null) {
        const suggestionsPanel = document.getElementById('suggestionsPanel');
        
        // Use provided suggestions or fall back to sample data
        const displaySuggestions = suggestions || [
            { word: 'SLATE', score: 95, reason: 'Best starting word with common letters' },
            { word: 'CRANE', score: 88, reason: 'Good vowel coverage and common consonants' },
            { word: 'ROAST', score: 75, reason: 'Balanced letter frequency' }
        ];

        if (displaySuggestions.length === 0) {
            suggestionsPanel.innerHTML = `
                <div class="no-suggestions">
                    <div class="empty-icon">🤔</div>
                    <h3>No suggestions available</h3>
                    <p>Based on your constraints, no words match the criteria. Please check your letter states.</p>
                </div>
            `;
            return;
        }
        
        suggestionsPanel.innerHTML = `
            <div class="suggestions-header">
                <h3>Recommended Words</h3>
                <p class="suggestions-subtitle">Based on your current progress (${displaySuggestions.length} options found)</p>
            </div>
            <div class="suggestions-list">
                ${displaySuggestions.map((suggestion, index) => `
                    <div class="suggestion-item" style="animation-delay: ${index * 100}ms">
                        <div class="suggestion-word">${suggestion.word}</div>
                        <div class="suggestion-meta">
                            <span class="suggestion-score">${suggestion.score}%</span>
                            <span class="suggestion-reason">${suggestion.reason}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="suggestions-footer">
                <p>💡 Click a word to automatically fill it in your grid</p>
            </div>
        `;
        
        // Add CSS for suggestions (will be moved to CSS file later)
        this.addSuggestionStyles();
        
        // Add click handlers for suggestions
        this.setupSuggestionClicks();
    }

    addSuggestionStyles() {
        if (!document.getElementById('suggestion-styles')) {
            const style = document.createElement('style');
            style.id = 'suggestion-styles';
            style.textContent = `
                .suggestions-header {
                    text-align: center;
                    margin-bottom: var(--spacing-lg);
                }
                
                .suggestions-header h3 {
                    font-size: var(--font-size-xl);
                    font-weight: 600;
                    color: var(--text-primary);
                    margin-bottom: var(--spacing-xs);
                }
                
                .suggestions-subtitle {
                    color: var(--text-secondary);
                    font-size: var(--font-size-sm);
                }
                
                .suggestions-list {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-sm);
                    margin-bottom: var(--spacing-lg);
                }
                
                .suggestion-item {
                    background: var(--bg-primary);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-md);
                    padding: var(--spacing-md);
                    cursor: pointer;
                    transition: all var(--transition-fast);
                    animation: slideIn 0.3s ease-out forwards;
                    opacity: 0;
                    transform: translateX(-20px);
                }
                
                .suggestion-item:hover {
                    border-color: var(--primary-color);
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-md);
                }
                
                .suggestion-word {
                    font-size: var(--font-size-lg);
                    font-weight: 700;
                    color: var(--text-primary);
                    letter-spacing: 0.1em;
                    margin-bottom: var(--spacing-xs);
                }
                
                .suggestion-meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: var(--spacing-sm);
                    flex-wrap: wrap;
                }
                
                .suggestion-score {
                    background: var(--success-color);
                    color: white;
                    padding: var(--spacing-xs) var(--spacing-sm);
                    border-radius: var(--radius-sm);
                    font-size: var(--font-size-xs);
                    font-weight: 600;
                }
                
                .suggestion-reason {
                    color: var(--text-secondary);
                    font-size: var(--font-size-sm);
                    flex: 1;
                    text-align: right;
                }
                
                .suggestions-footer {
                    text-align: center;
                    padding-top: var(--spacing-md);
                    border-top: 1px solid var(--border-color);
                }
                
                .suggestions-footer p {
                    color: var(--text-muted);
                    font-size: var(--font-size-sm);
                    font-style: italic;
                }
                
                @media (max-width: 480px) {
                    .suggestion-meta {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    
                    .suggestion-reason {
                        text-align: left;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupSuggestionClicks() {
        const suggestionItems = document.querySelectorAll('.suggestion-item');
        suggestionItems.forEach(item => {
            item.addEventListener('click', () => {
                const word = item.querySelector('.suggestion-word').textContent;
                this.fillSuggestionInGrid(word);
            });
        });
    }

    fillSuggestionInGrid(word) {
        if (this.currentRow >= 6) return;
        
        // Clear current row
        for (let col = 0; col < 5; col++) {
            const tile = this.getTile(this.currentRow, col);
            tile.textContent = '';
            tile.className = 'game-tile';
            this.gameState[this.currentRow][col] = { letter: '', state: 'empty' };
        }
        
        // Fill in the suggestion
        this.currentCol = 0;
        for (let i = 0; i < word.length && i < 5; i++) {
            this.addLetter(word[i]);
        }
        
        // Add visual feedback
        const currentRowElement = document.querySelector(`[data-row="${this.currentRow}"]`);
        if (currentRowElement) {
            currentRowElement.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                if (currentRowElement) {
                    currentRowElement.style.animation = 'none';
                }
            }, 500);
        }
    }

    getGameData() {
        return {
            gameState: this.gameState,
            currentRow: this.currentRow,
            keyboardState: this.keyboardState
        };
    }

    resetGame() {
        this.currentRow = 0;
        this.currentCol = 0;
        this.gameState = Array(6).fill().map(() => Array(5).fill({letter: '', state: 'empty'}));
        this.keyboardState = {};
        
        // Reset visual state
        this.createGameBoard();
        this.updateKeyboardVisuals();
        
        // Reset suggestions panel
        const suggestionsPanel = document.getElementById('suggestionsPanel');
        suggestionsPanel.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">💡</div>
                <h3>Ready to help!</h3>
                <p>Enter your Wordle progress above and click "Analyze & Suggest" to get smart word recommendations.</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.wordleSolver = new WordleSolver();
    
    // Add some helpful console messages for debugging
    console.log('🧩 Wordle Solver initialized!');
    console.log('Access the solver instance via window.wordleSolver');
    console.log('Game data available via window.wordleSolver.getGameData()');
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = WordleSolver;
}
