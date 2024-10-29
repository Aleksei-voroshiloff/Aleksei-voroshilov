const input = document.querySelector(".input");
const btn = document.querySelector(".button");

function addNewWord() {
  // создаем блко с новым русским словом и задаем верхнюю рамку
  const newWordR = document.createElement("div");
  newWordR.className = "rus-word";
  newWordR.style.cssText = `
  border-top: 1px solid;
  `;
  // создаем блко с новым транслит словом и задаем верхнюю рамку
  const newWordT = document.createElement("div");
  newWordT.className = "translit-word";
  newWordT.style.cssText = `
  border-top: 1px solid;
  `;
  // создаем блко куда входят оба слова сразу
  const newStr = document.createElement("div");
  newStr.className = "all-string";

  // условия сокращения слов если в них более 6 букв
  if (input.value.length > 6) {
    newWordR.innerText = input.value.slice(0, 6) + "...";
    const tooltipR = document.createElement("div");
    tooltipR.className = "tooltipR";
    tooltipR.innerText = input.value;
    tooltipR.style.cssText = `
    color: rgba(17, 17, 17, 1);
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.1);
    min-height: 38px;    
    padding: 8px 16px 10px 16px;
    gap: 10px;
    width: 113 px; 
    border-radius: 10px;
    display: none;
    position: absolute;
    margin-left: 40px;
    margin-bottom: 85px;    
    `;
    // добавляем три точки после русского слова
    newWordR.append(tooltipR);
    // вешаем слушатель для вывода подсказки
    newWordR.addEventListener("mouseenter", () => {
      tooltipR.style.display = "block";
    });
    newWordR.addEventListener("mouseleave", () => {
      tooltipR.style.display = "none";
    });
    // создаем сокращение на транслит аналогично русскому слову
    newWordT.innerText = translit(input.value).slice(0, 6) + "...";
    const tooltipT = document.createElement("div");
    tooltipT.className = "tooltipT";
    tooltipT.innerText = translit(input.value);
    tooltipT.style.cssText = `
    color: rgba(17, 17, 17, 1);
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.1);
    min-height: 38px;  
    max-width: 113 px;  
    padding: 8px 16px 10px 16px;
    gap: 10px;
    border-radius: 10px;
    display: none;
    position: absolute;
    margin-bottom: 85px;     
    `;
    // добавляем три точки после транслит слова
    newWordT.append(tooltipT);
    // вешаем слушатель для вывода подсказки
    newWordT.addEventListener("mouseenter", () => {
      tooltipT.style.display = "block";
    });
    newWordT.addEventListener("mouseleave", () => {
      tooltipT.style.display = "none";
    });
    // если слово меньше 6 букв выводим без точек
  } else {
    newWordT.innerText = translit(input.value);
    newWordR.innerText = input.value;
  }
  // создаем блок с нумерацией строк
  const newNum = document.createElement("div");
  newNum.className = "number";
  //   возвращаем все элементы соответствующие классу
  const allNumber = document.querySelectorAll(".number");
  newNum.innerText = allNumber.length + 1;
  //  добавляем перед русским словом номер
  newWordR.prepend(newNum);
  //   в блок где весь список слов добавлем новую строку
  const wordList = document.querySelector(".word-list");
  wordList.append(newStr);
  // в новую строку добавлем русское слово и транслит
  newStr.append(newWordR, newWordT);
  //   после каждого ввода , очищаем инпут
  input.value = "";

  //   Удаление на крестик:
  const krest = document.createElement("img");
  krest.className = "krest1";
  krest.src = "./img/krest.svg";
  newWordT.append(krest);
  krest.addEventListener("click", () => {
    newStr.remove();
    deletString();
  });

  // Удаление всех строк на кнопку
  const deletAll = document.querySelector(".delet");
  deletAll.addEventListener("click", () => {
    newStr.remove();
  });
}
//
function deletString() {
  const allNumberNew = document.querySelectorAll(".number");
  allNumberNew.forEach((element, i) => (element.innerText = i + 1));
}

btn.addEventListener("click", addNewWord);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addNewWord();
  }
});

function translit(word) {
  var answer = "";
  var converter = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "e",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "c",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ь: "",
    ы: "y",
    ъ: "",
    э: "e",
    ю: "yu",
    я: "ya",

    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Е: "E",
    Ё: "E",
    Ж: "Zh",
    З: "Z",
    И: "I",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "H",
    Ц: "C",
    Ч: "Ch",
    Ш: "Sh",
    Щ: "Sch",
    Ь: "",
    Ы: "Y",
    Ъ: "",
    Э: "E",
    Ю: "Yu",
    Я: "Ya",
  };

  for (var i = 0; i < word.length; ++i) {
    if (converter[word[i]] == undefined) {
      answer += word[i];
    } else {
      answer += converter[word[i]];
    }
  }

  return answer;
}
