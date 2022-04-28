
let studentsLocalStorage = JSON.parse(localStorage.getItem('initialStudentData'));
const INITIAL_STUDENT_DATA = studentsLocalStorage ? studentsLocalStorage : [];

// const INITIAL_STUDENT_DATA = [
//     {
//       name: 'Vardas 1',
//       surname: 'Pavarde 1',
//       age: 20,
//       phone: '+370654654654',
//       email: 'vardas1@imone.lt',
//       itKnowledge: 5,
//       group: 10,
//       interests: [
//         'JavaScript',
//         'TypeScript',
//         'Node',
//         'React Native'
//       ]
//     },
//     {
//       name: 'Vardas 2',
//       surname: 'Pavarde 2',
//       age: 35,
//       phone: '+370654654654',
//       email: 'vardas2@imone.lt',
//       itKnowledge: 5,
//       group: 10,
//       interests: [
//         'JavaScript',
//         'TypeScript',
//         'Node',
//         'React Native'
//       ]
//     },
//     {
//       name: 'Vardas 3',
//       surname: 'Pavarde 3',
//       age: 32,
//       phone: '+370654654654',
//       email: 'vardas3@imone.lt',
//       itKnowledge: 5,
//       group: 10,
//       interests: [
//         'JavaScript',
//         'TypeScript',
//         'Node',
//         'React Native'
//       ]
//     },
//     {
//       name: 'Vardas 4',
//       surname: 'Pavarde 4',
//       age: 25,
//       phone: '+370654654654',
//       email: 'vardas4@imone.lt',
//       itKnowledge: 5,
//       group: 10,
//       interests: [
//         'JavaScript',
//         'TypeScript',
//         'Node',
//         'React Native'
//       ]
//     },
//     {
//       name: 'Vardas 5',
//       surname: 'Pavarde 5',
//       age: 18,
//       phone: '+370654654654',
//       email: 'vardas5@imone.lt',
//       itKnowledge: 5,
//       group: 10,
//       interests: [
//         'JavaScript',
//         'TypeScript',
//         'Node',
//         'React Native'
//       ]
//     },
//   ];
  let studentForm = document.querySelector('#student-form');
  let editStudent = null;
  studentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let validForm = formErrorHandler(studentForm);
    if (!validForm) {
      return;
    }
    let formInterests = document.querySelectorAll('input[name=interest]:checked');
    let interestValues = [...formInterests].map(element => {
      return element.value;
    });
    let studentFormData = {
      name: document.querySelector('input[name=name]').value,
      surname: document.querySelector('#student-surname').value,
      age: event.target.elements.age.value,
      phone: studentForm.querySelector('#student-phone').value,
      email: document.querySelector('#student-email').value,
      itKnowledge: event.target.elements['it-knowledge'].value,
      group: event.target.elements.group.value,
      interests: interestValues,
    };
    if (editStudent) {
      alertMessage(`Student edited (${studentFormData.name} ${studentFormData.surname})`);
    } else {
      alertMessage(`Student created (${studentFormData.name} ${studentFormData.surname})`);
    }
    renderStudent(studentFormData);

    let studentsDataArray = [ studentFormData, ...INITIAL_STUDENT_DATA];
    localStorage.setItem('initialStudentData', [JSON.stringify(studentsDataArray)]);


    studentForm.reset();
    itKnowledgeOutputReset();
  });
  function itKnowledgeOutputReset() {
    let itKnowledgeElement = document.querySelector('#student-it-knowledge');
    let itKnowledgeOutput = document.querySelector('#it-knowledge-output');
    itKnowledgeOutput.textContent = itKnowledgeElement.value;
    itKnowledgeElement.addEventListener('input', () => {
      itKnowledgeOutput.textContent = itKnowledgeElement.value;
    });
  }
  function alertMessage(text, elementClass = '') {
    let alertElement = document.querySelector('#alert');
    alertElement.textContent = text;
    if (elementClass) {
      alertElement.classList.add(elementClass);
    }
    setTimeout(() => {
      alertElement.textContent = '';
      if (elementClass) {
        alertElement.classList.remove(elementClass);
      }
    }, 5000);
  }
  function renderInitialStudentData(students) {
    if (!students) {
      return;
    }

    students.map((student) => {
      renderStudent(student);
    });
  }
  function renderStudent(studentData) {
    let personName = studentData.name;
    let personSurname = studentData.surname;
    let personAge = studentData.age;
    let personPhone = studentData.phone;
    let personEmail = studentData.email;
    let personItKnowledge = studentData.itKnowledge;
    let personGroup = studentData.group;
    let interests = studentData.interests;
    let studentsList = document.querySelector('#students-list');
    let studentItem = document.createElement('div');
    studentItem.classList.add('student-item');
    let studentNameEl = document.createElement('p');
    studentNameEl.innerHTML = `<strong>Name: </strong><span class="student-name">${personName}</span>`;
    let studentSurnameEl = document.createElement('p');
    studentSurnameEl.innerHTML = `<strong>Surname: </strong><span class="student-surname">${personSurname}</span>`;
    let studentAgeEl = document.createElement('p');
    studentAgeEl.innerHTML = `<strong>Age: </strong><span class="student-age">${personAge}</span>`;
    let studentPhoneEl = document.createElement('p');
    studentPhoneEl.innerHTML = `<strong>Phone: </strong><span class="hidden-area">****</span>`;
    let studentEmailEl = document.createElement('p');
    studentEmailEl.innerHTML = `<strong>Email: </strong><span class="hidden-area">****</span>`;
    let studentItKnowledgeEl = document.createElement('p');
    studentItKnowledgeEl.innerHTML = `<strong>IT Knowledge: </strong><span class="student-it-knowledge">${personItKnowledge}</span>`;
    let studentGroupEl = document.createElement('p');
    studentGroupEl.innerHTML = `<strong>Group: </strong><span class="student-group">${personGroup}</span>`;
    let interestWrapperEl = document.createElement('div');
    let interestTitleEl = document.createElement('h4');
    interestTitleEl.textContent = 'Interests:';
    let studentInterestsEl = document.createElement('ul');
    interests.forEach((interest) => {
      let interestItem = document.createElement('li');
      interestItem.textContent = interest;
      studentInterestsEl.append(interestItem);
    });
    interestWrapperEl.append(interestTitleEl, studentInterestsEl);
    let privateInfoButton = document.createElement('button');
    privateInfoButton.textContent = 'Rodyti asmens duomenis';
    privateInfoButton.addEventListener('click', () => {
      if (privateInfoButton.classList.contains('hide')) {
        studentPhoneEl.querySelector('.hidden-area').textContent = '****';
        studentEmailEl.querySelector('.hidden-area').textContent = '****';
        privateInfoButton.textContent = 'Rodyti asmens duomenis';
      } else {
        studentPhoneEl.querySelector('.hidden-area').textContent = personPhone;
        studentEmailEl.querySelector('.hidden-area').textContent = personEmail;
        privateInfoButton.textContent = 'Slėpti asmens duomenis';
      }
      privateInfoButton.classList.toggle('hide');
    });
    
    let deleteStudentButton = document.createElement('button');
    deleteStudentButton.textContent = 'Ištrinti studentą';
    deleteStudentButton.addEventListener('click', () => {
      studentItem.remove();
      alertMessage(`Studentas (${personName} ${personSurname}) sėkmingai ištrintas.`);
    });

    let editStudentButton = document.createElement('button');
    editStudentButton.textContent = 'Redaguoti studento duomenis';
    editStudentButton.addEventListener('click', () => {
      studentForm.querySelector('#student-name').value = personName;
      studentForm.querySelector('#student-surname').value = personSurname;
      studentForm.querySelector('#student-age').value = personAge;
      studentForm.querySelector('#student-phone').value = personPhone;
      studentForm.querySelector('[name=email]').value = personEmail;
      studentForm.querySelector('#student-it-knowledge').value = personItKnowledge;
      studentForm.elements.group.value = personGroup;

      interests.map(singleInterest => {
        studentForm.elements.interest.forEach(formInterest => {
          if (singleInterest === formInterest.value) {
            formInterest.checked = true;
          }

        });
      });

      itKnowledgeOutputReset();

      studentForm.querySelector('[type=submit]').value = 'Save Changes';
      editStudent = studentItem;
    });

    studentItem.append(studentNameEl, studentSurnameEl, studentAgeEl, studentPhoneEl, studentEmailEl, studentItKnowledgeEl, studentGroupEl, interestWrapperEl, privateInfoButton, deleteStudentButton, editStudentButton);

    if (editStudent) {
      editStudent.replaceWith(studentItem);
      editStudent = null;
      studentForm.querySelector('[type=submit]').value = 'Submit';
    } else {
      studentsList.prepend(studentItem);
    }
  }
  function formErrorHandler(form) {
    let inputErrorMessages = form.querySelectorAll('.input-error-message');
    inputErrorMessages.forEach(message => message.remove());
    form.querySelectorAll('input.input-error').forEach(input => input.classList.remove('input-error'));
    let requiredInputs = form.querySelectorAll('input.required');
    let formValid = true;
    requiredInputs.forEach(input => {
      if (!input.value) {
        formValid = false;
        inputErrorMessage(input, 'Šis laukelis yra privalomas');
      } else {
        if (input.name === 'name') {
          if (input.value.length < 3) {
            inputErrorMessage(input, 'Vardas yra per trumpas. Jis turėtų būti bent 3 simbolių ilgio.');
            formValid = false;
          }
        }
        if (input.name === 'surname') {
          if (input.value.length < 3) {
            inputErrorMessage(input, 'Pavardė yra per trumpa. Ji turėtų būti bent 3 simbolių ilgio.');
            formValid = false;
          }
        }
        if (input.name === 'age') {
          if (input.value < 0) {
            inputErrorMessage(input, 'Amžius privalo būti teigiamas skaičius.');
            formValid = false;
          }
          if (input.value > 120) {
            inputErrorMessage(input, 'Įvestas amžius yra per didelis. Maksimalus amžius yra 120 metų.');
            formValid = false;
          } 
        }
        if (input.name === 'phone') {
          if (input.value.length < 9 || input.value.length > 12) {
            inputErrorMessage(input, 'Įvestas telefono numeris yra neteisingas');
            formValid = false;
          }
        }
        if (input.name === 'email') {
          if (!input.value.includes('@')) {
            inputErrorMessage(input, 'Įvestas elektroninis paštas yra neteisingas');
            formValid = false;
          }
        }
      }
    })
    return formValid;
  };
  function inputErrorMessage(inputElement, errorMessage) { 
    inputElement.classList.add('input-error');
    alertMessage('Ne visi laukeliai yra užpildyti.', 'error-alert');
    let inputError = document.createElement('span');
    inputError.textContent = errorMessage;
    inputError.classList.add('input-error-message');
    inputElement.after(inputError);
  };
  let searchForm = document.querySelector('#search');
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let searchInput = event.target.elements.search.value.toLowerCase();
    let searchVariation = event.target.elements.variations.value;
    let students = document.querySelectorAll('.student-item');

    students.forEach(student => {
      let studentName = student.querySelector('.student-name').textContent.toLowerCase();
      let studentSurname = student.querySelector('.student-surname').textContent.toLowerCase();
      let studentAge = student.querySelector('.student-age').textContent;
      let studentItKnowledge = student.querySelector('.student-it-knowledge').textContent
      let studentGroup = student.querySelector('.student-group').textContent;

      switch (searchVariation) {
        case 'name':
          if (studentName.includes(searchInput)) {
            student.style.display = 'block';
          } else {
            student.style.display = 'none';
          }
          break;
        case 'surname':
          if (studentSurname.includes(searchInput)) {
            student.style.display = 'block';
          } else {
            student.style.display = 'none';
          }
          break;
        case 'age':
          if (studentAge == searchInput) {
            student.style.display = 'block';
          } else {
            student.style.display = 'none';
          }
          break;
        case 'it-knowledge':
          if (studentItKnowledge == searchInput) {
            student.style.display = 'block';
          } else {
            student.style.display = 'none';
          }
          break;
        case 'group':
          if (studentGroup.includes(searchInput)) {
            student.style.display = 'block';
          } else {
            student.style.display = 'none';
          }
          break;
        default:
          console.log('Netinkamas')
      }
    })
  });

  studentForm.addEventListener('input', (event) => {
    let formInfo = {
      name: studentForm.querySelector('#student-name').value,
      surname: studentForm.querySelector('#student-surname').value,
      age: studentForm.querySelector('#student-age').value,
      phone: studentForm.querySelector('#student-phone').value,
      email: studentForm.querySelector('#student-email').value,
      itKnowledge: studentForm.querySelector('#student-it-knowledge').value,
      group: studentForm.elements.group.value,
      interests: []
    }

    studentForm.querySelectorAll('input[name=interest]:checked').forEach(interest => {
      formInfo.interests.push(interest.id);
    });

    localStorage.setItem('form-info', JSON.stringify(formInfo));
  });

  let localStorageFormInfo = JSON.parse(localStorage.getItem('form-info'));

  studentForm.querySelector('#student-name').value = localStorageFormInfo.name;
  studentForm.querySelector('#student-surname').value = localStorageFormInfo.surname;
  studentForm.querySelector('#student-age').value = localStorageFormInfo.age;
  studentForm.querySelector('#student-phone').value = localStorageFormInfo.phone;
  studentForm.querySelector('#student-email').value = localStorageFormInfo.email;
  studentForm.querySelector('#student-it-knowledge').value = localStorageFormInfo.itKnowledge;
  studentForm.elements.group.value = localStorageFormInfo.group;

  localStorageFormInfo.interests.forEach(interest => {
    studentForm.querySelector(`input#${interest}`).checked = true;
  });



  renderInitialStudentData(INITIAL_STUDENT_DATA);

  itKnowledgeOutputReset();