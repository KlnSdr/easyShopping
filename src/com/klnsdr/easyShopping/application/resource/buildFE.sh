cd public || exit
rm -rf static
mkdir static

echo "building /"
cd mainScreen || exit
ed pack
cp -r docs/* ../static
rm -rf docs

echo "building /hades/login"
cd ../login || exit
ed pack
mkdir ../static/hades/
mkdir ../static/hades/login
cp -r docs/* ../static/hades/login
rm -rf docs
