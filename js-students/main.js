(()=>{
    function isEmpty(str) {
        if(Array.isArray(str)) {
            for (let i = 0; i < str.length; i++) {
                if(str[i] === "") return true;
                else continue;
            }
            return false;
        }else {
            if (str.trim === '') return true;
            else return false;
        }
    }

    function createElement(fio, faqulty, birthdate, years, number) {
        let TR =  document.createElement('tr');
        let thNumber = document.createElement('th');
        let tdFio = document.createElement('td');
        let tdFaqulty = document.createElement('td');
        let tdBirthdate = document.createElement('td');
        let tdYears = document.createElement('td');
        let tdButton = document.createElement('td');
        let deleteButton = document.createElement('button');
        
        thNumber.scope = "row";
        thNumber.textContent = number;
        tdFio.textContent = fio;
        tdFaqulty.textContent = faqulty;
        tdBirthdate.textContent = birthdate.getDate() + '.' + (birthdate.getMonth()+1) + '.' + birthdate.getFullYear();
        tdYears.textContent = years;

        deleteButton.textContent = "удалить";
        deleteButton.classList.add('btn');
        deleteButton.classList.add('btn-dark');
        deleteButton.classList.add('btn-delete');

        tdButton.append(deleteButton);

        TR.append(thNumber, tdFio, tdFaqulty, tdBirthdate, tdYears, tdButton);

        return { 
            TR,
            deleteButton
        };
    }

    function reWriteTable(studentsArray) {
        tbody = document.querySelector('.students-body');
        let tableItems = [];

        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }

        for (let i = 0; i < studentsArray.length; i++) {
            tableItems.push(createElement(
                studentsArray[i].surname + ' ' + studentsArray[i].name + ' ' + studentsArray[i].patronymic,
                studentsArray[i].faculty,
                studentsArray[i].date,
                studentsArray[i].year + '-' + String(Number(studentsArray[i].year) + 4),
                i+1));
        }

        for(let i = 0; i < tableItems.length; i++) {
            tableItems[i].deleteButton.addEventListener('click', ()=>{
                if(confirm("Вы уверены?")){
                    tbody.removeChild(tableItems[i].TR);
                }
            });
        }

        for (let i = 0; i < tableItems.length; i++) {
            tbody.append(tableItems[i].TR);
        }
    }

    function validate(name, surname, patronymic,birthdate, year, faculty) {
        name = name.trim();
        surname = surname.trim();
        patronymic = patronymic.trim();
        faculty = faculty.trim();
        let date = new Date(birthdate);
        let minDate = new Date('1900-1-1');

        if (!isEmpty([name, surname, patronymic, faculty])) {
            if(!isNaN(year)) {
                year = parseInt(year);
                if(year >= 2000) {
                    if(date.getTime() > minDate && date.getTime() <= Date.now()) {
                        year = String(year);
                        return {
                            name,
                            surname, 
                            patronymic,
                            date,
                            year,
                            faculty,
                        };
                    }
                }
            }
        }
        return false;
    }

    function clickBtnFio(allStudents, clicked) {
        if(clicked) {
            for (let j = allStudents.length - 1; j > 0; j--) {
                for (let i = 0; i < j; i++) {
                  if ((allStudents[i].surname + allStudents[i].name + allStudents[i].patronymic) > (allStudents[i+1].surname + allStudents[i+1].name + allStudents[i+1].patronymic)) {
                    let temp = allStudents[i];
                    allStudents[i] = allStudents[i + 1];
                    allStudents[i + 1] = temp;
                  }
                }
            }
            reWriteTable(allStudents);
            return !clicked;
        }else {
            for (let j = allStudents.length - 1; j > 0; j--) {
                for (let i = 0; i < j; i++) {
                  if ((allStudents[i].surname + allStudents[i].name + allStudents[i].patronymic) < (allStudents[i+1].surname + allStudents[i+1].name + allStudents[i+1].patronymic)) {
                    let temp = allStudents[i];
                    allStudents[i] = allStudents[i + 1];
                    allStudents[i + 1] = temp;
                  }
                }
            }
            reWriteTable(allStudents);
            return !clicked;
        }
    }

    function clickBtnFaqulty(allStudents, clicked) {
        if(clicked) {
            for (let j = allStudents.length - 1; j > 0; j--) {
                for (let i = 0; i < j; i++) {
                  if ((allStudents[i].faculty) > (allStudents[i+1].faculty)) {
                    let temp = allStudents[i];
                    allStudents[i] = allStudents[i + 1];
                    allStudents[i + 1] = temp;
                  }
                }
            }
            reWriteTable(allStudents);
            return !clicked;
        }else {
            for (let j = allStudents.length - 1; j > 0; j--) {
                for (let i = 0; i < j; i++) {
                  if ((allStudents[i].faculty) < (allStudents[i+1].faculty)) {
                    let temp = allStudents[i];
                    allStudents[i] = allStudents[i + 1];
                    allStudents[i + 1] = temp;
                  }
                }
            }
            reWriteTable(allStudents);
            return !clicked;
        }
    }

    function clickBtnYear(allStudents, clicked) {
        if(clicked) {
            for (let j = allStudents.length - 1; j > 0; j--) {
                for (let i = 0; i < j; i++) {
                  if (Number(allStudents[i].year) > Number(allStudents[i+1].year)) {
                    let temp = allStudents[i];
                    allStudents[i] = allStudents[i + 1];
                    allStudents[i + 1] = temp;
                  }
                }
            }
            reWriteTable(allStudents);
            return !clicked;
        }else {
            for (let j = allStudents.length - 1; j > 0; j--) {
                for (let i = 0; i < j; i++) {
                  if (Number(allStudents[i].year) < Number(allStudents[i+1].year)) {
                    let temp = allStudents[i];
                    allStudents[i] = allStudents[i + 1];
                    allStudents[i + 1] = temp;
                  }
                }
            }
            reWriteTable(allStudents);
            return !clicked;
        }
    }

    function clickBtnBirthdate(allStudents, clicked) {
        if(clicked) {
            for (let j = allStudents.length - 1; j > 0; j--) {
                for (let i = 0; i < j; i++) {
                  if (allStudents[i].date > allStudents[i+1].date) {
                    let temp = allStudents[i];
                    allStudents[i] = allStudents[i + 1];
                    allStudents[i + 1] = temp;
                  }
                }
            }
            reWriteTable(allStudents);
            return !clicked;
        }else {
            for (let j = allStudents.length - 1; j > 0; j--) {
                for (let i = 0; i < j; i++) {
                  if (allStudents[i].date < allStudents[i+1].date) {
                    let temp = allStudents[i];
                    allStudents[i] = allStudents[i + 1];
                    allStudents[i + 1] = temp;
                  }
                }
            }
            reWriteTable(allStudents);
            return !clicked;
        }
    }

    function filter(fio = '', faqulty = '', yearStart = '', yearEnd = '', allStudents) {
        fio = fio.toLowerCase().trim();
        faqulty = faqulty.toLowerCase().trim();
        yearStart = yearStart.toLowerCase().trim();
        yearEnd = yearEnd.toLowerCase().trim();
        let allStudentsFiltered = [];
        let allStudentsFilteredFinal = [];

        for(let i = 0; i < allStudents.length; i++) {
            allStudentsFiltered.push(allStudents[i]);
        }

        if(fio != '') {
            for(let i = 0; i < allStudentsFiltered.length; i++){
                if(!(((allStudentsFiltered[i].surname + allStudentsFiltered[i].name + allStudentsFiltered[i].patronymic).toLowerCase()).includes(fio))) {
                    allStudentsFiltered[i] = null;
                }
            }
            for(let i = 0; i < allStudentsFiltered.length; i++) {
                if(allStudentsFiltered[i] != null) {
                    allStudentsFilteredFinal.push(allStudentsFiltered[i]);
                }
            }
            allStudentsFiltered = allStudentsFilteredFinal;
            allStudentsFilteredFinal = [];
        }
        if(faqulty != '') {
            for(let i = 0; i < allStudentsFiltered.length; i++){
                if(!(((allStudentsFiltered[i].faculty).toLowerCase()).includes(faqulty))) {
                    allStudentsFiltered[i] = null;
                }
            }
            for(let i = 0; i < allStudentsFiltered.length; i++) {
                if(allStudentsFiltered[i] != null) {
                    allStudentsFilteredFinal.push(allStudentsFiltered[i]);
                }
            }
            allStudentsFiltered = allStudentsFilteredFinal;
            allStudentsFilteredFinal = [];
        }
        if(yearStart != '') {
            for(let i = 0; i < allStudentsFiltered.length; i++){
                if(Number(allStudentsFiltered[i].year) != Number(yearStart)) {
                    allStudentsFiltered[i] = null;
                }
            }
            for(let i = 0; i < allStudentsFiltered.length; i++) {
                if(allStudentsFiltered[i] != null) {
                    allStudentsFilteredFinal.push(allStudentsFiltered[i]);
                }
            }
            allStudentsFiltered = allStudentsFilteredFinal;
            allStudentsFilteredFinal = [];
        }
        if(yearEnd != '') {
            for(let i = 0; i < allStudentsFiltered.length; i++){
                if(Number(allStudentsFiltered[i].year) + 4 != Number(yearEnd)) {
                    allStudentsFiltered[i] = null;
                }
            }
            for(let i = 0; i < allStudentsFiltered.length; i++) {
                if(allStudentsFiltered[i] != null) {
                    allStudentsFilteredFinal.push(allStudentsFiltered[i]);
                }
            }
            allStudentsFiltered = allStudentsFilteredFinal;
            allStudentsFilteredFinal = [];
        }
        reWriteTable(allStudentsFiltered);
        return true;
    }

    window.addEventListener('DOMContentLoaded', ()=>{
        let clickedFIO = true;
        let clickedFAQULTY = true;
        let clickedYEAR = true;
        let clickedBIRTHDATE = true;

        //filter
        let filterFio = document.querySelector('.filter-fio');
        let filterFaqulty = document.querySelector('.filter-faqulty');
        let filterStartYear = document.querySelector('.filter-yearStart');
        let filterEndYear = document.querySelector('.filter-yearEnd');
        let btnFilter = document.querySelector('.btn-filter');

        //form
        let btnOpen = document.querySelector('.btn-openForm');
        let form = document.querySelector('.form');
        let btnAddStudent = document.querySelector('.btn-addStudent');

        let nameInputForm = document.querySelector('.input-name');
        let surnameInputForm = document.querySelector('.input-sername');
        let patronymicInputForm = document.querySelector('.input-patronymic');
        let birthdateInputForm = document.querySelector('.input-birhdate');
        let yearInputForm = document.querySelector('.input-year');
        let faqultyInputForm = document.querySelector('.input-faqulty');

        //sort
        let btnFio = document.querySelector('.btn-fio');
        let btnFaculty = document.querySelector('.btn-faculty');
        let btnBirhdate = document.querySelector('.btn-birhdate');
        let btnYears = document.querySelector('.btn-years');


        //other
        let studentsTable = document.querySelector('.students-table');

        let allStudents = [];

        myStudents = [
            {
                name: 'инсаф',
                surname: 'гайнанов',
                patronymic: 'ильясович',
                date: new Date(2002, 3, 25),
                year: 2020,
                faculty: 'тф'
            },
            {
                name: 'тагир',
                surname: 'исмагилов',
                patronymic: 'маратович',
                date: new Date(2002, 02, 15),
                year: 2020,
                faculty: 'тф'
            },
            {
                name: 'тимерьян',
                surname: 'тляпов',
                patronymic: 'венерович',
                date: new Date(2002, 10, 30),
                year: 2020,
                faculty: 'вышка'
            },
            {
                name: 'руслан',
                surname: 'садиков',
                patronymic: 'айратович',
                date: new Date(2002, 6, 3),
                year: 2020,
                faculty: 'вышка'
            },
            {
                name: 'вячеслав',
                surname: 'будников',
                patronymic: 'антонович',
                date: new Date(2003, 29, 7),
                year: 2021,
                faculty: 'тф'
            },
            {
                name: 'марсель',
                surname: 'маликов',
                patronymic: 'маратович',
                date: new Date(2002, 4, 12),
                year: 2020,
                faculty: 'гнф'
            },
            {
                name: 'ильнара',
                surname: 'садикова',
                patronymic: 'айратовна',
                date: new Date(2004, 2, 18),
                year: 2022,
                faculty: 'стомат'
            }
        ];

        for(let i = 0; i < myStudents.length; i++) {
            allStudents.push(myStudents[i]);
        }
        reWriteTable(allStudents);
        btnAddStudent.addEventListener('click', ()=>{
            let change = validate(
                nameInputForm.value, 
                surnameInputForm.value,
                patronymicInputForm.value,
                birthdateInputForm.valueAsNumber,
                yearInputForm.value,
                faqultyInputForm.value)
            if( change != false) {
                    allStudents.push(change);
                    reWriteTable(allStudents);

                    nameInputForm.value = '';
                    surnameInputForm.value = '';
                    patronymicInputForm.value = '';
                    birthdateInputForm.value = '';
                    yearInputForm.value = '2020';
                    faqultyInputForm.value = '';
                    form.classList.toggle('form--active');
            } else {
                alert('Введены некотректные данные!\n-Все поля должны быть заполнены\n-дата рождения находится в диапазоне от 01.01.1900 до текущей даты\n-год начала обучения находится в диапазоне от 2000-го до текущего года');
            }
        });

        btnFio.addEventListener('click', function (){clickedFIO = clickBtnFio(allStudents, clickedFIO)});
        btnFaculty.addEventListener('click', ()=>{clickedFAQULTY = clickBtnFaqulty(allStudents, clickedFAQULTY)});
        btnYears.addEventListener('click', ()=>{clickedYEAR = clickBtnYear(allStudents, clickedYEAR)});
        btnBirhdate.addEventListener('click', ()=>{clickedBIRTHDATE = clickBtnBirthdate(allStudents, clickedBIRTHDATE)});
        btnFilter.addEventListener('click', ()=>{filter(filterFio.value, filterFaqulty.value, filterStartYear.value, filterEndYear.value, allStudents)});

        btnOpen.addEventListener('click', ()=>{
            form.classList.toggle('form--active');
        });
    });
})();