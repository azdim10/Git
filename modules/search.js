export class Search {
    constructor(view, api){
        this.view = view;
        this.view.searchStr.addEventListener('keyup', this.debounce(this.loadRepos.bind(this), 500));
        this.currentPage = 5;
        this.api = api;
    }
    async loadRepos(){
        if (this.view.searchStr.value){
            this.clearRepos();
            this.reposRequest(this.view.searchStr.value);
    }else {this.clearRepos()}
    }
    async reposRequest(searchValue) {
        try {
            const response = await this.api.loadRepos(searchValue, this.currentPage);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            data.items.forEach(res => this.view.createUser(res));
        } catch (error) {
            console.error("Error:", error);
        }
    }

    clearRepos(){
        this.view.searchRes.innerHTML = '';
    }
    debounce (func, wait, immediate){
        let timeout;
        return function() {
            const context = this, args=arguments;
            const later = function(){
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow =immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if(callNow) func.apply(context, args);
            };
        }
    }