npm run build
node .\ci\publish\replacePackageEntry react-data-grid true
for /f %%i in ('node .\ci\publish\getReleaseVersion') do set RELEASE_VERSION=%%i
npm run beforepublish
lerna publish --repo-version %RELEASE_VERSION% --skip-git  --yes
node .\ci\publish\replacePackageEntry react-data-grid
