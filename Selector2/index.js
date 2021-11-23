const getTemplate = (data = [], placeholder, selectedId) => {
    
    let text = placeholder ?? 'Placeholder по умолчанию'
    
    const items = data.map(item => {
        let cls = ''
        if (item.id === selectedId) {
            text = item.value
            cls = 'selected'
        }
        
        return `
        <li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>
        `
    })

    return `
    <div class="select__backdrop" data-type="backdrop"></div>

    <div class="select__input" data-type="input">
                    <span data-type="value">${text}</span>
                    <svg data-type="arrow" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
               </div>
               <div class="select__dropdown">
                    <ul class="select__list">
                        ${items.join('')}
                    </ul>
               </div>
    `
}

class Select {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.options = options
        this.selectedId = options.selectedId

        this.#render()
        this.#setup()
    }
    open() {
        this.$el.classList.add('open')
    }

    close() {
        this.$el.classList.remove('open')
    }

    // Приватный метод
    #render() {
        const {placeholder, data} = this.options
        this.$el.classList.add('select')
        this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId)
    }

    // Добавляем event
    #setup() {
        this.clickHandler = this.clickHandler.bind(this)
        this.$el.addEventListener('click', this.clickHandler) //

        this.$value = this.$el.querySelector('[data-type="value"]')

        //  this.$arrow = this.$el.querySelector('[data-type="arrow"]')
    }

    clickHandler(event) {


        const type = event.target.dataset.type

        if (type === 'input') {
            this.toggle()
        } else if (type === 'item') {
            const id = event.target.dataset.id
           // console.log(id)
            this.select(id)
        } else if (type === 'backdrop') {
          //  console.log('Close')
            this.close()
        }

    }

    // Выбранный элемент
    select(id) {
        this.selectedId = id
        this.$value.textContent = this.current.value
        this.$el.querySelectorAll('[data-type="item"]').forEach(el => {
            el.classList.remove('selected')
        })
        this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')
        
        this.options.onSelect ? this.options.onSelect(this.current) : null
        
        this.close()
    }

    get isOpen() {
        return this.$el.classList.contains('open')
    }

    get current() {
        return this.options.data.find(item => item.id === this.selectedId)
    }

    toggle() {
        this.isOpen ? this.close() : this.open()
    }

    // ?
    destroy() {
        this.$el.removeEventListener('click', this.clickHandler) //
        this.$el.innerHTML = ''
    }
}

//

const select = new Select('#select', {
    placeholder: 'Выберите элемент',
   // selectedId: '1',
    data: [
        {id: '0', value: 'Выберите элемент'},
        {id: '1', value:'React'},
        {id: '2', value:'Angular'},
        {id: '3', value:'Vue.js'},
        {id: '4', value:'React Native'},
        {id: '5', value:'Next'},
        {id: '6', value:'Nest'},
    ],

    onSelect(item) {
        console.log('Selected item', item)
    }
})

window.s = select
