document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const preview = document.getElementById('preview');
    let currentInput = '0';
    let previousInput = null;
    let operator = null;
    let resetNext = false;

    function updateDisplay() {
        display.textContent = currentInput;
        updatePreview();
    }

    function updatePreview() {
        if (previousInput !== null && operator !== null) {
            const opSymbol = getOperatorSymbol(operator);
            preview.textContent = `${previousInput} ${opSymbol} ${currentInput}`;
        } else {
            preview.textContent = '';
        }
    }

    function getOperatorSymbol(op) {
        switch (op) {
            case 'add': return '+';
            case 'subtract': return '−';
            case 'multiply': return '×';
            case 'divide': return '÷';
            case 'power': return '^';
            default: return '';
        }
    }

    function clearAll() {
        currentInput = '0';
        previousInput = null;
        operator = null;
        resetNext = false;
        updateDisplay();
    }

    function backspace() {
        if (resetNext) return;
        if (currentInput.length === 1) {
            currentInput = '0';
        } else {
            currentInput = currentInput.slice(0, -1);
        }
        updateDisplay();
    }

    function appendDigit(digit) {
        if (resetNext) {
            currentInput = digit === '.' ? '0.' : digit;
            resetNext = false;
        } else {
            if (digit === '.' && currentInput.includes('.')) return;
            if (currentInput === '0' && digit !== '.') {
                currentInput = digit;
            } else {
                currentInput += digit;
            }
        }
        updateDisplay();
    }

    function performCalculation() {
        if (operator === null || previousInput === null) return;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let result = 0;
        switch (operator) {
            case 'add':
                result = prev + current;
                break;
            case 'subtract':
                result = prev - current;
                break;
            case 'multiply':
                result = prev * current;
                break;
            case 'divide':
                if (current === 0) {
                    alert("Error: Division by zero");
                    clearAll();
                    return;
                }
                result = prev / current;
                break;
            case 'power':
                result = Math.pow(prev, current);
                break;
        }
        currentInput = String(result);
        operator = null;
        previousInput = null;
        resetNext = true;
        updateDisplay();
    }

    function setOperator(op) {
        if (operator !== null) {
            performCalculation();
        }
        previousInput = currentInput;
        operator = op;
        resetNext = true;
        updateDisplay();
    }

    function applySqrt() {
        const value = parseFloat(currentInput);
        if (value < 0) {
            alert("Error: Square root of negative number");
            return;
        }
        currentInput = String(Math.sqrt(value));
        resetNext = true;
        updateDisplay();
    }

    function applyPercent() {
        const value = parseFloat(currentInput);
        currentInput = String(value / 100);
        resetNext = true;
        updateDisplay();
    }

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const digit = button.getAttribute('data-digit');
            const action = button.getAttribute('data-action');

            if (digit !== null) {
                appendDigit(digit);
            } else if (action !== null) {
                switch (action) {
                    case 'clear':
                        clearAll();
                        break;
                    case 'backspace':
                        backspace();
                        break;
                    case 'add':
                    case 'subtract':
                    case 'multiply':
                    case 'divide':
                    case 'power':
                        setOperator(action);
                        break;
                    case 'equals':
                        performCalculation();
                        break;
                    case 'sqrt':
                        applySqrt();
                        break;
                    case 'percent':
                        applyPercent();
                        break;
                }
            }
        });
    });

    updateDisplay();
});
