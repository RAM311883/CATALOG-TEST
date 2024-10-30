const fs = require('fs');

// Function to decode the value from a given base
function decodeValue(base, value) {
    return BigInt(parseInt(value, base)); // Use BigInt for large numbers
}

// Function to perform Lagrange interpolation to find the secret constant c
function lagrangeInterpolation(points) {
    const k = points.length;
    let c = BigInt(0); // Initialize constant c

    for (let i = 0; i < k; i++) {
        let L_i = BigInt(1);

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                L_i *= BigInt(-points[j].x) / BigInt(points[i].x - points[j].x);
            }
        }

        c += points[i].y * L_i;
    }

    return c; // Return the computed secret constant c
}

// Function to calculate the secret constant from the test case
function calculateSecretConstant(testCase) {
    const n = testCase.keys.n;
    const k = testCase.keys.k;
    const points = [];

    // Collect points (x, y) pairs
    for (let i = 1; i <= n; i++) {
        if (testCase[i]) {
            const base = parseInt(testCase[i].base);
            const value = decodeValue(base, testCase[i].value);
            points.push({ x: i, y: value });
        }
    }

    const c = lagrangeInterpolation(points); // Calculate the secret constant c
    console.log(`The secret constant c is: ${c}`); // Fixed string interpolation
}

// Read and process the first test case
fs.readFile('testcase1.json', 'utf8', (err, data) => {
    if (err) throw err;
    const testCase1 = JSON.parse(data);
    calculateSecretConstant(testCase1); // Calculate c for test case 1

    // Read and process the second test case
    fs.readFile('testcase2.json', 'utf8', (err, data) => {
        if (err) throw err;
        const testCase2 = JSON.parse(data);
        calculateSecretConstant(testCase2); // Calculate c for test case 2
    });
});

