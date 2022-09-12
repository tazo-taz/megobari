(function() {
    // default functions
    const _ = (a, parent = document) => parent.querySelector(a)
    const __ = (a, parent = document) => parent.querySelectorAll(a)
    const eventListener = (element, eventCallBack, eventType = "click") => element.addEventListener(eventType, eventCallBack)
    const siblingElements = element => [...element.parentElement.children].filter(a => a !== element)

    // values
    const questionsList = __(".question")
    const customersButtons = __(".customer-button")
    const reviews = _(".reviews")

    function questionHeaderClick(){
        const questionElement = this.parentElement
        const questionBody = _(".question-body", questionElement)
        const questionHeaderIcon = _(".icon", this)

        this.classList.toggle("active")
        questionBody.classList.toggle("active")
        questionHeaderIcon.classList.toggle("active")
    }

    function customerButtonClick(index){
        return function(){
            const elementSiblings = siblingElements(this)
            elementSiblings.forEach(sibling => sibling.classList.remove("active"))
            
            this.classList.add("active")
            changeReviewsSlide(index);
        }
    }

    function changeReviewsSlide(index){
        reviews.style.transform = `translate(${index ? "calc(" + -70 * index + "% - 30px)" : "0"})`
    }

    function init(){
        setEventsToQuestionsList()
        // set the first FAQ as an active if there is the one
        questionsList.length && questionHeaderClick.apply(questionsList[0])

        setEventsToCutsomersBalls()
    }


    function setEventsToQuestionsList(){
        [...questionsList].forEach(el => {

            const questionHeaderElement = _(".question-header", el)

            eventListener(questionHeaderElement, questionHeaderClick)
        })
    }

    function setEventsToCutsomersBalls(){
        [...customersButtons].forEach((el, index) => {
            
            eventListener(el, customerButtonClick(index))
        })
    }

    init()
}())