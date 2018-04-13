var obj = {
    "quiz": {
        "sport": {
			"name": "Sport Section",
            "q1": {
                "question": "Which one is correct team name in NBA?",
                "options": [
                    "New York Bulls",
                    "Los Angeles Kings",
                    "Golden State Warriros",
                    "Huston Rocket"
                ],
                "answer": "Huston Rocket"
            }
        },
        "maths": {
			"name": "Math Section",
            "q1": {
                "question": "5 + 7 = ?",
                "options": [
                    "10",
                    "11",
                    "12",
                    "13"
                ],
                "answer": "12"
            },
            "q2": {
                "question": "12 - 8 = ?",
                "options": [
                    "1",
                    "2",
                    "3",
                    "4"
                ],
                "answer": "4"
            }
        }
    }
};

function active(){
    document.getElementById('section1').innerHTML=obj.quiz.sport.name;
    document.getElementById('question1').innerHTML=obj.quiz.sport.q1.question;
    var options='<ul>';
    for(var i=0;i<obj.quiz.sport.q1.options.length;i++){
        options+='<li>'+obj.quiz.sport.q1.options[i]+'</li>'
    }
    options+='</ul>';
    
    
    document.getElementById('sportQuestion1Options').innerHTML=options;

}	

active();