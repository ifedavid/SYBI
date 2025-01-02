# Project Overview

This repo was for a project completion for [project](https://roadmap.sh/projects/github-actions-deployment-workflow).

In this project, I learned about CI/CD with GitHub Actions and deployment with GitHub Pages.

## Task Description

The task was to deploy the project to GitHub Pages on every push to the main branch only when the `index.html` file has been updated. There are probably different ways to achieve this, but I created two workflows in GitHub Actions.

## Workflows

1. **Check for File Changes**: This workflow checks for file changes by comparing the checksum (`cksum`) of the `index.html` file from the previous commit with the current commit.

2. **Deploy to GitHub Pages**: If the checksum values are different, this workflow runs and pushes the changes to a new branch `gh-pages`, which is configured to deploy to GitHub Pages anytime it receives a push.

## Challenges

One major problem I ran into was permissioning GitHub Actions to read and write on the repo itself. It made me go back and forth a lot on my workflow logic. This was fun.