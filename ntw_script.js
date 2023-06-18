function convertToWords() {
    const amountInput = document.getElementById("num");
    const amount = amountInput.value;

    const words = convertNumberToWords(amount);
    const wordsDisplay = document.getElementById("converted");
    wordsDisplay.innerHTML = words;
}

function convertNumberToWords(number) {
    const singleDigits = [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];

    const teenDigits = [
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];

    const tensDigits = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];

    const units = [
      "",
      "thousand",
      "million",
    ];

    const numberArray = Array.from(String(number), Number);

    numberArray.reverse();

    let words = "";

    for (let i = 0; i < numberArray.length; i += 3) {
      const ones = numberArray[i];
      const tens = numberArray[i + 1];
      const hundreds = numberArray[i + 2];

      let currentGroup = "";

      if (hundreds !== undefined && hundreds !== 0) {
        currentGroup = singleDigits[hundreds] + " hundred";
      }

      if (tens !== undefined) {
        if (tens === 1) {
          currentGroup += (currentGroup ? " " : "") + teenDigits[ones];
        } else {
            if (ones !== undefined && ones !== 0) {
                currentGroup += " " + singleDigits[ones];
            }
            currentGroup += (currentGroup ? " " : "") + tensDigits[tens];
        }
      } else if (ones !== undefined && ones !== 0) {
        currentGroup += (currentGroup ? " " : "") + singleDigits[ones];
      }
      
      if (currentGroup) {
        const unit = units[Math.floor((numberArray.length - 1 - i) / 3)];
        if (words) {
            words = currentGroup + " " + unit + (hasNonZeroGroup ? " " : "") + words;
        } else {
            words = unit + " " + currentGroup;
        }
        hasNonZeroGroup = true;
      } else {
        hasNonZeroGroup = false;
      }
    }

    if (!hasNonZeroGroup) {
      words = "zero";
    }

    words = words.trim();

    words = words.charAt(0).toUpperCase() + words.slice(1);

    return words;
  }

  const convertButton = document.getElementById("convertButton");
  convertButton.addEventListener("click", convertToWords);