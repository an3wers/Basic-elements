// Общий алгоритм будет выглядеть так: по нажатию на кнопку мы должны найти ссылку с классом и убрать ей этот класс. Аналогичным образом мы должны найти вкладку с этим классом и тоже убрать ей этот класс.

// Затем мы должны взять ссылку, на которую был клик и активировать ее. Затем мы должны взять вкладку, которая имеет такой же номер, как и наша ссылка - и тоже активировать ее.


// Заберем все кнопки в переменную и содержание


let tab = function () {

    let links = document.querySelectorAll('.menu > a')
    let tabs = document.querySelectorAll('.tab')
    let tabName = ''


    links.forEach(link => {
        link.addEventListener('click', selectTab)

        function selectTab(e) {
             e.preventDefault()
            links.forEach(item => {
                item.classList.remove('active')
            })

            this.classList.add('active')
            tabName = this.getAttribute('data-name')

            selectContent(tabName)
                       
        }

        function selectContent(tabName) {
            tabs.forEach(item => {
                item.classList.contains(tabName) ? item.classList.add('active') : item.classList.remove('active')
            })
        }

    })

}

tab()