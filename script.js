function rouletteSimulation(initialBet, initialMoney, game) {

    let money = initialMoney
    let rounds = 0;
    let bet = initialBet;

    function runRound() {
        if (money >= bet && rounds < game) {
            money -= bet;

            if (Math.random() < 18 / 37) {
                money += bet * 2;

                const text = `<span class="positive">+${bet}$</span> -> ${money}$\n`;
                document.getElementById('output').innerHTML += text;

                bet = initialBet;
                rounds++;

                // Appel récursif pour le prochain tour après une petite pause
                setTimeout(runRound, 15);
            } else {
                bet *= 2;
                const text = `<span class="negative">-${bet}$ </span>`;
                document.getElementById('output').innerHTML += text;

                // Appel récursif pour le prochain tour après une petite pause
                setTimeout(runRound, 15);
            }
        } else {
            // Une petite pause supplémentaire après la boucle pour la dernière mise à jour de l'affichage
            setTimeout(() => {
                document.getElementById('output').innerHTML += `\n\nFinal Money: ${money}$\nTotal Gain: ${money - initialMoney}`;
            }, 15);
        }
    }

    // Lancement de la première itération
    runRound();

    return money >= bet;
}
function rouletteCalculation(initialBet, money, game) {

    let rounds = 0;
    let bet = initialBet;

    while (money >= bet && rounds < game) {
        money -= bet;

        if (Math.random() < 18 / 37) {
            money += bet * 2;
            bet = initialBet;
            rounds++
        } else {
            bet *= 2;
        }
    }

    return money >= bet;
}

function chanceToWin(iterations, initialBet, money, game) {
    let ratio = 0;
    for (let i = 0; i < iterations; i++) {
        if (rouletteCalculation(initialBet, money, game)) ratio++;
    }
    return ratio / iterations;
}

function runRouletteSimulation() {
    const initialBet = parseInt(document.getElementById('initialBet').value);
    const money = parseInt(document.getElementById('money').value);
    const games = parseInt(document.getElementById('games').value);

    // Effacer le texte actuel dans la zone de sortie
    document.getElementById('output').innerHTML = "";

    rouletteSimulation(initialBet, money, games);
}

function runChanceToWin() {
    const iterations = parseInt(document.getElementById('iterations').value);
    const initialBet = parseInt(document.getElementById('initialBet').value);
    const money = parseInt(document.getElementById('money').value);
    const games = parseInt(document.getElementById('games').value);

    // Effacer le texte actuel dans la zone de sortie
    document.getElementById('output').innerHTML = "";

    const winRatio = chanceToWin(iterations, initialBet, money, games);
    document.getElementById('output').innerHTML += `Chance to Win ${games * initialBet}$ after ${games} games: ${(winRatio * 100).toFixed(2)}%`;
}
