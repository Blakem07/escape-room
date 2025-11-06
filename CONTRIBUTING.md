# Repository Workflow Summary

## Overview
This repository follows a branching workflow designed to keep development organized and the main branch stable.

- **main** -> Final, stable product (ready to submit or deploy).
- **dev** -> Integration/staging branch for combining new features.
- **feature/*** -> Individual branches for each developer’s tasks or features.

## Branching Flow

```

feature/*  ->  dev  ->  main

````

- Developers branch from `dev` for new work.
- Once complete, code is submitted as a Pull Request (PR) into `dev`.
- `dev` is tested and reviewed, then merged into `main` when stable.

## Developer Workflow

### 1. Create a Feature Branch

```bash
git checkout dev
git pull origin dev
git checkout -b feature/your-feature-name
````

### 2. Work & Commit

```bash
git add .
git commit -m "Clear message describing your changes"
git push origin feature/your-feature-name
```

### 3. Open a Pull Request

* **PR target**: `dev` branch
* Include a clear description of changes
* Assign reviewers

### 4. Review & Test

* Automated Jest tests run on PRs
* Reviewers check code quality and functionality

### 5. Merge

* After approval and passing tests, PR is merged into `dev`
* Repo manager merges `dev` → `main` when ready for release

### 6. Cleanup

* Delete old feature branches to keep the repo clean

## Testing

* Jest tests run automatically on PRs and pushes to `dev`.
* Merges into `dev` or `main` are only allowed if all tests pass.

## Branch Protection Guidelines

* Direct commits to `main` and `dev` are not allowed
* Require PR review before merging
* Require passing status checks (Jest)

## Quick Tips

* Keep commits small and descriptive
* Test your feature locally before creating a PR
* Merge often from `dev` into your feature branch to avoid conflicts
* Always delete merged branches
