const repoPerPage = 5;
const URL = `https://api.github.com/`;
export class Api {
    async loadRepos (value, page){
        return await fetch(`${URL}search/repositories?q=${value}&per_page=${page}`) 
    }
    async loadRepoData(ownerName, name) {
        const repoUrl = `https://api.github.com/repos/${ownerName}/${name}`;
        try {
            const repoResponse = await fetch(repoUrl);
            if (!repoResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const repoData = await repoResponse.json();
            const repoName = repoData.name;
            const repoAuthor = repoData.owner.login;
            const repoStars = repoData.stargazers_count;
                return {
                repoName, repoAuthor, repoStars
            };
        } catch (error) {
            console.error('Ошибка при загрузке данных репозитория:', error);
            throw error;
        }
    }
}