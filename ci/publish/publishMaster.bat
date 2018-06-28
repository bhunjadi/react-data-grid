CALL npm run build
CALL node .\ci\publish\replacePackageEntry react-data-grid true
for /f %%i in ('node .\ci\publish\getNextVersion %1') do set RELEASE_VERSION=%%i
CALL npm run beforepublish
CALL lerna publish --repo-version %RELEASE_VERSION% --skip-git  --yes
CALL node .\ci\publish\replacePackageEntry react-data-grid
CALL node .\ci\publish\replacePackageEntry react-data-grid-addons
CALL node .\ci\publish\replacePackageEntry react-data-grid-examples
