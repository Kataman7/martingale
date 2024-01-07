function martingaleSimulation(initialBet, money, display) {
    let rounds = 0;
    let bet = initialBet;
    let text = "";

    while (money >= bet && bet > 0) {
        money -= bet;

        if (Math.random() < 18 / 37) {
            money += bet * 2;
            text += `<span class="positive">${bet}€</span> -> ${money}\$\n`;
            bet = initialBet;

            if (display) document.getElementById('output').innerHTML += text + '\n';

            text = "";
            rounds++;
        } else {
            text += `<span class="negative">-${bet}\$ </span>`;
            bet *= 2;
        }
    }

    if (display) document.getElementById('output').innerHTML += text + `-> ${money}€\n\n`;

    return rounds;
}

function calculeTourMoyenAvantLoose(iterations, initialBet, money) {

    let totalRounds = 0;

    for (let i = 0; i < iterations; i++) {
        totalRounds += martingaleSimulation(initialBet, money, false);
    }

    return totalRounds / iterations;
}

function runMartingaleSimulation() {
    const initialBet = parseInt(document.getElementById('initialBet').value);
    const money = parseInt(document.getElementById('money').value);

    // Effacer le texte actuel dans la zone de sortie
    document.getElementById('output').innerHTML = "";

    martingaleSimulation(initialBet, money, true);
}

function runCalculation() {
    const iterations = parseInt(document.getElementById('iterations').value);
    const initialBet = parseInt(document.getElementById('initialBet').value);
    const money = parseInt(document.getElementById('money').value);

    // Effacer le texte actuel dans la zone de sortie
    document.getElementById('output').innerHTML = "";

    // Calculer et afficher la moyenne des tours
    const averageRounds = calculeTourMoyenAvantLoose(iterations, initialBet, money);
    document.getElementById('output').innerHTML = `Average Rounds: ${averageRounds.toFixed(2)}`;
}
