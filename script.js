const keyboard = document.querySelector('.keyboard');
const textarea = document.getElementById('textarea');
let capsLock = false;

const arrayKeys = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace"],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["keyboard_capslock", "a", "s", "d", "f", "g", "h", "j", "k", "l", "keyboard_return"],
    ["keyboard_hide", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?"],
    ["space_bar"]
];

arrayKeys.forEach(keys => {
    const key = keys.reduce((acc, item) => {
        let addClass = 'keyboard__key';
        if (item.length > 1) {
            addClass += ' keyboard__key_width material-icons';
        } else {
            addClass += ' keyboard_toUpper';
        }
        if (item === "space_bar") {
            addClass += ' keyboard__key_extra-width';
        }
        return acc + `
            <button class="${addClass}" type="button">${item}</button>`
    }, '');
    keyboard.innerHTML += `<div class="keyboard__keys">${key}</div>`;
});

function clickButton(e) {
    if (e.target.type === 'button') {
        let symbol = e.target.textContent;
        if (symbol.length > 1) {
            clickSpecialButton(symbol);
        } else {
            if (capsLock) {
                symbol = symbol.toUpperCase();
            }
            textarea.value += symbol;
        }
    }
}

function clickSpecialButton(symbol) {
    switch (symbol) {
        case "backspace":
            textarea.textContent = textarea.textContent.slice(0, -1);
            break;
        case "keyboard_capslock":
            capsLock = !capsLock;
            keyboard.classList.toggle('upper');
            break;
        case "keyboard_return":
            textarea.textContent += '\n';
            break;
        case "keyboard_hide":
            keyboard.classList.add('keyboard_hidden');
            break;
        case "space_bar":
            textarea.textContent += " ";
            break;
    }
}

keyboard.addEventListener('click', clickButton);
textarea.addEventListener('focus', () => keyboard.classList.remove('keyboard_hidden'));
