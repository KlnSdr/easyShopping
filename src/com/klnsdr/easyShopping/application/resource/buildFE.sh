cd public || exit
rm -rf static
mkdir static

cd mainScreen || exit
ed pack
cp -r docs/* ../static
rm -rf docs
