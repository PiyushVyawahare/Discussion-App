var questionTitleNode = document.getElementById("subject");
var questionDescriptionNode= document.getElementById("question");
var submitButtonNode = document.getElementById("submitBtn");
var dataListNode = document.getElementById("dataList");
var questionFormNode = document.getElementById("toggleDisplay");
var respondQueNode = document.getElementById("respondQue");
var resolveHolderNode = document.getElementById("resolveHolder");
var respondAnsNode = document.getElementById("respondAns");
var commentHolderNode = document.getElementById("commentHolder");
var commentNameNode = document.getElementById("pickName");
var commentDescriptionNode = document.getElementById("pickComment");
var commentButtonNode = document.getElementById("commentBtn");


function onLoad(){
    var allQuestions = getAllQuestions();
    allQuestions.forEach(addQuestionToLeftPane);
}

onLoad();

function onSubmitQuestion(){

    question = {
        title: "",
        description: "",
        comments: []
    }
    
    if(questionTitleNode.value !== "" && questionDescriptionNode.value !== ""){
        question.title = questionTitleNode.value;
        question.description = questionDescriptionNode.value;

        addQuestionToLeftPane(question);
        saveQuestionToLocalStorage(question);

        clearQuestionForm();

    } else {
        alert("Fields are mandatory");
    }
}

function addQuestionToLeftPane(question){
    var questionNode = createQuestionNode(question);
    dataListNode.appendChild(questionNode);

    questionNode.addEventListener("click", onQuestionClicked(question));
}

function createQuestionNode(question){
    var questionNode = document.createElement("div");
    questionNode.setAttribute("id", "questionToLeft");

    var questionTitle = document.createElement("h3");
    var questionDescription = document.createElement("p");

    questionTitle.innerHTML = question.title;
    questionDescription.innerHTML = question.description;

    questionNode.appendChild(questionTitle);
    questionNode.appendChild(questionDescription);
    return questionNode;
}

function saveQuestionToLocalStorage(question){

    var allQuestions = getAllQuestions();
    allQuestions.push(question);
    localStorage.setItem("questions", JSON.stringify(allQuestions));
}

function getAllQuestions(){
    var allQuestions = localStorage.getItem("questions");
    if(allQuestions){
        allQuestions = JSON.parse(allQuestions);
    }
    else{
        allQuestions = [];
    }
    return allQuestions;
}

function clearQuestionForm(){
    questionTitleNode.value = "";
    questionDescriptionNode.value = "";
}

function onQuestionClicked(question){
    return function(){
        hideQuestionPanel();
        
        clearRespondQueNode();
        clearResponAnsNode();
        showDiscussionDetails();

        addQuestionToRightPane(question);
        // console.log(question);
        question.comments.forEach(function(comment)
        {
            addCommentsToRightPane(comment)
        });

        commentButtonNode.onclick = onCommentButtonClicked(question);
   
    }
}

function clearRespondQueNode(){
    respondQueNode.innerHTML = "";
}

function clearResponAnsNode(){
    respondAnsNode.innerHTML = "";
}

function hideQuestionPanel(){
    questionFormNode.style.display = "none";
}

function showDiscussionDetails(){
    respondQueNode.style.display = "block";
    resolveHolderNode.style.display = "block";
    commentHolderNode.style.display = "block";
    respondAnsNode.style.display = "block";

}

function addQuestionToRightPane(question){

    var questionNode = createQuestionNode(question);
    respondQueNode.appendChild(questionNode);
}

function onCommentButtonClicked(question){
    return function(){

        var comment = {
            name: "",
            description: ""
        }

        if(commentNameNode.value !== "" && commentDescriptionNode.value !== ""){
            comment.name = commentNameNode.value;
            comment.description = commentDescriptionNode.value;
            question.comments.push(comment);
            saveCommentToLocalStorage(question, comment);
            addCommentsToRightPane(comment);

            clearCommentForm();
        } else {
            alert("Fields are mandatory");
        }

        
    }
}

function saveCommentToLocalStorage(question, comment){
    var allQuestions = getAllQuestions();
    for(var i = 0; i < allQuestions.length; i++){
        if(allQuestions[i].title == question.title){
            allQuestions[i].comments.push(comment);
        }
    }
    localStorage.setItem("questions", JSON.stringify(allQuestions));
}

function addCommentsToRightPane(comment){
    var commentNode = createCommentNode(comment);
    respondAnsNode.appendChild(commentNode);
}

function createCommentNode(comment){
    var commentNode = document.createElement("div");
    commentNode.setAttribute("id", "questionToLeft");

    var commentName = document.createElement("h3");
    var commentDescription = document.createElement("p");

    commentName.innerHTML = comment.name;
    commentDescription.innerHTML = comment.description;

    commentNode.appendChild(commentName);
    commentNode.appendChild(commentDescription);
    return commentNode;
}

function clearCommentForm(){
    commentNameNode.value = "";
    commentDescriptionNode.value = "";
}
submitButtonNode.addEventListener("click", onSubmitQuestion);
