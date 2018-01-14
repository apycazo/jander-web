First step would be to follow the GitHub challenges. 
<a class="btn btn-sm btn-primary" href="https://try.github.io/levels/1/challenges/1" target="_blank">Test on GitHub</a>

### Rebase with parent branch changes

Note: [Git rebase vs merge](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)

```bash
git checkout feature
git rebase master
```

### Interactive rebase (ex: last 3 commits)

```bash
git checkout feature
git rebase -i HEAD~3
```

### Rebase pushed changes

Example: Edit last 5 commits on branch 'test'.

```bash
git rebase -i origin/test~5 test
git push origin +test
```

### Abort merge

Before the merge is done
* Do merge without commit: `$ git merge --no-commit`
* Revert: `$ git reset --hard`

If merge is already done, two different options:
 * Reset from last merge: `$ git reset --merge`
 * Abort merge: `$ git merge --abort`

### Undo changes

* Local only: `$ git reset --hard`
* From remote: `$ git reset --hard origin/<branchName>`


### Before merging back into master

```bash
$ git pull origin master
$ git rebase -i master
$ git commit -m "feature <x>"
$ git push
$ git checkout master
$ git pull <feature_branch>
```
### Reverting bad merge

```bash
$ git reflog
...
abc987  HEAD@{0}: merge activity
b58aae8 HEAD@{1}: fetch origin/branch
8f3a362 HEAD@{2}: activity before the fetch
...
$ git reset --hard HEAD{2}
```

### Discard changes

* **Including unstaged**: `git reset HEAD`
* **Not including**: `git checkout -- .`

## Setup

### User name and email

```bash
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```

### Configure line endings to linux style

```bash
git config --global core.autocrlf input
```

### Generate SSH keys (optional)

```bash
ssh-keygen -t rsa -C "your.email@example.com" -b 4096
```

### Aliasing

Using command line:

```bash
$ git config --global alias.co checkout
$ git config --global alias.br branch
$ git config --global alias.ci commit
$ git config --global alias.st status
```

Or edit `~/.gitconfig` file.

### Sample `~/.gitconfig` file

```conf
[http]
    sslVerify = false
[user]
    name = Andres Picazo Cuesta
    email = apycazo@gmail.com
[alias]
    co = checkout
    br = branch
    ci = commit
    st = status
```

## Commands

* **Get repository**: `git clone <repo url>`
* **Switch branches**: `git checkout <branchname>`
* **List commits pending to push**: `git cherry -v`
* **Create a new branch and check it out**: `git checkout -b <branchname>`
* **List branches (local & remote)**: `git branch -av`
* **Add files**: `git add <files>` or `git add *` (all) or `git add .` (existing on remote).
* **Delete untracked files**: `git clean -df`
* **Commit**: `git commit -m "<commit info>"`
* **Check status**: `git status`
* **Send changes to branch**: `git push origin <branchName>`
* **Add remote repo**: `git remote add origin <server>`
* **Delete local branch**: `git branch -d <branchname>`
* **Delete remote branch**: `git push origin --delete <branchname>`
* **Fetch and merge changes**: `git pull` or `git pull origin <branchname>`
* **Update cache**: `git fetch`
* **Update remotes**: `git remote update`
* **Merge into active branch**: `git merge <branchname>`
* **Show log**: `git log`
* **Tag commit**: `git tag <tag name> <commitID>`
* **Upload tags**: `git push --tags origin`
* **Export branch**: `git archive --format zip --output /full/path/to/zipfile.zip master`
