# Darwin

[![Board Status](https://dev.azure.com/schaumic/0c5ad786-00ad-4f33-9e2d-837cdd2bea74/8fd59d04-09dc-4fbf-b741-249e253249d5/_apis/work/boardbadge/d9f703e6-e575-4d4f-855c-0ffafc97adbf)](https://dev.azure.com/schaumic/0c5ad786-00ad-4f33-9e2d-837cdd2bea74/_boards/board/t/8fd59d04-09dc-4fbf-b741-249e253249d5/Microsoft.RequirementCategory)

Darwin is a webbased multiplayer survival game which can be controlled using code.

## Report

The report is written in LaTeX and is located in `/report`.

## Backend

The backend is Node.js based and is located in `/game-backend`.

## Frontend

The frontend uses React and is located in `/game-frontend`.

## Scripts

For the root, the backend and the frontend folder scripts exist to help development.

Root
- `install-app` - installs packages in root, frontend and backend.
- `watch` - builds, runs frontend and backend and restarts jobs on file change
- `build` - builds frontend and backend
- `start` - starts previously built frontend and backend
- `test` - runs all tests, including coverage, in frontend and backend
- `test:quick` - runs all tests, without coverage, in frontend and backend
- `prettier` - checks frontend and backend for formatting errors
- `prettier:fix` - checks frontend and backend for formatting errors and fixes them
- `lint` - lints frontend and backend code

The frontend and backend folders, provide the same scripts as the root folder does. To run a script only for the frontend/backend use `npm run scriptname-[be/fe]` like `npm run build-fe` to run a frontend build.