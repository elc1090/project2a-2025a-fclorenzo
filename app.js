const gitHubForm = document.getElementById('gitHubForm');

gitHubForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('usernameInput').value;
    const repo = document.getElementById('repoInput').value;
    const ul = document.getElementById('userRepos');
    ul.innerHTML = '';

    try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`);
        const commits = await response.json();

        if (!Array.isArray(commits)) {
            ul.innerHTML = `<li class="bg-red-100 text-red-700 p-4 rounded">${commits.message}</li>`;
            return;
        }

        commits.forEach(commit => {
            const li = document.createElement('li');
            li.className = "bg-white shadow-md p-4 rounded border border-gray-200";
            li.innerHTML = `
                <p><strong>Mensagem:</strong> ${commit.commit.message}</p>
                <p><strong>Data:</strong> ${new Date(commit.commit.committer.date).toLocaleString()}</p>
                <p><strong>Autor:</strong> ${commit.commit.committer.name}</p>
            `;
            ul.appendChild(li);
        });

    } catch (err) {
        ul.innerHTML = `<li class="bg-red-100 text-red-700 p-4 rounded">Erro ao buscar commits.</li>`;
    }
});
