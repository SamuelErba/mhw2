/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

const answers = {};
const elements = document.querySelectorAll('.choice-grid div');
const solution = document.querySelector('#solution');

for (const element of elements) {
    element.addEventListener('click', Push);
}

function Restart(event) {
    solution.classList.remove('desc');
    solution.classList.add('hidden');
    for (const count in answers) {
        delete answers[count];
    }
    for (const ele of elements) {
        ele.addEventListener('click', Push);
        ele.classList.remove('opaco');
        ele.querySelector('.checkbox').src = 'images/unchecked.png';
        ele.classList.remove('choosen');
    }
}

function Push(event) {
    let choosen_answer = event.currentTarget;
    choosen_answer.classList.remove('bordo');
    choosen_answer.classList.add('choosen');
    choosen_answer.classList.remove('opaco');
    choosen_answer.querySelector('.checkbox').src = 'images/checked.png';

    for (const ele of elements) {
        if (choosen_answer.dataset.questionId == ele.dataset.questionId && choosen_answer.dataset.choiceId != ele.dataset.choiceId) {
            ele.classList.add('opaco');
            ele.querySelector('.checkbox').src = 'images/unchecked.png';
            ele.classList.remove('choosen');
        }
    }
    value(choosen_answer);
}

function value(choosen_answer) {
    answers[choosen_answer.dataset.questionId] = choosen_answer.dataset.choiceId;
    let i = 0;
    for (let answer in answers)
        i++;
    if (i == 3) {
        for (const elem of elements) {
            elem.removeEventListener('click', Push);

            let sol;
            if (answers['one'] == answers['two'] || answers['one'] == answers['three']) {
                sol = answers['one'];
            }
            else if (answers['two'] == answers['three']) {
                sol = answers['two'];
            }
            else {
                sol = answers['one'];
            }

            const title = RESULTS_MAP[sol].title;
            const contents = RESULTS_MAP[sol].contents;
            solution.querySelector("h1").textContent = title;
            solution.querySelector("p").textContent = contents;
            solution.classList.remove('hidden');
            solution.classList.add('desc');

            const reset = document.querySelector('.button');
            reset.addEventListener('click', Restart);
        }
    }
}




