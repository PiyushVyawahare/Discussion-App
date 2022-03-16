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
var searchQuestionNode = document.getElementById("questionSearch");
var upvoteButtonNode = document.getElementById("upvote");
var downvoteButtonNode = document.getElementById("downvote");
var newQuestionFormNode = document.getElementById("newQuestionForm");
var resolveQuestionButtonNode = document.getElementById("resolveQuestion");



function onNewQuestionFormClicked(){
    hideDiscussionDetails();
    viewQuestionPanel();
}

function hideDiscussionDetails(){
    respondQueNode.style.display = "none";
    resolveHolderNode.style.display = "none";
    commentHolderNode.style.display = "none";
    respondAnsNode.style.display = "none";

}

function viewQuestionPanel(){
    questionFormNode.style.display = "block";
}

function searchQuestion(event){
    var allQuestions = getAllQuestions();
    clearAllQuestions();
    tempArray = [];
    if(event.target.value){
        for(var i = 0; i < allQuestions.length; i++){
            if(allQuestions[i].title.includes(event.target.value)){
                tempArray.push(allQuestions[i]);
            }
        }
        if(tempArray.length){
            tempArray.forEach(addQuestionToLeftPane);
        }
        else{
            dataListNode.innerHTML = "NO MATCH FOUND";
        }
    }
    else{
        allQuestions.forEach(addQuestionToLeftPane);
    }
}

function clearAllQuestions(){
    dataListNode.innerHTML = "";
}

function onLoad(){
    var allQuestions = getAllQuestions();
    allQuestions.forEach(addQuestionToLeftPane);
}

onLoad();

function onSubmitQuestion(){

    question = {
        title: "",
        description: "",
        comments: [],
        upvotes: 0,
        downvotes: 0
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
    questionNode.setAttribute("class", question.title);
    questionNode.setAttribute("id", "questionToLeft")

    var questionTitle = document.createElement("h3");
    var questionDescription = document.createElement("p");
    var questionUpvotes = document.createElement("p");
    var questionDownvotes = document.createElement("p");


    questionTitle.innerHTML = question.title;
    questionDescription.innerHTML = question.description;
    questionUpvotes.innerHTML = "Upvotes: "+question.upvotes;
    questionDownvotes.innerHTML = "Downvotes: "+question.downvotes;

    questionNode.appendChild(questionTitle);
    questionNode.appendChild(questionDescription);
    questionNode.appendChild(questionUpvotes);
    questionNode.appendChild(questionDownvotes);

    return questionNode;
}

function saveQuestionToLocalStorage(question){

    var allQuestions = getAllQuestions();
    allQuestions.push(question);
    localStorage.setItem("questions", JSON.stringify(allQuestions));
}

function getAllQuestions(){
    var allQuestions = localStorage.getItem("questions");
    var allQuestions1;
    if(allQuestions){
        allQuestions1 = JSON.parse(allQuestions);
    }
    else{
        allQuestions1 = [];
    }
    return allQuestions1;
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
        upvoteButtonNode.onclick = onUpvoteButtonClicked(question);
        downvoteButtonNode.onclick = onDownvoteButtonClicked(question);
        resolveQuestionButtonNode.onclick = onResolveQuestionclicked(question);
    }
}


function hideQuestionPanel(){
    questionFormNode.style.display = "none";
}

function clearRespondQueNode(){
    respondQueNode.innerHTML = "";
}

function clearResponAnsNode(){
    respondAnsNode.innerHTML = "";
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


function onUpvoteButtonClicked(question){
    return function(){
        question.upvotes++;
        updateQuestionInLocalStorage(question);
        updateQuestionUI(question);
    }
    
}

function onDownvoteButtonClicked(question){
    return function(){
        question.downvotes++;
        updateQuestionInLocalStorage(question);
        updateQuestionUI(question);
    }
    
}

function updateQuestionInLocalStorage(question){
    var allQuestions = getAllQuestions();
    for(var i = 0; i < allQuestions.length; i++){
        if(allQuestions[i].title == question.title){
            allQuestions[i].upvotes = question.upvotes;
            allQuestions[i].downvotes = question.downvotes;
        }
    }
    localStorage.setItem("questions", JSON.stringify(allQuestions));
}

function updateQuestionUI(question){
    var questionContainerNode = document.getElementsByClassName(question.title);

    questionContainerNode[0].childNodes[2].innerHTML = "Upvotes: "+question.upvotes;
    questionContainerNode[1].childNodes[2].innerHTML = "Upvotes: "+question.upvotes;
    questionContainerNode[0].childNodes[3].innerHTML = "Downvotes: "+question.downvotes;
    questionContainerNode[1].childNodes[3].innerHTML = "Downvotes: "+question.downvotes;
}

function onResolveQuestionclicked(question){
    return function(){
        var allQuestions = getAllQuestions();
        var idx;
        for(var i = 0; i < allQuestions.length; i++){
            if(allQuestions[i].title === question.title){
                idx = i;
            }
        }
        allQuestions.splice(idx, 1);
        localStorage.setItem("questions", JSON.stringify(allQuestions));
        clearAllQuestions();
        allQuestions.forEach(addQuestionToLeftPane);
        hideDiscussionDetails();
        viewQuestionPanel();
    }
}

submitButtonNode.addEventListener("click", onSubmitQuestion);
searchQuestionNode.addEventListener("keyup", searchQuestion);
newQuestionFormNode.addEventListener("click", onNewQuestionFormClicked)
