var allQuestions = []

var leftPaneNode = document.getElementById("dataList");
var questionTitleNode = document.getElementById("subject");
var questionDescriptionNode = document.getElementById("question");
var submitButtonNode = document.getElementById("submitBtn");
var rightPaneNode = document.getElementById("rightContainer");
var questionFormNode = document.getElementById("toggleDisplay");
var respondQueNode = document.getElementById("respondQue");
var resolveHolderNode = document.getElementById("resolveHolder");
var commentHolderNode = document.getElementById("commentHolder");
var commentatorNameNode = document.getElementById("pickName");
var commentNode = document.getElementById("pickComment");
var commentBtn = document.getElementById("commentBtn");

submitButtonNode.addEventListener("click", onQuestionSubmit)

function onLoad(){
    var questions = JSON.parse(localStorage.getItem("questions"));

    if(questions!==null)
    for(var i = 0; i < questions.length; i++){
        allQuestions.push(questions[i]);
        addQuestionToLeftPane(questions[i]);
    }
}

onLoad();

function onQuestionSubmit(){
    var question = {
        "title": "",
        "description": ""
    };

    if(questionTitleNode.value ===  "" || questionDescriptionNode.value === ""){
        alert("Fields are mandatory.")
    }else{
        question.title = questionTitleNode.value;
        question.description = questionDescriptionNode.value;
        allQuestions.push(question);
        saveQuestionToLocalStorage(allQuestions);
        addQuestionToLeftPane(question);
        questionTitleNode.value = "";
        questionDescriptionNode.value = "";
    }
}

function saveQuestionToLocalStorage(allQuestions){
    localStorage.setItem("questions", JSON.stringify(allQuestions));
}

function addQuestionToLeftPane(question){
    var questionDiv = document.createElement("div")
    questionDiv.setAttribute("class", "questionDiv");
    var questionTitle = document.createElement("h3");
    var questionDescription = document.createElement("p");

    questionTitle.innerHTML = question.title;
    questionDescription.innerHTML = question.description;

    questionDiv.appendChild(questionTitle);
    questionDiv.appendChild(questionDescription);
    leftPaneNode.appendChild(questionDiv);

    questionDiv.addEventListener("click", displayQuestion(question));
}

function displayQuestion(question){
    return function(){

        clearRightPane();

        addQuestionToRightPane(question);
        
        displayItems();


    }
}

function clearRightPane(){
    questionFormNode.style.display = "none";
}

function addQuestionToRightPane(question){
    respondQueNode.innerHTML = "";
    var questionNode = document.createElement("div");
    questionNode.setAttribute("class", "questionDiv")
    var questionTitle = document.createElement("h3");
    var questionDescription = document.createElement("p");

    questionTitle.innerHTML = question.title;
    questionDescription.innerHTML = question.description;

    questionNode.appendChild(questionTitle);
    questionNode.appendChild(questionDescription);
    respondQueNode.appendChild(questionNode);
}

function displayItems(){
    resolveHolderNode.style.display = "block";
    commentHolderNode.style.display = "block";
}