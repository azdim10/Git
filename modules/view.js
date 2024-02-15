
export class View {
    constructor (api) {
        
        this.body = document.querySelector('body');
        this.body.className = 'page';
        this.api = api;
        this.search = this.elementCreate('div','search');
        this.body.appendChild(this.search);
        this.searchStr = this.elementCreate('input', 'search_string');
        this.search.appendChild(this.searchStr);
        this.searchRes = this.elementCreate('ul','search_results');
        this.search.appendChild(this.searchRes);
        this.favorites = this.elementCreate('div','favorites');
        this.body.appendChild(this.favorites);
    }
        elementCreate (tagName, className){
        const newElem = document.createElement(tagName);
        newElem.className = className
        return newElem
        }   
            createUser(repoData) {
            const repoElement = this.elementCreate('li', 'search_repo');
            repoElement.addEventListener('click', () => this.showRepoData(repoData.owner.login, repoData.name));
            repoElement.innerHTML = `<span class="repo_name"> ${repoData.name}</span>`;
            this.searchRes.appendChild(repoElement);
            this.searchRes.addEventListener('click', (event) =>{
                if (event.target.classList.contains('search_repo')){
                    this.clearSearchRes();
                    this.clearSearchStr()
                }
            })

        }
        clearSearchRes (){
            while(this.searchRes.firstChild){
                this.searchRes.removeChild(this.searchRes.firstChild)
            }
        }
        clearSearchStr(){
            this.searchStr.value = ''
        }
        clearFavoritesBtn(){
            while(this.favorites.firstChild){
                this.favorites.removeChild(this.favorites.firstChild)
            }
        }
        async showRepoData(ownerName, name) {
            try {
                const repoElement = this.elementCreate('li', 'favorites_repo');
                const repoName = this.elementCreate('li', 'favorites_repo_name');
                repoElement.appendChild(repoName);
                const repoAuthor = this.elementCreate('li', 'favorites_repo_author');
                repoElement.appendChild(repoAuthor);
                const repoStars = this.elementCreate('li', 'favorites_repo_stars');
                repoElement.appendChild(repoStars);
                const removeButton = this.elementCreate('button', 'favorites_repo-button');
                removeButton.img = './delete.png'
                repoElement.appendChild(removeButton);
                const repoData = await this.api.loadRepoData(ownerName, name);
                repoName.textContent = 'Name: ' + repoData.repoName;
                repoAuthor.textContent = 'Owner: ' + repoData.repoAuthor;
                repoStars.textContent = 'Stars: ' + repoData.repoStars;
                removeButton.addEventListener('click', () => {
                    this.favorites.removeChild(repoElement);
                });
                this.favorites.appendChild(repoElement);
            } catch (e) {
                console.log(e);
            }
        }
         
}